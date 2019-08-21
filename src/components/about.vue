<template lang="html">

  <div class="wrap" ref='mydiv' @touchmove.prevent=''>
    <div class="wrap_cover" @touchend='hidCover'>
    </div>
    <ul class="about">
      <li v-for='(item,index) in list' :class="{active:item.class}" @touchstart='isTouching(index)' @touchend='noTouching(index)'>{{item.content}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'about',
  data(){
    return{
      list:[{class:false,content:'下载APP'},{class:false,content:'关于作者'},{class:false,content:'关于版本'},{class:false,content:'联系我们'}],
      viewWidth:null,
      childRef:null
    }
  },
  methods:{
    isTouching(index){
      this.list[index].class=true
    },
    noTouching(index){
      this.list[index].class=false
    },
    hidCover(){
    this.$refs.mydiv.style.left=this.viewWidth+'px';
  },
    windowResize(){
      this.viewWidth=document.documentElement.clientWidth;
      this.$emit('childResize',this.viewWidth)
    }
  },
  mounted(){//操作DOM实现过渡效果了,其他方法好像不好做，因为要动态获取设备的宽度
    window.addEventListener('resize',this.windowResize,false)
    this.viewWidth=document.documentElement.clientWidth;
    this.childRef=this.$refs.mydiv;
  },
  computed:{

  },
  props:['aboutshow']
}
</script>

<style lang="css" scoped>
.wrap{
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  transition: left .3s;
}
.wrap_cover{
  position: absolute;
  top: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background-color:black;
  opacity: 0.8;
  z-index: 99;
}

.about{
  position: absolute;
  top:10px;
  right: 10px;
  z-index: 100;
  color: rgb(227, 215, 230)
}
.about li{
  padding: 10px 10px;
  letter-spacing: 5px;
}
.active{
  background: rgb(172, 81, 52);
  color: rgb(175, 171, 185);
}
</style>
