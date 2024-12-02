input = open("input.txt", "r")
data = input.read()
report_data = data.splitlines()
input.close()

reports = []
for report in report_data:
    reports.append(report.split());

def is_safe(row):
    neg_set = set([-1, -2, -3])
    pos_set = set([1, 2, 3])
    for i in range(len(row) - 1):
        diff = int(row[i + 1]) - int(row[i])
        neg_set.add(diff)
        pos_set.add(diff)

    return len(neg_set) == 3 or len(pos_set) == 3

def part_one():
    safe_count = 0
    for report in reports:
        if is_safe(report):
            safe_count += 1

    return safe_count

def part_two():
    safe_count = 0
    for report in reports:
        if (is_safe(report)):
            safe_count += 1
        else:
            has_errors = True
            for i in range(len(report)):
                if (is_safe(report[:i] + report[i + 1:])):
                    has_errors = False
            if not has_errors:
                safe_count += 1
    return safe_count


print("Part 1:", part_one())
print("Part 2:", part_two())

