import { Board , IBoard} from "./Board.js";
import { MOVE_KEY , User} from "./type.js";
import { moves } from "./moves.js";
import { userProxy } from "./user.js";

const playBtn = document.querySelector('.play-btn')!;
const pauseBtn = document.querySelector('.pause-btn')!;
pauseBtn.setAttribute('style', 'display : none');

const canvas = document.getElementById('board') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const canvasNext = document.getElementById('next') as HTMLCanvasElement;
const ctxNext = canvasNext.getContext('2d')!;

  
let requestId = 0;
const board:IBoard = new Board(ctx, ctxNext);
const time = { start: 0, elapsed: 0, level: 1000 };


// 키 이벤트 핸들링
function handleKeyPress(event:any) {
    if(event.keyCode == 32){
        let newTetro = moves[MOVE_KEY.DOWN](board.tetromino);;
        console.log('스패이스바')
        while(board.checkLocation(newTetro)){
            board.tetromino.move(newTetro);
            newTetro = moves[MOVE_KEY.DOWN](board.tetromino);
        }           
        return;
    }
    try{
        const key:MOVE_KEY = event.keyCode;
        const newTetro = moves[key](board.tetromino);

        // 이동할 위치가 유효한지 체크하기
        if(!board.checkLocation(newTetro)) return;
        // 테트로미노 위치 고정
        board.tetromino.move(newTetro);
        // 캔버스 지우기
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
        // 테트로미노 그리기
        board.tetromino.draw();
    }catch(err){
        console.log(event.keyCode, err)
    }
}

document.addEventListener('keydown', (event)=>{
    event.preventDefault();
    handleKeyPress(event);
});



function animate(now = 0) {
    time.elapsed = now - time.start;
    if(time.elapsed > time.level) {
        time.start = now;
        if(!board.drop()){
            cancelAnimationFrame(requestId);
            gameOver();
            return;
        }
    }

    if(requestId){
        cancelAnimationFrame(requestId);
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.draw();

    requestId = window.requestAnimationFrame(animate);
}


function resetGame() {
    userProxy.level = 0;
    userProxy.score = 0;
    userProxy.lines = 0;
    board.init();
}

// 시작
function play() {
    resetGame();
    animate();
    pauseBtn.setAttribute('style', 'display : ""');
    playBtn.setAttribute('style', 'display : none');
} 

// 게임 오버
function gameOver(){
    alert("game over")
    console.table(board.grid)
    pauseBtn.setAttribute('style', 'display : none');
    playBtn.setAttribute('style', 'display : ""');
}


playBtn.addEventListener('click', play);


export { userProxy }