<template>
  <div id="app">
    <mt-header class="headder">
    <mt-button slot="left" class="left iconfont icon-tubiaozhizuomobanyihuifu-">music online</mt-button>
  <mt-button slot="right" class="right"><i class="iconfont icon-liebiao" @touchend='showAboutPage'></i></mt-button>
<about/>
</mt-header>
<div class="router_link">
  <router-link to='/recommend'>推荐音乐</router-link>
  <router-link to='/hot'>热歌榜</router-link>
 <router-link to='/searcher'>搜索</router-link>
</div>
    <about  ref='childRef' @childResize='childResize'/>
    <router-view/>
  </div>
</template>

<script>
import about from '@/components/about'
export default {
  name: 'App',
  components:{
about
},
data(){
  return{
    childRef:null,
    needMove:null,

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

},
mounted(){
  this.needMove=document.documentElement.clientWidth;
  //setTimeout(()=>{console.log(document.documentElement.offsetHeight);},2000);
  this.hidCover();

  //this.getChildRef().style.left=this.needMove;
},

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
</style>
