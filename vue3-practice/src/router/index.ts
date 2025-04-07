import { createRouter, createWebHistory } from 'vue-router' 
import HomeView from '../views/HomeView.vue'
import TsxPage from '../views/testTsx.tsx'
const router = createRouter({
  history: createWebHistory(),  
  routes: [  
    {  
      path: '/',  
      name: 'home',  
      component: HomeView  
    },  
    {  
      path: '/about',  
      name: 'about',  
      component: () => import('../views/AboutView.vue')  
    },
    {
      path: '/test',
      name: 'test',
      component:TsxPage
    }
  ]  
})  
  
export default router 
