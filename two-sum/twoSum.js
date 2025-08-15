// case 1
// const nums = [2,7,11,15]
// const target = 9

// case 2
const nums = [3,2,4]
const target = 6

// case 3 
// const nums = [3,3]
// target = 6

var twoSum = function(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const secondTarget = target - nums[i]
        console.log('second target = ' + secondTarget)

        console.log('map has secondTarget? ' + map.has(secondTarget))  
        if (map.has(secondTarget)) return [map.get(secondTarget), i]

        map.set(nums[i], i);
        console.log('set to map number ' + nums[i] + ' index ' + i)
        console.log(map.entries())
    } 
};

console.log(twoSum(nums, target))