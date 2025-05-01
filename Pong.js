var interval;
const canvas = document.getElementById("PongCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 20;
const gridSize = canvas.width / tileSize;

let player1 = { x: 20, y: 250, width: 15, height: 100 };
let player2 = { x: 565, y: 250, width: 15, height: 100 };
let running = false;
let ball = { x: 300, y: 300, size: 15, ballspeed: 1, direction: 0 }
// move ballspeed into the ball
//let ballspeed = 6;
// move direction into the ball
//let direction = "right";
// find all ballspeed replace with ball.ballspeed
// find all direction replace with ball.direction

//let ball = {
  //  x: 300,
    //y: 300,
    //size: 15,
    //dx: 6,  // horizontal speed
   // dy: 4   // vertical speed
//};

function begingame() {
    running = true;
    ball.x = 300;
    ball.y = 300;
    ball.direction = 0;
}

function drawBoard() {
    ctx.strokeStyle = "#dddddd";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            ctx.strokeRect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
    }
}

function Player1() {
    ctx.fillStyle = "green";
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
}

function Player2() {
    ctx.fillStyle = "chartreuse";
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}
function moveball() {
    if (running) {
        //The ball object has a .x and a .y 
        //player 1 has an x, y, height, and width  
        //is ball hitting paddle of player 1
        if ((ball.x <= player1.x + player1.width) && (ball.y >= player1.y && ball.y <= player1.height + player1.y)){
            //change direction
            //ball.direction = 0;
            ball.direction = Math.random() * 360;
        }

        //is ball hitting paddle of player 2
    if (ball.x >= 565){ball.direction = 180;
        //change direction
    }



        // is ball hitting the left wall
    if (ball.y >= 600 || ball.y <= 0){
        ball.direction = Math.random() * 360;
    }



        // is ball hitting the right wall






        // is ball hitting the top






        // is ball hitting the bottom

        if (ball.x <= 0) {
            running = false; 
            var points1 = document.getElementById("points1");
            points1.innerHTML = "Lose";
        }


    var radians = ball.direction * Math.PI / 180;
    var x = Math.cos (radians) * ball.ballspeed;
    var y = Math.sin (radians) * ball.ballspeed;

    //move ball
    ball.x += x;
    ball.y += y;
        // if (ball.direction == "right") {
        //     const test = ball.x + ball.ballspeed;
        //     if (test <= player2.x)
        //         ball.x += ball.ballspeed;
        //     else ball.direction = "left";

        //     //ctx.clearRect( ball.x, ball.y, ball.size, ball.size);
        // }
        // else if (ball.direction == "left") {
        //     const test = ball.x - ball.ballspeed;
        //     if (test >= player1.x)
        //         ball.x -= ball.ballspeed;
        //     else ball.direction = "right"
        // }
    }
    
   var output = document.getElementById("output");
   // instead of "garbage", use JSON.stringify(ball);
    output.innerHTML = JSON.stringify(ball);
    var p1 = document.getElementById("player1");
    p1.innerHTML = JSON.stringify(player1);

    var p2 = document.getElementById("player2");
    p2.innerHTML = JSON.stringify(player2);

    ctx.fillStyle = "lightblue";
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}
function updateGame() {
    drawBoard();
    moveball();
    Player1();
    Player2();
    //if (isrunning == false) return;
    //drawBoard();
    //drawPaddle();
    //checkCollisions();

}
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            const test = player1.y - 4;
            if (test <= 0) return;
            ctx.clearRect(player1.x, player1.y, player1.width, player1.height);
            player1.y -= 4;

            break;
        case "ArrowDown":
            const tests = player1.y + 4;
            if (tests >= 500) return;
            ctx.clearRect(player1.x, player1.y, player1.width, player1.height);
            player1.y += 4;

            break;
    }
    Player1();
});
drawBoard();
Player1();
interval = setInterval(updateGame, 10); 
