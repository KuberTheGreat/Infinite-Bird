// variable section
var bird, bird_image;
var cloud, cloud_image, blueCloud_image, greyCloud_image;
var obstacle, plane_image, plane2_image, chopper_image;

var apple, apple_image;

var cloud_group, obstacle_group, apple_group;

var score = 0;

var gameState = "play";

// function to load images, animations, sounds etc.
function preload() {
  // animation for the player (optional)
  bird_image = loadImage("bird.gif");

  apple_image = loadImage("apple3.jpg");
  
  // images for the clouds
  cloud_image = loadImage("cloud.png");
  blueCloud_image = loadImage("blue-cloud.png");
  greyCloud_image = loadImage("grey-cloud.png");

  // images for the obstacles
  plane_image = loadImage("plane1.png");
  plane2_image = loadImage("plane2.png");
  chopper_image = loadImage("chopper1.png");
}

// function to setup 
function setup() {
  createCanvas(600, 600);

  // bird sprite (player)
  bird = createSprite(100, 50, 20, 20);
  bird.addImage(bird_image);
  bird.scale = 0.3;

  // creating new groups
  cloud_group = new Group();
  obstacle_group = new Group();
  apple_group = new Group();
}

function draw() {
  background(255);

  // setting the collider of the bird
  bird.setCollider("rectangle", 0, 0, 280, 230);
  bird.debug = false;

  // if the game state is playing
  if (gameState === "play") {
    // if the player is wanting to fly
    if (keyDown("space")) {
      bird.velocityY = -7;
    }

    // giving gravity to the bird
    bird.velocityY = bird.velocityY + 0.8;

    // if the obstacle group is touching obstacles or falling down or going too high
    if (obstacle_group.isTouching(bird) || bird.y > 650 || bird.y < -50) {
      // bird gets destroyed and game state changes to end
      bird.destroy();
      gameState = "end";
    }
    
    // if the bird eats the apple, the score increases
    if(apple_group.isTouching(bird)){
      apple_group.destroyEach();
      
      score = score + 1;
    }
    
    // spawns obstacles and clouds in the play state
    spawnApples();
    spawnObstacles();
    spawnClouds();
    drawSprites();
    
    // prints the score on the screen
    textSize(20);
    text("score: " + score, 250, 50);
  } 
  // else if game state is end
  else if (gameState === "end") {
    background(51);

    // prints game over on the background
    textSize(50);
    strokeWeight(4);
    stroke(242, 235, 35);
    fill(242, 69, 35);
    text("Game Over", 170, 300);
    text("score: " + score, 200, 400);
  }
}

// function to spawn clouds
function spawnClouds() {
  // creates after every 200 frames
  if (frameCount % 150 === 0) {
    // creates the cloud sprite
    cloud = createSprite(600, 200, 20, 20);
    // increasing velocity gradually
    cloud.velocityX = -(1 + frameCount / 500);
    cloud.scale = 0.13;
    cloud.lifetime = 700;

    // randomly setting the cloud position of the cloud
    cloud.y = Math.round(random(50, 550));

    // random number for cloud images
    var rand = Math.round(random(1, 3));

    // switch statement for cloud images
    switch (rand) {
      case 1:
        cloud.addImage(cloud_image);
        break;
      case 2:
        cloud.addImage(blueCloud_image);
        break;
      case 3:
        cloud.addImage(greyCloud_image);
        break;
      default:
        break;
    }
    // adds cloud to the cloud group
    cloud_group.add(cloud);
  }
}

// function to create obstacles
function spawnObstacles() {
  // after every 350 frames
  if (frameCount % 250 === 0) {
    // creates the obstacle sprite
    obstacle = createSprite(600, 200, 20, 20);
    // increases the velocity gradually
    obstacle.velocityX = -(1 + frameCount / 500);
    obstacle.lifetime = 700;

    // random y position for the obstacles
    obstacle.y = Math.round(random(50, 550));

    // random number for images of the obstacles
    var rand = Math.round(random(1, 3));

    // switch statement for images of the obstacles
    switch (rand) {
      case 1:
        obstacle.addImage(plane_image);
        obstacle.scale = 0.6;
        break;
      case 2:
        obstacle.addImage(plane2_image);
        obstacle.scale = 0.2;
        break;
      case 3:
        obstacle.addImage(chopper_image);
        obstacle.scale = 0.1;
        break;
      default:
        break;
    }
    // adds the obstacle to the group
    obstacle_group.add(obstacle);
  }
}

// function to spawn apples
function spawnApples(){
  // after every 300 frames
  if(frameCount % 300 === 0){
    apple = createSprite(600, 200, 20, 20);
    apple.addImage(apple_image);
    apple.velocityX = -(1 + frameCount / 500);
    apple.scale = 0.3;
    apple.lifetime = 700;
    
    apple.y = Math.round(random(50, 550));
    
    apple_group.add(apple);
  }
}
