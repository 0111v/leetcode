// case 1
const nums = [2,7,11,15]
const target = 9

// case 2
// const nums = [3,2,4]
// const target = 6

// case 3 
// const nums = [3,3]
// target = 6

const twoSum = (nums, target) => {
    const map = new Map()

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]
        console.log('complement is ' + complement)

        console.log('complement exist in the map? ' + map.has(complement))
        if (map.has(complement)) {
            return [map.get(complement), i]
        }

        map.set(nums[i], i)
        console.log('set to map number ' + nums[i] + ' index ' + i)
    }
}  

console.log(twoSum(nums, target))