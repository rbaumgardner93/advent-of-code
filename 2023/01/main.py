import re

with open("practice-input.txt") as f:
    data = f.read().strip()

def calibration(data):
    res = []
    nums = []
    lines = data.split("\n")
    for line in lines:
        nums.append(re.findall("\d", line))

    for num in nums:
        res.append((int(num[0] + num[-1])))

    return sum(res)

def part1(data):
    return calibration(data)

def part2(data):
    data = (
        data.replace("one", "one1one")
        .replace("two", "two2two")
        .replace("three", "three3three")
        .replace("four", "four4four")
        .replace("five", "five5five")
        .replace("six", "six6six")
        .replace("seven", "seven7seven")
        .replace("eight", "eight8eight")
        .replace("nine", "nine9nine")
    )
    print(data)
    return calibration(data)


# print("Part 1: {}".format(part1(data)))
print("Part 2: {}".format(part2(data)))

