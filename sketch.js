const {Engine, World, MouseConstraint, Bodies, Constraint, Mouse} = Matter;

let ground;
let boxes = [];
let bird;
let world, engine;
let mouseConstraint;
let slingshot;

function setup() {
    const canvas = createCanvas(600, 400);
  engine = Matter.Engine.create();
  world = engine.world;
  ground = new Floor(width/2, height-10, width, 20 );
  let y = random(2, 4);
  for(let i=0; i< y; i++) {
  boxes[i] = new Box(400, 300-i*80, 40+random(10, 50), 50+random(20,40) );
  };
  ball = new Ball(150, 300, 25);
  
  slingshot = new Slingshot(150, 300, ball.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
    
  }
  mConstraint = MouseConstraint.create(engine, options);
  mConstraint.mouse.pixelRatio = pixelDensity();
  World.add(world, mConstraint);

  
  var button = createButton("Press for new ball, or ENTER to restart");
  button.mousePressed(newBall);
}
  function newBall(){
    World.remove(world, ball.body);
    ball = new Ball(150, 300, 25);
    slingshot.attach(ball.body);
  }
  
  
  
  
  function resetSketch(){
  const canvas = createCanvas(600, 400);
  engine = Matter.Engine.create();
  world = engine.world;
  ground = new Floor(width/2, height-10, width, 20 );
  let y = random(2, 4);
  for(let i=0; i< y; i++) {
  boxes[i] = new Box(400, 300-i*80, 40+random(10, 50), 50+random(20,40) );
  };
  ball = new Ball(150, 300, 25);
  
  slingshot = new Slingshot(150, 300, ball.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
    
  }
  mConstraint = MouseConstraint.create(engine, options);
  mConstraint.mouse.pixelRatio = pixelDensity();
  World.add(world, mConstraint);
  
  

}

function keyPressed(){
  if (keyCode == ENTER){
    World.remove(world, ball.body);
    ball = new Ball(150, 300, 25);
    slingshot.attach(ball.body);
    resetSketch();
    
  }
}


function mouseReleased(){
     
     setTimeout(()=>{
       slingshot.release();
     },20);
     
   
}
  
function draw() {
  background(0);
  Matter.Engine.update(engine);
  ground.show();
  for(let box of boxes){
    box.show();
  };
  ball.show();
  slingshot.show();
  
}