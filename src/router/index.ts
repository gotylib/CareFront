import { createRouter, createWebHistory } from 'vue-router'
import RegisterOrLogin from '@/components/Pages/Auth.vue'
import Auth from '@/components/Pages/Auth.vue'
import Shop from '@/components/Pages/Shop.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'auth',
      component: Auth,
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop,
      meta: {requiresAuth : true}
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router
