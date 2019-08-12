<template>
  <div id="app">
    <mt-header fixed class="headder">
    <mt-button slot="left" class="left iconfont icon-tubiaozhizuomobanyihuifu-">music online</mt-button>
  <mt-button slot="right" class="right"><i class="iconfont icon-liebiao" @touchend='showAboutPage'></i></mt-button>
<about/>
</mt-header>
<div class="router_link">
  <router-link to='recommend'>推荐歌单</router-link>
  <router-link to='hot'>热歌榜</router-link>
 <router-link to='searcher'>搜索</router-link>
</div>
    <router-view/>
    <about v-show='aboutshow' @childNeedHid='childNeedHid'/>
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
    aboutshow:false
  }

},
methods:{
  childNeedHid(value){
    this.aboutshow=value
  },
  showAboutPage(){
    console.log('liupei');
  this.aboutshow=true;
  setTimeout(()=>{this.$store.commit('changeTransform','0')},1)

  }
}

}
</script>

<style >
.headder{
height: 80px;
}
.headder .left,.headder .right .iconfont{
  font-size: 24px;
  color:rgb(215, 52, 52)
}
.router_link{
  margin-top: 80px;
  padding: 15px 0;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 1px solid rgb(163, 163, 162)
}

</style>
