import * as z from 'zod'
export const registrasiSchema = z.object({
    name: z.string().min(1, { message: "Nama harus di isi!" }),
    username: z.string().min(1, { message: "Username harus di isi!" }),
})