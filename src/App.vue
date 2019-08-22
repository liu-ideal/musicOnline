<template>
  <div id="app">
    <mt-header class="headder">
    <mt-button slot="left" class="left iconfont icon-tubiaozhizuomobanyihuifu-">music online</mt-button>
  <mt-button slot="right" class="right"><i class="iconfont icon-liebiao" @touchend='showAboutPage'></i></mt-button>
<about/>
</mt-header>
<audio :src="this.$store.state.song" ref='myAudio'>
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
    <img :src='this.$store.state.pic'>
        </div>
        <div class="mini_left_content">
         <p>{{this.$store.state.title}}</p>
         <p>{{this.$store.state.author}}</p>
        </div>
      </div>
      <div class="mini_right">
         <i class="iconfont" :class="[this.$store.state.PlayStatu?arrowActive:bofangActive]" @touchend.stop='changePlayStatu'></i>
      </div>
    </div>
 <player :toChildPlayer='toChildPlayer' @meNeedHid='meNeedHid' :myRef='myRef'/>
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
    isActive:true,
    arrowActive:'icon-arrow-',
    bofangActive:'icon-bofang1',
    toChildPlayer:false,
    songUrl:'',
    myRef:null,
    timmer:null

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
  if(this.$store.state.PlayStatu){
  /*--------------*/
    this.timmer = setInterval(()=>{
       if(this.$store.state.playControl.ended||this.$store.state.playControl.paused){//如果当前播放已经结束 即清除这个时间队列
         //console.log(this.timmer);
         clearInterval(this.timmer);
         return
     }
        var value= parseInt(this.$store.state.playControl.currentTime);
        this.$store.commit('changeCurrentTime',value);
      var jindu=Math.floor((this.$store.state.playControl.currentTime/this.$store.state.playControl.duration)*100)/100; //这是时间上的进度百分比
        //console.log('app');
      var widthh=document.querySelector('.main_progress').offsetWidth;
      this.$store.commit('changeSpanPosition',widthh*jindu);
      this.$store.commit('changeRealWidth',widthh*jindu);
      },1000)
    /*--------------*/
    this.$refs.myAudio.play();
    this.$store.commit('changePlayStatu',!this.$store.state.PlayStatu)
  }else{
    this.$refs.myAudio.pause();
    this.$store.commit('changePlayStatu',!this.$store.state.PlayStatu)
  }
},
meNeedHid(){

  this.toChildPlayer=!this.toChildPlayer;

},
showChildPlay(){
  this.toChildPlayer=true
}
},
mounted(){
  this.myRef=this.$refs.myAudio;
   this.$store.state.playControl=this.$refs.myAudio;//音乐播放控制器-即audio元素
  this.needMove=document.documentElement.clientWidth;
  //setTimeout(()=>{console.log(document.documentElement.offsetHeight);},2000);
  this.hidCover();
   this.$axios.get('https://api.mlwei.com/music/api/wy/?key=523077333&cache=1&type=song&id=108914').then(res=>{
     //console.log(res.data);
     this.songUrl=res.data.url
   })
  //this.getChildRef().style.left=this.needMove;
},
created(){
  var name=encodeURI('江南');
  this.$axios.get(`https://api.mlwei.com/music/api/wy/?key=523077333&id=${name}&type=so&cache=0&nu=10`).then(res=>{
    this.$store.commit('addToSong',res.data.Body[0].url)
    this.$store.commit('addToPic',res.data.Body[0].pic);
    this.$store.commit('addToAuthor',res.data.Body[0].author);
    this.$store.commit('addToTitle',this.title=res.data.Body[0].title);

  })
},
computed:{

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
#app .headder{
height: 80px;
}
#app .headder .left,#app .headder .right .iconfont{
  font-size: 24px;
  color:rgb(215, 52, 52)
}
#app .router_link{

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
  flex-grow: 1;
  max-width: 60%;
}
.mini_left .mini_left_img{
  display: flex;
  align-items: center;
  margin-left: 0.02rem
}
.mini_left .mini_left_content{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  margin-left: 0.06rem
}
.mini_left .mini_left_content p:nth-child(1){
  font-size: 0.042rem;
  text-overflow:ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.mini_left .mini_left_content p:nth-child(2){
  color: rgb(233, 233, 233);
  font-size: 0.04rem;
}
.mini_right{
  width: 40%;
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
