import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login.vue'
import me from '../components/me.vue'
import fans from '../components/fans.vue'
import like from '../components/like.vue'
import mainPage from '../views/mainPage.vue'
import playlist from '../views/playlist.vue'
import search from '../views/search.vue'
import recommend from '../views/recommend.vue'
import main from '../views/main.vue'
import community from '../views/community.vue'
import modify from '../components/modifyme.vue'
import other from '../components/other.vue'
Vue.use(Router)


export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/tjmusic',
            component: main,
            redirect: '/tjmusic/mainPage',
            children: [{
                    path: '/tjmusic/mainPage',
                    //component: () => import('../views/mainPage.vue'),
                    redirect: '/tjmusic/mainPage/playlist',
                    component: mainPage,
                    children: [{
                            path: '/tjmusic/mainPage/playlist', // 正在播放列表
                            //component: () => import('../views/playlist.vue'),
                            component: playlist,
                            meta: {
                                keepAlive: true
                            }
                        },
                        {
                            path: '/tjmusic/mainPage/search', // 搜索列表
                            //component: () => import('../views/search.vue'),
                            component: search,
                            meta: {
                                keepAlive: true
                            }
                        },
                        {
                            path: '/tjmusic/mainPage/recommend', // 搜索列表
                            //component: () => import('../views/recommend.vue'),
                            component: recommend,
                            meta: {
                                keepAlive: true
                            }
                        }
                    ]
                },
                {
                    path: '/tjmusic/personal',
                    //component: () => import('../views/mainPage.vue'),
                    redirect: '/tjmusic/personal/me',
                },
                {
                    path: '/tjmusic/personal/me',
                    //component: () => import('../views/mainPage.vue'),
                    component: me
                },
                {
                    path: '/tjmusic/personal/other/:id',
                    //component: () => import('../views/mainPage.vue'),
                    component: other
                },
                {
                    path: '/tjmusic/personal/me/modify',
                    //component: () => import('../views/mainPage.vue'),
                    component: modify
                },

                {
                    path: '/tjmusic/personal/like/:id',
                    //component: () => import('../views/mainPage.vue'),
                    component: like
                },
                {
                    path: '/tjmusic/personal/fans/:id',
                    //component: () => import('../views/mainPage.vue'),
                    component: fans
                },
                {
                    path: '/tjmusic/community',
                    //component: () => import('../views/mainPage.vue'),
                    component: community
                },

            ]
        }
    ]
})