// thanks to thibpat for the help with this one https://www.youtube.com/watch?v=TFuAwv9-b88
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const { getFileContents } = require('../shared');

const fileContents = getFileContents(filePath);

const lines = fileContents
    .split('\n\n')
    .filter(l => l)
    .map(l => {
        return l.replace(/[\n ,]+/g, " ").trim().split(" ").map(l => parseInt(l));
    });

const [ drawnNumbers, ...boards ] = lines;

class Board {
    constructor(boardNumbers) {
        this.cardSize = 5;
        this.boardNumbers = boardNumbers;
        this.numberToPosition = new Map();
        this.rows = new Array(this.cardSize).fill(0);
        this.columns = new Array(this.cardSize).fill(0);
        this.isComplete = false;
        this.markedNumbers = new Set();
        for(let i = 0; i < this.boardNumbers.length; i++) {
            let n = this.boardNumbers[i];
            this.numberToPosition.set(n, {
                row: Math.floor(i / this.cardSize),
                column: i % this.cardSize
            } );
        }
    }

    addMarkedNumber(number) {
        let position = this.numberToPosition.get(number);
        if (!position) {
            return;
        }

        this.markedNumbers.add(number);
        this.rows[position.row]++;
        this.columns[position.column]++;
        if (
            this.rows[position.row] == this.cardSize ||
            this.columns[position.column] == this.cardSize
        ) {
            this.isComplete = true;
        }
    }

    unmarkedNumbers() {
        return this.boardNumbers.filter( n => !this.markedNumbers.has(n));
    }
}

function playGame1(_boards) {
    let boards = _boards.map( board => new Board(board));

    let winningBoard;
    const drawn = [];
    for (const drawnNumber of drawnNumbers ) {
        let complete = false;
        drawn.push(drawnNumber);
        for (const board of boards ) {
            board.addMarkedNumber(drawnNumber);
            if (board.isComplete) {
                complete = true;
                winningBoard = board;
                break;
            }
        }
        if (complete) {
            break;
        }
    }

    const unmarkedNumbers = winningBoard.unmarkedNumbers();

    const sumOfUnmarkedNums = unmarkedNumbers.reduce( (acc, curr) => {
        return acc + curr;
    }, 0);

    const lastDrawnNumber = drawn.slice(-1);

    return sumOfUnmarkedNums * lastDrawnNumber;
}

function playGame2(_boards) {
    let boards = _boards.map( board => new Board(board));

    let lastWinningBoard;
    let lastWinningNumber;
    let drawn = [];
    for(const drawnNumber of drawnNumbers) {
        drawn.push(drawnNumber);
        let hasIncompleteBoards = false;
        for(board of boards) {
            if (!board.isComplete) {
                hasIncompleteBoards = true;
                board.addMarkedNumber(drawnNumber);

                if(board.isComplete) {
                    lastWinningNumber = drawnNumber;
                    lastWinningBoard = board;
                }
            }
        }

        if(!hasIncompleteBoards) {
            break;
        }
    }

    let unmarkedNumbers = lastWinningBoard.unmarkedNumbers();
    let sumOfUnmarkedNums = unmarkedNumbers.reduce((acc, curr) => {
        return acc + curr;
    }, 0)

    return sumOfUnmarkedNums * lastWinningNumber;

}

console.log(`Giant Squid Bingo Part 1: ${ playGame1(boards)}`);
console.log(`Giant Squid Bingo Part 2: ${ playGame2(boards)}`);


