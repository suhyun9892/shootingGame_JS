// setting of canvas

let canvas;
let ctx;
canvas = document.createElement('canvas')
ctx = canvas.getContext("2d")
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas)

let backgroundImage, spaceshipImage, enemyImage, bulletImage, gameoverImage;

// 우주선 좌표
let spaceshipX = canvas.width/2 - 32
let spaceshipY = canvas.height - 64

function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src="images/background.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src="images/spaceship.png";

    enemyImage = new Image();
    enemyImage.src="images/enemy.png";

    bulletImage = new Image();
    bulletImage.src="images/bullet.png";

    gameoverImage = new Image();
    gameoverImage.src="images/gameover.jpg";
}

let keysDown={}
function setupKeyboardListeners() {
    document.addEventListener("keydown", function(event){
        keysDown[event.keyCode] = true;
        console.log("keydown", event.keyCode)
    })
    document.addEventListener("keyup", function(){
        delete keysDown[event.keyCode]
        console.log("keyup", event.keyCode)
    })
}

function update() {
    if(39 in keysDown){
        spaceshipX += 5; // speed of spaceship
    }
    if(37 in keysDown){
        spaceshipX -= 5;
    }
    if(spaceshipX <= 0){
        spaceshipX = 0;
    }
    if(spaceshipX >= canvas.width - 64){
        spaceshipX = canvas.width - 64
    }
}

function render() {
    // drawImage(image, x, y, width, height)
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

function main() {
    update()
    render();
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListeners()
main();