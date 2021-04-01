import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'
import store from '@/store'
Vue.use(Router)
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      requireAuth: true,
      title: 'Home'
    },
    children: [{
      path: '/',
      name: 'home-index',
      component: resolve => require(['@/pages/home/components/Index'], resolve),
      meta: {
        requireAuth: true,
        title: 'home'
      }
    }, {
      path: 'teacher',
      name: 'teacher',
      component: resolve => require(['@/pages/teacher/teacher'], resolve),
      meta: {
        requireAuth: true,
        title: 'Teacher'
      }
    }, {
      path: 'student',
      name: 'student-manage',
      component: resolve => require(['@/pages/student/student'], resolve),
      meta: {
        requireAuth: true,
        title: 'Student'
      }
    }, {
      path: 'news',
      name: 'news',
      component: resolve => require(['@/pages/news/news'], resolve),
      meta: {
        requireAuth: true,
        title: 'News'
      }
    }, {
      path: 'publication',
      name: 'publication',
      component: resolve => require(['@/pages/publication/publication'], resolve),
      meta: {
        requireAuth: true,
        title: 'Publication'
      }
    }, {
      path: 'writer',
      name: 'writer',
      component: resolve => require(['@/pages/writer/writer'], resolve),
      meta: {
        requireAuth: true,
        title: 'Writer'
      }
    },{
      path: 'research',
      name: 'research',
      component: resolve => require(['@/pages/research/research'], resolve),
      meta: {
        requireAuth: true,
        title: 'Research'
      }
    }, {
      path: 'project',
      name: 'project',
      component: resolve => require(['@/pages/project/project'], resolve),
      meta: {
        requireAuth: true,
        title: 'Project'
      }
    }, {
      path: 'security',
      name: 'security',
      component: resolve => require(['@/pages/security/security'], resolve),
      meta: {
        requireAuth: true,
        title: 'Security'
      }
    }]
  }, {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requireAuth: false,
      title: '登录'
    }
  }
]
const router = new Router({
  routes,
  mode: 'history', //default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

router.beforeEach((to, from, next) => {
  NProgress.done().start()
  next()
  let toName = to.name
  let token = store.state.token

  //返回值为登录状态
  if ((token === null || token === '') && (toName !== 'Login' && to.meta.requireAuth)) {
    router.push({
      path: 'login'
    })
  }else {
    if (token !== null && token !=='' && toName === 'login') {
      router.push({
        path:'/'
      })
    } else {
      next()
    }
  }
})
router.afterEach(route => {
  NProgress.done()
})

export default router
