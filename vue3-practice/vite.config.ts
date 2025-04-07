import { defineConfig } from 'vite'  
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx' // 新增
import { resolve } from 'path'  
  
// https://vitejs.dev/config/  
export default defineConfig({  
  plugins: [vue(),vueJsx()],
  resolve: {  
    alias: {  
      '@': resolve(__dirname, './src')  
    }  
  }  
}) 
