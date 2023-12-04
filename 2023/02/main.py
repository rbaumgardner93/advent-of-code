import re, math

with open("prod.input") as f:
    data = f.read().strip()

max_counts = {
    "red": 12,
    "green": 13,
    "blue": 14
}
max_value = math.prod(max_counts.values())

lines = data.split("\n")

def part1(lines):
    total = 0
    for i, line in enumerate(lines):
        game = i + 1
        bag = {"r": 12, "g": 13, "b": 14 }
        for num, color in re.findall(r'(\d+) (\w)', line):
            bag[color] = max(bag[color], int(num))

        if (math.prod(bag.values()) == max_value):
            total += game

    return total

def part2(lines):
    total_power = 0
    for i, line in enumerate(lines):
        bag = {"r": 0, "g": 0, "b": 0 }
        for num, color in re.findall(r'(\d+) (\w)', line):
            bag[color] = max(bag[color], int(num))
        power = math.prod(bag.values())
        total_power += power

    return total_power

print(part1(lines))
print(part2(lines))

