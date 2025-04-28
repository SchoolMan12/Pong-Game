var interval;
const canvas = document.getElementById("PongCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 20;
const gridSize = canvas.width / tileSize;

let player1 = { x: 20, y: 250, width: 15, height: 100 };
let player2 = { x: 565, y: 250, width: 15, height: 100 };
let running = false;
let ball = { x: 300, y: 300, size: 15 }
let ballspeed = 6
let direction = "right"

function begingame() {
    running = true;
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
        if (direction == "right") {
            const test = ball.x + ballspeed;
            if (test <= player2.x)
                ball.x += ballspeed;
            else direction = "left";

            //ctx.clearRect( ball.x, ball.y, ball.size, ball.size);
        }
        else if (direction == "left") {
            const test = ball.x - ballspeed;
            if (test >= player1.x)
                ball.x -= ballspeed;
            else direction = "right"
        }
    }

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
interval = setInterval(updateGame, 100); 
