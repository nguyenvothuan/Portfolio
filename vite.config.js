import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Portfolio/' // Thay tên repository của các bạn vào đây nhé
    : '/'
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  base: '/Portfolio/'
})
