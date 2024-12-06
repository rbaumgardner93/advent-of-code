with open("prod.input", "r") as f:
    grid = [line.strip() for line in f]

part_one_variations = ["XMAS", "SAMX"]
part_two_variations = ["MASMS", "SAMSM", "MASSM", "SAMMS"]

horizontal = ((0, 0), (1, 0), (2, 0), (3, 0))
vertical = ((0, 0), (0, 1), (0, 2), (0, 3))
diagonal = ((0, 0), (1, 1), (2, 2), (3, 3))
rev_diagonal = ((0, 3), (1, 2), (2, 1), (3, 0))
part_one_directions = [
    horizontal,
    vertical,
    diagonal,
    rev_diagonal,
];

part_two_directions = [
    (
        (0, 0), # top left
        (1, 1), # middle
        (2, 2), # bottom right
        (0, 2), # bottom left
        (2, 0), # top right
    )
]

def count_words(x, y, directions, variations):
    count = 0
    for dirs in directions:
        try:
            word = ''.join([grid[y + dirY][x + dirX] for dirX, dirY in dirs])

            if word in variations:
                count += 1
        except:
            continue
    return count



part_one_count = 0
part_two_count = 0
for y in range(len(grid)):
    for x in range(len(grid[0])):
        part_one_count += count_words(x, y, part_one_directions, part_one_variations)
        part_two_count += count_words(x, y, part_two_directions, part_two_variations)

print(f"Part One: {part_one_count}")
print(f"Part Two: {part_two_count}")
