let symmetry = 6; // Number of symmetries (change as needed)
let angle = 360 / symmetry;
let saveButton, clearButton;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  background(0); // Set the background to black

  saveButton = createButton('Save Image');
  saveButton.position(10, height + 10);
  saveButton.mousePressed(saveKaleidoscope);

  clearButton = createButton('Clear');
  clearButton.position(80, height + 10);
  clearButton.mousePressed(clearCanvas);

  strokeWeight(4);
}

function draw() {
  translate(width / 2, height / 2);
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    if (mouseIsPressed) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        let d = dist(mx, my, pmx, pmy);
        let sw = map(d, 0, 16, 4, 1);

        // Map the stroke color based on the mouse position
        let strokeColor = color(map(mouseX, 0, width, 0, 255),
                                 map(mouseY, 0, height, 0, 255),
                                 map(d, 0, 16, 0, 255));
        stroke(strokeColor);

        strokeWeight(sw);
        line(mx, my, pmx, pmy);
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
}

function saveKaleidoscope() {
  save('kaleidoscope.png');
}

function clearCanvas() {
  background(0); // Set the background back to black when clearing
}