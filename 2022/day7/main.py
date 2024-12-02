file = open("prod.input", "r")
data = file.read()
lines = data.splitlines()
file.close()

maxSize = 100000
totalSpace = 70000000;
spaceToDelete = 30000000;
total = 0
dirStack = [ ["/", 0] ]
otherStack = []

for line in lines:
    if line == "$ cd /" or line == "$ ls":
        continue

    if "$ cd" in line:
        d = line[5:]

        if d == "..":
            name, amount = dirStack.pop()
            if amount <= maxSize:
                total += amount
            dirStack[-1][1] += int(amount)
            otherStack.append([name, amount])
        else:
            dirStack.append( [d, 0] )
    else:
        size, file = line.split(" ")

        if size.isnumeric():
            dirStack[-1][1] += int(size)

while len(dirStack) > 0:
    name, amount = dirStack.pop()
    otherStack.append([name, amount]);

    if len(dirStack) > 0:
        dirStack[-1][1] += amount

freeSpace = totalSpace - otherStack[-1][1]
spaceRequired = spaceToDelete - freeSpace

otherAmounts = []
for other in otherStack:
    amount = other[1]
    if amount >= spaceRequired:
        otherAmounts.append(amount)

otherAmounts.sort()
print(otherAmounts[0])
print(total)
