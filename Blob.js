function ok(val) {
    if( typeof val === 'undefined' ) {
        throw new Error('value not defined');
    } else {
        return val;
    }
}

// create DOM element and save in $blob
function setDOM() {
    $blob = $('<div>', {
        'class' : 'circle',
    });
    return $blob;
}

class Blob {
    // instance variables
    color;
    diameter;
    radius;
    x;
    y;
    $blob;
    
    constructor (color, diameter) {
        // instantiate color
        this.$blob = setDOM()
        this.color = color;
        this.$blob.css("background-color",color);
        // instatiate x and y to 0
        this.x=0;
        this.y=0;
        // instatiate diameter
        this.diameter = diameter;
        this.radius = diameter/2;
        this.$blob.css("width", diameter);
        this.$blob.css("height",diameter);
        this.$blob.css("top",this.y-diameter/2);
        this.$blob.css("left",this.x-diameter/2);
        // append element to DOM
        $("body").append(this.$blob);
    }

    // adds blob to a container
    addToGame (container) {
        $(container).append(this.$blob);
    }

    // set color to param
    setColor (color) {
        this.color = color;
        this.$blob.css("background-color",color);
    }

    getColor () {
        return this.color;
    }
    getDOM () {
        return this.$blob;
    }

    getX () {
        return this.x;
    }
    getY () {
        return this.y;
    }

    setX (x) {
        this.x = x;
        this.$blob.css("left",this.x-this.radius);
    }

    setY (y) {
        this.y = y;
        this.$blob.css("top",this.y-this.radius);
    }

    getDiameter() {
        return this.diameter;
    }

    getRadius () {
        return this.radius;
    }
    
    // set new Diameter for DOM element
    setDiameter (d) {
        this.diameter = d;
        this.radius = d/2;
        this.$blob.css("width",d);
        this.$blob.css("height",d);
        this.$blob.css("top",this.y-this.radius);
        this.$blob.css("left",this.x-this.radius);
    }

    // set new radius for DOM element
    setRadius (r) {
        this.radius = r;
        this.diameter = 2*r;
        this.$blob.css("width",r*2);
        this.$blob.css("height",r*2);
        this.$blob.css("top",this.y-r);
        this.$blob.css("left",this.x-r);
    }

    intersects (other) {
        // four uses of the 'ok' function to make sure all values are defined
        var dx = ok(this.getX()) - ok(other.getX());
        var dy = ok(this.getY()) - ok(other.getY());
        var distance_squared = (dx * dx + dy * dy);

        var r1 = this.getRadius();
        var r2 = other.getRadius();
        var rsum = r1+r2;
        var isCloser = (distance_squared <= rsum*rsum);
        return isCloser;
    }

    location() {
        let x = this.getX();
        let y = this.getY();
        let left = parseInt(this.getDOM().css('left'),10);
        let top = parseInt(this.getDOM().css('top'),10);
        let r = this.getRadius();
        let xok = (left+r==x) ? "X OK" : "X WRONG";
        let yok = (top+r==y) ? "Y OK" : "Y WRONG";
        return `radius ${r} center (${x},${y}) w/ DOM elt (${left},${top}): ${xok}, ${yok}`;
    }
}