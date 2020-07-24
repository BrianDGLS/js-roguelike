import {Tile} from './Tile'

export class Grid {
    public tiles: Tile[] = []

    constructor(public rowCount: number, public colCount: number, public tileSize: number) {
        for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
            for (let colIndex = 0; colIndex < this.colCount; colIndex++) {
                const tile = new Tile(colIndex, rowIndex, tileSize)
                this.tiles.push(tile)
            }
        }
    }
}