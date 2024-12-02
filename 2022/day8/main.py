file = open("prod.input", "r")
data = file.read()
lines = data.splitlines()
file.close()

def is_tallest_in_column(lines, val, col):
    trees = []
    for line in lines:
        trees.append(line[col])

    return all(int(i) < int(val) for i in trees)

def is_tallest_in_row(line, val, col):
    return all(int(i) < int(val) for i in line)

def count_in_direction(dir, line, val):
    if dir == "before" or dir == "above":
        line.reverse()

    count = 0
    for tree in line:
        if tree == val or len(line) == 1:
            count += 1
            break
        elif tree > val:
            count += 1
            break

        count += 1

    return count


height = len(lines)
width = len(lines[0])

visible_count = 2*((height - 1 + (width - 1)))
tallest_counts = []
for i, line in enumerate(lines):
    if i == 0 or i == len(lines) - 1:
        continue

    currLine = lines[i]
    prev_lines = lines[:i]
    next_lines = lines[i + 1:]

    for col, num in enumerate(line):
        if col == 0 or col == len(line) - 1:
            continue

        before = list(currLine[:col])
        after = list(currLine[col + 1:])
        taller_than_above = is_tallest_in_column(prev_lines, num, col)
        taller_than_below = is_tallest_in_column(next_lines, num, col)
        taller_than_before = is_tallest_in_row(before, num, col)
        taller_than_after = is_tallest_in_row(after, num, col)

        if taller_than_above or taller_than_below or taller_than_before or taller_than_after:
            visible_count += 1

        below_nums = []
        for line in next_lines:
            below_nums.append(line[col])
        above_nums = []
        for line in prev_lines:
            above_nums.append(line[col])

        taller_than_above_count = count_in_direction("above", above_nums, num)
        taller_than_below_count = count_in_direction("below", below_nums, num)
        taller_than_before_count = count_in_direction("before", before, num)
        taller_than_after_count = count_in_direction("after", after, num)
        total = taller_than_above_count * taller_than_before_count * taller_than_below_count * taller_than_after_count

        tallest_counts.append(total)

print("Treetop Tree House Part 1:", visible_count)
print("Treetop Tree House Part 2:", max(tallest_counts))
