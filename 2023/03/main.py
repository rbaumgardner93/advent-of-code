import math, functools

with open("test.input") as f:
    data = f.read().strip()

lines = data.split("\n")

def isCharNumber(char):
    return not math.isnan(int(char))


def isDot(char):
    return char == "."
# x,y
dirs = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1],
]

def get(i, j, x, y):
    return lines[i + y][j + x]


sum = 0
for y in range(len(lines)):
    row = lines[y]
    isNumber = False
    check = True
    currentNumber = ""
    for x in range(len(row)):
        isNumber = get(y, x, 0, 0)

        if not isNumber:
            if not check:
                sum += int(currentNumber)
                currentNumber = ""
                check = True

        if isNumber and check:
            is = False
            for dir in dirs:
                is = dir or isDot(get(y, x, dir[1], dir[0])) and not isCharNumber(get(y, x, dir[1], dir[0]);

                if is:
                    sum += int(get(y, x, 0, 0)
                    check = False
