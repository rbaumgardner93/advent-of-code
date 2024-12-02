input = open("input.txt", "r")
data = input.read()
location_ids = data.split()
input.close()

right, left = [], []

for i, num in enumerate(location_ids):
    if i % 2 == 0:
        right.append(int(num))
    else:
        left.append(int(num))

right, left = sorted(right), sorted(left)

def part_one(right, left):
    sum = 0
    for i in range(len(right)):
        sum += abs(right[i] - left[i])
    return sum

def part_two(right, left):
    num_count = {}
    for num in right:
        num_count[num] = 1 + num_count.get(num, 0)


    similarity_score = 0
    for num in left:
        similarity_score += num_count.get(num, 0) * num

    return similarity_score

print("Part 1:", part_one(right, left))
print("Part 2:", part_two(right, left))
