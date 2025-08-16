const isPalindrome = (x: number): boolean => {
    const reversed = x.toString().split("").reverse().join("");

    return (reversed == x.toString());
}

console.log(isPalindrome(101));