import { Tetrominos } from "./tetrominos.js";
import { TETRO_INFO, COLORS, ROTATION, MOVE_KEY, COL, ROW ,BLOCK_SIZE } from "./type.js";



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
    [MOVE_KEY.UP]: (p:Tetrominos):TETRO_INFO => rotate(p)
};


export class Board {
    public hi:string = "BOARD !"
    public grid: number[][] = [];
    private ctx: CanvasRenderingContext2D;
    private ctxNext: CanvasRenderingContext2D;
    private tetromino!: Tetrominos;
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

    // next테트로미노를 생성하고 그린다.
    getNewTetromino(){
        this.tetrominoNext = new Tetrominos(this.ctxNext);
        this.ctxNext.clearRect(0, 0, this.ctxNext.canvas.width, this.ctxNext.canvas.height);
        this.tetrominoNext.setTetromino(1, 1);
        this.tetrominoNext.draw();
    }

    draw() {
        this.tetromino.draw();
        this.drawBoard();
    }

    drawBoard() {
        this.grid.forEach((row, y)=>{
            row.forEach((value, x)=>{
                if(!value) return;
                this.ctx.fillStyle = this.tetromino.color;
                this.ctx.fillRect(x, y, 1, 1);
            })
       })
    }

    getEmptyBoard():number[][] {
        let grid = new Array(ROW).fill(0);
        grid = grid.map(() => Array(COL).fill(0))
        return grid;
    }

    // 밑으로 한칸 내리거나, 고정시키거나
    drop() {
        const pTetromino = moves[MOVE_KEY.DOWN](this.tetromino);
        if(this.checkLocation(pTetromino)){
            this.tetromino.move(pTetromino);
            return true;
        }
    
        // 맨 밑바닥에 닿았다면? 그리드에 저장
        this.freeze();

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

    handleKeyPress(event:any) {

        
        if(event.keyCode == 32){
            let newTetro = moves[MOVE_KEY.DOWN](this.tetromino);;
            console.log('스패이스바')
            while(this.checkLocation(newTetro)){
                this.tetromino.move(newTetro);
                newTetro = moves[MOVE_KEY.DOWN](this.tetromino);
            }            
            return;
        }

        try{
            const key:MOVE_KEY = event.keyCode;
            const newTetro = moves[key](this.tetromino);
            // console.log(key, newTetro)
        
            // 이동할 위치가 유효한지 체크하기
            if(!this.checkLocation(newTetro)) return;
            // 테트로미노 위치 고정
            this.tetromino.move(newTetro);
            // 캔버스 지우기
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); 
            // 테트로미노 그리기
            this.tetromino.draw();
        }catch(err){
            console.log(event.keyCode, err)
        }
    }

    // 블록 grid에 저장 
    freeze() {
        this.tetromino.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.grid[y + this.tetromino.y][x + this.tetromino.x] = value;
                }
            });
        });
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




        // let newTetro:TETRO_INFO;
        // if(event.keyCode == 32){
        //     console.log('스패이스바')
        //     return;
        // }
        // try{
        //     const key:MOVE_KEY = event.keyCode;
        //     newTetro = moves[key](this.tetromino);
        //     // console.log(key, newTetro)
        
        //     // 이동할 위치가 유효한지 체크하기
        //     if(!this.checkLocation(newTetro)) return;
        //     // 테트로미노 위치 고정
        //     this.tetromino.move(newTetro);
        //     // 캔버스 지우기
        //     this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); 
        //     // 테트로미노 그리기
        //     this.tetromino.draw();
        // }catch(err){
        //     console.log(event.keyCode, err)
        // }