import "./styles.css";

var board, activePlayer, mark;

if (document.readyState !== "loading") {
  console.log("Document ready. Starting program..");
  initialize();
} else {
  console.log("Document not ready, waiting..");
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Document ready after a wait. Starting program..");
    initialize();
  });
}

function markTableCell(cell) {
  console.log(cell);
  var index = cell.id;
  var rowIndex = cell.id.split("-")[0];
  var colIndex = cell.id.split("-")[1];
  var markNode;

  // Tarkistetaan, onko solu tyhjä
  if (board[rowIndex][colIndex] === undefined) {
    // Lisätään pelaajan merkki valittuun soluun
    board[rowIndex][colIndex] = mark;
    markNode = document.createTextNode(mark);
    document.getElementById(index).appendChild(markNode);
    // Tarkistetaan pelitilanne
    checkBoard(rowIndex, colIndex);
    // Vaihdetaan pelivuoro
    changePlayer();
  }
}

function generateBoard(sideLength) {
  var newRow, newCol;
  board = [];
  var table = document.getElementById("board");

  // Tyhjennetään taulukko tarvittaessa
  while (table.lastChild) table.removeChild(table.lastChild);

  // Lisätään rivit
  for (var i = 0; i < sideLength; i++) {
    board[i] = [];
    newRow = document.createElement("tr");

    // Lisätään sarakkeet/solut
    for (var j = 0; j < sideLength; j++) {
      //board[i + "-" + j] = undefined;
      board[i][j] = undefined;
      newCol = document.createElement("td");
      newCol.setAttribute("id", i + "-" + j);
      newCol.style.border = "thin solid";
      newCol.style.width = (100 / sideLength).toString() + "%";
      newCol.style.height = (100 / sideLength).toString() + "%";
      newCol.style.textAlign = "center";
      newCol.onclick = function () {
        markTableCell(this);
      };
      newRow.appendChild(newCol);
    }

    table.appendChild(newRow);
    table.style.borderCollapse = "collapse";
    table.style.width = (sideLength * 40).toString() + "px";
    table.style.height = (sideLength * 40).toString() + "px";
  }
}

function checkBoard(rowIndex, colIndex) {
  var sideLength = board[0].length;
  var score, scoreX1, scoreX2;

  // Tarkistetaan rivi
  score = 0;
  for (var i = 0; i < sideLength; i++) {
    if (board[i][colIndex] === mark) score++;
  }
  if (score === sideLength) endGame();

  // Tarkistetaan sarake
  score = 0;
  for (var j = 0; j < sideLength; j++) {
    if (board[rowIndex][j] === mark) score++;
  }
  if (score === sideLength) endGame();

  // Tarkistetaan poikittaisrivit
  scoreX1 = scoreX2 = 0;
  for (var k = 0; k < sideLength; k++) {
    if (board[k][k] === mark) scoreX1++;
    if (board[k][sideLength - (k + 1)] === mark) scoreX2++;
  }
  if (scoreX1 === sideLength || scoreX2 === sideLength) endGame();
}

function changePlayer() {
  activePlayer = activePlayer === 1 ? 2 : 1;
  // Valitaan merkki vuorossa olevan pelaajan mukaan
  mark = activePlayer === 1 ? "X" : "O";
}

function endGame() {
  alert("Player " + activePlayer + " won!");
  initialize();
}

function initialize() {
  generateBoard(5);
  activePlayer = 1;
  mark = "X";
}
