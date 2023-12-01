import express from "express";
import { env } from "./env";
import { createServer } from "http";
import { Server } from "socket.io";
import { WEB_CONNECT } from '@presensi/events'
const app = express()

const server = createServer(app)
const io = new Server(server, {
    // fix connect to esp32
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        credentials: true,
    },
    allowEIO3: true
})

io.on('connection', (socket) => {
    console.log(`CONNECTED CLIENT ${socket.connected}`)
    // socket.on(WEB_CONNECT, (status) => {
    //     console.log(`CONNECTED WEB: ${status}`)
    // })

    socket.on("TEST", () => {
        console.log("test running");
        io.emit("ONLAMPU", 1)
    })

    socket.on("STATE_LAMPU", py => {
        io.emit("STATE_LAMBU_WEB", py)
    })

    socket.on("ESP", (status) => {
        console.log(`CONNECTEDs : ${status}`)
    })
})

server.listen(env.PORT, () => {
    console.log(`SERVER RUNNING AT : ws://localhost:${env.PORT}`)
})