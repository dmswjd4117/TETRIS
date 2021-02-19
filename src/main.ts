import { Tetrominos } from "./tetrominos.js";
import { TETRO_INFO, ROTATION, KEY, COL, ROW ,BLOCK_SIZE } from "./type.js";


const playBtn = document.querySelector('.play-btn');
const canvas = document.getElementById('board') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
ctx.canvas.width = COL * BLOCK_SIZE;
ctx.canvas.height = ROW * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);


const moves = {
    [KEY.LEFT]: (p:Tetrominos):TETRO_INFO => ({ ...p,
         x: p.x - 1 
    }),
    [KEY.RIGHT]: (p:Tetrominos):TETRO_INFO => ({ ...p,
         x: p.x + 1 
    }),
    [KEY.DOWN]: (p:Tetrominos):TETRO_INFO => ({ ...p,
         y: p.y+1
    }),
    [KEY.UP]: (p:Tetrominos):TETRO_INFO => ({ ...p,
        y: p.y-1
    }),
    [KEY.SPACE]: (p:Tetrominos):TETRO_INFO => ({ ...p,
        y: p.y-1
    })
};


function isInWall(x: number, y:number): boolean{
    // 0부터 8까지,              20까지
    // console.log(x, y)
    return x >= 0 && x < COL && y < ROW;
}

class Board {
    private grid: number[][] = [];
    private ctx!: CanvasRenderingContext2D;
    private tetromino!: Tetrominos;

    constructor(ctx:CanvasRenderingContext2D){
        this.ctx = ctx;
        this.init();
    }

    init() {
        this.tetromino = new Tetrominos(this.ctx);
        this.tetromino.setTetromino();
        this.tetromino.draw();

        this.grid = this.getEmptyBoard();
        console.table(this.grid)
    }

    getEmptyBoard():number[][] {
        let grid = new Array(COL).fill(0);
        grid = grid.map(() => Array(ROW).fill(0))
        return grid;
    }

    rotate(){

    }

    handleKeyPress(event:any) {
        const key:KEY = event.keyCode;
        // 왼쪽, 오른쪽, 아래 키를 눌렀다면 
        if(moves[key]){
            let newTetro = moves[key](this.tetromino);

            // 스페이스 키를 누르면,

            if(key === KEY.SPACE){
                while(this.checkLocation(newTetro)){
                    this.tetromino.move(newTetro);
                    newTetro = moves[KEY.DOWN](this.tetromino);
                }
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
                this.tetromino.draw();
            }

            // 나머지 키를 누르면,

            if(!this.checkLocation(newTetro)) return;
            // 테트로미노 위치정하기
            this.tetromino.move(newTetro);
            // 캔버스 지우기
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
            // 테트로미노 그리기
            this.tetromino.draw();
        }
    }

    checkLocation(info:TETRO_INFO):boolean{
        const shape = info.shape;
        if(!shape) return false;

        return shape?.every((row, dy)=>{
            return row.every((value, dx)=>{
                const x = info.x+ dx;
                const y = info.y + dy;
                if(value === 0) return true;
                if(isInWall(x, y)) return true;
                return false;
            })
        })
    }
}

const board = new Board(ctx);



function play() {
    // board.init();
    // document.addEventListener('keydown', board.handleKeyPress.bind(board));
}

board.init();
document.addEventListener('keydown', board.handleKeyPress.bind(board));

if(playBtn){
    playBtn.addEventListener('click', play);
}  

