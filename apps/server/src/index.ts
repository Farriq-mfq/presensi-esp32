import express from "express";
import { env } from "./env";

const app = express()

app.get("/", function (req, res) {
    res.send('tset serer')
})
app.listen(env.PORT, () => {
    console.log(`SERVER RUNNING AT : http://localhost:${env.PORT}`)
})