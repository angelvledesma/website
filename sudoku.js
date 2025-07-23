const rows = "ABCDEFGHI";

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("keydown", (e) => {
    const currentId = input.id;
    const rowChar = currentId[0];
    const col = parseInt(currentId[1]);

    let row = rows.indexOf(rowChar);
    let newRow = row;
    let newCol = col;

    switch (e.key) {
      case "ArrowUp":
        newRow = row > 0 ? row - 1 : row;
        break;
      case "ArrowDown":
        newRow = row < 8 ? row + 1 : row;
        break;
      case "ArrowLeft":
        newCol = col > 0 ? col - 1 : col;
        break;
      case "ArrowRight":
        newCol = col < 8 ? col + 1 : col;
        break;
      default:
        return; // let other keys behave normally
    }

    const nextId = `${rows[newRow]}${newCol}`;
    const nextInput = document.getElementById(nextId);
    if (nextInput) {
      e.preventDefault(); // prevent cursor from moving within current input
      nextInput.focus();
    }
  });
});

document.querySelectorAll('input').forEach(input => {
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('spellcheck', 'false');
  // Optional for numeric keyboard on mobile
  input.setAttribute('inputmode', 'numeric');
});

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('keydown', (e) => {
    if (e.key === '0') {
      e.preventDefault();
    }
  });
});



let time = 0;
let interval;


function createEmptyBoard() {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

function isSafe(board, row, col, num) {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (board[row][c] === num ) 
        return false;
  }
  // Check column
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) 
        return false;
  }
  // Check 3x3 box
  let boxRowStart = row - (row % 3);
  let boxColStart = col - (col % 3);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[boxRowStart + r][boxColStart + c] === num) 
        return false;
    }
  }
  return true;
}

// Helper to get a randomized array of numbers 1-9
function shuffledNumbers() {
  const nums = [1,2,3,4,5,6,7,8,9];
  for (let i = nums.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  return nums;
}

function generateSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        let nums = shuffledNumbers();
        for (let num of nums) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (generateSudoku(board)) {
              return true;
            }
            board[row][col] = 0; // backtrack
          }
        }
        return false; // no valid number found, backtrack
      }
    }
  }
  return true; // board completely filled
}


function playerBoard(board) {
    let removed = 0;

    while (removed < 46) { // leave 35 clues
        let row = Math.floor(Math.random() * 9); // 0–8
        let col = Math.floor(Math.random() * 9); // 0–8

        if (board[row][col] !== 0) {
            board[row][col] = 0;
            removed++;
        }
    }
}

function fixReadOnly(board) {
    const rows = "ABCDEFGHI";
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const id = `${rows[i]}${j}`;
            const input = document.getElementById(id);
            if (input) {
                input.value = board[i][j];     // or "" if 0
                input.readOnly = board[i][j] !== 0;
            }
        }
    }
}

function applyBoard(board) {
    const rows = "ABCDEFGHI";

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const id = `${rows[i]}${j}`;
            const input = document.getElementById(id);
            if (input) {
                if (board[i][j] == 0)
                    input.value = null;
                else {
                    input.value = board[i][j]; 
                    input.readOnly = board[i][j] !== 0;
                }
            }
        }
    }
}


function isBoardValid(board) {
  // Helper to check for duplicates in a group of 9 numbers
  function noDuplicates(nums) {
    const seen = new Set();
    for (let num of nums) {
      if (num < 1 || num > 9 || seen.has(num)) 
        return false;
      seen.add(num);
    }
    return true;
  }

  // Check rows
  for (let i = 0; i < 9; i++) {
    const row = board[i];
    if (!noDuplicates(row)) 
        return false;
  }

  // Check columns
  for (let col = 0; col < 9; col++) {
    const column = board.map(row => row[col]);
    if (!noDuplicates(column)) 
        return false;
  }

  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const box = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          box.push(board[boxRow * 3 + i][boxCol * 3 + j]);
        }
      }
      if (!noDuplicates(box)) 
        return false;
    }
  }

  return true; // All rows, columns, and boxes are valid
}

function boardCheck(finishedBoard) {
    const rows = "ABCDEFGHI";
    let currentBoard = [];

    for (let i = 0; i < 9; i++) {
        currentBoard[i] = [];  // Initialize row
        for (let j = 0; j < 9; j++) {
            const id = `${rows[i]}${j}`;
            const input = document.getElementById(id);
            if (input) {
                currentBoard[i][j] = parseInt(input.value) || 0;  // Fallback to 0 if empty
            }
        }
    }

    if (isBoardValid(currentBoard)) {
        alert("✅ Valid Sudoku!");
    } 
    
    else {
    alert("❌ Invalid solution.");
}
}


function startTimer() {
  if (!interval) {
    interval = setInterval(() => {
      time++;
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      document.getElementById("timerDisplay").textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}



let finishedBoard = [];

let generateBtn = document.getElementById("generateBoard");
generateBtn.addEventListener("click", function () {
    startTimer();

    let playBoard = [];
    let board = createEmptyBoard();
    fixReadOnly(board);

    generateSudoku(board);
    finishedBoard = board.map(row => [...row]); // deep copy!

    playBoard = playerBoard(board);
    console.table(board);

    applyBoard(board);
});

let checkBtn = document.getElementById("checkBoard");
checkBtn.addEventListener("click", function () {
    boardCheck(finishedBoard);

});

