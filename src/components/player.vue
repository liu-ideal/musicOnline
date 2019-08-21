<template lang="html">
  <transition name='fade'>
  <div class="wrap" v-show='this.toChildPlayer' @touchmove.prevent='' @scroll.stop=''>
    <div class="clickTohid">
      <i class="iconfont icon-Group" @touchend='hidPlayer'></i>
    </div>
    <div class="songInfor">
  <p class="title">{{this.$store.state.title}}</p>
  <p class="author">{{this.$store.state.author}}</p>
  <div class="imger">
      <img :src="this.$store.state.pic"/>
  </div>
  <p class="lrc">暂不支持歌词功能</p>
    </div>
    <div class="progress">
    <div class="timeStart">
      {{this.$store.state.currentTime|myshouldTime}}
    </div>
    <div class="main_progress" @touchmove='toMove' @touchend='changeProgress'>
      <div class="real_progress" :style="{width:this.$store.state.realWidth+'px'}">
        <span ref='theSpan' :style="{left:this.$store.state.spanPosition+'px'}"></span>
      </div>
    </div>
    <div class="timeTotal">
      {{this.$store.state.playControl.duration|capitalize}}
    </div>
    </div>
    <div class="play" @touchend='changePlayStatu'>
      <i class="iconfont" :class="[this.$store.state.PlayStatu?arrowActive:bofangActive]"></i>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name:'player',
  data(){
    return{
      isActive:true,
      arrowActive:'icon-arrow-',
      bofangActive:'icon-bofang1',
      timeStart:'00:00',
      shouldTime:0,
      timmer:null,
      spanPosition:0,
      realWidth:0
    }
  },

  methods:{
    changePlayStatu(){
      if(this.$store.state.PlayStatu){
        //console.log(this.myRef);
      this.timmer = setInterval(()=>{
         if(this.$store.state.playControl.ended||this.$store.state.playControl.paused){//如果当前播放已经结束 即清除这个时间队列
           //console.log(this.timmer);
           clearInterval(this.timmer);
           return
       }
          var value= parseInt(this.$store.state.playControl.currentTime);
          this.$store.commit('changeCurrentTime',value);
        var jindu=Math.floor((this.$store.state.playControl.currentTime/this.$store.state.playControl.duration)*100)/100; //这是时间上的进度百分比
          //console.log('player');
        var widthh=document.querySelector('.main_progress').offsetWidth;
        this.$store.commit('changeSpanPosition',widthh*jindu);
        this.$store.commit('changeRealWidth',widthh*jindu);
        },1000)
        this.myRef.play();
        this.$store.commit('changePlayStatu',!this.$store.state.PlayStatu)
      }else{
        this.myRef.pause();
        this.$store.commit('changePlayStatu',!this.$store.state.PlayStatu)
      }
    },
    hidPlayer(){
      this.$emit('meNeedHid')
    },
    toMove(e){
      var leftt=document.querySelector('.main_progress').offsetLeft;
      var widthh=document.querySelector('.main_progress').offsetWidth;
      var goMove=e.changedTouches[0].clientX-5-leftt;//重置触点
      if(goMove<0||goMove>widthh){return}
      this.$refs.theSpan.style.left=goMove+'px';
      document.querySelector('.real_progress').style.width=goMove+'px';
      var jindu=Math.floor((goMove/widthh)*100)/100;//这是进度百分比
      var allTime=this.$store.state.playControl.duration;
      var shouldTime=parseInt(allTime*jindu);
      this.shouldTime=shouldTime;
      //console.log(shouldTime);
      //console.log(jindu);
    },
    changeProgress(){
      this.$store.state.playControl.currentTime=this.shouldTime
    },

  },
  computed:{

  },
  props:['toChildPlayer','myRef'],
  mounted(){
  },
  filters: {
  capitalize: function (value) {
    if (!value) return '00:00';
    value = parseInt(value);
    var yushu=value%60;
    var zhengshu= parseInt(value/60);
      return `0${zhengshu}:${yushu}`
  },
  myshouldTime:function(value){//过滤器 对VUEX中的当前播放秒数监听
    var fengzhong=0;
    var miao=0;
    if (!value) return '00:00';
     if(value<60){
       miao=value<10?`0${value}`: value;
       //console.log('one');
       fengzhong=0
     }
     if(value>=60&&value<120){
       fengzhong=1;
       //console.log('tWO');
      miao = value%60<10?`0${value-60}`:value-60
     }
     if(value>=120&&value<180){
       fengzhong=2;
       miao = value%60<10?`0${value-120}`:value-120
     }
     if(value>=180&&value<240){
       fengzhong=3;
       miao = value%60<10?`0${value-180}`:value-180
     }
     if(value>=240&&value<300){
       fengzhong=4;
       miao = value%60<10?`0${value-240}`:value-240
     }
     if(value>=300&&value<360){
       fengzhong=5;
       miao = value%60<10?`0${value-300}`:value-300
     }
     if(value>=360){
       fengzhong=6;
       miao = `00`
     }
    return `0${fengzhong}:${miao}`
  }
}
}
</script>

<style lang="css" scoped>
.wrap{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(42, 71, 77, 1);
  color: white;
  text-align: center;
  z-index: 99;
}
.wrap .clickTohid{
  text-align: center;
  padding-top: 0.04rem;
  animation-name: tohidTips;
  animation-duration: 1s;
  animation-timing-function: ease;;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.wrap .clickTohid i{
  font-size: 0.056rem
}
.wrap .songInfor{
  padding-top: 0.06rem
}
.wrap .songInfor .title{
  font-size: 0.043rem;
  margin-bottom: 0.03rem;
}
.wrap .songInfor .author{
  font-size: 14px;
  margin-bottom: 0.04rem;
  color: rgb(228, 228, 228)
}
.wrap .songInfor .imger{
  position:relative;
  margin-top: 0.1rem;
}
.wrap .songInfor .imger img{
  width: 0.53rem;
  height: 0.53rem;
  box-sizing: border-box;
  border: 4px solid rgb(237, 238, 236);
  position:relative;
}
.wrap .play{
  width: 0.14rem;
  height: 0.14rem;
  border-radius: 0.07rem;
  box-sizing: border-box;
  border: 3px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 0.1rem;
}
.wrap .play i{
  font-size: 0.063rem;
}
.wrap .songInfor .lrc{
  margin-top: 0.054rem;
  font-size: 0.04rem;
}
.wrap .progress{
display: flex;
flex-wrap: nowrap;
flex-direction: row;
justify-content: space-around;
align-items: center;
margin-top: 0.18rem;
font-size: 0.04rem;
}
.wrap .progress .main_progress{
  width: 70%;
  height: 0.01rem;
  background-color: black;
  position: relative;
}
.wrap .progress .main_progress .real_progress{
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: #259ef7;
}
.wrap .progress .main_progress .real_progress span{
  position: absolute;
  width: 0.032rem;
  height: 0.032rem;
  border-radius: 100%;
  background-color: #259ef7;
  top: -0.01rem;
  left: 0;
}
@keyframes tohidTips {
  from{opacity: 1}
  to{opacity: 0.2}
}
.fade-enter-active, .fade-leave-active {
  transition: height 0.6s ease-out;
}
.fade-enter, .fade-leave-to {
  height: 0;
}
</style>
