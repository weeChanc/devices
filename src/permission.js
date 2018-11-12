import router from './router'
import store from './store'

const test = false

router.beforeEach((to, from, next) => {
  if (test) {
    next()
    return
  }

  if(store.state.isLogin){
    next()
  }else{
    if(to.path !== '/login'){
      next({path:'/login'})
    }
    if(to.path === '/login'){
      next()
    }
  }



})
