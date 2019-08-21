import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
let store =new Vuex.Store({
  state:{
    song:'',
    title:'',
    author:'',
    pic:'',
    PlayStatu:true,
    playControl:{},  //用来保存audio元素DOM
    currentTime:0,
    spanPosition:0,
    realWidth:0

  },
  mutations:{
   addToSong(state,value){
     state.song=value
   },
   addToTitle(state,value){
     state.title=value
   },
   addToAuthor(state,value){
     state.author=value
   },
   addToPic(state,value){
     state.pic=value
   },
   changePlayStatu(state,value){
    state.PlayStatu=value
  },
  changeCurrentTime(state,value){
   state.currentTime=value
 },
 changeSpanPosition(state,value){
  state.spanPosition=value
},
changeRealWidth(state,value){
   state.realWidth=value
 },
 }
})
export default store
