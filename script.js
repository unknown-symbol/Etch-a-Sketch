var canDraw = false;

function createGrid(size = 32) {
  if (size < 16) size = 16;
  if (size > 100) size = 100;

  const gridContainer = document.querySelector(".grid-container");

  gridContainer.style["grid-template-rows"] = `repeat(${size}, 1fr)`;
  gridContainer.style["grid-template-columns"] = `repeat(${size}, 1fr)`;

  size = size * size;

  function createElement() {
    const gridElement = document.createElement("div");

    gridElement.classList = "grid-element";

    gridElement.addEventListener("mousedown", (e) => {
      e.preventDefault();
      canDraw = true;
    });

    gridElement.addEventListener("mouseup", () => {
      e.preventDefault();
      canDraw = false;
    });

    gridElement.addEventListener("mouseover", () => {
      if (canDraw) {
        gridElement.style.background = "black";
      }
    });

    return gridElement;
  }

  for (size > 0; size--; ) {
    gridContainer.appendChild(createElement());
  }
}

createGrid();
