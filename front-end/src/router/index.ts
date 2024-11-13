// /front-end/src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Home from '@/views/Home.vue';
import RemedioCrud from '@/views/crud/RemedioCrud.vue';
import PrescricaoCrud from '@/views/crud/PrescricaoCrud.vue';
import HistoricoCrud from '@/views/crud/HistoricoCrud.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login', // Redireciona para login por padrão
  },
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
    path: '/remedios',
    name: 'remedios',
    component: RemedioCrud,
  },
  {
    path: '/prescricoes',
    name: 'prescricoes',
    component: PrescricaoCrud,
  },
  {
    path: '/historico',
    name: 'historico',
    component: HistoricoCrud,
  }
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
