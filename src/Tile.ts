export class Tile {
    public color: string = 'gray'

    public visited: boolean = false
    public accessible: boolean = true

    public path: Tile[] = []

    static getIDFromCoordinates(x: number, y: number) {
        return `${x}/${y}`
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

    constructor(public colIndex: number, public rowIndex: number, public size: number) {
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.fillStyle = this.color
        ctx.fillRect(0, 0, this.size, this.size)
        ctx.restore()
    }
}
