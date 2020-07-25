import {Grid} from './Grid'
import {PathFinding} from './PathFinding'
import {TileTypes} from './Tile'
import {spriteSheet} from './spriteSheet'

const $canvas = document.createElement('canvas')
const ctx = $canvas.getContext('2d') as CanvasRenderingContext2D

const width = $canvas.width = 512
const height = $canvas.height = 288

const TILE_SIZE = 8
const COL_COUNT = width / TILE_SIZE
const ROW_COUNT = height / TILE_SIZE

const Main = (() => {
    document.body.appendChild($canvas)

    const grid = new Grid(ROW_COUNT, COL_COUNT, TILE_SIZE)
    const start = grid.tiles[0]
    const end = grid.tiles[grid.tiles.length - 1]

    grid.tiles.filter(t => t.id !== end.id && t.id !== start.id).forEach(t => {
        if (Math.random() < .2) {
            t.type = TileTypes.Wall
        }
    })
    grid.tiles.forEach(t => t.render(ctx))


    const pathFinding = new PathFinding(grid)
    const path = pathFinding.getPath(start, end)
    path.map(t => t.type = TileTypes.Path)

    spriteSheet.onload = () => {
        grid.tiles.forEach(t => t.render(ctx))
    }
})()
