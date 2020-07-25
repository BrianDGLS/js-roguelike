const SPRITE_WIDTH = 8
const SPRITE_HEIGHT = 8

export const spriteSheet = new Image()
spriteSheet.src = './sprites/spritesheet.png'

export interface DrawSpriteOptions {
    ctx: CanvasRenderingContext2D

    frameX: number
    frameY: number

    canvasX: number
    canvasY: number

    scale: number
}

export function drawSprite(options: DrawSpriteOptions): void {
    const {ctx, frameX, frameY, canvasX, canvasY, scale} = options
    ctx.drawImage(spriteSheet,
        frameX * SPRITE_WIDTH,
        frameY * SPRITE_HEIGHT,
        SPRITE_WIDTH,
        SPRITE_HEIGHT,
        canvasX,
        canvasY,
        scale * SPRITE_WIDTH,
        scale * SPRITE_HEIGHT,
    )
}