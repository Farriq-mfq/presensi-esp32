import * as z from 'zod';
export const valiationMode = z.object({
    body: z.object({
        mode: z.enum(["PRESENSI", "REGISTER"], {
            required_error: "Presensi or Register value needed",
        }),
    }),
});