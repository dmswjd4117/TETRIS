import { Tetrominos } from "./tetrominos.js";
import { TETRO_INFO,  MOVE_KEY } from "./type.js";

function rotate(tetromino: Tetrominos, dir: string):TETRO_INFO{
    const pTetromino:TETRO_INFO = { ...tetromino } 
    for(let x=0 ; x<pTetromino.shape.length; x++){
        for(let y=0 ; y<x ; y++){
            [pTetromino.shape[x][y], pTetromino.shape[y][x] ]
            =
            [pTetromino.shape[y][x], pTetromino.shape[x][y]]
        }
    }

    if(dir === 'right'){
        // 오른쪽(시계방향)으로 회전
        for(let i=0 ; i<pTetromino.shape.length; i++) {
            pTetromino.shape[i].reverse();
        }
    }
    else if(dir === 'left'){
        // 왼쪽(시계반대방향)으로 회전
        pTetromino.shape.reverse();
    }

    return pTetromino;
}

export const moves = {
    [MOVE_KEY.LEFT]: (p:Tetrominos):TETRO_INFO => ({ ...p,
         x: p.x - 1 
    }),
    [MOVE_KEY.RIGHT]: (p:Tetrominos):TETRO_INFO => ({ ...p,
         x: p.x + 1 
    }),
    [MOVE_KEY.DOWN]: (p:Tetrominos):TETRO_INFO => ({ ...p,
         y: p.y+1
    }),
    [MOVE_KEY.UP]: (p:Tetrominos):TETRO_INFO => rotate(p, 'right'),
    [MOVE_KEY.Q]: (p:Tetrominos):TETRO_INFO => rotate(p, 'left')
};
