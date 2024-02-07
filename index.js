// canvas var
const board = document.getElementById("board");
const context = board.getContext("2d");

// bird var
const birdWidth = 34;
const birdHeight = 24;
const birdX = board.width / 8;
const birdY = board.height / 0.5;
const birdImg = new Image();
const bird = {
    x : birdX ,
    y : birdY ,
    width : birdWidth ,
    height : birdHeight,
};

// pipes var
const pipeArray = [];
const pipeWidth = 64 ;
const pipeHeight = 512 ;
const pipeX = board.width * 5 ;
const pipeY = 0 ;

// pipes image
const topPipeImg = new Image();
const bottomPipeImg = new Image();

// game physics
let velocityX = 3 ;
let velocityY = 0 ;
const gravity = 0.4 ;

// game details
let gameOver = false ;
let score = 0 ;
let bestScore;

// window loaded
window.onload = () => {
    board.width = window.innerWidth;
    board.height = window.innerHeight;

    birdImg.src = "./flappybird.png";
    birdImg.onload = () => {
        context.drawImage(birdImg , bird.x , bird.y , bird.width , bird.height);
    };

    topPipeImg.src ="./toppipe.png";
    bottomPipeImg.src = "./bottompipe.png";

    requestAnimationFrame(update);

    setInterval(pipesPlaces , 1500);

    document.addEventListener("keydown" , e => {
        if(e.code == "ArrowUp" || e.code == "Space" || e.code == "keyX") {
            velocityY = -6 ;

            if(gameOver) {
                location.reload()
            }
        };
    });
};

// update canvas background
function update () {
    if(gameOver) {
        return;
    };

    requestAnimationFrame(update);

    context.clearRect( 0 , 0 , board.width , board.height);
    velocityY += gravity ;
    bird.y = Math.max(bird.y + velocityY , 0);

    context.drawImage(birdImg , bird.x , bird.y , bird.width , bird.height);   
    if(bird.y > board.height) {
        gameOver = true ;
    }; 
    for(let i = 0 ; i < pipeArray.length ; i++) {
        const pipe = pipeArray[i];
        pipe.x -= velocityX ;
        context.drawImage(pipe.img , pipe.x , pipe.y , pipe.width , pipe.height);

        if(!pipe.pass && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.pass = true;
        };

        if(detectCollision(bird , pipe)) {
            gameOver = true;
        };
    };

    while(pipeArray.length > 0 && pipeArray[0].x < - pipeWidth) {
        pipeArray.shift();
    };

    if(gameOver) {
        context.fillStyle = "red";
        context.font = "70px sans-serif";
        context.fillText("GAME OVER" , window.innerWidth/3, window.innerHeight/2);

    }else {
        context.fillStyle = "white";
        context.font = "50px sans-serif";
        context.fillText(score, 15, 40);
    };
};

function pipesPlaces () {
  if (gameOver) {
    return;
  }

  let RandomPipeY = pipeY - pipeHeight / 4 - (Math.random() * pipeHeight) / 2;
  let openSpace = pipeHeight / 4;

  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: RandomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    pass: false,
  };

  const bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: RandomPipeY + pipeHeight + openSpace,
    width: pipeWidth,
    height: pipeHeight,
    pass: false,
  };

  pipeArray.push(topPipe, bottomPipe);
};

function detectCollision(a,b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y ;
};