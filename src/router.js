import Vue from "vue";
import Router from "vue-router";
import firebase from 'firebase/app';
import 'firebase/firestore';
Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      props: true,
      component: () => import("../public/LoginPage.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      props: true,
      component: () => import("../public/SignUppage.vue"),
    },
    {
      path: "/SideBar",
      name: "SideBar",
      props: true,
      component: () => import("../public/SideBar"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../public/DashBoard"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/addblog",
          name: "addblog",
          component: () => import("../public/BlogsPage"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/BlogDetails",
          name: "BlogDetails",
          component: () => import("../public/BlogDetailedView"),
          meta: {
            requiresAuth: true,
          },
        },





        {
          path: "/profile",
          name: "profile",
          component: () => import("../public/MyProfile"),
          meta: {
            requiresAuth: true,
          },
        },

        {
          path: "/aboutus",
          name: "aboutus",
          component: () => import("../public/AboutUs"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "*",
      name: "404PageNotFound",
      props: true,
      component: () => import("../public/404Page"),
      meta: {
        requiresAuth: false,
      },
    },
  ],
  scrollBehavior() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  },
});
router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    const isLoggedIn = !!user; // Check if user is logged in

    if (to.meta.requiresAuth && !isLoggedIn) {
      // If the route requires authentication and the user is not logged in, proceed to the requested route
      next('/');
    } else {
      // For all other cases, proceed to the requested route
      next();
    }
  });
});





export default router;
