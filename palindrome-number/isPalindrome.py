def is_palindrome(x):
    reversed = str(x)[::-1]
    return reversed == str(x)

print(is_palindrome(101))