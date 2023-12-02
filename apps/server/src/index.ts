import events from '@presensi/events';
import cors from 'cors';
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import modeController from "./controllers/modeContorller";
import { env } from "./env";
import { ModeType } from "./types";
import validate from './utils/validation';
import { valiationMode } from './validations';
const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        credentials: true,
    },
    allowEIO3: true
})

app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true
}))

app.use(express.json())
// check connection
io.on('connection', async (socket) => {
    console.log(`CONNECTED CLIENT ${socket.connected}`)

    socket.on(events.WEB_CONNECT, (payload: string) => {
        console.log(`CONNECTED WEB: ${payload}`)
    })

    socket.on(events.IOT_CONNECT, (payload: string) => [
        console.log(`CONNECTED IOT: ${payload}`)
    ])
    const modes = await prisma?.mode.findMany()
    if (modes?.length) {
        socket.emit(events.IOT_MODE, modes[0]?.iot_mode)
    }

    socket.on(events.WEB_MODE, async (payload: ModeType) => {
        const modes = await prisma?.mode.findMany()
        if (modes?.length) {
            const mode = modes[0];
            await prisma?.$transaction([
                prisma?.mode.delete({
                    where: {
                        iot_mode: mode?.iot_mode
                    }
                }),
                prisma?.mode.create({
                    data: {
                        iot_mode: payload
                    }
                })])
        } else {
            await prisma?.mode.create({
                data: {
                    iot_mode: payload
                }
            })
        }
        io.emit(events.IOT_MODE, payload)
    })
})

app.get('/mode', modeController.getMode)

server.listen(env.PORT, () => {
    console.log(`SERVER RUNNING AT : ws://localhost:${env.PORT}`)
})