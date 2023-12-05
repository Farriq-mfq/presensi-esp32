import * as z from 'zod';
export const valiationMode = z.object({
    body: z.object({
        mode: z.enum(["PRESENSI", "REGISTER"], {
            required_error: "Presensi or Register value needed",
        }),
    }),
});


export const validationUserRegister = z.object({
    body: z.object({
        rfid_token: z.string().min(1, { message: "rfid_token must be fill" }),
        name: z.string().min(1, { message: "name must be fill" }),
        username: z.string().min(1, { message: "username must be fill" }),
    }),
})