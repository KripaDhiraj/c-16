//Game State
var PLAY = 1;
var END = 0;
var gameState =1;

var knife,fruit,monster,fruitGroup,score,r,randomFruit,position;
var knifeImage,fruit1,fruit2,fruit3,fruit4,monsterImage,gameoverImage;
var gameOverSound,knifeSwoosh;

function preload(){

knifeImage=loadImage('knife.png');
monsterImage=loadAnimation('alien1.png','alien2.png')
fruit1=loadImage('fruit1.png');
fruit2=loadImage('fruit2.png');
fruit3=loadImage('fruit3.png');
fruit4=loadImage('fruit4.png');
gameOverImage=loadImage('gameover.png')

gameOverSound=loadSound('gameover.mp3')
knifeSwooshSound=loadSound('knifeSwoosh.mp3')
}



function setup(){
  createCanvas(600,600);

//creating sword
knife=createSprite(40,200,20,20);
knife.addImage(knifeImage);
knife.scale=0.7



//set collider for sword
knife.setCollider('rectangle',0,0,40,40);

//Score variables and Groups
score=0;
fruitGroup=createGroup();
monsterGroup=createGroup();

}

function draw(){
background('lightblue');

if(gameState===Play){

//Call fruits and Monster function
fruis();
monster();

//Move sword with mouse
knife.y=World.mouseY;
knife.x=World.mouseX;

//Increse score if sword touching fruit
if(fruitGroup.isTouching(knife)){
   fruitGroup.destroyEach()

knifeSwooshSound.play()
score=score+2
}
else
{
//Go to end state ifsword touching enemy
if (monsterGroup.isTouching(knife)){
gameState=END;
//gamwover sound
gameOverSound.play()

fruitGroup.destroyEach();
monsterGroup.destroyEach();
fruitGroup.setVelocityXEach(0);
monsterGroup.setVelocityXEach(0);

// Change the animation of sword to gameover and reset its position
knife.addImage(gameOverImage);
knife.scale=2;
knife.x=300;
knife.y=300
}
}
}

drawSprites();
//Display score
textSize(25);
text('Score:'+ score,250,50);
}


function Monster(){
if(World.frameCount%200===0){
monster=createSprite(400,200,20,20)
monster.addAnimation('moving',monsterImage);
monster.y=Math.round(random(100,550));
monster.velocityX=-(8+(score/10));
monster.setLifetime=50;

monsterGroup.add(monster);
}
}

function fruits(){
if(World.frameCount%80===0){
position=Math.round(random(1,2));
fruit=createSprite(400,200,20,20);
console.log(position)
//using random variable change the position of fruit,to make it more challenging

if(position==1)
{
fruit.x=600;
fruit.velocityX=-(7+(score/4));
}
else
{
if(position==2){
  fruit.x=0;

  //Increase the velocity of fruit after score 4 or 10
  fruit.velocityX=(7+(score/4));
}
}

fruit.scale=0.2;
//fruit.debug=true;
r=Math.round(random(1,4));
if(r==1){
fruit.addImage(fruit1);
}else if(r==2){
fruit.addImage(fruit2)
}else if(r==3){
fruit.addImage(fruit3);
}else{
fruit.addImage(fruit4);
}

fruit.y=Math.round(random(50,500));


fruit.setfetime=100

fruitGroup.add(fruit);
}
}
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameoverimage=loadImage("gameOver.png")
  restartimage=loadImage('restart.png')


function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();


  gameover = createSprite(200,100);
  gameover.addImage(gameoverimage)
  gameover.scale=(0.5)
  restart=createSprite(200,150)
  restart.addImage(restartimage)
  restart.scale=(0.2)
  gameover.visible=false
  restart.visible=false
  console.log("Hello" + 5);
  
  trex.setCollider("circle",0,0,40);
  trex.debug = true
  
  score = 0
}

function draw() {
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >=100) {
        trex.velocityY = -13;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      ground.velocityX = 0;trex.changeAnimation("collided" , trex_collided)
      obstaclesGroup.setLifetimeEach(-1)
      cloudsGroup.setLifetimeEach(-1)
      trex.velocityY=0
      gameover.visible=false
  restart.visible=true
     
     obstaclesGroup.setVelocityXEach(0);