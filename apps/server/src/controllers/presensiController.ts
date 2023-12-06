import { prisma } from "@presensi/db"
import { Request, Response } from 'express'
const presensiController = {
    getPresences: async (req: Request, res: Response) => {
        try {
            const presences = await prisma.presences.findMany({
                include: {
                    user: true
                }
            })
            return res.json({
                data: presences
            })
        } catch (e) {
            return res.status(500).json({
                message: "internal server error"
            })
        }
    },
    getPresencesToday: async (req: Request, res: Response) => {
        try {
            const presences = await prisma.presences.findMany({
                include: {
                    user: true
                },
                where: {
                    createdAt: new Date()
                }
            })
            return res.json({
                data: presences
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

            const checkIfAlreadyPresence = await prisma.presences.findFirst({
                where: {
                    usersId: userRfid.id,
                    createdAt: {
                        equals: new Date(),
                    }
                }
            })
            if (checkIfAlreadyPresence) return res.status(400).json({ message: "Maaf anda sudah presensi" })
            const createPresences = await prisma.presences.create({
                data: {
                    usersId: userRfid.id
                },
                include: {
                    user: true
                }
            })

            if (createPresences) {
                res.status(200).json({
                    message: `Terimakasih ${createPresences.user.name} Berhasil Presensi`
                })
            } else {
                res.status(400).json({
                    message: "gagal presensi"
                })
            }
        } catch (e) {
            return res.status(500).json({ message: "internal server error" })
        }
    }
}


export default presensiController