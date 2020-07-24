export class Tile {
    public color: string = 'gray'

    get id(): string {
        return `${this.colIndex}/${this.rowIndex}`
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
