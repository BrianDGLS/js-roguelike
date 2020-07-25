import {Tile} from './Tile'
import {Grid} from './Grid'

enum Direction { North, South, East, West}

export class PathFinding {
    private _checked: { [key: string]: Tile[] } = {}

    constructor(public grid: Grid) {
    }

    getPath(start: Tile, end: Tile): Tile[] {
        const startPath: Tile[] = []
        if (start.id === end.id) return startPath
        if (!this.tileInGrid(start) || !this.tileInGrid(end)) return startPath

        this._checked = {}

        const checkAbove = this.exploreInDirection.bind(this, Direction.North)
        const checkBelow = this.exploreInDirection.bind(this, Direction.South)
        const checkToLeft = this.exploreInDirection.bind(this, Direction.West)
        const checkToRight = this.exploreInDirection.bind(this, Direction.East)
        const checks = [checkAbove, checkBelow, checkToLeft, checkToRight]

        const queue = [start]
        while (queue.length) {
            const current = queue.shift() as Tile
            this.setAsChecked(start, startPath)

            for (const check of checks) {
                const target = check(current)
                if (!target) continue

                if (target.id === end.id) return this._checked[target.id]
                if (target.accessible) queue.push(target)
            }
        }

        return startPath
    }

    private exploreInDirection(direction: Direction, tile: Tile): Tile | undefined {
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

        const target = this.grid.tiles.find(t => t.id === targetID)
        if (!target || !target.accessible) return

        this.setAsChecked(target, [tile, ...this._checked[tile.id]])
        return target
    }

    private setAsChecked(tile: Tile, value: Tile[]): void {
        this._checked[tile.id] = value
    }

    private tileInGrid({id}: Tile): boolean {
        return !!this.grid.tiles.find(t => t.id === id)
    }
}

