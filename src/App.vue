<template>
  <div id="app">
    <mt-header class="headder">
    <mt-button slot="left" class="left iconfont icon-tubiaozhizuomobanyihuifu-">music online</mt-button>
  <mt-button slot="right" class="right"><i class="iconfont icon-liebiao" @touchend='showAboutPage'></i></mt-button>
<about/>
</mt-header>
<audio src="https://api.mlwei.com/music/api/wy/?key=523077333&cache=1&type=url&id=108914" ref='myAudio'>
</audio>
<div class="router_link">
  <router-link to='/recommend'>推荐音乐</router-link>
  <router-link to='/hot'>热歌榜</router-link>
 <router-link to='/search'>搜索</router-link>
</div>
    <about  ref='childRef' @childResize='childResize'/>
    <router-view/>
    <div class="miniPlayer" v-show='showMini' @touchend='showChildPlay'><!-- 底部的迷你播放器 -->
      <div class="mini_left">
        <div class="mini_left_img">
    <img :src='pic'>
        </div>
        <div class="mini_left_content">
         <p>{{title}}</p>
         <p>{{author}}</p>
        </div>
      </div>
      <div class="mini_right">
         <i class="iconfont" :class="[isActive?arrowActive:bofangActive]" @touchend.stop='changePlayStatu'></i>
      </div>
    </div>
 <player :toChildPlayer='toChildPlayer' @meNeedHid='meNeedHid'/>
  </div>
</template>

<script>
import about from '@/components/about'
import player from '@/components/player'
export default {
  name: 'App',
  components:{
about,player
},
data(){
  return{
    childRef:null,
    needMove:null,
    showMini:true,
    pic:'',
    author:'',
    title:'',
    isActive:true,
    arrowActive:'icon-arrow-',
    bofangActive:'icon-bofang1',
    toChildPlayer:true

  }

},
methods:{
  childNeedHid(value){
    this.aboutshow=value
  },
  showAboutPage(){
  this.getChildRef().style.left=0
},
  hidCover(){
    this.$refs.childRef.childRef.style.left=this.needMove+'px';
  },
  getChildRef(){
  //this.$refs.needMove
  return this.$refs.childRef.childRef;
},
childResize(value){
if(parseInt(this.getChildRef().style.left)===0){
  return
}
  this.needMove=value;
  this.hidCover()
},
changePlayStatu(){
  this.isActive=!this.isActive;
  this.$refs.myAudio.play();
},
meNeedHid(){

  this.toChildPlayer=!this.toChildPlayer;

},
showChildPlay(){
  this.toChildPlayer=true
}
},
mounted(){
  this.needMove=document.documentElement.clientWidth;
  //setTimeout(()=>{console.log(document.documentElement.offsetHeight);},2000);
  this.hidCover();
   this.$axios.get('https://api.mlwei.com/music/api/wy/?key=523077333&cache=1&type=song&id=108914').then(res=>{
     console.log(res.data);
   })
  //this.getChildRef().style.left=this.needMove;
},
created(){
  var name=encodeURI('江南')
  this.$axios.get(`https://api.mlwei.com/music/api/wy/?key=523077333&id=${name}&type=so&cache=0&nu=10`).then(res=>{
    this.pic=res.data.Body[0].pic;
    this.author=res.data.Body[0].author;
    this.title=res.data.Body[0].title;
    console.log(res.data);
  })
}
}
</script>

<style >
#app{
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
.headder{
height: 80px;
}
.headder .left,.headder .right .iconfont{
  font-size: 24px;
  color:rgb(215, 52, 52)
}
.router_link{

  padding: 15px 0;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 1px solid rgb(163, 163, 162)
}
.router-link-active{
  color: rgb(154, 41, 5);
  padding-bottom: 10px;
  border-bottom: 3px solid rgb(154, 41, 5)
}
.miniPlayer{
  height: 0.19rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background-color: rgba(26, 26, 27,0.9);
  color:white;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;

}
.mini_left{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-around;
  width: 50%;
}
.mini_left .mini_left_img{
  display: flex;
  align-items: center;
  margin-left: -0.04rem;
}
.mini_left .mini_left_content{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-around;
}
.mini_left .mini_left_content p:nth-child(1){
  font-size: 0.048rem;
}
.mini_left .mini_left_content p:nth-child(2){
  color: rgb(233, 233, 233);
  font-size: 0.04rem;
}
.mini_right{
  width: 50%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-around;
  font-size: 0.09rem;
  align-items: center;
}
.mini_right i{
  font-size: inherit
}
.mini_left_img img{
  display: block;
  width: 0.16rem;
  height: 0.16rem;
  border: 1px solid rgb(231, 241, 242);
  box-sizing: border-box;
}
</style>
