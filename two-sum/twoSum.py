# case 1
# nums = [2, 7, 11, 15]
# target = 9
# case 2
nums = [3, 2, 4]
target = 6
# case 3 
# nums = [3, 3]
# target = 6

def two_sum(nums, target):
    num_map = {}
    for i in range(len(nums)):
        secondTarget = target - nums[i]
        print(secondTarget)
        if secondTarget in num_map:
            return [num_map[secondTarget], i]
        num_map[nums[i]] = i
        # print(list(num_map))

print(two_sum(nums, target))









    # num_map = {}
    # for i in range(len(nums)):
    #     second_target = target - nums[i]
    #     print(f'second target = {second_target}')
    #     print(f'map has secondTarget? {second_target in num_map}')
    #     if second_target in num_map:
    #         return [num_map[second_target], i]
    #     num_map[nums[i]] = i
    #     print(f'set to map number {nums[i]} index {i}')
    #     print(f'map entries: {list(num_map.items())}')