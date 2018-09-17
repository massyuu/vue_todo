import Vue from 'vue'
import Router from 'vue-router'
import HelloTODO from '@/components/HelloTODO'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloTODO
    }
  ]
})
