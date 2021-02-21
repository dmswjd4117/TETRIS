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
    Magenta = 1,
    MidnightBlue,  
    CornflowerBlue, 
    OrangeRed,  
    MediumTurquoise  
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

const LEVEL = {
    0: 1000,
    1: 820,
    2: 730,
    3: 650,
    4: 370,
    5: 280,
    6: 200,
    7: 190,
    8: 130,
    9: 90,
    10: 70,
};

const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
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
    User
}