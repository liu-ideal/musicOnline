<template lang="html">
  <transition name='fade'>
  <div class="wrap" v-show='this.toChildPlayer'>
    <div class="clickTohid">
      <i class="iconfont icon-Group" @touchend='hidPlayer'></i>
    </div>
    <div class="songInfor">
  <p class="title">{{title}}</p>
  <p class="author">{{author}}</p>
  <div class="imger">
      <img :src="imgSrc"/>
  </div>
  <p class="lrc">暂不支持歌词功能</p>
    </div>
    <div class="progress">
    <div class="timeStart">
      {{timeStart}}
    </div>
    <div class="main_progress">
      <div class="real_progress">
        <span></span>
      </div>
    </div>
    <div class="timeTotal">
      {{timeTotal}}
    </div>
    </div>
    <div class="play" @touchend='changePlayStatu'>
      <i class="iconfont" :class="[isActive?arrowActive:bofangActive]"></i>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name:'player',
  data(){
    return{
      title:'你之所以是你',
      author:'方晓轩',
      imgSrc:"https://api.mlwei.com/music/api/wy/?key=523077333&cache=0&type=pic&id=96533",
      isActive:true,
      arrowActive:'icon-arrow-',
      bofangActive:'icon-bofang1',
      timeStart:'00:00',
      timeTotal:'03:00'
    }
  },
  methods:{
    changePlayStatu(){
      this.isActive=!this.isActive
    },
    hidPlayer(){
      this.$emit('meNeedHid')
    }
  },
  props:['toChildPlayer']
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
  width: 50%;
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
