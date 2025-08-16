const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

function runFile(filename) {
    if (!filename) {
        console.error('Usage: npm run exec <filename>');
        process.exit(1);
    }

    if (!fs.existsSync(filename)) {
        console.error(`File not found: ${filename}`);
        process.exit(1);
    }

    const ext = path.extname(filename).toLowerCase();
    const basename = path.basename(filename, ext);
    
    let command, args;

    switch (ext) {
        case '.py':
            command = 'python';
            args = [filename];
            break;
        case '.js':
            command = 'node';
            args = [filename];
            break;
        case '.java':
            // Compile first, then run
            console.log(`Compiling ${filename}...`);
            const compileProcess = spawn('javac', [filename], { stdio: 'inherit' });
            compileProcess.on('close', (code) => {
                if (code === 0) {
                    console.log(`Running ${basename}...`);
                    const dir = path.dirname(filename);
                    spawn('java', ['-cp', dir, basename], { stdio: 'inherit' });
                } else {
                    console.error('Compilation failed');
                    process.exit(1);
                }
            });
            return;
        case '.csx':
            command = 'dotnet';
            args = ['script', filename];
            break;
        default:
            console.error(`Unsupported file extension: ${ext}`);
            console.error('Supported extensions: .py, .js, .java, .csx');
            process.exit(1);
    }

    console.log(`Running ${filename}...`);
    const childProcess = spawn(command, args, { stdio: 'inherit' });
    
    childProcess.on('error', (error) => {
        console.error(`Error running ${command}:`, error.message);
        process.exit(1);
    });
}

const filename = process.argv[2];
runFile(filename);