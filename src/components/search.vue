<template lang="html">
  <div class="wrap">
    <mt-search v-model="value" placeholder="搜索歌曲" @keyup.native='judgeEmpty' @touchend.native='judgeEmpty' @keydown.enter.native='toSearch' cancel-text=''></mt-search>
  <p v-show='searchShow' @touchend='toSearch'>搜索 {{value}}</p>
  <ul class="song">
    <li v-for='(item,index) in resultData' @touchend='playSong($event,index)' @touchstart='savePosition'>
       <div class="left">
      <p class="title">{{item.title}} </p>
      <p class="author"> {{item.author}}</p>
    </div>
    <div class="right iconfont icon-bofang ">
    </div>
  </li>
  </ul>
  </div>
</template>

<script>
export default {
  name:'search',
  data(){
    return{
        value:'',
        searchShow:false,
        resultData:[],
        timmer:null,
        handPosition:0
    }


  },
  methods:{
    judgeEmpty(){
      setTimeout(()=>{
        if(this.value){
        this.searchShow=true;
      }else{
         this.searchShow=false
      }},100);
      document.querySelector('.mint-search-list').style.position='static'; //对mint-ui不合理的部分做一个修改
      document.querySelector('.mint-search-list').style.paddingTop=0;
    },
    toSearch(){
      //console.log('hh');
      var namer=this.value;
      if(namer){
        var name=encodeURI(namer);//URL中必须对中文编码才行
        this.$axios.get(`https://api.mlwei.com/music/api/wy/?key=523077333&id=${name}&type=so&cache=0&nu=10`).then(res=>{
          if(res.data.Body){
            this.resultData=res.data.Body;
          }
        });
      }
    },
    playSong(e,index){
       if(e.changedTouches[0].pageY!=this.handPosition){return};//如果是为了滑动不而不是点击
      this.$axios.get(`https://api.mlwei.com/music/api/wy/?key=523077333&cache=1&type=song&id=${this.resultData[index].id}`).then(res=>{
        //console.log(res.data.url);
        this.$store.commit('addToSong',res.data.url);
        this.$store.commit('addToTitle',this.resultData[index].title);
        this.$store.commit('addToAuthor',this.resultData[index].author);
        this.$store.commit('addToPic',this.resultData[index].pic);
        setTimeout(()=>{

          /*--------------*/
            this.timmer = setInterval(()=>{

               if(this.$store.state.playControl.ended||this.$store.state.playControl.paused){//如果当前播放已经结束或暂停 即清除这个时间队列
                 clearInterval(this.timmer);
                 return
             }
                var value= parseInt(this.$store.state.playControl.currentTime);
                this.$store.commit('changeCurrentTime',value);
              var jindu=Math.floor((this.$store.state.playControl.currentTime/this.$store.state.playControl.duration)*100)/100; //这是时间上的进度百分比
                //console.log('serat');

              var widthh=document.querySelector('.main_progress').offsetWidth;
              this.$store.commit('changeSpanPosition',widthh*jindu);
              this.$store.commit('changeRealWidth',widthh*jindu);
              },1000)
            /*--------------*/
          this.$store.state.playControl.play();
          this.$store.commit('changePlayStatu',false)
        },500)
        //this.songUrl=res.data.url
      })
    },
    savePosition(e){
      this.handPosition=e.touches[0].pageY;
      //console.log(e);
    },

  },
  created(){

  }
}
</script>

<style lang="css" scoped>
.mint-search{
  height: auto;
}
p{
  color: #507daf;
  text-indent: 10px;
}
.wrap .song{
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0.02rem;
}
.wrap .song .left{
  float: left;
font-size: 0.05rem
}
.wrap .song .left .author{
  color: rgb(148, 156, 159)
}
.wrap .song .right{
  float: right;
  font-size: 0.07rem;
  vertical-align: middle;
}
.wrap .song li::after{
  content: '';
  display: block;
  clear: both;
}
.wrap .song li{
  margin-top:0.035rem;
  border-bottom: 1px solid rgb(186, 180, 186);
  cursor: pointer;
}
.mint-search-list {
    overflow: auto;
    padding-top: 44px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: static;
}
</style>
