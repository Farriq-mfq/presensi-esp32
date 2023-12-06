import { prisma } from "@presensi/db"
import { Request, Response } from 'express'
export interface infoResponse {
    total_users: number,
    total_presensi: number
}
const infoController = {
    getInfo: async (req: Request, res: Response) => {
        try {
            const users = await prisma.users.count()
            const presences = await prisma.presences.count()
            const info: infoResponse = {
                total_presensi: users,
                total_users: presences
            }
            return res.status(200).json({
                data: info
            })
        } catch (e) {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}


export default infoController