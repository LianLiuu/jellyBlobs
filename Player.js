var winningDiameter = window.innerHeight/2; // bigger than this wins
var losingDiameter = 5;                     // smaller than this loses
var growDiameter = 20;                      // grow by this many pixels
var shrinkDiameter = 5;

class Player extends Blob {

    constructor (color, diameter) {
        super(color, diameter);
    }
    // set x y to new values
    move (x,y) {
        this.setX (x);
        this.setY (y);
        return this;
    }
    // grow diameter by given growDiameter
    grow () {
        this.setDiameter (this.diameter + growDiameter);
        // call stopGame() when diameter at winningDiameter
        if (this.diameter >= winningDiameter){
            stopGame("Yay, you won!");
        }
    }
    // shrink diameter by given shrinkDiameter
    shrink () {
        this.setDiameter (this.diameter - shrinkDiameter);
        // call stopGame() when diameter at losingDiameter
        if (this.diameter <= losingDiameter){
            stopGame("Boo, you lost...");
        }
    }
    // call shrink  or grow when Player collided with Enemy
    collide (enemy) {
        if (enemy.diameter > this.diameter) {
            this.shrink();
        }else{
            this.grow();
            enemy.remove();
        }
    }
}

// create Player as a global variable 
var thePlayer = new Player('blue', 30);
thePlayer.setY(window.innerHeight/2);
thePlayer.setX(window.innerWidth/2);