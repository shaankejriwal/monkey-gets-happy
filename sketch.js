var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,ground,invisibleGround;
var monkey_stop;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_stop = loadAnimation("monkeycrying.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("stop",monkey_stop);
  monkey.scale = 0.1;
  
  ground = createSprite(200,200,1600,10);
  ground.shapeColor = "brown";
  ground.x = ground.width/2;
  
  score = 0;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  background("red");
  text("score: " + score,500,50);
  
  if(gameState === PLAY){
    
    ground.velocityX = -4;
    
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&&monkey.y >= 150){
      monkey.velocityY = -15;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
    
    spawnFood();
    spawnObstacle();
    
    if(foodGroup.isTouching(monkey)){
      score = score+2;
      foodGroup.destroyEach();
    }
    
    if(obstacleGroup.isTouching(monkey)){
      monkey.changeAnimation("stop",monkey_stop);
      monkey.scale = 0.1;
      gameState = END;   
    }
    
  } 
  else if(gameState === END){
      
    ground.velocityX =0;
    monkey.velocityY = 0;
    
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
  
  }
  
  monkey.collide(ground);
  
  drawSprites();
  
}

function spawnFood(){
  if (frameCount % 80 === 0) {
    banana = createSprite(300,130,15,15);
    banana.addImage("banana.png",bananaImage);
    banana.velocityX = -4;
  
    
  banana.scale = 0.1;
  banana.lifetime = 200;
  
  foodGroup.add(banana);
  }
  
}

function spawnObstacle(){
  if (frameCount % 80 === 0) {
    obstacle = createSprite(200,180,20,20);
    obstacle.addImage("obstacle.png",obstacleImage);
    obstacle.velocityX = -4;
  
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
  
    obstacleGroup.add(obstacle);
  }
  
}


