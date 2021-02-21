
import { TETRO_INFO , COLORS, SHAPES} from "./type.js";

const INDEX_NUMBER = 5;
export class Tetrominos {
    x:number = 0; 
    y:number = 0;
    shape: number[][] = [];
    color = 'red';
    ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }
    
    setTetromino(x=3, y=0) {
        const index = Math.ceil(Math.random() * INDEX_NUMBER );
        this.shape = SHAPES[index];
        this.color = COLORS[index];
        this.x = x;
        this.y = y;    
    }

    draw() {
        this.shape.forEach((row, j) => {
            row.forEach((value, i) => {
                if (value > 0) {
                    this.ctx.fillStyle = COLORS[value];
                    this.ctx.fillRect(this.x + i, this.y + j, 1, 1);
                }
            });
        });
    }

    move(pointer: TETRO_INFO) {
        this.x = pointer.x;
        this.y = pointer.y;
        this.shape = pointer.shape;
    }
}