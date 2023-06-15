
var gameState='play';

var trex,trexRuning,trexColided;
var ground,invisibleGround,groundImage;

var cloudsGroup,cloudImage;
  
var obstaculosGroup,obstaculo1,obstaculo2,obstaculo3,obstaculo4,obstaculo5,obstaculo6;

var pontos=0;
var gameOver;
var restart;


function preload(){
    trexRuning= loadAnimation("trex1.png","trex3.png","trex4.png")
    trexColided= loadAnimation("trex_collided.png")
    
    groundImage= loadImage("ground2.png")
    
    cloudImage= loadImage("cloud.png")
    
    obstaculo1= loadImage("obstacle1.png")
    obstaculo2= loadImage("obstacle2.png")
    obstaculo3= loadImage("obstacle3.png")
    obstaculo4= loadImage("obstacle4.png")
    obstaculo5= loadImage("obstacle5.png")
    obstaculo6= loadImage("obstacle6.png")
    
    gameOverImg=loadImage("gameOver.png")
    restartImg = loadImage("restart.png");

}

function setup(){
    createCanvas(600,200)
    trex=createSprite(50,180,20,50)
    trex.addAnimation("running",trexRuning)
    trex.addAnimation("colided",trexColided)
    trex.scale=0.5;
    
    ground=createSprite(200,180,600,20)
    ground.addImage(groundImage)
    ground.x=ground.width/2
    ground.velocityX=-(6+(pontos/100))
   
    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
  
    restart = createSprite(300,140);
    restart.addImage(restartImg);
  
    gameOver.scale = 0.5;
    restart.scale = 0.5;

    gameOver.visible = false;
    restart.visible = false;

    invisibleGround=createSprite(200,190,400,10)
    invisibleGround.visible=false
   
    cloudsGroup= new Group()
    obstaculosGroup= new Group()

}
function draw(){
    background(255)
    text("pontuaçao: "+pontos,500,50)
    
    if(gameState=='play'){
        pontos=pontos+Math.round(getFrameRate()/60)
        ground.velocityX=-(6+3*pontos/100)
        trex.changeAnimation("running",trexRuning)
      
        if(keyDown("space")&& trex.y>=160){
            trex.velocityY=-12 
        }
        trex.velocityY=trex.velocityY+0.8
        
        if(ground.x<0){
            ground.x=ground.width/2
        }
        trex.collide(invisibleGround)
        nuvens()
        obstaculos()

        if(obstaculosGroup.isTouching(trex)){
             gameState='end'
        }
       
        
    }else if(gameState=='end'){
        gameOver.visible=true
        restart.visible=true

        ground.velocityX=0
        trex.velocityY=0
        obstaculosGroup.setVelocityXEach(0)
        cloudsGroup.setVelocityXEach(0)

        trex.changeAnimation("colided",trexColided)

        obstaculosGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);

        if(mousePressedOver(restart)) {
            reset();
          }
        
    }
    
    drawSprites()

}
function reset(){
    gameState='play'
    gameOver.visible=false
    restart.visible=false
    obstaculosGroup.destroyEach()
    cloudsGroup.destroyEach()
    pontos=0
   

}
function nuvens(){
    if(frameCount%60==0){
        var cloud=createSprite(600,120,40,10)
        cloud.y=Math.round(random(80,120))
        cloud.addImage(cloudImage)
        cloud.scale=0.5
        cloud.velocityX=-3
        cloud.lifetime=200
        
        cloud.depth = trex.depth;
        trex.depth = trex.depth + 1;
        cloudsGroup.add(cloud);
    }
}

function obstaculos(){
    if(frameCount % 60==0){
        var obstaculo=createSprite(600,165,10,40)

        obstaculo.velocityX=-(6+3*pontos/100)
        var numero= Math.round(random(1,6))
        if(numero==1){
            obstaculo.addImage(obstaculo1)
            
        }
        if(numero==2){
            obstaculo.addImage(obstaculo2)
            
        }
        if(numero==3){
            obstaculo.addImage(obstaculo3)
            
        }
        if(numero==4){
            obstaculo.addImage(obstaculo4)
            
        }
        if(numero==5){
            obstaculo.addImage(obstaculo5)
            
        }
        if(numero==6){
            obstaculo.addImage(obstaculo6)
            
        }
        obstaculo.scale=0.5
        obstaculo.lifetime=300
        obstaculosGroup.add(obstaculo)
    }
}
