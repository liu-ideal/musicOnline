<template lang="html">
  <div class="wrap">
    <div class="wrap_cover" @touchend='hidCover' :style="{transform:this.$store.state.needchange}" ref='aCover'>
    </div>
    <ul class="about" :style="{transform:this.$store.state.needchange}">
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
      needMove:0,
      viewWidth:null
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

      var pro=new Promise((resolve,reject)=>{
        this.$store.commit('changeTransform',this.viewWidth);
        setTimeout(()=>{
      resolve()
        },600)
      }).then((value)=>{
        this.$emit('childNeedHid',false)
      })
    }
  },
  mounted(){
    this.viewWidth=document.documentElement.clientWidth;
  },
  computed:{

  },

}
</script>

<style lang="css" scoped>
.wrap_cover{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vh;
  height: 100vh;
  background-color:black;
  opacity: 0.8;
  z-index: 99;
  transition: all .5s;
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
