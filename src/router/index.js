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
Vue.use(Router)


export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: {requireAuth: false}
        },
        {
            path: '/tjmusic',
            component: main,
            redirect: '/tjmusic/mainPage',
            meta: {requireAuth: true },
            beforeEnter: function(to, from, next) {
            if (localStorage.getItem("userToken")) {
              next();
            }
            else {
              alert("请先登录");
              next("/login");
            }
          },
            children:[
                {
                    path: '/tjmusic/mainPage',
                    //component: () => import('../views/mainPage.vue'),
                    redirect: '/tjmusic/mainPage/playlist',
                    component: mainPage,
                    children: [
                      {
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
                    path: '/tjmusic/personal/like',
                    //component: () => import('../views/mainPage.vue'),
                    component: like
                },
                {
                    path: '/tjmusic/personal/fans',
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
