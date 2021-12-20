import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    //是否登录判断
    islogin:''
  },
  mutations:{
    login:(state,n) => {
      //传入登录状态islogin
      let islogin = JSON.parse(n);
      localStorage.setItem('islogin',JSON.stringify(islogin));
      console.log(islogin);
      state.islogin = islogin;
    }
  }
})
