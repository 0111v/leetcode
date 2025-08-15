using System;
using System.Diagnostics.Metrics;

public int[] nums = [2, 7, 11, 15];
public int target = 9;

public static int[] TwoSum(int[] nums, int target)
{
    var map = new Dictionary<int, int>();

    for (int i = 0; i < nums.Length; i++)
    {
        int complement = target - nums[i];
        Console.WriteLine($"complement is {complement}");

        Console.WriteLine($"complement exist in map? {map.ContainsKey(complement)}");
        if (map.ContainsKey(complement))
        {
            return [map[complement], i];            
        } 

        map[nums[i]] = i;
        Console.WriteLine($"set to map number {nums[i]} index {i}");
    }

    return [];
}

int[] result = TwoSum(nums, target);
Console.WriteLine(string.Join(", ", result));



