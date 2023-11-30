import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { config } from 'dotenv'
config()
export const env = createEnv({
    server: {
        DATABASE_URL: z.string(),
        PORT: z.string()
    },
    runtimeEnv: process.env,
});
