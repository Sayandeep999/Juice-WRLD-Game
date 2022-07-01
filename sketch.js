 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;

 var juice, juice_running, juice_jumping;
 var scene, invisibleGround, sceneImage;

 var ghostGroup, ghost1, ghost2;

 var score;
 var gameOverImg,restartImg
 var jumpSound , checkPointSound, dieSound

 function preload(){
   juice_running = loadAnimation("juice_1.png","juice_2.png");
   juice_jumping = loadAnimation("juice_jump.png");
  
   sceneImage = loadImage("background.JPG");
  
   ghost1 = loadImage("ghost_1.png");
   ghost2 = loadImage("ghost_2.png");
  
//   restartImg = loadImage("restart.png");
//   gameOverImg = loadImage("gameOver.png");

//   jumpSound = loadSound("jump.mp3");
//   dieSound = loadSound("die.mp3");
//   checkPointSound = loadSound("checkPoint.mp3");
 }

 function setup() {
   createCanvas(windowWidth,windowHeight);

   scene = createSprite(width/2,height/2,width,height);
   scene.addImage(sceneImage);
   scene.scale = 3;
  
   juice = createSprite(180,height-150,20,50);
   juice.addAnimation("running", juice_running);
   juice.addAnimation("jumping",juice_jumping);
  
   juice.scale = 0.2;
  
   invisibleGround = createSprite(width/2,height- 40,width,10);
   invisibleGround.visible = true;
  
   ghostGroup = createGroup();

//   juice.setCollider("rectangle",0,0,1200,juice.height);
//   juice.debug = true;
  
//   score = 0;
  
 }

 function draw() {
  
  background("red");

//   if(gameState === PLAY){

//    score = score + Math.round(getFrameRate()/60);
    
//     if(score>0 && score%100 === 0){
//        checkPointSound.play() 
//     }
    scene.velocityX = -5
     if (scene.x < 150){
       scene.x = width;
     }
    
     console.log(juice.y)

     if(keyDown("space")) {
         juice.velocityY = -12;
         juice.changeAnimation("jumping",juice_jumping);
//         jumpSound.play();
     }

     if(juice.isTouching(invisibleGround)){
      juice.changeAnimation("running",juice_running);
     }
    
     juice.velocityY = juice.velocityY + 0.8
  
     spawnGhost();
    
     if(ghostGroup.isTouching(juice)){
       gameState = END;
//       dieSound.play()
      
     }
//   } 
//    else if (gameState === END) {

//       scene.velocityX = 0;
//       juice.velocityY = 0

//     ghostGroup.setLifetimeEach(-1);
     
//     ghostGroup.setVelocityXEach(0);
 
   juice.collide(invisibleGround);

   drawSprites();
//   text("Score: "+ score, 500,50);
 }

 function spawnGhost(){
   if (frameCount % 60 === 0){
     var ghost = createSprite(width,height-150,10,40);
     ghost.velocityX = -(6 + score/100);
   
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: ghost.addImage(ghost1);
               break;
       case 2: ghost.addImage(ghost2);
               break;
     }

     ghost.scale = 0.5;
     ghost.lifetime = 300;

     ghostGroup.add(ghost);
    }
   }
// }