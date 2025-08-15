import java.util.*;

public class TwoSum {
    public static void main(String[] args) {
        // case 1
        // int[] nums = {2, 7, 11, 15};
        // int target = 9;
        // case 2
        int[] nums = {3, 2, 4};
        int target = 6;
        // case 3
        // int[] nums = {3, 3};
        // int target = 6;
        
        int[] result = twoSum(nums, target);
        System.out.println(Arrays.toString(result));
    }
    
    public static int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int secondTarget = target - nums[i];
            System.out.println("second target = " + secondTarget);
            System.out.println("map has secondTarget? " + map.containsKey(secondTarget));
            
            if (map.containsKey(secondTarget)) {
                return new int[]{map.get(secondTarget), i};
            }
            
            map.put(nums[i], i);
            System.out.println("set to map number " + nums[i] + " index " + i);
            System.out.println("map entries: " + map.entrySet());
        }
        
        return new int[]{}; // return empty array if no solution
    }
}