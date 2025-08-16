
public class IsPalindrome {
    public static void main(String[] args) {
        boolean result = isPalindrome(101);
        System.out.println(result);
    }

    public static boolean isPalindrome(int x) {
        String reversed = new StringBuilder(String.valueOf(x)).reverse().toString();
        
        return reversed.equals(String.valueOf(x));
    }
}
