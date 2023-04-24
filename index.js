
const inquirer = require("inquirer");

const fs = require("fs");

const { Triangle, Square, Circle } = require("./lib/shapes.js");

// Function writes the SVG file 
function writeToFile(fileName, answers) {
  // Empty string
  let svgString = "";
  // Width and height of logo container
  svgString =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  
  svgString += "<g>";
 
  svgString += `${answers.shape}`;
// this is a conditional that takes the user choices and adds them to the polygonal array
  let shapeChoice;
  if (answers.shape === "Triangle") {
    shapeChoice = new Triangle();
    svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
  } else if (answers.shape === "Square") {
    shapeChoice = new Square();
    svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
  } else {
    shapeChoice = new Circle();
    svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
  }

 
  svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  // Closing </g> tag
  svgString += "</g>";
  
  svgString += "</svg>";

  
  fs.writeFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}


function promptUser() {
  inquirer
    .prompt([
      // Text prompt
      {
        type: "input",
        message:
          "What text would you like you logo to display?  Three characters only!",
        name: "text",
      },
      // Text color prompt
      {
        type: "input",
        message:
          "Choose text color. Use either color name or hexidecimal #",
        name: "textColor",
      },
      // Shape choice prompt
      {
        type: "list",
        message: "What shape would you like the logo to render?",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape",
      },
      // Shape color prompt
      {
        type: "input",
        message:
          "Choose shapes bacground color. Use either color name or hexidecimal #", 
        name: "shapeBackgroundColor",
      },
    ])
    .then((answers) => {
      
      if (answers.text.length > 3) {
        console.log("Must enter a value of 3 characters");
        promptUser();
      } else {
        // Calling write file function to generate SVG file
        writeToFile("output/logo.svg", answers);
      }
    });
}

// Calling promptUser function 
promptUser();
