import { Board } from "./Board.js";
import { BLOCK_SIZE } from "./type.js";

const playBtn = document.querySelector('.play-btn');

const canvas = document.getElementById('board') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const canvasNext = document.getElementById('next') as HTMLCanvasElement;
const ctxNext = canvasNext.getContext('2d')!;


let requestId = 0;

const board = new Board(ctx, ctxNext);

const time = { start: 0, elapsed: 0, level: 1000 };

function play() {
    document.removeEventListener('keydown', board.handleKeyPress.bind(board));
    document.addEventListener('keydown', (event)=>{
        board.handleKeyPress.bind(board)(event)
    });
    animate();
} 


function animate(now = 0) {
    time.elapsed = now - time.start;
    if(time.elapsed > time.level) {
        time.start = now;
        
        if(!board.drop()){
            return;
        }
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.draw();

    requestId = window.requestAnimationFrame(animate);
}


document.addEventListener('keydown', (event)=>{
    board.handleKeyPress.bind(board)(event)
});
animate();


// if(playBtn){
//     playBtn.addEventListener('click', play);
// }  



