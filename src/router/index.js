import Vue from 'vue'
import Router from 'vue-router'
import HelloTODO from '@/components/HelloTODO'
import About from '@/components/About'
import Content from '@/components/Content'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloTODO
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/content',
      name: 'content',
      component: Content
    }
  ]
})
