import { Socket } from "socket.io"
import { Request, Response } from 'express'
import events from '@presensi/events'
import { prisma } from "@presensi/db"
const modeController = {
    // handleChangeMode: (socket: Socket) => {
    //     return async (req: Request, res: Response) => {
    //         try {
    //             consts updatedMode = await prisma.mode.upsert({
    //                 where: {
    //                     mode: req.body.mode
    //                 },
    //                 update: {
    //                     mode: req.body.mode
    //                 },
    //                 create: {
    //                     mode: req.body.mode
    //                 }
    //             })
    //             socket.emit(events.WEB_MODE, updatedMode.mode);
    //             return res.json(updatedMode)
    //         } catch (e) {
    //             return res.status(500).json({
    //                 message: "internal server error"
    //             })
    //         }
    //     }
    // }
    getMode: async (req: Request, res: Response) => {
        const mode = await prisma.mode.findFirst()
        return res.json({
            data: mode
        })
    }
}


export default modeController