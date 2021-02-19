import { Tetrominos } from "./tetrominos.js";
import { TETRO_INFO, COLORS, ROTATION, MOVE_KEY, COL, ROW ,BLOCK_SIZE } from "./type.js";
import { Board } from "./Board.js";

const playBtn = document.querySelector('.play-btn');
const canvas = document.getElementById('board') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
let requestId = 0;

const board = new Board(ctx);

const time = { start: 0, elapsed: 0, level: 1000 };

function play() {
    document.addEventListener('keydown', board.handleKeyPress.bind(board));
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

    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.draw();
    requestId = window.requestAnimationFrame(animate);
}


if(playBtn){
    playBtn.addEventListener('click', play);
}  



