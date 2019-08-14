import Vue from 'vue'
import Router from 'vue-router'
import recommend from '@/components/recommend'
import hot from '@/components/hot'
import search from '@/components/search'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    },
    {
      path:'/hot',
      name:'hot',
      component:hot
    },
    {
      path:'/search',
      name:'search',
      component:search
    },
  ]
})
