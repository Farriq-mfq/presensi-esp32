import { prisma } from "@presensi/db"
import { Request, Response } from 'express'
const presensiController = {
    getPresences: async (req: Request, res: Response) => {
        try {
            const mode = await prisma.presences.findMany({
                include: {
                    user: true
                }
            })
            return res.json({
                data: mode
            })
        } catch (e) {
            return res.status(500).json({
                message: "internal server error"
            })
        }
    },
    addPresences: async (req: Request, res: Response) => {
        try {
            const rfid_token = req.body.rfid_token
            const userRfid = await prisma.users.findUnique({
                where: {
                    rfid_token
                }
            })

            if (!userRfid) {
                return res.status(400).json({
                    message: "User not found"
                })
            }

            const createPresences = await prisma.presences.create({
                data: {
                    usersId: userRfid.id
                }
            })

            if (createPresences) {
                res.status(200).json({
                    message: "berhasil presensi"
                })
            } else {
                res.status(400).json({
                    message: "gagal presensi"
                })
            }
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: "internal server error" })
        }
    }
}


export default presensiController