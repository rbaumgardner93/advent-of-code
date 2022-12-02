input = open("input.txt", "r")
data = input.read()
games = data.splitlines()
input.close()

scoreMap = {
    "LOSE": 0,
    "DRAW": 3,
    "WIN": 6
}

themMap = {
    "A": {
        "X": {
            "res": "DRAW",
            "val": 1
        },
        "Y": {
            "res": "WIN",
            "val": 2
        },
        "Z": {
            "res": "LOSE",
            "val": 3
        }
    },
    "B": {
        "X": {
            "res": "LOSE",
            "val": 1
        },
        "Y": {
            "res": "DRAW",
            "val": 2
        },
        "Z": {
            "res": "WIN",
            "val": 3
        }
    },
    "C": {
        "X": {
            "res": "WIN",
            "val": 1
        },
        "Y": {
            "res": "LOSE",
            "val": 2
        },
        "Z": {
            "res": "DRAW",
            "val": 3
        }
    }
}

def rockPaperScissorsGame1():
    total = 0

    for game in games:
        them, us = game.split()
        result = themMap[them][us]

        total += result["val"] + scoreMap[ result["res"] ]

    return total

resultMap = {
    "X": "LOSE",
    "Y": "DRAW",
    "Z": "WIN"
}

playMap = {
    "LOSE": {
        "A": "Z",
        "B": "X",
        "C": "Y"
    },
    "DRAW": {
        "A": "X",
        "B": "Y",
        "C": "Z"
    },
    "WIN": {
        "A": "Y",
        "B": "Z",
        "C": "X"
    }
}

scores = {
    "X": 1,
    "Y": 2,
    "Z": 3
}

def rockPaperScissorsGame2():
    total = 0

    for game in games:
        them, us = game.split()
        result = resultMap[us]
        play = playMap[result][them]
        score = scores[play]

        total += scoreMap[result] + score

    return total

print( "Rock Paper Scissors Part 1:", rockPaperScissorsGame1() )
print( "Rock Paper Scissors Part 2:", rockPaperScissorsGame2() )

