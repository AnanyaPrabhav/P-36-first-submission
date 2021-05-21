//Create variables here
var dog, happyDog, database, foodS, foodStock, lastFed, feedTime, foodObj;
var gameState, readState;
var garden, bedroom, washroom;
function preload()
{
	//load images here
  garden = loadImage("images/Garden.png");
  bedroom = loadImage("images/Living Room.png");
  washroom = loadImage("images/Wash Room.png");

  Dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(450, 250, 10, 10);
  dog.addImage(Dog);
  dog.scale = 0.15;

  database = firebase.database();

  readState = database.ref('gameState');
  readState.on('value', function(data){
    gameState = data.val();
  })

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the Dog");
  feed.position(550,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(675, 95);
  addFood.mousePressed(addFoods);

  foodObj = new Food;
}


function draw() {  

  //background(46, 139, 87);

  currentTime = hour();
  if(currentTime === (lastFed+1)){
    update("playing");
    foodObj.garden();
  }else if(currentTime === (lastFed+2)){
    update("sleeping");
    foodObj.bedroom();
  } else if(currentTime > (lastFed+2) && currentTime <= (lastFed+4)){
    update("bathing");
    foodObj.washroom();
  } else {
    update("hungry");
    foodObj.display();
  }

  if(gameState !== "hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  } else {
    feed.show();
    addFood.show();
    dog.addImage(Dog);
  }

  drawSprites();
  foodObj.display();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food : foodObj.getFoodStock(),
  FeedTime : hour(),
  gameState : "hungry"
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState: state
  });
}
