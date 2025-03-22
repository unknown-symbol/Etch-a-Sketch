# Etch-a-Sketch

Following [The Odin Project](https://www.theodinproject.com/).

An interactive web application that implements a classic mouse-controlled drawing toy.

## Functionality

- The user draws on the grid by swiping the cursor over the cells.

## Some code

```javascript
gridElement.addEventListener("mouseover", () => {
  if (canDraw) {
    gridElement.style.background = "black";
  }
});
```
