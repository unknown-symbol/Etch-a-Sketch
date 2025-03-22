var canDraw = false;
var colorTool = "Solid";

const colorButtons = document.querySelectorAll(".color-tool");

colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    colorTool = button.textContent;

    let previous = document.querySelector(".checked") || false;

    if (document.querySelector(".checked")) {
      previous.classList -= " checked";
    }

    button.classList += " checked";
  });
});

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

    gridElement.style.background = "rgb(255, 255, 255)";

    document.addEventListener("mousedown", (e) => {
      e.preventDefault(); // Affects the entire document
      if (e.button === 0) {
        canDraw = true;
      }
    });

    document.addEventListener("mouseup", () => {
      canDraw = false;
    });

    window.addEventListener("blur", () => {
      isMouseDown = false;
    });

    gridElement.addEventListener("mousedown", () => {
      gridElement.style.background = newElementColor(gridElement);
    });

    gridElement.addEventListener("mouseover", () => {
      if (canDraw) {
        gridElement.style.background = newElementColor(gridElement);
      }
    });

    return gridElement;
  }

  for (size > 0; size--; ) {
    gridContainer.appendChild(createElement());
  }
}

function clearGrid() {
  const gridElements = document.querySelectorAll(".grid-element");

  gridElements.forEach((element) => {
    element.style.background = "rgb(255, 255, 255)";
  });
}

function newElementColor(element) {
  const currentColor = element.style.background
    .replace("rgb(", "")
    .replace(")", "")
    .split(", ");

  let newColor = [];

  switch (colorTool) {
    case "Darker":
      currentColor.forEach((color) => newColor.push(+color - 20));
      return `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;
    case "Lighter":
      currentColor.forEach((color) => newColor.push(+color + 20));
      return `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;
    case "Rainbow":
      for (let i = 0; i < 3; i++) {
        newColor[i] = Math.random() * 220 + 35;
      }
      return `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;
    default:
      return "rgb(0, 0, 0)";
  }
}

createGrid();
