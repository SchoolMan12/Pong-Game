var interval;
const canvas = document.getElementById("PongCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 20;
const gridSize = canvas.width / tileSize;

let player1 = { x: 20, y: 250, width: 15, height: 100 };
let player2 = { x: 565, y: 250, width: 15, height: 100 };
let running = false;
let ball = { x: 300, y: 300, size: 15, ballspeed: 1, direction: 0 };
let score1 = 0;
let score2 = 0;

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
        // Check collision with Player 1's paddle
        if ((ball.x <= player1.x + player1.width) && (ball.y >= player1.y && ball.y <= player1.y + player1.height)) {
            ball.direction = Math.random() * (150 - 30) + 30; // Random angle between 30° and 150°
        }

        // Check collision with Player 2's paddle
        if ((ball.x + ball.size >= player2.x) && (ball.y >= player2.y && ball.y <= player2.y + player2.height)) {
            ball.direction = Math.random() * (330 - 210) + 210; // Random angle between 210° and 330°
        }

        // Check collision with top or bottom wall
        if (ball.y <= 0 || ball.y + ball.size >= canvas.height) {
            ball.direction = 360 - ball.direction; // Reflect the angle vertically
        }

        // Check if the ball hits the left wall (Player 1 loses)
        if (ball.x <= 0) {
            running = false;
            var points2 = document.getElementById("points2");
            score2= score2++;

            // LOGAN FIX THIS I AM DUMB - tr 
            points1.innerHTML = document.writeln(score2);
        }

        // Check if the ball hits the right wall (Player 2 loses)
        if (ball.x >= canvas.width) {
            running = false;
            var points1 = document.getElementById("points1");
            points1.innerHTML = score1++;
        }

        // Calculate new ball position
        var radians = ball.direction * Math.PI / 180;
        var x = Math.cos(radians) * ball.ballspeed;
        var y = Math.sin(radians) * ball.ballspeed;

        ball.x += x;
        ball.y += y;

        // Update ball display
        ctx.fillStyle = "lightblue";
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    // Update debug output
    var output = document.getElementById("output");
    output.innerHTML = JSON.stringify(ball);
    var p1 = document.getElementById("player1");
    p1.innerHTML = JSON.stringify(player1);
    var p2 = document.getElementById("player2");
    p2.innerHTML = JSON.stringify(player2);
}

function updateGame() {
    drawBoard();
    moveball();
    Player1();
    Player2();
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "w":
            const test = player1.y - 4;
            if (test <= 0) return;
            ctx.clearRect(player1.x, player1.y, player1.width, player1.height);
            player1.y -= 10;

            break;
        case "s":
            const tests = player1.y + 4;
            if (tests >= 500) return;
            ctx.clearRect(player1.x, player1.y, player1.width, player1.height);
            player1.y += 10;

            break;
    }
    Player1();
});

drawBoard();
Player1();
interval = setInterval(updateGame, 10);