let board = document.querySelector('#board');
let restartButton = document.querySelector('#restartButton');
let gameOverrr = document.querySelector('#gameOver');
let ScoreNum = document.querySelector('#scorenumber');

let boxsize = 20;
let rows = 20;
let col = 20;
let context;

let snackX = boxsize * 5;
let snackY = boxsize * 5;
let gameover = false;

let snack = [];
snack[0] = { x: snackX, y: snackY };

let foodx;
let foody;
board.height = rows * boxsize;
board.width = col * boxsize;
context = board.getContext('2d');

let speedX = 0;
let speedY = 0;
placefood();

function drawSnack() {
    snack.forEach((element, index) => {
        if (index === 0) {
            context.fillStyle = 'lime';
            context.beginPath();
            context.arc(element.x + boxsize / 2, element.y + boxsize / 2, boxsize / 2, 0, Math.PI * 2);
            context.fill();
        } else {
            context.fillStyle = 'lime';
            context.fillRect(element.x, element.y, boxsize, boxsize);
        }
    });
}


function drawFood() {
    context.fillStyle = 'red';
    context.fillRect(foodx, foody, boxsize, boxsize);
}

function placefood() {
    foodx = Math.floor(Math.random() * col) * boxsize;
    foody = Math.floor(Math.random() * rows) * boxsize;
}

window.onload = function () {
    document.addEventListener('keydown', ArrowHandler);
    setInterval(update, 1000 / 10);
    restartButton.addEventListener('click', restart);
}

function ArrowHandler(e) {
    if (e.code == "ArrowUp" && speedY == 0) {
        speedX = 0;
        speedY = -1;
    } else if (e.code == "ArrowDown" && speedY == 0) {
        speedX = 0;
        speedY = 1;
    } else if (e.code == "ArrowRight" && speedX == 0) {
        speedX = 1;
        speedY = 0;
    } else if (e.code == "ArrowLeft" && speedX == 0) {
        speedX = -1;
        speedY = 0;
    }
}

function eat() {
    if (snackX == foodx && snackY == foody) {
        placefood();
        snack.push({ x: snackX, y: snackY });
        ScoreNum.innerHTML = snack.length -1;
    }
}

function checkGameOver() {
    if (snackX < 0 || snackX >= col * boxsize || snackY < 0 || snackY >= rows * boxsize) {
        gameover = true;
        gameOverrr.style.display = "block";
    }
    for (let i = 1; i < snack.length; i++) {
        if (snackX == snack[i].x && snackY == snack[i].y) {
            gameover = true;
            alert("Game Over");
        }
    }
}

function restart() {
    snackX = boxsize * 5;
    snackY = boxsize * 5;
    speedX = 0;
    speedY = 0;
    snack = [{ x: snackX, y: snackY }];
    placefood();
    gameover = false;
    gameOverrr.style.display = "none";
    ScoreNum.innerHTML = 0;
}

function update() {
    if (gameover) return;

    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height);

    snackX += speedX * boxsize;
    snackY += speedY * boxsize;

    checkGameOver();
    if (gameover) return;

    snack.unshift({ x: snackX, y: snackY });
    snack.pop();

    drawFood();
    drawSnack();
    eat();
}
