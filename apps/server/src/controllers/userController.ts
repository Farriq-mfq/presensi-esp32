import { prisma } from "@presensi/db"
import { Request, Response } from 'express'
// link : https://stackoverflow.com/questions/75947475/prisma-typeerror-do-not-know-how-to-serialize-a-bigint
BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
};
const userController = {
    getUsers: async (req: Request, res: Response) => {
        try {
            const users = await prisma.users.findMany()
            if (users.length) {
                return res.status(200).json({
                    data: users
                })

            }

        } catch (e) {
            return res.status(500).json({ message: "internal server error" })
        }
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
            return res.status(500).json({ message: "internal server error" })
        }
    },
}


export default userController