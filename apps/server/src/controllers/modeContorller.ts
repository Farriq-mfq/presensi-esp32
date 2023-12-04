import { prisma } from "@presensi/db"
import { Request, Response } from 'express'
const modeController = {
    getMode: async (req: Request, res: Response) => {
        const mode = await prisma.mode.findFirst()
        return res.json({
            data: mode
        })
    }
}


export default modeController