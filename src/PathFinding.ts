import {Tile} from './Tile'
import {Grid} from './Grid'

export class PathFinding {
    constructor(public grid: Grid) {
    }

    getPath(start: Tile, end: Tile): Tile[] {
        const path: Tile[] = []

        if (start.id === end.id) return path
        if (!this.tileInGrid(start) || !this.tileInGrid(end)) return path

        return path
    }

    private tileInGrid({id}: Tile): boolean {
        return !!this.grid.tiles.find(t => t.id === id)
    }
}
