import { tetrominos } from "./tetrominos.js";

const COL = 10;
const ROW = 20;
const BLOCK_SIZE = 30;

const playBtn = document.querySelector('.play-btn');

const canvas = document.getElementById('board') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
ctx.canvas.width = COL * BLOCK_SIZE;
ctx.canvas.height = ROW * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

class Board {
    private grid: number[][] = [];

    constructor(){}

    init() {
        this.grid = this.getEmptyBoard();
        console.table(this.grid)
    }

    getEmptyBoard():number[][] {
        let grid = new Array(COL).fill(0);
        grid = grid.map(() => Array(ROW).fill(0))
        
        return grid;
    }
}



const board = new Board();

function play() {
    board.init();
    console.log('play!')
}

if(playBtn){
    playBtn.addEventListener('click', play);
}  

