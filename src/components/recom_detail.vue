<template lang="html">
<div class="wrap">
  <p class="introduce">简介:这是一个歌单</p>
  <h3>歌曲列表</h3>
  <ul>
    <li v-for='(item,index) in needDisplayList' @touchend='playSong($event,index)' @touchstart='savePosition'>
      <div class="left index">
         {{index +1}}
      </div>
       <div class="left">
      <p class="title">{{item.title}} </p>
      <p class="author"> {{item.author}}</p>
    </div>
    <div class="right iconfont icon-bofang">

    </div>
  </li>
  </ul>
    <p class="isloading" v-show='canSee'>{{isloading}}</p>
</div>
</template>

<script>
import { Indicator } from 'mint-ui';
export default {
  name:'recom_detail',
  data(){
    return {
      isloading:'数据加载中,请稍等...',
      canSee:false,
       songList:this.$route.params.dataa,
       needDisplayList:[],
       every:10,
       count:0,
       nomore:false,
       timmer:null,
       handPosition:0
    }
  },
  methods:{
    lazyLoad() {
if(!this.nomore){
  var total = document.documentElement.scrollHeight; //scrollHeight表示元素总高度.不管可见不可见，也不管有没有设置OVERFLOW为HIDDEN 它是由元素中有多少内容决定的
  var canSee = document.documentElement.clientHeight; //offsetHeight与clientHeight的区别-->从网上得到资料与自己实践得来的结果有很大不同 在这里只有用clientHeight才能得到想要的结果 而offsetHeight得到的与scrollHeight一样
  var scroll=document.documentElement.scrollTop||document.body.scrollTop;//兼容写法
  if (total - canSee <= scroll+80) { //这个表示滚动条触底
    window.removeEventListener('touchmove',this.lazyLoad);//这时先关掉滑动 不然会可能会一直触发
    window.removeEventListener('scroll',this.lazyLoad);
    //console.log('ok');
    //count+=10;
    if(this.count+10>this.songList.length){
      this.every=this.songList.length-this.count;
      if(this.every===0){
        this.every++
      }
    }
    this.canSee=true;
    setTimeout(()=>{
      for(let i=this.count;i<this.count+this.every;i++){
        if(!this.songList[i]){
          this.nomore=true;
          this.canSee=true;
          this.isloading='没有更多了'
          Indicator.close();
          return
        }
        if (this.songList[i].title.length > 25) {

          var ti = this.songList[i].title.slice(0, 20) + '...';
          //console.log(ti);
          this.songList[i].title = ti
        }
        this.needDisplayList.push(this.songList[i]);

      }
      this.count+=this.every;
      window.addEventListener('touchmove',this.lazyLoad,false);//数据加载完后再开启滑动绑定
      window.addEventListener('scroll',this.lazyLoad,false);
      Indicator.close();
      this.canSee=false;
    },1000)

    //console.log(this.recommendSong);
    Indicator.open()
  }
}
      //if(total-canSee)
      // console.log(total-canSee);
      // console.log(document.documentElement.scrollTop);
    },
    savePosition(e){
      this.handPosition=e.touches[0].pageY;
      //console.log(e);
    },
    // getParam(){
    // return  this.shuju=this.$route.params
    // }
    playSong(e,index){
       if(e.changedTouches[0].pageY!=this.handPosition){return};//如果是为了滑动不而不是点击
      this.$axios.get(`https://api.mlwei.com/music/api/wy/?key=523077333&cache=1&type=song&id=${this.needDisplayList[index].id}`).then(res=>{
        //console.log(res.data.url);
        this.$store.commit('addToSong',res.data.url);
        this.$store.commit('addToTitle',this.needDisplayList[index].title);
        this.$store.commit('addToAuthor',this.needDisplayList[index].author);
        this.$store.commit('addToPic',this.needDisplayList[index].pic);
        //console.log(this.$store.state.playControl);
        setTimeout(()=>{
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
                //console.log('detail');
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
    }
  },
  created(){
    if(this.songList){
    for(let i=this.count;i<this.count+15;i++){
      this.needDisplayList.push(this.songList[i])
    }
    this.count+=15;
    //console.log(this.$route.params.dataa);
  }
  },
  mounted() {
    window.addEventListener('touchmove',this.lazyLoad,false);
    window.addEventListener('scroll',this.lazyLoad,false);
  },
  beforeDestroy(){//组件销毁前就把这个事件移除 不然会因为JS闭包特性使得两个组件内的函数都执行（个人猜测）
    window.removeEventListener('touchmove',this.lazyLoad);
    window.removeEventListener('scroll',this.lazyLoad);
  }
}
</script>

<style lang="css" scoped>
.wrap{
  width: 100%;
  font-size: 16px;
  padding: 0 0.05rem;
  box-sizing: border-box;
}
.wrap .introduce{
  font-size: 0.04rem;
  padding: 0.03rem 0;
}
.wrap h3{
  font-size: 0.04rem;
  font-weight: normal;
  margin-bottom: 0.03rem;
  color: rgb(110, 45, 78);
  border-bottom: 2px solid rgb(153, 146, 152)
}
.wrap ul .left{
  float: left;
  font-size: 0.04rem
}
.wrap ul .left .author{
  color: rgb(148, 156, 159)
}
.wrap ul .right{
  float: right;
  font-size: 0.06rem;
  vertical-align: middle;
}
.wrap ul li::after{
  content: '';
  display: block;
  clear: both;
}
.wrap ul li{
  height: 0.11rem;
  margin-top:0.035rem;
  border-bottom: 1px solid rgb(186, 180, 186);
  cursor: pointer;
}
.wrap ul li .index{
  color: rgba(65, 68, 67,0.5);
  margin-right: 0.03rem;
  height: 100%;
  line-height: 0.11rem;
}
.isloading{
  text-align: center;
  color: rgb(172, 167, 172);
  font-size: 16px;
  padding: 8px 0;
}
</style>
