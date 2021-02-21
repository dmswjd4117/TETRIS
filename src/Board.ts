import { Tetrominos } from "./Tetrominos.js";
import { TETRO_INFO, MOVE_KEY, COL, ROW ,BLOCK_SIZE, COLORS } from "./type.js";
import { moves } from "./moves.js";
import { userProxy } from "./user.js";
export interface IBoard {
    tetromino: Tetrominos;
    grid: number[][];
    init():void;
    draw():void;
    drop():boolean;
    checkLocation(info:TETRO_INFO):boolean;
}

export class Board implements IBoard{
    public tetromino!: Tetrominos;
    public grid: number[][] = [];
    private ctx: CanvasRenderingContext2D;
    private ctxNext: CanvasRenderingContext2D;
    private tetrominoNext!: Tetrominos;

    constructor(ctx:CanvasRenderingContext2D, 
                ctxNext:CanvasRenderingContext2D
        ){ 
        this.ctx = ctx;
        this.ctxNext = ctxNext;

        // 캔버스 초기화
        this.ctx.canvas.width = COL * BLOCK_SIZE;
        this.ctx.canvas.height = ROW * BLOCK_SIZE;
        this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

        // next 캔버스 초기화
        this.ctxNext.canvas.width = 5 * BLOCK_SIZE;
        this.ctxNext.canvas.height = 5 * BLOCK_SIZE;
        this.ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);

        this.init();
    }


    // 초기화
    init() {
        // 그리드 생성
        this.grid = this.getEmptyBoard();
        // console.table(this.grid)

        // 테트로미노 생성
        this.tetromino = new Tetrominos(this.ctx);
        this.tetromino.setTetromino();

        // next테트로미노 생성
        this.getNewTetromino();
    }

    getNewTetromino(){
        this.tetrominoNext = new Tetrominos(this.ctxNext);
        this.ctxNext.clearRect(0, 0, this.ctxNext.canvas.width, this.ctxNext.canvas.height);
        this.tetrominoNext.setTetromino(1, 1);
    }


    getEmptyBoard():number[][] {
        let grid = new Array(ROW).fill(0);
        grid = grid.map(() => Array(COL).fill(0))
        return grid;
    }

    // 그리기 
    draw() {
        // 내려오는 테트로미노 그리기
        this.tetromino.draw();
        // next 테트로미노 그리기
        this.tetrominoNext.draw();
        // 밑에 가만히 있는 테트로미노 그리기
        this.drawBoard();
    }

    drawBoard() {
        this.grid.forEach((row, y)=>{
            row.forEach((value, x)=>{
                if(!value) return;
                this.ctx.fillStyle = COLORS[value];
                this.ctx.fillRect(x, y, 1, 1);
            })
       })
    }

    // 밑으로 한칸 내리거나, 고정시키거나
    drop():boolean {
        const pTetromino = moves[MOVE_KEY.DOWN](this.tetromino);
        if(this.checkLocation(pTetromino)){
            this.tetromino.move(pTetromino);
            return true;
        }
        
        // 맨 밑바닥에 닿았다면? 그리드에 저장
        this.freeze();
        this.clearLines();

        // 게임 오버 했다면?
        if(this.tetromino.y == 0){
            return false
        };

        // 지금 테트로미노를 next테트로미노로 바꾸고
        this.tetromino = this.tetrominoNext;
        this.tetromino.ctx = this.ctx;
        this.tetromino.x = 3;
        this.tetromino.y = 0;
        // next테트로미노 새로생성하기
        this.getNewTetromino();

        return true;
    }


    freeze() {
        this.tetromino.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.grid[y + this.tetromino.y][x + this.tetromino.x] = value;
                }
            });
        });
    }

    clearLines(){
        let lines = 0;
        this.grid.forEach((row, y)=>{
            const flag = row.every((value, x)=>{
                return value !== 0;
            })
            if(flag){
                lines += 1;
                for(let i=y; i>=1 ;i--){
                    this.grid[i] = this.grid[i-1];
                }
                userProxy.score += 1
                userProxy.lines += 1
                if(userProxy.level >= 10){
                    userProxy.level += 1
                }
            }
        })
    }

    // 블록 위치 가능한지 체크
    checkLocation(info:TETRO_INFO):boolean{
        const shape = info.shape;
    
        return shape.every((row, dy)=>{
            return row.every((value, dx)=>{
                const x = info.x+ dx;
                const y = info.y + dy;
                if(value === 0) return true;
                if(this.isinWall(x,y) && this.isitEmpty(x,y)) return true;
                return false;
            })
        })
    }

    isitEmpty(x:number, y:number) {
        return this.grid[y] && this.grid[y][x] === 0;
    }
    
    isinWall(x: number, y:number): boolean{
        return x >= 0 && x < COL && y < ROW
    }
}



