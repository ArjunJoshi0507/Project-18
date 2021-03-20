var backImage,backgr
var monkey,monkey_running;
var ground,ground_img;

var foodGroup,banana_img;
var obstaclesGroup,obstacle_img;
  
var gameOver;
var score = 0;


function preload(){
  monkey_running =
loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backImage = loadImage("jungle.jpg");
  
  bananaImage = loadImage("banana.png")
  obstacleimg = loadImage("stone.png")
}


function setup() {
  createCanvas(400, 400);
  
  backgr = createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width/2;
  backgr.velocityX = -4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background("white");
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
if(backgr.x<100){
  backgr.x = backgr.width/2;
}
  
if(foodGroup.isTouching(monkey)){
  foodGroup.destroyEach();
  score = score + 2;
}  
  
switch(score){
    case 10: monkey.scale = 0.12;
      break;
        
    case 20: monkey.scale = 0.14;
      break;
        
    case 30: monkey.scale = 0.16;
      break;
        
    case 40: monkey.scale = 0.18;
      break;
        
    default: break;
} 
  
if(keyDown("space")){
  monkey.velocityY = -12
}
  
monkey.velocityY = monkey.velocityY + 0.8;
  
monkey.collide(ground);
  
spawnfood();  
spawnobstacles();
  
if(obstaclesGroup.isTouching(monkey)){
  monkey.scale = 0.2;
}  
  
 drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
}

function spawnfood(){
  
  if(frameCount % 80 === 0){
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200)
    banana.addImage(bananaImage);
    banana.scale = 0.05
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    foodGroup.add(banana);
  }
}

function spawnobstacles(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}