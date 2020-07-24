import {Tile} from './Tile'
import {Grid} from './Grid'

enum Direction { North, South, East, West}


export class PathFinding {
    constructor(public grid: Grid) {
    }

    getPath(start: Tile, end: Tile): Tile[] {
        if (start.id === end.id) return []
        if (!this.tileInGrid(start) || !this.tileInGrid(end)) return []

        const queue = [start]

        while (queue.length) {
            const current = queue.shift() as Tile

            // Check tile above
            const tileAbove = this.exploreInDirection(current, Direction.North)
            if (tileAbove && !tileAbove.visited) {
                if (tileAbove.id === end.id) {
                    return tileAbove.path
                } else if (tileAbove.accessible) {
                    queue.push(tileAbove)
                }
            }

            // Check tile below
            const tileBelow = this.exploreInDirection(current, Direction.South)
            if (tileBelow && !tileBelow.visited) {
                if (tileBelow.id === end.id) {
                    return tileBelow.path
                } else if (tileBelow.accessible) {
                    queue.push(tileBelow)
                }
            }

            // Check tile to left
            const tileToLeft = this.exploreInDirection(current, Direction.West)
            if (tileToLeft && !tileToLeft.visited) {
                if (tileToLeft.id === end.id) {
                    return tileToLeft.path
                } else if (tileToLeft.accessible) {
                    queue.push(tileToLeft)
                }
            }

            // Check tile to right
            const tileToRight = this.exploreInDirection(current, Direction.East)
            if (tileToRight && !tileToRight.visited) {
                if (tileToRight.id === end.id) {
                    return tileToRight.path
                } else if (tileToRight.accessible) {
                    queue.push(tileToRight)
                }
            }

        }

        return []
    }

    private exploreInDirection(tile: Tile, direction: Direction) {
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

        tile.visited = true

        const targetID = Tile.getIDFromCoordinates(colIndex, rowIndex)
        const target = this.grid.tiles.find(t => t.id === targetID)
        if (!target || !target.accessible) return

        target.path = [tile, ...tile.path]

        return target
    }

    private tileInGrid({id}: Tile): boolean {
        return !!this.grid.tiles.find(t => t.id === id)
    }
}

