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
    Magenta  =1,
    MidnightBlue,
    black,
    OrangeRed, 
    CornflowerBlue = 5,
    MediumTurquoise,
    MediumVioletRed,
    LightPink,
    Navy,
    red
}

const SHAPES = [
    [
        [1,1,0],
        [1,1,0],
        [0,0,0]
    ],
    [
        [2, 0, 0], 
        [2, 2, 2], 
        [0, 0, 0]
    ],
    [
        [0,0,0],
        [3,3,3],
        [0,0,0],
    ],
    [
        [4,0,0],
        [4,4,0],
        [0,4,0]
    ],
    [
        [0,5,0],
        [5,5,5],
        [0,0,0]
    ],


    [
        [6,6,0],
        [6,6,0],
        [0,0,0]
    ],
    [
        [7, 0, 0], 
        [7, 7, 7], 
        [0, 0, 0]
    ],
    [
        [0,0,0],
        [8,8,8],
        [0,0,0],
    ],
    [
        [9,0,0],
        [9,9,0],
        [0,9,0]
    ],
    [
        [0,10,0],
        [10,10,10],
        [0,0,0]
    ]
]
  
enum MOVE_KEY {
    RIGHT = 39,
    LEFT = 37,
    DOWN = 40,
    UP = 38,
    Q = 81
}





export { 
    TETRO_INFO , 
    ROTATION, MOVE_KEY , 
    COL, 
    ROW ,
    BLOCK_SIZE,
    SHAPES,
    COLORS
}