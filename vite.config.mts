import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'ExtractValid',
            fileName: (format) => `extract-valid.${format}.js`
        },
        sourcemap: true,
        target: "es2015"
    },
})