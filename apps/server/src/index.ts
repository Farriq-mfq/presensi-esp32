import events from '@presensi/events';
import cors from 'cors';
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import infoController from './controllers/infoController';
import modeController from "./controllers/modeContorller";
import presensiController from './controllers/presensiController';
import userController from './controllers/userController';
import { env } from "./env";
import { ModeType } from "./types";
import validate from './utils/validation';
import { validationUserRegister } from './validations';
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

    socket.on(events.IOT_CONNECT, (payload: string) => {
        // console.log(`CONNECTED IOT: ${payload}`)
        io.emit(events.IOT_CONNECT_WEB, true)
    })

    socket.on(events.CALL_IOT_CONNECT, (payload) => {
        io.emit(events.RECEIVE_CALL_FROM_WEB_IOT, payload)
    })


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

    socket.on(events.RFID_REGISTER, (payload) => {
        console.log(payload)
        io.emit(events.RFID_WEB_RESULT_REGISTER, payload)
    })
    socket.on(events.RFID_PRESENSI, (payload) => {
        console.log(payload)
        io.emit(events.RFID_WEB_RESULT_PRESENSI, payload)
    })
})

app.get('/mode', modeController.getMode)
app.get('/users', userController.getUsers)
app.post('/users', validate(validationUserRegister), userController.addUser)
app.delete('/users/:id', userController.deleteUser)
app.get('/presences', presensiController.getPresences)
app.post('/presences', presensiController.addPresences)
app.get('/info', infoController.getInfo)

server.listen(env.PORT, () => {
    console.log(`SERVER RUNNING AT : ws://localhost:${env.PORT}`)
})