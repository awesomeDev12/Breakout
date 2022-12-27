const grid = document.querySelector('.grid');

const gridWidth = 600;
const gridHeight = 300;
const blockWidth = 100;
const blockHeight = 20;
const userWidth = 100;
const userHeight = 20;

const leftBtn = document.querySelector('#left-btn');
const rightBtn = document.querySelector('#right-btn');

const userStart = [gridWidth / 2 - userWidth / 2, 10];
let userPos = userStart;
function drawUser() {
    user.style.left = userPos[0] + 'px';
    user.style.bottom = userPos[1] + 'px';
}
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis - blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis - blockHeight];
    }
}

const blocks = [
    new Block(10, 270),
    new Block(10 + 120, 270),
    new Block(10 + 2 * 120, 270),
    new Block(10 + 3 * 120, 270),
    new Block(10 + 4 * 120, 270),
    new Block(10, 270 - 33),
    new Block(10 + 120, 270 - 33),
    new Block(10 + 2 * 120, 270 - 33),
    new Block(10 + 3 * 120, 270 - 33),
    new Block(10 + 4 * 120, 270 - 33),
];
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}

addBlocks();

const user = document.createElement('div');
user.classList.add('user');
// user.style.left = userStart[0] + 'px';
// user.style.bottom = userStart[1] + 'px';
grid.appendChild(user);
drawUser();

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        // console.log('ArrowLeft');
        moveLeft();
    } else if (e.key === 'ArrowRight') {
        // console.log('ArrowRight');
        moveRight();
    }

    //purely for debugging remove later
    if (e.key == 'k') {
        clearInterval(timerBall);
    }
});

const dash = 15;
const leftEdge = 0;
const rightEdge = gridWidth;
function moveLeft() {
    // console.log('moveLeft');
    if (userPos[0] >= 0 + dash) {
        userPos[0] -= dash;
        drawUser();
    }
}

function moveRight() {
    // console.log('moveRight');
    if (userPos[0] <= rightEdge - userWidth - dash) {
        userPos[0] += dash;
        drawUser();
    }
}

leftBtn.addEventListener('pointerdown', (e) => {
    moveLeft();
});

rightBtn.addEventListener('pointerdown', (e) => {
    moveRight();
});

const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
const ballStart = [30, 30];
const ballPos = ballStart;
const diameter = 10;

function drawBall() {
    ball.style.left = ballPos[0] + 'px';
    ball.style.bottom = ballPos[1] + 'px';
}

drawBall();

let xDir = 2;
let yDir = 2;

function moveBall() {
    console.log(ballPos);

    ballPos[0] += xDir;
    ballPos[1] += yDir;
    drawBall();
    checkForCollisions();

    console.log(ballPos);
}

function checkForCollisions() {
    //check for Wall collisions
    if (ballPos[0] >= gridWidth - diameter) {
        //hits right wall
        xDir = -2;
    } else if (ballPos[1] >= gridHeight - diameter) {
        //hits top wall
        yDir = -2;
    } else if (ballPos[0] <= 0 + diameter) {
        //hits left wall
        xDir = +2;
    } else if (ballPos[1] <= 0 + diameter) {
        //hits bottom wall
        yDir = +2;
        //console.log('Collision');
    }
}

// function changeDirection() {
//for collision with walls
//}
timerBall = setInterval(moveBall, 5);
