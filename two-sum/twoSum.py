# case 1
nums = [2, 7, 11, 15]
target = 9
# case 2
# nums = [3, 2, 4]
# target = 6
# case 3 
# nums = [3, 3]
# target = 6

def two_sun(nums, target):
    map = {}

    for i in range(len(nums)):
        complement = target - nums[i]
        print(f'complement is {complement}')

        print(f'complement exist in map? {complement in map}')
        if complement in map:
            return [map[complement], i]
        
        map[nums[i]] = i
        print(f'set to map number {nums[i]} index {i}')

print(two_sun(nums, target))



