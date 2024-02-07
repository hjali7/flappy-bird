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
let velocityX = 2 ;
let velocityY = 3 ;

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
};

// update canvas background
function update () {
    requestAnimationFrame(update);
    context.clearRect( 0 , 0 , board.width , board.height);
    context.drawImage(birdImg , bird.x , bird.y , bird.width , bird.height);
    
    for(let i = 0 ; i < pipeArray.length ; i++) {
        const pipe = pipeArray[i];
        pipe.x -= velocityX ;
        context.drawImage(pipe.img , pipe.x , pipe.y , pipe.width , pipe.height);
    }
};

function pipesPlaces () {
    
    const RandomPipeY = pipeY - pipeHeight/4 - (Math.random() * pipeHeight/2);
    
    let topPipe = {
        img : topPipeImg ,
        x : pipeX ,
        y : RandomPipeY ,
        width : pipeWidth ,
        height : pipeHeight ,
        pass : false ,
    };

    const bottomPipe = {
        img : bottomPipeImg ,
        x : pipeX ,
        y : -RandomPipeY ,
        width : pipeWidth ,
        height : pipeHeight ,
        pass : false ,
    };

    pipeArray.push(topPipe , bottomPipe);
}

