input = open("input.txt", "r")
data = input.read()
rucksacks = data.splitlines()
input.close()

def findCharValue(char):
    total = 0

    if char.islower():
        total += ord(char) - 96
    else:
        total += ord(char) - 38

    return total

def solution1():
    total = 0

    for rucksack in rucksacks:
        half = len(rucksack) / 2;
        first = rucksack[0:int(half)]
        second = rucksack[int(half):]
        firstSet = set(first)
        secondArr = list(second)

        found = None
        for c in secondArr:
            if c in firstSet:
                found = c

        total += findCharValue(found)

    return total


def divide_chunks(l, n):
    for i in range(0, len(l), n):
        yield l[i:i + n]

def solution2():
    chunks = list(divide_chunks(rucksacks, 3))

    total = 0
    for chunk in chunks:
        first, second, third = chunk

        firstSet = set(list(first))
        secondSet = set(list(second))
        thirdArr = list(third)

        found = None;
        for c in thirdArr:
            if c in firstSet and c in secondSet:
                found = c

        total += findCharValue(found)

    return total


print("Rucksack Reorganization Part 1:", solution1())
print("Rucksack Reorganization Part 2:", solution2())

