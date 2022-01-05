import Home from './components/Home.vue'
import PageNotFound from './components/PageNotFound.vue'
import HomePage from './components/MainPage/HomePage.vue'
import EventDetails from './components/MainPage/EventDetails.vue'
import CreateEvent from './components/Manager/CreateEvent.vue'
import CreateMovie from './components/Manager/CreateMovie.vue'
import EditEvent from './components/Manager/EditEvent.vue'
import EditMovie from './components/Manager/EditMovie.vue'
import AdminControl from './components/Users/AdminControl.vue'
import Register from './components/Users/Register.vue'
import SignIn from './components/Users/SignIn.vue'
import UserReservations from './components/Users/UserReservations.vue'

export const routes = [
    { path: '', component: HomePage },
    { path: '/Home', component: Home },
    { path: '/EventDetails/:eventId', component: EventDetails }, 
    { path: '/CreateEvent', component: CreateEvent }, 
    { path: '/CreateMovie', component: CreateMovie },
    { path: '/EditEvent/:eventId', component: EditEvent },  //TODO: make the route custom to the specific event
    { path: '/EditMovie/:movieId', component: EditMovie },  //TODO: make the route custom to the specific movie
    { path: '/Admin', component: AdminControl },
    { path: '/Register', component: Register },
    { path: 'SignIn', component: SignIn },
    { path: 'Reservations', component: UserReservations },
    { path: '*', component: PageNotFound }
  ]
  