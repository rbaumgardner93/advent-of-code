input = open("input.txt", "r")
data = input.read()
dayRanges = data.splitlines()
input.close()

def getMinMax(range):
    left, right = range.split("-")

    return {
        "min": int(left),
        "max": int(right)
    }

def isRangeContained(leftRange, rightRange):
    return (leftRange["min"] <= rightRange["min"] and leftRange["max"] >= rightRange["max"] or
            rightRange["min"] <= leftRange["min"] and rightRange["max"] >= leftRange["max"])

def isRangeOverlapped(leftRange, rightRange):
    return leftRange["min"] <= rightRange["max"] and leftRange["max"] >= rightRange["min"]

containedCount = 0
overlapCount = 0;
for dayRange in dayRanges:
    left, right = dayRange.split(",")

    leftRange = getMinMax(left)
    rightRange = getMinMax(right)

    if isRangeContained(leftRange, rightRange):
        containedCount += 1

    if isRangeOverlapped(leftRange, rightRange):
        overlapCount += 1

print("Camp Cleanup Part1:", containedCount)
print("Camp Cleanup Part2:", overlapCount)

