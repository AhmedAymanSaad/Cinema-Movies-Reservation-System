import { store } from "./store/store.js";

import Test from "./components/Test.vue";
import ErrorPage from "./components/ErrorPage.vue";
import HomePage from "./components/MainPage/HomePage.vue";
import EventDetails from "./components/MainPage/EventDetails.vue";
import CreateEvent from "./components/Manager/CreateEvent.vue";
import CreateMovie from "./components/Manager/CreateMovie.vue";
import EditEvent from "./components/Manager/EditEvent.vue";
import EditMovie from "./components/Manager/EditMovie.vue";
import AdminControl from "./components/Users/AdminControl.vue";
import Register from "./components/Users/Register.vue";
import SignIn from "./components/Users/SignIn.vue";
import UserReservations from "./components/Users/UserReservations.vue";

export const routes = [
  { path: "", name: "HomePage", component: HomePage },
  { path: "/Test", component: Test },
  { path: "/EventDetails/:eventId", component: EventDetails, name:"EventDetails" },
  {
    path: "/CreateEvent",
    component: CreateEvent,
    name: "CreateEvent",
    beforeEnter(to, from, next) {
      if (store.state.userType == "Manager") {
        next();
      } else {
        console.log("Access Denied");
        next({
          name: "Error",
          params: { errorCode: 401, errorMsg: "Access Denied" },
        });
      }
    },
  },
  {
    path: "/CreateMovie",
    component: CreateMovie,
    name : "CreateMovie",
    beforeEnter(to, from, next) {
      if (store.state.userType == "Manager") {
        next();
      } else {
        console.log("Access Denied");
        next({
          name: "Error",
          params: { errorCode: 401, errorMsg: "Access Denied" },
        });
      }
    },
  },
  {
    path: "/EditEvent/:eventId",
    component: EditEvent,
    name: "EditEvent",
    beforeEnter(to, from, next) {
      if (store.state.userType == "Manager") {
        next();
      } else {
        console.log("Access Denied");
        next({
          name: "Error",
          params: { errorCode: 401, errorMsg: "Access Denied" },
        });
      }
    },
  },
  {
    path: "/EditMovie/:movieId",
    component: EditMovie,
    beforeEnter(to, from, next) {
      if (store.state.userType == "Manager") {
        next();
      } else {
        console.log("Access Denied");
        next({
          name: "Error",
          params: { errorCode: 401, errorMsg: "Access Denied" },
        });
      }
    },
  },
  {
    path: "/Admin",
    component: AdminControl,
    beforeEnter(to, from, next) {
      if (store.state.userType == "Admin") {
        next();
      } else {
        console.log("Access Denied");
        next({
          name: "Error",
          params: { errorCode: 401, errorMsg: "Access Denied" },
        });
      }
    },
  },
  {
    path: "/Register",
    component: Register,
    name: "Register",
    beforeEnter(to, from, next) {
      if (store.state.userType == "Guest") {
        next();
      } else {
        console.log("User already logged in");
        next({ name: "HomePage" });
      }
    },
  },
  {
    path: "/SignIn",
    component: SignIn,
    name: "LogInPage",
    beforeEnter(to, from, next) {
      if (store.state.userType == "Guest") {
        next();
      } else {
        console.log("User logged in");
        next({ name: "HomePage" });
      }
    },
  },
  {
    path: "/Reservations",
    component: UserReservations,
    name: "Reservations",
    beforeEnter(to, from, next) {
      if (store.state.userType == "Customer") {
        next();
      } else {
        console.log("User not Customer");
        next({ name: "LogInPage" });
      }
    },
  },
  {
    path: "/Error",
    name: "Error",
    component: ErrorPage,
    props: true,
  },
  { path: "*", component: ErrorPage },
];
