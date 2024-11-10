import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    emptyOutDir: true,
    rollupOptions: {
      treeshake: {
        annotations: false,
      },
    },
  },
  server: {
    host: true,
    port: 5000,
    open: true,
  },
})
