class Food{
    constructor(){
        this.lastFed;
        this.foodStock = 0;
        this.image = loadImage("images/Milk (1).png");
    }
    updateFoodStock(foodStock){
        this.foodStock = foodStock ;
    }
    getFeedTime(lastFed){
        this.lastFed = lastFed;
    }
    deductFood(){
        if (this.foodStock > 0){
            this.foodStock -= 1;
        }
    }
    getFoodStock(){
        return this.foodStock;
    }
    display(){
        var x = 80, y = 100;
        imageMode(CENTER);
        // image(this.image, 720, 220, 70, 70);
        if (this.foodStock !== 0){
            for (var i = 0; i < this.foodStock; i++){
                if(i%10==0){
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x, y, 50, 50);
                x += 30;
            }
        }
    }
    bedroom(){
        background(bedroom, 550, 500);
    }
    garden(){
        background(garden, 550, 500);
    }
    washroom(){
        background(washroom, 550, 500);
    }
}