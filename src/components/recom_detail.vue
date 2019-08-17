<template lang="html">
<div class="wrap">
  <p class="introduce">简介:这是一个歌单</p>
  <h3>歌曲列表</h3>
  <ul>
    <li v-for='(item,index) in needDisplayList'>
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
       nomore:false
    }
  },
  methods:{
    lazyLoad() {
if(!this.nomore){
  var total = document.documentElement.scrollHeight; //scrollHeight表示元素总高度.不管可见不可见，也不管有没有设置OVERFLOW为HIDDEN 它是由元素中有多少内容决定的
  var canSee = document.documentElement.clientHeight; //offsetHeight与clientHeight的区别-->从网上得到资料与自己实践得来的结果有很大不同 在这里只有用clientHeight才能得到想要的结果 而offsetHeight得到的与scrollHeight一样
  if (total - canSee === document.documentElement.scrollTop) { //这个表示滚动条触底
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
    // getParam(){
    // return  this.shuju=this.$route.params
    // }
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
    window.addEventListener('scroll',this.lazyLoad,false)
  },
  beforeDestroy(){//组件销毁前就把这个事件移除 不然会因为JS闭包特性使得两个组件内的函数都执行（个人猜测）
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
