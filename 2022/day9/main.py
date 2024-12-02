file = open("prod.input", "r")
data = file.read()
directions = data.splitlines()
file.close()

visited = []
head = { "x": 0, "y": 0 }
tail = { "x": 0, "y": 0 }

def move_tail(head, tail):
    # on each other don't move tail
    if head == tail:
        return tail

    # diagonal to each other don't move tail
    if abs(head["x"] - tail["x"]) <= 1 and abs(head["y"] - tail["y"]) <= 1:
        return tail

    # on the same axis
    if head["x"] == tail["x"]:
        # move lower
        if head["y"] < tail["y"]:
            tail["y"] -= 1
        # move higher
        else:
            tail["y"] += 1
        return tail
    elif head["y"] == tail["y"]:
        # move left
        if head["x"] < tail["x"]:
            tail["x"] -= 1
        # move right
        else:
            tail["x"] += 1
        return tail

    # on different axis
    # above and to the right
    if head["y"] > tail["y"] and head["x"] > tail["x"]:
        tail["x"] += 1
        tail["y"] += 1
    # above and to the left
    elif head["y"] > tail["y"] and head["x"] < tail["x"]:
        tail["x"] -= 1
        tail["y"] += 1
    # below and to the left
    elif head["y"] < tail["y"] and head["x"] < tail["x"]:
        tail["x"] -= 1
        tail["y"] -= 1
    # below and to the right
    elif head["y"] < tail["y"] and head["x"] > tail["x"]:
        tail["x"] += 1
        tail["y"] -= 1
    return tail


for direction in directions:
    d, move = direction.split()
    for i in range(int(move)):
        if d == "U":
            head["y"] += 1
        elif d == "R":
            head["x"] += 1
        elif d == "D":
            head["y"] -= 1
        elif d == "L":
            head["x"] -= 1

        move_tail(head, tail)
        if (tail["x"], tail["y"]) not in visited:
            visited.append((tail["x"], tail["y"]))

print("Rope Bridge Part 1:", len(visited))

