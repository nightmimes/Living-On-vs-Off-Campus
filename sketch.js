const colorNames = ['rgb(212, 123, 80)', 'rgb(207, 149, 114)']; // creates array of pie colors
const hoverColorNames = ['rgb(214, 96, 36)', 'rgb(224, 111, 40)']; // creates array of pie colors if hovered
let segments = [9250, 42550]; // array of the size of each pie piece
let angles;

/* PIE TWO */
const colorUhdNames = ['rgb(207, 131, 101)', 'rgb(212, 123, 80)','rgb(207, 149, 114)' ]; // creates array of uhd housing pie colors
let segmentsUhd = [7000, 2250, 42550]; 
let anglesUhd; 

const radius = 400; 
let centerX, centerY;
let a;
let start = 0;


function setup() {
  createCanvas(600, 500);
  background(219, 201, 162);
  ellipseMode(RADIUS);
  angleMode(DEGREES);
  centerX = 600/2;
  centerY = 500/2;
  a = 0;
  noStroke();
  
  /* assigning variables for PIE ONE */
  let total = segments.reduce((v, s) => v + s, 0); // sums array of 'segments' and reduces values to be representated by 'v'
  angles = segments.map(v => v/total * 360); // maps out each value 'v' in order to calculate the degree value to find angles
  colors = colorNames.map(n => color(n)); // maps out each color value in 'colorNames' array
  hoverColors = hoverColorNames.map(m => color(m)); // maps out each hover color values in 'hoverColorNames' array

  /* assigning variables for PIE TWO */
  let totalUhd = segmentsUhd.reduce((vUhd, sUhd) => vUhd + sUhd, 0); // sums array of 'segments' and reduces values to be representated by 'vUhd'
  anglesUhd = segmentsUhd.map(vUhd => vUhd / totalUhd * 360); 
  colorsUhd = colorUhdNames.map(nUhd => color(nUhd)); // maps out each color value in 'colorUhdNames' array 
}


function draw() {
background(219, 201, 162);
  
push();
  let scaleFactor = 0.5;
  scale(scaleFactor);
  
  // PIE ONE Title
  fill(214, 96, 36);
  textSize(60);
  stroke(168, 74, 50);
  strokeWeight(6);
  text('UT', 28, 70);
  
  fill(168, 74, 50);
  textSize(45);
  noStroke();
  text('Students Living in', 120, 70);
  
  fill(212, 123, 80);
  textSize(60);
  stroke(168, 74, 50);
  strokeWeight(4);
  text('UHD', 465, 70);
  
  fill(168, 74, 50);
  textSize(30);
  noStroke();
  text('*', 595, 50);
  
  fill(168, 74, 50);
  textSize(45);
  noStroke();
  text('vs.', 620, 70);
  
  fill(207, 149, 114);
  textSize(60);
  stroke(168, 74, 50);
  strokeWeight(4);
  text('Off-Campus', 685, 70);
     
  fill(168, 74, 50);
  textSize(45);
  noStroke();
  text('Housing', 1000, 70);
       
  fill(168, 74, 50);
  textSize(50);
  noStroke();
  text('(2019)', 520, 970);
  
  fill(212, 123, 80);
  textSize(30);
  noStroke();
  text('*University (-owned) Housing & Dining', 705, 110);
  
  
// defining variables for arc bounds
  let start = 0; 
  let mouseAngle = atan2(mouseY - centerY, mouseX - centerX); // recenter at origin to calculate angle between mouse coords and origin 
  
  if(mouseAngle < 0){ // add 360 if negative values are returned
  mouseAngle += 360;
  }
  
  let mouseDist = dist(600/2, 500/2, mouseX, mouseY); // find distance beteen circle center and mouse coords
  
  for(let p = 0; p < angles.length; p++){ 
    let uhdHousing = 9250/51800 * 360; // University housing angle value calculation
    let offCampus = 42550/51800 * 360; // off campus housing angle value calculation
    let dorms = 7000/51800 * 360; // living in dorms angle value calculation
    let uhdApts = 2250/51800 * 360; // living in University apartments calculation
    
    let hoverOffCampus = mouseDist < 200 && mouseAngle >= uhdHousing && mouseAngle < angles[p] + offCampus // constrains the area of 'offCampus' arc
    
    let hoverUhdHousing = mouseDist < 200 && mouseAngle >= start && mouseAngle < start + uhdHousing; // constrains the area of 'uhdHousing' arc
    
    let hover = mouseDist < 200 && mouseAngle >= start && mouseAngle < start + angles[p]; // constrains entire circle area

    noStroke();
  if(hover && hoverOffCampus === true){ // change color to hover color if hovering over entire circle AND offCampus arc
    fill(224, 111, 40);
    textSize(50);
    stroke(168, 74, 50);
    strokeWeight(4);
    push();
    translate(205, 350);
    rotate(300);
    text('82.14%', 0, 0);
    pop();
    
    stroke(168, 74, 50);
    strokeWeight(6);
    fill(hoverColors[p]);
  } else if(hover && hoverUhdHousing === true){ // change color to hover color if hovering over entire circle AND student arc
    fill(214, 96, 36);
    textSize(50);
    stroke(168, 74, 50);
    strokeWeight(4);
    push();
    translate(930, 810);
    rotate(305);
    text('17.86%', 0, 0);
    pop();
    
    stroke(168, 74, 50);
    strokeWeight(6);
    fill(hoverColors[p]);
    }
   else { // fill default 'colorNames' colors if not hovering any specific arc (outside of the circle) 
  fill(207, 149, 114);
  textSize(60);
  noStroke();
  text('Off-Campus', 20, 170);
     
  fill(212, 123, 80);
  textSize(60);
  noStroke();
  text('UHD', 1010, 640);
     
  fill(colors[p]);
  }
  arc(600, 500, radius, radius, start, start + angles[p]); // creates arcs using 'angles' values, beginning at start (0) with x,y coords at the circle center and radius (400)
    
  start += angles[p]; // start at each iteration of 'angles' values
  }
    pop();
}