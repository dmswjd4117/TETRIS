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

const COLORS = [  
    'white',
    'orange',
    'yellow',
    'cadetblue',
    'darkorchid'
];

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
        [3,3,3],
        [0,0,0],
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
    ]
]
  
enum MOVE_KEY {
    RIGHT = 39,
    LEFT = 37,
    DOWN = 40,
    SPACE = 32,
    UP = 38
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