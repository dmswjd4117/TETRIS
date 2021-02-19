const COL = 10;
const ROW = 20;
const BLOCK_SIZE = 30;


type TETRO_INFO = {
    x:number,
    y:number,
    shape?:number[][],
    color?:string,
    ctx?:CanvasRenderingContext2D
}

type ROTATION = {
    LEFT : 'left',
    RIGHT : 'right'
}


enum KEY {
    RIGHT = 39,
    LEFT = 37,
    DOWN = 40,
    UP = 38,
    SPACE = 32,
}



export { TETRO_INFO , ROTATION, KEY , COL, ROW ,BLOCK_SIZE}