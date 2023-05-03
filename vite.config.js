// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import reactRefresh from '@vitejs/plugin-react-refresh'

export default {
  plugins: [reactRefresh()],
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', 'react-js-pagination']
    }
  }
}
