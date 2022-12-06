file = open("input.test", "r")
line = file.read()
file.close()

def firstUniqueChars(amt):
    charArr = []

    for i, c in enumerate(line):
        charArr.append(c)
        next_char = line[i + 1]

        if len(charArr) == amt:
            return i + 1

        if next_char in charArr:
            idx = charArr.index(next_char)
            del charArr[0:idx + 1]


print("Tuning Trouble Part 1:", firstUniqueChars(4))
print("Tuning Trouble Part 2:", firstUniqueChars(14))
