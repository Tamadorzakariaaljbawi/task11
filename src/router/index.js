import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: '/',
    name: 'hello',
    component: () => import('@/components/HelloWorld.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Main.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  let islogin =localStorage.getItem('token');


  if (to.matched.some((record )=> record.meta.requiresAuth) && !islogin) {

      next('/login');

  } else {
    console.log('next next',next())
  }

})

export default router;
