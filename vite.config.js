import { defineConfig } from 'vite'
import { copy } from "vite-plugin-copy";

export default defineConfig({
    plugins: [
        copy({
            targets: [
                { src: 'src/static', dest: 'dist/static' }
            ]
        })
    ],
    server: {
        port: 3000,
        strictPort: true
    }
})