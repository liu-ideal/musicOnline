import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
let store =new Vuex.Store({
  state:{
    needchange:null,

  },
  mutations:{
   changeTransform(state,value){
     state.needchange=`translateX(${value}px)`
   }
  }
})
export default store
