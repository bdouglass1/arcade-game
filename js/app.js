
// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //placeholders for x and y positions 
    this.x = x;
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //set width and height variables 
    this.width = 80;
    this.height = 50;

    //set speed
    this.initialSpeed = 1;
    this.speed = (Math.random() + 1) * this.initialSpeed * 225;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < 500) {
        this.x += this.speed * (dt);
    } else {
        this.x = -200;
    }
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function(x, y) {

    //placeholders for positions
    this.x = x;
    this.y = y;

    //set intitial score
    this.score = 0;

    //load player image
    this.sprite = 'images/char-boy.png';

    //set width and height
    this.width = 80;
    this.height = 50;

    //set up speed
    this.speed = 1;

};

//updates player movement and inceases score by 75 points when river/water is reached
Player.prototype.update = function(dt) {
    if(this.y <= 0) {
        this.reset(202, 405); //resets if water is reached
        this.score += 75;
        document.getElementById("score").innerHTML = this.score;

    if(this.score >= 300) //if score reaches or surpasses 300 then winGame function is called
        winGame();
    }
};

//all squares are the same width and height 
const SQUARE_WIDTH = 101;
const SQUARE_HEIGHT = 83;

//player movement handler depending on which directional arrow is hit
Player.prototype.handleInput = function(direction) {
    if(direction === 'left' && this.x > 0){
        this.x -= SQUARE_WIDTH;
    }
    if(direction === 'right' && this.x < 400) {
        this.x += SQUARE_WIDTH;
    }
    if(direction === 'up' && this.y > 0) {
        this.y -= SQUARE_HEIGHT;
    }
    if(direction === 'down' && this.y < 400) {
        this.y += SQUARE_HEIGHT;
    }
};

//renders player image
Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//new enemies 
const allEnemies = [
    new Enemy(-200, 55, 1),
    new Enemy(-200, 140, 1),
    new Enemy(-200, 225, 1)
];

//new player object 
const player = new Player(202, 405);

//resets player if collison occurs and decreases score by 50
Player.prototype.reset = function(x, y) {
    if (this.y> 0) {
        this.score -= 50; // subtracts from the score 
        document.getElementById('score').innerHTML = this.score;
    }
    this.x = x;
    this.y = y;
};

//check collisions based on intital contact between enemy and player on any side
function checkCollisions(Enemy, player) {
    for (var i = 0; i < Enemy.length; i++) {
        if (Enemy[i].y < player.y + player.height &&
            Enemy[i].height + Enemy[i].y > player.y &&
            Enemy[i].x < player.x + player.width &&
            Enemy[i].x + Enemy[i].width > player.x) {
            player.reset(202, 405);
        }
    }
}  

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//resets the score 
function resetGame() {
    player.score = 0;
    document.getElementById("score").innerHTML = player.score;
}

 //game is won when when score reaches 300
 function winGame()
 {
    displayModal();
 }

 //removes modal when close button is selected 
function removeModal(){
    const modal = document.querySelector('.modal');
    modal.classList.remove("show-modal");
}
 
//displays model if game is won
function displayModal()  {
    const modal = document.querySelector('.modal');
    modal.classList.toggle("show-modal");   //adds class list that displays modal

    const closeButton = document.querySelector('.close-button'); //resets game if close button is selected 
    closeButton.addEventListener("click", removeModal); 
    closeButton.addEventListener("click", resetGame);

}
