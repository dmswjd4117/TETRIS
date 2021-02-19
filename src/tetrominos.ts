import { TETRO_INFO } from "./type.js";
export class Tetrominos {
    x:number = 0; 
    y:number = 0;
    shape: number[][] = [];
    private color = 'black';
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }
    
    setTetromino() {
        this.color = 'yellow';
        this.shape = [
            // [1,1,1],
            // [1,1,1],
            // [1,1,1]

            [0,1,0],
            [1,1,1],
            [0,0,0]

            // [2, 0, 0], 
            // [2, 2, 2], 
            // [0, 0, 0]
        ];
        this.x = 3;
        this.y = 0;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, j) => {
            row.forEach((value, i) => {
                if (value > 0) {
                    this.ctx.fillRect(this.x + i, this.y + j, 1, 1);
                }
            });
        });
    }

    move(pointer: TETRO_INFO) {
        this.x = pointer.x;
        this.y = pointer.y;
    }
}