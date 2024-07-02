import express from 'express'
import path from 'path'
import serveStatic from 'serve-static'
import cors from 'cors'
import pg from 'pg'
import { config } from './config.js'
var client = new pg.Client(config.db_conn_string)
client.connect()

var app = express()
const __dirname = path.resolve()
app.use(serveStatic(path.join(__dirname, 'dist')))
app.use(cors())
app.use(express.json());
const port = process.env.PORT || 8080
app.listen(port)

app.get('/points', async (req, res) => {
    let points = await client.query("SELECT * FROM point")
    res.send(points.rows)
})

app.post('/points', async (req, res) => {
    let point = req.body
    await client.query("INSERT INTO point (x, y, name) VALUES ($1, $2, $3)", [point.x, point.y, point.name]).then(async () => {
        let points = await client.query("SELECT * FROM point")
        res.send(points.rows)
    })
})

app.put('/points/:id', async (req, res) => {
    let point = req.body
    await client.query("UPDATE point SET x=$1, y=$2, name=$3 WHERE id=$4", [point.x, point.y, point.name, point.id]).then(async () => {
        let points = await client.query("SELECT * FROM point")
        res.send(points.rows)
    })
})

app.delete('/points/:id', async (req, res) => {
    let id = req.params.id
    await client.query("DELETE FROM point WHERE id=$1", [id]).then(async () => {
        let points = await client.query("SELECT * FROM point")
        res.send(points.rows)
    })
})