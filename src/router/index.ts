import { createRouter, createWebHistory } from 'vue-router'
import Admin from '@/layout/AdminLayout.vue'
import UserProfile from '@/views/UserProfile.vue'
import Login from '@/views/LoginView.vue'
import AdminHome from '@/views/AdminHome.vue'
import PublicationsView from '@/views/PublicationsView.vue'
import JuntaDirectiva from '@/views/JuntaDirectiva.vue'
import useAuthStore from '@/store/authStore'
import PersonalAdmin from '@/views/PersonalAdmin.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true },
      component: Admin,
      children: [
        {
          path: 'profile/:id',
          name: 'profile',
          props: true,
          meta: { requiresAuth: true },
          component: UserProfile
        },
        {
          path: 'sign-up',
          name: 'sign-up',
          meta: { requiresAuth: false },
          component: UserProfile
        },
        {
          path: 'init',
          name: 'init',
          meta: { requiresAuth: true },
          component: AdminHome
        },
        {
          path: 'noticias',
          name: 'noticias',
          meta: { requiresAuth: true },
          component: PublicationsView
        },
        {
          path: 'junta',
          name: 'junta',
          meta: { requireAuth: true},
          component: JuntaDirectiva
        },
         {
          path: 'personal-admin',
          name: 'personal-admin',
          meta: { requireAuth: true},
          component: PersonalAdmin
        }
      ]
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
  if(to.meta.requiresAuth && !auth.isAuthenticated){
    next({ name: 'login' });
  }else{
    next();
  }
})

export default router
