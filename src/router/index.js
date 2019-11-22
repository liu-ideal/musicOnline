import Vue from 'vue'
import Router from 'vue-router'
import recommend from '../components/recommend'
import hot from '../components/hot'
import search from '../components/search'
import recom_detail from '../components/recom_detail'
Vue.use(Router)
export default new Router({
  routes: [
    {path: '/', redirect: 'recommend'},
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
    {
      path:'/recommend/detail/:id',
      name:'detail',
      component:recom_detail
    }

  ]
})
