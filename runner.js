const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

function findProjectRoot(startDir = process.cwd()) {
    let currentDir = startDir;
    
    while (currentDir !== path.dirname(currentDir)) {
        if (fs.existsSync(path.join(currentDir, 'package.json'))) {
            return currentDir;
        }
        currentDir = path.dirname(currentDir);
    }
    
    return null;
}

function findFile(filename, projectRoot) {
    // If filename is absolute path, use as is
    if (path.isAbsolute(filename)) {
        return fs.existsSync(filename) ? filename : null;
    }
    
    // Try relative to current directory first
    if (fs.existsSync(filename)) {
        return path.resolve(filename);
    }
    
    // Try relative to project root
    const rootPath = path.join(projectRoot, filename);
    if (fs.existsSync(rootPath)) {
        return rootPath;
    }
    
    // Search recursively in project
    function searchInDir(dir) {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const item of items) {
            const fullPath = path.join(dir, item.name);
            
            if (item.isFile() && item.name === path.basename(filename)) {
                return fullPath;
            }
            
            if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
                const found = searchInDir(fullPath);
                if (found) return found;
            }
        }
        
        return null;
    }
    
    return searchInDir(projectRoot);
}

function runJavaFile(filePath, basename) {
    // Create temp directory
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'leetcode-java-'));
    
    console.log(`Compiling ${filePath}...`);
    const compileProcess = spawn('javac', ['-d', tempDir, filePath], { stdio: 'inherit' });
    compileProcess.on('close', (code) => {
        if (code === 0) {
            console.log(`Running ${basename}...`);
            const javaProcess = spawn('java', ['-cp', tempDir, basename], { stdio: 'inherit' });
            
            // Clean up temp directory when done
            javaProcess.on('close', () => {
                fs.rmSync(tempDir, { recursive: true, force: true });
            });
        } else {
            console.error('Compilation failed');
            fs.rmSync(tempDir, { recursive: true, force: true });
            process.exit(1);
        }
    });
}

function runFile(filename) {
    if (!filename) {
        console.error('Usage: npm run exec <filename>');
        process.exit(1);
    }

    const projectRoot = findProjectRoot();
    if (!projectRoot) {
        console.error('Could not find project root (package.json not found)');
        process.exit(1);
    }

    const filePath = findFile(filename, projectRoot);
    if (!filePath) {
        console.error(`File not found: ${filename}`);
        process.exit(1);
    }

    const ext = path.extname(filePath).toLowerCase();
    const basename = path.basename(filePath, ext);
    
    let command, args;

    switch (ext) {
        case '.py':
            command = 'python';
            args = [filePath];
            break;
        case '.js':
            command = 'node';
            args = [filePath];
            break;
        case '.java':
            runJavaFile(filePath, basename);
            return;
        case '.csx':
            command = 'dotnet';
            args = ['script', filePath];
            break;
        default:
            console.error(`Unsupported file extension: ${ext}`);
            console.error('Supported extensions: .py, .js, .java, .csx');
            process.exit(1);
    }

    console.log(`Running ${filePath}...`);
    const childProcess = spawn(command, args, { stdio: 'inherit' });
    
    childProcess.on('error', (error) => {
        console.error(`Error running ${command}:`, error.message);
        process.exit(1);
    });
}

const filename = process.argv[2];
runFile(filename);