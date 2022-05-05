// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Constraint = Matter.Constraint;

var engine = Engine.create();
engine.enableSleeping = true;

var world = engine.world;

// create a renderer
// var render = Render.create({
//   element: document.body,
//   engine: engine
// });

var ground,
  wall_l,
  wall_r,
  wall_top;
var circles = [];
var p1,
  p2;
var constraints = [];
var shapes = [];


function setup() {
  // createCanvas(window.innerWidth, window.innerHeight);
  createCanvas(windowWidth, windowHeight);
  var wallWid = 100;

  ground = Bodies.rectangle(width / 2, height + wallWid / 2, width, wallWid, { isStatic: true });
  wall_l = Bodies.rectangle(0 - wallWid / 2, height / 2, wallWid, height, { isStatic: true });
  wall_r = Bodies.rectangle(width + wallWid / 2, height / 2, wallWid, height, { isStatic: true });
  wall_top = Bodies.rectangle(width / 2, 0 - wallWid / 2, width, wallWid, { isStatic: true });
  // add all of the bodies to the world
  Composite.add(world, [ground, wall_l, wall_r, wall_top]);
  
  //create runner and run the engine
  var runner = Runner.create();
  Runner.run(runner, engine);
  // Render.run(render);

  engine.gravity.y = -0.5;
}

function draw() {
  // background('#fae');
  background('#2A1976');

  for (var i = 0; i < shapes.length; i++) {
    shapes[i].show();
  }
}

function mousePressed() {
  var color1 = color(252, map(mouseX, 0, width, 120, 200), 102);//random color for softbody1
  var color2 = color(map(mouseX, 0, width, 80, 200), 184, 255);//random color for softbody2

  //pick a random shapes from softbody1, softbody2 and circle
  var sequence = [1, 2, 3, 4, 5, 6];
  shuffle(sequence, true);
  var current = sequence[0];

  if (current == 1) {
    shapes.push(new Softbody1(mouseX, mouseY, 0.5, 0.1, color1));
  }
  else if (current == 2) {
    shapes.push(new Softbody1(mouseX, mouseY, 0.5, 0.1, color1));
  }
  else if (current == 3) {
    shapes.push(new Softbody1(mouseX, mouseY, 0.5, 0.1, color1));
  }
  else if (current == 4) {
    shapes.push(new Particle(mouseX, mouseY, 40));
  }
  else if (current == 5) {
    shapes.push(new Softbody2(mouseX, mouseY, 0.8, 0.08, 0.1, color2));
  }
  else if (current == 5) {
    shapes.push(new Softbody2(mouseX, mouseY, 0.8, 0.08, 0.1, color2));
  }
}

function keyPressed() {
  var color1 = color(252, map(mouseX, 0, width, 120, 200), 102);
  var color2 = color(map(mouseX, 0, width, 80, 200), 184, 255);//random color for softbody2

  if (keyCode === UP_ARROW) {
    // fill(random(200, 255), random(140, 150), 60);
    shapes.push(new Softbody1(mouseX, mouseY, 1, 0.2, color1));
  } if (keyCode === DOWN_ARROW) {
    shapes.push(new Softbody2(mouseX, mouseY, 1, 0.2, 0.1, color2));
  }
}