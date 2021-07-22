import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Portfolio/' 
    : '/'
}
// 
export default defineConfig({
  plugins: [reactRefresh()],
  base: '/Portfolio/'
})
