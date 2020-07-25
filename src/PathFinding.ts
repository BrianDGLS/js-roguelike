import {Tile} from './Tile'
import {Grid} from './Grid'

enum Direction { North, South, East, West}


export class PathFinding {
    private _checked: { [key: string]: boolean } = {}

    constructor(public grid: Grid) {
    }

    getPath(start: Tile, end: Tile): Tile[] {
        if (start.id === end.id) return []
        if (!this.tileInGrid(start) || !this.tileInGrid(end)) return []

        this._checked = {}

        const checkAbove = this.exploreInDirection.bind(this, Direction.North)
        const checkBelow = this.exploreInDirection.bind(this, Direction.South)
        const checkToLeft = this.exploreInDirection.bind(this, Direction.West)
        const checkToRight = this.exploreInDirection.bind(this, Direction.East)
        const checks = [checkAbove, checkBelow, checkToLeft, checkToRight]

        const queue = [start]
        while (queue.length) {
            const current = queue.shift() as Tile

            for (const check of checks) {
                const target = check(current)
                if (!target) continue

                if (target.id === end.id) return target.path
                if (target.accessible) queue.push(target)
            }
        }

        return []
    }

    private exploreInDirection(direction: Direction, tile: Tile) {
        let {rowIndex, colIndex} = tile
        if (direction === Direction.North) {
            rowIndex -= 1
        } else if (direction === Direction.East) {
            colIndex += 1
        } else if (direction === Direction.South) {
            rowIndex += 1
        } else if (direction === Direction.West) {
            colIndex -= 1
        }

        const targetID = Tile.getIDFromCoordinates(colIndex, rowIndex)

        if (this._checked[targetID]) return
        else this._checked[targetID] = true

        const target = this.grid.tiles.find(t => t.id === targetID)
        if (!target || !target.accessible) return

        target.path = [tile, ...tile.path]
        return target
    }

    private tileInGrid({id}: Tile): boolean {
        return !!this.grid.tiles.find(t => t.id === id)
    }
}

