import express from "express";
import { env } from "./env";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express()

const server = createServer(app)
const io = new Server(server, {})


io.on('connection', (socket) => {
    console.log("CLIENT CONNECTED")
})

server.listen(env.PORT, () => {
    console.log(`SERVER RUNNING AT : ws://localhost:${env.PORT}`)
})