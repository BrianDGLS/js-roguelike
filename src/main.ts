import {Grid} from './Grid'
import {PathFinding} from './PathFinding'

const $canvas = document.createElement('canvas')
const ctx = $canvas.getContext('2d') as CanvasRenderingContext2D

const width = $canvas.width = 512
const height = $canvas.height = 288

const TILE_SIZE = 16
const COL_COUNT = width / TILE_SIZE
const ROW_COUNT = height / TILE_SIZE

const Main = (() => {
    document.body.appendChild($canvas)

    const grid = new Grid(ROW_COUNT, COL_COUNT, TILE_SIZE)
    grid.tiles.forEach(t => t.render(ctx))

    const start = grid.tiles[0]
    const end = grid.tiles[grid.tiles.length - 1]

    start.color = 'green'
    start.render(ctx)

    const pathFinding = new PathFinding(grid)
    const path = pathFinding.getPath(start, end)

    path.forEach(t => {
        t.color = 'blue'
        t.render(ctx)
    })

    end.color = 'red'
    end.render(ctx)
})()
