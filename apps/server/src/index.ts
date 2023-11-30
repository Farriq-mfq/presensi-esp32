import express from "express";
import { env } from "./env";
import { createServer } from "http";
import { Server } from "socket.io";
import { WEB_CONNECT } from '@presensi/events'
const app = express()

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
})

io.on('connection', (socket) => {
    console.log(`CONNECTED CLIENT ${socket.connected}`)
    socket.on(WEB_CONNECT, (status) => {
        console.log(`CONNECTED WEB: ${status}`)
    })
})

server.listen(env.PORT, () => {
    console.log(`SERVER RUNNING AT : ws://localhost:${env.PORT}`)
})