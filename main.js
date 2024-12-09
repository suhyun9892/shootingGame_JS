// setting of canvas

let canvas;
let ctx;
canvas = document.createElement('canvas')
ctx = canvas.getContext("2d")
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas)

let backgroundImage, spaceshipImage, enemyImage, bulletImage, gameoverImage;
let gameOver = false; // true면 게임 끝, false면 게임 진행

// 우주선 좌표
let spaceshipX = canvas.width/2 - 32
let spaceshipY = canvas.height - 64

let bulletList = [] // 총알 저장 리스트
let score = 0

function Bullet() {
    this.x = 0
    this.y = 0
    this.init = function() { // 총알 초기화
        this.x = spaceshipX + 20 // 총알 위치가 우주선 중앙에서 나가도록 +20
        this.y = spaceshipY
        this.alive = true // true면 화면에 보임, false면 화면에 안보임
        bulletList.push(this)
    }
    this.update = function() {
        this.y -= 7 // 총알 발사 = y좌표 감소
    }

    this.checkHit = function() {
        for (let i=0; i<enemyList.length; i++){
            if(this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x + 40){
            // 총알이 죽게 됨, 적군의 우주선이 없어짐, 점수 획득
            score ++
            this.alive = false // 총알이 죽음
            enemyList.splice(i, 1) // 적군이 죽음
        }
    }
}
}

function generateRandomValue(min, max) {
    let randomNum = Math.floor(Math.random()*(max-min+1))+min
    return randomNum
}

let enemyList = []
function enemy() {
    this.x = 0
    this.y = 0
    this.init = function() {
        this.y = 0 // 최상단
        this.x =  generateRandomValue(0, canvas.width - 64) // 위치 랜덤
        // enemy 리스트에 저장
        enemyList.push(this)
    }
this.update = function() {
    this.y += 3 // 적군 속도 조절

    if(this.y >= canvas.height-64) {
        gameOver = true // true면 게임 끝
        console.log("game over")
    }
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

// 키다운 이벤트, 키업 이벤트시 키코드를 저장
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
    let b = new Bullet() // 총알 하나 생성
    b.init()
}

function createEnemy() {
    const interval = setInterval(function() {
        let e = new enemy()
        e.init()
    }, 1000)
}

function update() {
    if(39 in keysDown){ // 39는 오른쪽 방향키
        spaceshipX += 5; // 오른쪽 방향키 누르면 우주선 x좌표 5 증가
    }
    if(37 in keysDown){ // 37은 왼쪽 방향키
        spaceshipX -= 5; // 왼쪽 방향키 누르면 우주선 x좌표 5 감소
    }
    // 우주선이 화면 밖으로 나가지 않도록 제한
    if(spaceshipX <= 0){
        spaceshipX = 0;
    }
    if(spaceshipX >= canvas.width - 64){
        spaceshipX = canvas.width - 64
    }

    // 총알 y 좌표 업데이트 하는 함수 호출
    for (let i = 0; i < bulletList.length; i++){
        if(bulletList[i].alive){
        bulletList[i].update()
        bulletList[i].checkHit()
        }
    }

    for (let i = 0; i < enemyList.length; i++){
        enemyList[i].update()
    }
}

function render() {
    // drawImage(image, x, y, width, height)
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
    ctx.fillText(`Score:${score}`, 20, 20)
    ctx.fillStyle = "white"
    ctx.font = "20px Verdana"

    // 총알 그려주기
    for (let i = 0; i < bulletList.length; i++){
        if (bulletList[i].alive){
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y)
        }       
}
    // 적군 그려주기
    for (let i = 0; i < enemyList.length; i++){
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y)
    }
}

function main() {
    if(!gameOver){
    update()
    render();
    requestAnimationFrame(main)
    } else {
        ctx.drawImage(gameoverImage, 10, 200, 380, 180)
    }
}

loadImage();
setupKeyboardListeners()
createEnemy()
main();