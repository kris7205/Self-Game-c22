var path,pikachu;
var pathImg,pikaImg,ashImg;
var gameOverImg;
var car2,car3,car2Img,car3Img;
var car2G,car3G,msound;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, reset;

function preload(){
  pathImg = loadImage("Road.png",);
  pikaImg = loadAnimation("pika2.png","pika3.png");
  ashImg = loadImage("pika6.png");
  car2Img = loadImage("car-2.png");
  car3Img = loadImage("car5.png");
  gameOverImg = loadImage("gameOver.png");
  msound = loadSound("elley-duhe-middle-of-the-night-lyrics - yoruyorsun (1).mp3")
} 

function setup(){
  
createCanvas(1200,300);
msound.loop();
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
pikachu = createSprite(70,150);
pikachu.addAnimation("pikaRunning",pikaImg);
pikachu.scale=0.2;
  

pikachu.setCollider("rectangle",0,0,40,40,50);

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
car2G = new Group ();
car3G = new Group();

}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   pikachu.y = World.mouseY;
  
   edges= createEdgeSprites();
   pikachu .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }

  spawncar2();
  spawncar3();
  
  var select_car = Math.round(random(1,2))
if (World.frameCount % 150 == 0) {
  if (select_car == 1) {
    spawncar2();
  } else if (select_car == 2) {
    spawncar3();
  } 
}

if(car2G.isTouching(pikachu)){
 car2G.destroyEach();
  gameState=END;
}

if(car3G.isTouching(pikachu)){
  car3G.destroyEach();
  gameState=END;
}
  
  
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Space to Restart the game!", 500,200);
  
    path.velocityX = 0;
    pikachu.velocityY = 0;
    
    
 car2G.destroyEach();
 car3G.destroyEach();

 pikachu.addImage("pikaresting",ashImg);
 msound.stop();

     if(keyDown("space")) {
       reset();
     }
}
}

function spawncar3(){
  if(World.frameCount % 80 == 0){
  car3 =createSprite(1100,Math.round(random(50, 130)));
  car3.scale =0.2;
  car3.velocityX = -(6 + 2*distance/150);
  car3.addImage(car3Img);
  car3.setLifetime=170;
  car3G.add(car3);
}
}

function spawncar2(){
  if(World.frameCount % 170 == 0){
  car2 =createSprite(1100,Math.round(random(180, 250)));
  car2.scale =0.33;
  car2.velocityX = -(6 + 2*distance/150);
  car2.addImage(car2Img);
  car2.setLifetime=170;
  car2G.add(car2);
}
}

//function reset
function reset(){
  gameState= PLAY;
  gameOver.visible = false;
  pikachu.addAnimation("pikaRunning",pikaImg);
  car2G.destroyEach();
  car3G.destroyEach();
  msound.loop();
  distance = 0;

 }


