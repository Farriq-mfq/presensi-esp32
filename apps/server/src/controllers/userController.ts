import { prisma } from "@presensi/db"
import { Request, Response } from 'express'
import * as z from 'zod'
import { validationUserRegister } from "../validations"
const userController = {
    getUsers: async (req: Request, res: Response) => {
        const users = await prisma.mode.findMany()
        return res.json({
            data: users
        })
    },
    addUser: async (req: Request, res: Response) => {
        try {
            const { name, rfid_token, username } = req.body as {
                username: string,
                name: string,
                rfid_token: number
            }
            const createUser = await prisma.users.create({
                data: {
                    username,
                    rfid_token,
                    name
                }
            })
            if (createUser) {
                return res.status(200).json({
                    message: "berhasil registrasi user"
                })
            }
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: "internal server error" })
        }
    },
}


export default userController