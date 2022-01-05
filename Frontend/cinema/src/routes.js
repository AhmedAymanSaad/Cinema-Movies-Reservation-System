import Home from './components/Home.vue'
import PageNotFound from './components/PageNotFound.vue'

export const routes = [
    { path: '', component: Home },
    { path: '*', component: PageNotFound }
  ]
  