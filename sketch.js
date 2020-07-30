//Monkey Go-Happy Game

//Global Variables
var monkey, ground, banana, obstacle, invisibleGround
var foodGroup, obstacleGroup
var monkey_running
var bananaImage, obstacleImage
var score

function preload(){
  backImage = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_01.png");
  
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
}


function setup() {
  createCanvas(600,300);
  
  ground = createSprite(60,30,100,50);  ground.addImage("ground",backImage);
  ground.velocityX = -2
  ground.x = ground.width/2;
  
  
  monkey = createSprite(60,250,1,5);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1
  
  invisibleGround = createSprite(200,260,400,10);
  invisibleGround.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0
  

}

function spawnFood(){
  if(World.frameCount % 100 === 0){
  
   banana = createSprite(200,100,100,50);
   banana.addImage("banana",bananaImage);
   banana.scale = 0.05
   banana.velocityX = -2
   banana.lifetime = 300;
   foodGroup.add(banana);
  }
}
function spawnObstacle(){
  if(World.frameCount % 130 === 0){
  
   obstacle = createSprite(300,250,150,50);
   obstacle.addImage("stone",obstacleImage);
   obstacle.scale = 0.1
   obstacle.velocityX = -2
   obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);
  }
}


function draw(){
 background("green"); 
 
  
  
   if (ground.x < -10){
    ground.x = ground.width/2;
  }
 
  if(keyDown("space")) {
    monkey.velocityY = -10
  } 
  monkey.velocityY = monkey.velocityY + 0.8;
    
  monkey.collide(invisibleGround);
  
  if(foodGroup.isTouching(monkey)){
    //banana.scale = 0.000000001
    banana.destroy()
    score = score + 2 
     
  }
  
  switch(score){
    case 10: monkey.scale = 0.14
      break; 
    case 20: monkey.scale = 0.16
      break;
    case 30: monkey.scale = 0.18
      break; 
    case 40: monkey.scale = 0.20
      break;   
    case 50: monkey.scale = 0.22
      break;   
      default: break;
  }
  
  
   //monkey.setCollider("circle",0,0,30);
  if(obstacleGroup.isTouching(monkey)){
   monkey.scale = 0.09
   score = 0  
  }
 
  spawnFood();
 spawnObstacle(); 
  
  drawSprites(); 
  
  stroke("white")
  textSize(20)
  fill("white")
  text("Score: "+ score, 500,50)


}
