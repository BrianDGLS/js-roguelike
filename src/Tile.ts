import {drawSprite} from './spriteSheet'

export enum TileTypes { Floor, Wall, Empty, Path}

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

        const drawOptions = {ctx, scale: 1, frameX: 0, frameY: 0, canvasX: 0, canvasY: 0}
        switch (this.type) {
            case TileTypes.Floor:
                drawSprite(drawOptions)
                break
            case TileTypes.Wall:
                drawSprite({...drawOptions, frameX: 1})
                break
            case TileTypes.Path:
                drawSprite({...drawOptions, frameX: 2})
                break
            case TileTypes.Empty:
            default:
        }

        ctx.restore()
    }
}
