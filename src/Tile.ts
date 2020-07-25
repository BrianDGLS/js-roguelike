export enum TileTypes {Wall, Floor, Empty}

export class Tile {
    color: string = 'gray'

    type: TileTypes = TileTypes.Floor

    get accessible(): boolean {
        return this.type === TileTypes.Floor
    }

    get id(): string {
        return Tile.getIDFromCoordinates(this.colIndex, this.rowIndex)
    }

    get x(): number {
        return this.colIndex * this.size
    }

    get y(): number {
        return this.rowIndex * this.size
    }

    static getIDFromCoordinates(x: number, y: number) {
        return `${x}/${y}`
    }

    constructor(public colIndex: number, public rowIndex: number, public size: number) {
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.fillStyle = this.accessible ? this.color : 'black'
        ctx.fillRect(0, 0, this.size, this.size)
        ctx.restore()
    }
}
