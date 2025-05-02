
const canvas = document.getElementById("PongCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 20;
const gridSize = canvas.width / tileSize;
var player1IsMoving, player1Direction, player1PaddleSpeed = 1;

var then, now, elapsed;
var fpsInterval = 1000 / 60;

let player1 = { x: 20, y: 250, width: 15, height: 100 };
let player2 = { x: 565, y: 250, width: 15, height: 100 };
let running = false;
let ball = { x: 300, y: 300, size: 15, ballspeed: 4, direction: 0 };
let score1 = 0;
let score2 = 0;

//This initializes the variables to start a new game
function begingame() {
    running = true;
    ball.x = 300;
    ball.y = 300;
    ball.direction = 0;
    then = window.performance.now();
    startTime = then;
    animate();
}
//This manages the board and clears it
function drawBoard() {
    ctx.strokeStyle = "#dddddd";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            ctx.strokeRect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
    }
}
//This makes the player and what makes it able to move
function Player1() {
    if (player1IsMoving == true) {
        if (player1Direction == "down" && player1.y + player1PaddleSpeed <= 500) {
            player1.y += player1PaddleSpeed;
            player1PaddleSpeed++;
        }
        else if (player1Direction == "up" && player1.y - player1PaddleSpeed >= 0) {
            player1.y -= player1PaddleSpeed;
            player1PaddleSpeed++;
        }
    }

    ctx.fillStyle = "green";
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
}
//This makes player 2 and gives it AI
function Player2() {
    if (ball.y <= player2.y) {
        player2.y -= 2;
    }
    else if (ball.y >= player2.y + player2.height) {
        player2.y += 2;
    }
    ctx.fillStyle = "blue";
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}

var previousBalls = [];
function moveball() {
    if (running) {
        // Check collision with Player 1's paddle
        if ((ball.x <= player1.x + player1.width) && (ball.y >= player1.y && ball.y <= player1.y + player1.height)) {
            var middle = (player1.y + player1.height / 2);
            if (ball.y >= middle) {
                ball.direction = 45;
            } else if (ball.y <= middle) {
                ball.direction = 335;
            }
        }

        // Check collision with Player 2's paddle
        if ((ball.x + ball.size >= player2.x) && (ball.y >= player2.y && ball.y <= player2.y + player2.height)) {
            var middle = (player2.y + player2.height / 2);
            if (ball.y >= middle) {
                ball.direction = 135;
            } else if (ball.y <= middle) {
                ball.direction = 225;
            }
        }

        // Check collision with top or bottom wall
        if (ball.y <= 0 || ball.y + ball.size >= canvas.height) {
            ball.direction = 360 - ball.direction; // Reflect the angle vertically
        }

        // Check if the ball hits the left wall (Player 1 loses)
        if (ball.x <= 0) {
            running = false;
            var p2 = document.getElementById("points2");
            score2++;

            p2.innerHTML = score2;
        }

        // Check if the ball hits the right wall (Player 2 loses)
        if (ball.x >= canvas.width) {
            running = false;
            var points1 = document.getElementById("points1");
            score1++;
            points1.innerHTML = score1;
        }

        // Calculate new ball position
        var radians = ball.direction * Math.PI / 180;
        var x = Math.cos(radians) * ball.ballspeed;
        var y = Math.sin(radians) * ball.ballspeed;

        //draw shadow of the ball
        for (var i = 0; i < previousBalls.length; i++) {
            let previousBall = previousBalls[i];
            ctx.fillStyle = "#80808030";
            ctx.strokeStyle = "#80808030";
            ctx.beginPath();
            ctx.arc(previousBall.x, previousBall.y, previousBall.size + 2, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }

        ball.x += x;
        ball.y += y;

        // Update ball display
        ctx.fillStyle = "lightblue";
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        //ctx.drawImage(flames, ball.x, ball.y, 50, 50);
        previousBalls.push({ x: ball.x, y: ball.y, size: ball.size });
        if (previousBalls.length > 5) {
            previousBalls.shift();
        }
    }
}
//This updates the game
function updateGame() {
    drawBoard();
    moveball();
    Player1();
    Player2();
}
//This is a special fps animation method
function animate() {
    if (!running) return;
    // request another frame
    requestAnimationFrame(animate);

    // calc elapsed time since last loop
    now = window.performance.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);
        updateGame();
    }
}

// create a document event listener that does keyup event
// set player1IsMoving set to false
document.addEventListener("keyup", (event) => {
    player1IsMoving = false;
    player1PaddleSpeed = 1;
});
//This handles the keydown events
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "w":
            player1IsMoving = true;
            player1Direction = "up";
            break;
        case "s":
            player1IsMoving = true;
            player1Direction = "down";
            break;
    }
});

drawBoard();
Player1();