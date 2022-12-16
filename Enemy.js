var minDiameter = 5;                   // random size >= this
var maxDiameter = window.innerWidth/4; // random size <= this
var enemyDuration = 5000;              // time to cross the document

class Enemy extends Blob {

    collideBefore = false;
    // side which Enemy enters the screen
    side;
    
    constructor () {
        var color = random.color();
        var diameter = random.intBetween(minDiameter, maxDiameter);
        //only generate diameter that are even number to avoid decimals
        while (diameter % 2 == 1){
            diameter = random.intBetween(minDiameter, maxDiameter);
        }
        super(color,diameter);
    }

    collide () {
        // check for history of collision
        if (this.collideBefore != true) {
            // call the collide method from Player class
            thePlayer.collide(this);
            this.collideBefore = true;
        }
    }
    // retrieve the location of enemy blob and update the x and y of Enemy
    updateLocation () {
        // retrieve and parse the left and top
        var x = this.$blob.css("left");
        var y = this.$blob.css("top");
        x = this.radius + parseInt(x, 10);
        y = this.radius + parseInt(y, 10);
        // update x and y
        this.setX(x);
        this.setY(y);
    }

    //checks for a collision
    maybeCollide () {
        this.updateLocation();
        if (this.collideBefore != true) {
            if (this.intersects(thePlayer)) {
                this.collide();
            }
        }
    }

    // set x y based on side which enemy enters the screen
    setSide(side) {
        this.side = side;
        // random X value but set Y value to 0 or windowHeight
        if (side=="top"||side=="bottom"){
            this.setX(random.intBetween(0,window.innerWidth));
            if (side=="bottom"){
                this.setY(window.innerHeight);
            }else{
                this.setY(0);
            }
        }
        // random Y value but set X value to 0 or window Width
        if (side=="left"||side=="right"){
            this.setY(random.intBetween(0,window.innerHeight));
            if (side=="right"){
                this.setX(window.innerWidth);
            }else{
                this.setX(0);
            }
        }
    }
    // stop animation and remove Enemy from screen
    remove () {
        this.$blob.stop();
        this.$blob.remove();
    }
    // start the animation of Enemy
    start () {
        if (this.side=="top"){
            // animate from top move to bottom
            this.$blob.animate({top:window.innerHeight + this.diameter}, 
                                {duration:enemyDuration,
                                progress: () => {
                                    this.updateLocation();
                                    this.maybeCollide();
                                },
                                complete: () => {
                                    this.remove();
                                },});
        }
        if (this.side=="bottom"){
            this.$blob.animate({top:0 - this.diameter}, 
                                {duration:enemyDuration,
                                 progress: () => {
                                 this.updateLocation();
                                 this.maybeCollide();
                                },
                                complete: () => {
                                    this.remove();
                                },});
        }
        if (this.side =="left"){
            this.$blob.animate({left:window.innerWidth + this.diameter}, 
                                {duration:enemyDuration,
                                progress: () => {
                                    this.updateLocation();
                                    this.maybeCollide();
                                },
                                complete: () => {
                                    this.remove();
                                },});
        }
        if (this.side=="right"){
            this.$blob.animate({left:0 - this.diameter}, 
                                {duration:enemyDuration,
                                progress: () => {
                                    this.updateLocation();
                                    this.maybeCollide();
                                },
                                complete: () => {
                                    this.remove();
                                },});
        }
    }
  }