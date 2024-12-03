import re

input = open("prod.input", "r")
data = input.read()
input.close()

pattern = r"mul\(\d+,\d+\)|do\(\)|don't\(\)"
values = re.findall(pattern, data)

part_one = 0
part_two = 0

gather = True
for val in values:
    if val == "do()":
        gather = True
    elif val == "don't()":
        gather = False
    else:
        left, right = re.findall(r"\d+", val)
        part_one += int(left) * int(right)

        if gather:
            part_two += int(left) * int(right)

print(f"Part One: {part_one}")
print(f"Part Two: {part_two}")

