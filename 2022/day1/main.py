input = open("input.txt", "r")
data = input.read()
calories = data.splitlines()
input.close()

calorieArr = []
tmp = 0;

for calorie in calories:
    if not calorie:
        calorieArr.append(tmp)
        tmp = 0
    else:
        tmp += int(calorie);

calorieArr.append(tmp)
calorieArr.sort(reverse=True)

print( "Calorie Counting Part 1:", calorieArr[0] )
print( "Calorie Counting Part 2:",  sum(calorieArr[0:3]))
