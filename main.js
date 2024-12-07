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

let bulletList = [] // 총알 저장 리스트

function Bullet() {
    this.x = 0
    this.y = 0
    this.init = function() {
        this.x = spaceshipX + 20
        this.y = spaceshipY

        bulletList.push(this)
    }
    this.update = function() {
        this.y -= 7
    }
}

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
    })
    document.addEventListener("keyup", function(){
        delete keysDown[event.keyCode]
        if(event.keyCode == 32){
            createBullet() // making bullet function
        }
    })
}

function createBullet() {
    let b = new Bullet()
    b.init()
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

    // 총알 y 좌표 업데이트 하는 함수 호출
    for (let i = 0; i < bulletList.length; i++){
        bulletList[i].update()
    }
}

function render() {
    // drawImage(image, x, y, width, height)
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

    // 총알 그려주기
    for (let i = 0; i < bulletList.length; i++){
        ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y)
}
}

function main() {
    update()
    render();
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListeners()
main();