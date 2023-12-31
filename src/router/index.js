import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Cookie from 'js-cookie'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Main",
        component: Main,
        redirect: '/home',
        children: [
            {
                path: "/",
                name: "home",
                component: () => import("../views/Home.vue"),
            },
            {
                path: "/actor",
                name: "actor",
                component: () => import("../views/Actor.vue"),
            },
            {
                path: "/movie",
                name: "movie",
                component: () => import("../views/Movie.vue"),
            },
            {
                path: "/editMovie",
                name: "editMovie",
                component: () => import("../views/EditMovie.vue"),
            },
            {
                path: "/editActor",
                name: "editActor",
                component: () => import("../views/EditActor.vue"),
            },
            {
                path: "/editMovieActor",
                name: "editMovieActor",
                component: () => import("../views/EditMovieActor.vue"),
            },
            {
                path: "/editRecommend",
                name: "editRecommend",
                component: () => import("../views/EditRecommend.vue"),
            },
            {
                path: "/moviePlay",
                name: "moviePlay",
                component: () => import("../views/MoviePlayer.vue"),
            },
        ],
    },

    {
        path: "/login",
        name: "login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/Register.vue"),
    },
];

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    const isLogin = window.sessionStorage.getItem('token') ? true : false;
    console.log(isLogin);
    if (to.path == "/login" || to.path == "/register") {
        next();
    } else {
        isLogin ? next() : next("/login");
    }
});

export default router;
