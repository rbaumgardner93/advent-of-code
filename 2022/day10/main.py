file = open("test.input", "r")
data = file.read()
instructions = data.splitlines()
file.close()
#
# strength, cycle, x = 0, 0, 1
#
# def calculate_strength(cycle, x):
#     return cycle * x if cycle in (20, 60, 100, 140, 180, 220) else 0
#
# for instruction in instructions:
#     cycle += 1
#     strength += calculate_strength(cycle, x)
#
#     if "addx" in instruction:
#         _, val = instruction.split()
#         cycle += 1
#         strength += calculate_strength(cycle, x)
#         x += int(val)
#
# print(strength)

cycle, x = 0, 1
pixels = [ [ "." for _ in range( 40 ) ] for _ in range( 6 ) ]
height = len(pixels) - 1
width = len(pixels[0]) - 1
def draw(cycle, x):
    # check out of bounds
    # col = cycle // 40
    # row = cycle % 40
    #
    # if row < 0 or row >= height or col < 0 or col >= width:
    #     return
    #
    # pixels[col][row] = "#"
    if x - 1 <= cycle % 40 <= x + 1:
        pixels[cycle // 40][ cycle % 40 ] = "#"

for instruction in instructions:
    draw(cycle, x)
    cycle += 1

    if "addx" in instruction:
        _, val = instruction.split()
        draw(cycle, x)
        cycle += 1
        x += int(val)

print("\n".join("".join(row) for row in pixels))
