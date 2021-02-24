import { Tetrominos } from "./Tetrominos.js";
import { TETRO_INFO,  MOVE_KEY } from "./type.js";

function rotate(tetromino: Tetrominos, dir: string):TETRO_INFO{
    // 스프레드연산자는 객체안 객체까지 깊은복사해주지 안늠
    //const pTetromino:TETRO_INFO = { ...tetromino }
    
    // 깊은 복사하는법 JSON.parse(JSON.stringify(obj)) 
    const pTetromino:TETRO_INFO = JSON.parse(JSON.stringify(tetromino));
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

    console.log("인자")
    console.table(tetromino.shape)
    console.log("복사된 객체")
    console.table(pTetromino.shape)
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


