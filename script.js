const DEFAULT_SIZE = 16;
const MAX_SIZE = 100;

const board = document.querySelector("#board");
const resizeButton = document.querySelector("#resize");
const clearButton = document.querySelector("#clear");
const rainbowButton = document.querySelector("#rainbow");
const gridSizeLabel = document.querySelector("#grid-size");

let currentSize = DEFAULT_SIZE;
let rainbowMode = false;

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function paintCell(event) {
  const color = rainbowMode ? randomColor() : "#111827";
  event.target.style.backgroundColor = color;
}

function updateGridSizeLabel() {
  gridSizeLabel.textContent = `Grid: ${currentSize} × ${currentSize}`;
}

function createGrid(size) {
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i += 1) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("mouseenter", paintCell);
    board.appendChild(cell);
  }
}

function clearGrid() {
  const cells = board.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "#ffffff";
  });
}

function resizeGrid() {
  const input = prompt(`Enter grid size (1-${MAX_SIZE}):`, String(currentSize));
  if (input === null) {
    return;
  }

  const parsedSize = Number.parseInt(input, 10);
  if (Number.isNaN(parsedSize) || parsedSize < 1 || parsedSize > MAX_SIZE) {
    alert(`Please enter a whole number between 1 and ${MAX_SIZE}.`);
    return;
  }

  currentSize = parsedSize;
  createGrid(currentSize);
  updateGridSizeLabel();
}

function toggleRainbowMode() {
  rainbowMode = !rainbowMode;
  rainbowButton.setAttribute("aria-pressed", String(rainbowMode));
  rainbowButton.textContent = rainbowMode ? "Rainbow: On" : "Rainbow: Off";
}

resizeButton.addEventListener("click", resizeGrid);
clearButton.addEventListener("click", clearGrid);
rainbowButton.addEventListener("click", toggleRainbowMode);

createGrid(currentSize);
updateGridSizeLabel();
