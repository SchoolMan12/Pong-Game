const canvas = document.getElementById("PongCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 20;
const gridSize = canvas.width / tileSize;

let snake = [{ x: 5, y: 5 }];

function drawPaddle() {
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });
}

function updateGame() {
    if (isrunning == false) return;
    drawBoard();
    drawPaddle();
    checkCollisions();

}