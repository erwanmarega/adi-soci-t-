import { createRouter, createWebHistory } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const DEFAULT_TITLE = 'ADI — Agencement, décoration & signalétique pour l’immobilier neuf'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: DEFAULT_TITLE },
    },
    {
      path: '/bureau-de-vente',
      name: 'bureau-de-vente',
      component: () => import('@/views/BureauDeVenteView.vue'),
      meta: { title: 'Bureau de vente — ADI' },
    },
    {
      path: '/logement-temoin',
      name: 'logement-temoin',
      component: () => import('@/views/LogementTemoinView.vue'),
      meta: { title: 'Logement témoin — ADI' },
    },
    {
      path: '/supports-de-communication',
      name: 'supports-de-communication',
      component: () => import('@/views/SupportsCommunicationView.vue'),
      meta: { title: 'Supports de communication — ADI' },
    },
    {
      path: '/pack-investisseur',
      name: 'pack-investisseur',
      component: () => import('@/views/PackInvestisseurView.vue'),
      meta: { title: 'Pack investisseur — ADI' },
    },
    {
      path: '/cuisine',
      name: 'cuisine',
      component: () => import('@/views/CuisineView.vue'),
      meta: { title: 'Cuisine — ADI' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: { title: 'Contact — ADI' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: 'Page introuvable — ADI' },
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ?? DEFAULT_TITLE
})

export default router
