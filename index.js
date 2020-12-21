const net = new brain.NeuralNetwork();

//0 - 0% black, 1 - 100% white

//Fill this var with the trained data obtained from print button
const data = [
  { input: { r: 0, g: 0, b: 0 }, output: [1] },
  { input: { r: 1, g: 1, b: 1 }, output: [0] },
];

net.train(data);

/* Can check the diagram of the current ai logic with this
const diagram = document.getElementById("diagram__info");
diagram.innerHTML = brain.utilities.toSVG(net);
*/

//Page elements and buttons
const color = document.getElementById("color");
const guess = document.getElementById("guess");
const white = document.getElementById("white__btn");
const black = document.getElementById("black__btn");
const printBtn = document.getElementById("print__btn");

//Set randomColor var and initialize it
let randomColor;
setRandomColor();

function setRandomColor() {
  randomColor = {
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
  };

  //Send the info to the ai
  const guessAI = net.run(randomColor)[0];
  //Set the colors
  guess.style.color = guessAI > 0.5 ? "#FFF" : "#000";
  color.style.backgroundColor = `rgba(${randomColor.r * 255},${
    randomColor.g * 255
  },${randomColor.b * 255})`;
}

//Training buttons
white.addEventListener("click", () => {
  chooseColor(1);
});
black.addEventListener("click", () => {
  chooseColor(0);
});

//Button print send to the console the data generated in the train session. It needs to copy it manually to the const data
printBtn.addEventListener("click", () => {
  printLog();
});

function printLog() {
  console.log(JSON.stringify(data));
}

//Generate the data from this session
function chooseColor(value) {
  data.push({
    input: randomColor,
    output: [value],
  });
  setRandomColor();
}
