import { Tetrominos } from "./tetrominos.js";
import { TETRO_INFO, COLORS, ROTATION, MOVE_KEY, COL, ROW ,BLOCK_SIZE } from "./type.js";

function isInWall(x: number, y:number): boolean{
    return x >= 0 && x < COL && y < ROW;
}

function rotate(tetromino: Tetrominos):TETRO_INFO{
    const pTetromino:TETRO_INFO = { ...tetromino } 
    for(let x=0 ; x<pTetromino.shape.length; x++){
        for(let y=0 ; y<x ; y++){
            [pTetromino.shape[x][y], pTetromino.shape[y][x] ]
            =
            [pTetromino.shape[y][x], pTetromino.shape[x][y]]
        }
    }

    // 오른쪽(시계방향)으로 회전
    for(let i=0 ; i<pTetromino.shape.length; i++) {
        pTetromino.shape[i].reverse();
    }

    // 왼쪽(시계반대방향)으로 회전
    // pTetromino.shape.reverse();

    console.log(pTetromino.shape)
    return pTetromino;
}

const moves = {
    [MOVE_KEY.LEFT]: (p:Tetrominos):TETRO_INFO => ({ ...p,
         x: p.x - 1 
    }),
    [MOVE_KEY.RIGHT]: (p:Tetrominos):TETRO_INFO => ({ ...p,
         x: p.x + 1 
    }),
    [MOVE_KEY.DOWN]: (p:Tetrominos):TETRO_INFO => ({ ...p,
         y: p.y+1
    }),
    [MOVE_KEY.SPACE]: (p:Tetrominos):TETRO_INFO => ({ ...p,
        y: p.y-1
    }),
    [MOVE_KEY.UP]: (p:Tetrominos):TETRO_INFO => rotate(p)
};


export class Board {
    public hi:string = "hello !"
    private grid: number[][] = [];
    private ctx!: CanvasRenderingContext2D;
    private tetromino!: Tetrominos;

    constructor(ctx:CanvasRenderingContext2D){
        this.ctx = ctx;
        this.init();
    }

    init() {
        // 캔버스 초기화
        this.ctx.canvas.width = COL * BLOCK_SIZE;
        this.ctx.canvas.height = ROW * BLOCK_SIZE;
        this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); 

        // 테트로미노 생성
        this.tetromino = new Tetrominos(this.ctx);
        this.tetromino.setTetromino();

        // 그리드
        this.grid = this.getEmptyBoard();
        // console.table(this.grid)
    }

    drop() {
        const pTetromino = moves[MOVE_KEY.DOWN](this.tetromino);
        if(this.checkLocation(pTetromino)){
            this.tetromino.move(pTetromino);
            return true
        }

        return false;
    }

    draw() {
        this.tetromino.draw();
        this.drawBoard();
    }

    drawBoard() {
        this.grid.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value > 0) {
              this.ctx.fillStyle = COLORS[value];
              this.ctx.fillRect(x, y, 1, 1);
            }
          });
        });
    }

    getEmptyBoard():number[][] {
        let grid = new Array(COL).fill(0);
        grid = grid.map(() => Array(ROW).fill(0))
        return grid;
    }

    handleKeyPress(event:any) {
        const key:MOVE_KEY = event.keyCode;
        // 왼쪽, 오른쪽, 아래 키를 눌렀다면 
        if(moves[key]){
            let newTetro = moves[key](this.tetromino);
            // 스페이스 키를 누르면,
            if(key === MOVE_KEY.SPACE) {
                while(this.checkLocation(newTetro)){
                    this.tetromino.move(newTetro);
                    newTetro = moves[MOVE_KEY.DOWN](this.tetromino);
                }
                this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); 
                this.tetromino.draw();
            }

            // 나머지 키를 누르면,
            if(!this.checkLocation(newTetro)) return;
            // 테트로미노 위치정하기
            this.tetromino.move(newTetro);
            // 캔버스 지우기
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); 
            // 테트로미노 그리기
            this.tetromino.draw();
        }
    }



    checkLocation(info:TETRO_INFO):boolean{
        const shape = info.shape;

        return shape.every((row, dy)=>{
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


