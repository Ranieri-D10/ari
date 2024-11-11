// /front-end/src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }, // Indica que a rota é protegida
  },
  {
    path: '/',
    redirect: '/login', // Redireciona para login por padrão
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Middleware global para proteção de rotas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Verifica se o token está presente

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next('/login'); // Redireciona para login se não autenticado
    } else {
      next(); // Prossegue para rota protegida
    }
  } else {
    next(); // Prossegue para rotas públicas
  }
});

export default router;
