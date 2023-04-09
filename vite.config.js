import { defineConfig } from 'vite'
import { copy } from "vite-plugin-copy";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                about: './about.html',
            }
        },
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
    }
})