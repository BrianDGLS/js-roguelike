import {Astar, Graph, GridNode} from "./astar";

const $canvas = document.createElement('canvas')
const ctx = $canvas.getContext('2d') as CanvasRenderingContext2D

const width = $canvas.width = 512
const height = $canvas.height = 288

const Main = (() => {
    document.body.appendChild($canvas)

    const tileSize = 20
    const grid = [
        [1, 1, 1, 1],
        [0, 1, 1, 0],
        [0, 0, 1, 1]
    ]
    for (let [rowIndex, row] of grid.entries()) {
        for (let [colIndex, col] of row.entries()) {
            ctx.save()
            ctx.translate(colIndex * tileSize, rowIndex * tileSize)
            if (col === 1) {
                ctx.fillStyle = 'gray'
            }
            ctx.fillRect(0, 0, tileSize, tileSize)
            ctx.restore()
        }
    }

    const graph = new Graph(grid, false)
    const start = graph.grid[0][0];
    const end = graph.grid[2][3];

    const path = Astar.search(graph, start, end, {})
    ctx.save()
    ctx.translate(start.x * tileSize, start.y * tileSize)
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, tileSize, tileSize)
    ctx.restore()
    for (let step of path) {
        ctx.save()
        ctx.translate(step.x * tileSize, step.y * tileSize)
        ctx.fillStyle = 'red'
        ctx.fillRect(0, 0, tileSize, tileSize)
        ctx.restore()
    }

})()
