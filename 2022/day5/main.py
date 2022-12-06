import re
file = open("input.txt", "r")
data = file.read()
lines = data.splitlines()
file.close()

def getLastCrateLine():
    for i, line in enumerate(lines):
        if line[1] == "1":
            return i

lastCrateLine = getLastCrateLine()
instructionStart = lastCrateLine + 2

def buildStack():
    stack = {}

    for i in range(lastCrateLine - 1, -1, -1):
        line = lines[i]

        for idx, c in enumerate(line):
            if c.isalpha():
                stack_idx = idx // 4 + 1

                if stack_idx in stack:
                    stack[stack_idx].append(c)
                else:
                    stack[stack_idx] = [c]

    return stack

def findDigits(str):
   return [int(s) for s in re.findall(r"\d+", str)]

def supplyStacksPart1(stack):
    for line in lines[instructionStart:]:
        if not len(line):
            continue

        move_amount, move_from, move_to = findDigits(line)

        i = 0
        val = ""
        while i < move_amount:
            i += 1
            if stack[move_from]:
                val = stack[move_from].pop()
                stack[move_to].append(val)

    return stack

def supplyStacksPart2(stack):
    for line in lines[instructionStart:]:
        if not len(line):
            continue

        move_amount, move_from, move_to = findDigits(line)

        move = stack[move_from][-move_amount:]
        del stack[move_from][-move_amount:]

        if not stack[move_from]:
            stack[move_from] = []

        stack[move_to] += move

    return stack

def getLastCrateValues(crateStack):
    lastVals = []

    for val in crateStack.values():
        lastVals.append(val[-1])

    return "".join(lastVals)

print("Supply Stacks Part 1:", getLastCrateValues(supplyStacksPart1(buildStack())))
print("Supply Stacks Part 2:", getLastCrateValues(supplyStacksPart2(buildStack())))
