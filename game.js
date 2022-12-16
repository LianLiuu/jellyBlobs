function launchEnemy(){
    var sides = ["top","left","bottom","right"];
    // instantiate new enemy
    enemy = new Enemy();
    // set side randomly
    enemy.setSide(random.arrayElt(sides));
    // append Enemy to game
    enemy.addToGame('body');
    // start animation for enemy
    enemy.start();
}

var intervalID;

// function that start the game
function startGame() {
    // empty the page
    $("#intro").empty();
    // spawn enemies
    intervalID = setInterval(launchEnemy, 1000);
    // connect mouse to Player blob
    $(document).on('mousemove', function (evt) {
        thePlayer.move(evt.clientX, evt.clientY);
    });
}

//function called in Player class when game is ended
function stopGame(result){
    // stop spawning new enemies
    clearInterval(intervalID);
    // stop existing enemies
    $(".circle").stop();
    // create DOM element with result message
    $message = $('<div>', {'id': "winOrLose"}).text(result);
    // append message to the page
    $("#intro").append($message);
}

$("#start").click(startGame);