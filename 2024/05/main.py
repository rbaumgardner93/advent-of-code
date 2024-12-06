from collections import defaultdict

with open("prod.input", "r") as f:
    ordering_rules = defaultdict(list);
    pages = []
    for line in f:
        l = line.strip().split("|")

        if len(l) == 2:
            left, right = l
            ordering_rules[left].append(right)
        else:
            if l[0] != "":
                pages.append(l[0].split(","))

def fix(arr):
    for i in range(len(arr) - 1):
        curr = arr[i]
        next = arr[i + 1]
        if next not in ordering_rules[curr]:
            arr[i], arr[i + 1] = arr[i + 1], arr[i]
            return fix(arr)
    return arr

accepted = []
not_accepted = []
for i in range(len(pages)):
    for j in range(len(pages[i]) - 1):
        current_number = pages[i][j]
        next_number = pages[i][j + 1]

        if next_number in ordering_rules[current_number]:
            if next_number == pages[i][-1]:
                mid = len(pages[i]) // 2
                accepted.append(int(pages[i][mid]))
        else:
            fixed = fix(pages[i])
            mid = len(fixed) // 2
            not_accepted.append(int(fixed[mid]))
            break;


print(f"Part One: {sum(accepted)}")
print(f"Part Two: {sum(not_accepted)}")


