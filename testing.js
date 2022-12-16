var testBlob;
var testElt;
var testField;

var directProps = 'left,top,width,height,background-color'.split(',');

function testDOM() {
    testBlob = new Blob('green',100);
    let b = testBlob;
    testElt = testBlob.getDOM();
    let e = testElt;
    console.log('your DIV: ',e);
    // we are assuming they will use jQuery to create their divs
    if( !(e instanceof jQuery) ) {
        throw 'DOM element is not a jQuery object';
    }
    let x = e[0];
    if( x.tagName != "DIV" ) throw 'DOM element is not a DIV';
    if( ! e.hasClass('circle') ) throw 'DOM element is not a DIV.circle';
    // These should be inherited properties, but this works in Firefox:
    console.log('checking (inherited) properties');
    console.log('position: ',e.css('position'));
    for( let p of 'top-left,top-right,bottom-left,bottom-right'.split(',') ) {
        console.log(`border-${p}-radius: `,e.css(`border-${p}-radius`));
    }
    console.log('here are all the direct CSS properties');
    for ( let p of directProps ) {
        console.log(p,': ',e.css(p));
    }
}

function testCalculations() {
    let dim = 100;
    let color = 'green';
    testBlob = new Blob(color,dim);
    let b = testBlob;
    testElt = testBlob.getDOM();
    let e = testElt;

    console.log('testing getDiameter');
    let px = dim+'px';
    if( b.getDiameter() != dim ) throw `getDiameter did not return ${dim}`;
    if( e.css('width') != px ) throw `DOM elt is not width of ${px}`;
    if( e.css('height') != px ) throw `DOM elt is not height of ${px}`;

    console.log('testing setDiameter');
    dim = 200;
    px = dim+'px';
    console.log(`setting dim to ${dim}`);
    b.setDiameter(dim);
    if( b.getDiameter() != dim ) throw `getDiameter did not return ${dim}`;
    if( e.css('width') != px ) throw `DOM elt is not width of ${px}`;
    if( e.css('height') != px ) throw `DOM elt is not height of ${px}`;

    /*
      // commented out, because chrome changes color values to RGB
    console.log('testing getColor');
    if( b.getColor() != color ) throw `getColor did not return ${color}`;
    if( e.css('background-color') != color ) throw `DOM elt background-color is not ${color}`;
    
    console.log('testing setColor');
    color = 'red';
    b.setColor(color);
    if( b.getColor() != color ) throw `getColor did not return ${color}`;
    if( e.css('background-color') != color ) throw `DOM elt background-color is not ${color}`;
    */
    
    console.log('testing setX');
    let val = 200;
    let cssVal = (val-dim/2)+'px';
    b.setX(val);
    if( b.getX() != val ) throw `getX did not return ${val}`;
    if( e.css('left') != cssVal ) throw `DOM elt left is not ${cssVal}`;

    console.log('testing setY');
    b.setY(val);
    if( b.getY() != val ) throw `getY did not return ${val}`;
    if( e.css('top') != cssVal ) throw `DOM elt top is not ${cssVal}`;

    console.log('testing setRadius');
    dim = 200;
    px = (2*dim)+'px';
    console.log(`setting radius to ${dim}`);
    b.setRadius(dim);
    if( b.getRadius() != dim ) throw `getRadius did not return ${dim}`;
    if( b.getDiameter() != 2*dim ) throw `getDiameter did not return ${2*dim}`;
    if( e.css('width') != px ) throw `DOM elt is not width of ${px}`;
    if( e.css('height') != px ) throw `DOM elt is not height of ${px}`;

    console.log('looks good!');
}

function makeTestField() {
    $("body").empty();
    $("#testfield").remove();
    testField = $("<div>")
        .attr('id','testfield')
        .css({'width':'100px',
              'height':'100px',
              'border':'2px solid red',
              'position':'relative'})
        .appendTo('body');
}

function testBlobDisplay1() {
    makeTestField()
    testBlob = new Blob('green',100);
    testBlob.setX(50);
    testBlob.setY(50);
    testBlob.addToGame(testField);
    console.log("does the green blob fit snugly in the red box?");
}

function testBlobDisplay2() {
    makeTestField()
    testBlob = new Blob('green',50);
    testBlob.setX(50);
    testBlob.setY(50);
    testBlob.addToGame(testField);
    console.log("is the green blob in the center of the red box?");
}

function testBlobDisplay3() {
    makeTestField()
    testBlob = new Blob('green',10);
    testBlob.setX(50);
    testBlob.setY(50);
    testBlob.setRadius(50);
    testBlob.addToGame(testField);
    console.log("if setRadius works, the green blob fits snugly in the red box");
}

function testBlobDisplay4() {
    makeTestField()
    testBlob = new Blob('green',10);
    testBlob.setX(50);
    testBlob.setY(50);
    testBlob.setRadius(50);
    if(testBlob.getDiameter() != 100) {
        console.log("setRadius and getDiameter don't seem to work");
        return;
    }
    testBlob.setDiameter(100);
    if(testBlob.getRadius() != 50) {
        console.log("setDiameter and getRadius don't seem to work");
        return;
    }
    testBlob.addToGame(testField);
    console.log('get/set radius/diameter seem to work');
}

function testBlobDisplay5() {
    makeTestField()
    testBlob = new Blob('green',20);
    testBlob.setX(90);
    testBlob.setY(90);
    testBlob.addToGame(testField);
    console.log("if setX/setY work, the green blob touches the lower and right edges of the red box");
}

function testIntersect(dx,dy) {
    // This test has two blobs of radius 100 and a 120,160,200
    // triangle between their centers, so their centers are
    // 200 px apart and they should be just tangent. The second
    // blob is perturbed by (dx,dy)
    $("body").empty();

    // these are global on purpose, so you can play with them afterward.
    b1 = new Blob("red",200);   // radius of 100
    b2 = new Blob("green",200);

    b1.setX(100);
    b1.setY(100);
    b1.addToGame("body");

    b2.setX(100+120+dx);
    b2.setY(100+160+dy);
    b2.addToGame("body");

    console.log("b1 intersects b2? ",b1.intersects(b2));
    console.log("b2 intersects b1? ",b2.intersects(b1));
}

function testIntersect1() { testIntersect(0,0); }  // just tangent
function testIntersect2() { testIntersect(1,0); }  // barely non-tangent
function testIntersect3() { testIntersect(0,1); }  // barely non-tangent
function testIntersect4() { testIntersect(0,-1); } // barely intersecting
function testIntersect5() { testIntersect(-1,0); } // barely intersecting

// End of code to test Blobs
// ================================================================


// A function to print the coordinates of a test blob (in global variable blob17)
// as it moves across the screen. 

function testProgress() {
    $(".circle").remove();      // remove any prior blobs
    testBlob = new Enemy();
    testBlob.setX(100);
    testBlob.setY(100);
    $(testBlob.elt)
        .animate({ left: 500 },
                 { duration: 3000,
                   progress: function () {
                       testBlob.updateLocation();
                       console.log("x is now ",testBlob.getX());
                 }});                                  
}

// This function creates a player of a given size, creates one enemy, and starts it.
// A simple way to test a bit of game play.

function testGame(size) {
    thePlayer = new Player("blue",size);
    thePlayer.addToGame("body");
    e1 = new Enemy();
    e1.addToGame("body");
    e1.start();
}
