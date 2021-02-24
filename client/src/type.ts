const COL = 10;
const ROW = 20;
const BLOCK_SIZE = 30;

type TETRO_INFO = {
    x:number,
    y:number,
    shape:number[][],
    color?:string,
    ctx?:CanvasRenderingContext2D
}

const ROTATION = {
    LEFT : 'left',
    RIGHT : 'right'
}

enum COLORS  {
    Thistle = 1,
    LightBlue,  
    LightCoral, 
    SteelBlue,  
    SlateGray  
}

const SHAPES = [
    [],
    [
        [1 ,1, 0],
        [1, 1, 0],
    ],
    [
        [0, 0, 0],
        [2, 0, 0], 
        [2, 2, 2], 
    ],
    [
        [0,0,0],
        [3,3,3],
        [0,0,0],
    ],
    [
        [0,4,0,0],
        [0,4,4,0],
        [0,0,4,0],
        [0,0,0,0],
    ],
    [
        [0,5,0],
        [5,5,5],
        [0,0,0]
    ],
]
  
enum MOVE_KEY {
    RIGHT = 39,
    LEFT = 37,
    DOWN = 40,
    UP = 38,
    Q = 81
}

const LEVEL = [
    700, 600, 560, 500,
    490, 440, 400, 350, 300,
    250, 200, 120, 100, 90, 80
]

const LEVEL_PER_LINES = 3

const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 1000
};

type User = {
    score:number,
    lines:number,
    level:number
}

export { 
    TETRO_INFO , 
    ROTATION, 
    MOVE_KEY , 
    COL, 
    ROW ,
    BLOCK_SIZE,
    SHAPES,
    COLORS,
    LEVEL,
    POINTS,
    User,
    LEVEL_PER_LINES
}