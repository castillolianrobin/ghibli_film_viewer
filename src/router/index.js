import Vue from 'vue'
import VueRouter from 'vue-router'
import ListView from '../views/ListView.vue'
import DetailsView from '../views/DetailsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'List',
    component: ListView
  },
  {
    path: '/view/:id',
    name: 'Details',
    component: DetailsView
  },
]

const router = new VueRouter({
  routes
})

export default router
