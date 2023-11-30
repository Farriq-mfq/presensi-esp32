import { defineConfig } from 'tsup'
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
    entry: ['src/index.ts'],
    dts: true,
    format: ['cjs', 'esm'],
    splitting: false,
    sourcemap: true,
    minify: isProduction,
    clean: true,
})
