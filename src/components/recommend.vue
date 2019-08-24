<template lang="html">
  <div class="wrap">
    <h2>推荐歌单</h2>
    <ul class="songlist">
      <li v-for='(item,index) in recommendSongList' @touchend='godetail($event,index)' @touchstart='savePosition'> <img :src="item.img"> <p> {{item.title}} </p> </li>
    </ul>
    <h2>推荐单曲</h2>
    <ul class="song">
      <li v-for='(item,index) in recommendSong' @touchend='playSong($event,index)' @touchstart='savePosition'>
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
  name: 'recommend',
  data() {
    return {
      isloading:'数据加载中,请稍等...',
      every:6,
      count:0,
      nomore:false,
      canSee:false,
      totalRecommendSongList: [],
      recommendSongList: [{
          id: 2341985523,
          img: 'http://p2.music.126.net/I2X59vERhvifkYJGMFkreA==/109951164290090765.jpg?imageView&thumbnail=246x0&quality=75&tostatic=0',
          title: '换个心情来听歌,这里的歌是你想要的'
        },
        {
          id: 2322365891,
          img: 'http://p2.music.126.net/UPqvCn0n6Aolz6naEyvFiQ==/109951164071320121.jpg?imageView&thumbnail=246x0&quality=75&tostatic=0',
          title: '孤独的时候一个人慢慢行走'
        },
        {
          id: 2830897310,
          img: 'http://p2.music.126.net/Wc8ImEkyNSYEjj6VzpZlaA==/109951164127242419.jpg?imageView&thumbnail=246x0&quality=75&tostatic=0',
          title: '清新唯你,那个她你在哪里'
        },
        {
          id: 2903165559,
          img: 'http://p2.music.126.net/kZTGMPpDGFQH_owg7eot-w==/109951164247934402.jpg?imageView&thumbnail=246x0&quality=75&tostatic=0',
          title: '花花世界,爱歌一直不变'
        }
      ],
      recommendSong: [

      ],
      count: 0,
      saveSongList: [ //因为要减少HTTP请求以便不会被网易云服务器拒绝访问，所以一开始就要把数据保存下来 而不是每次点击就发送请求 这里保存的是推荐歌单的详情

      ],
      timmer:null,
      handPosition:0
    }
  },
  methods: {
    lazyLoad() {
      //console.log('scroll');
      if(!this.nomore){

        var total = document.documentElement.scrollHeight; //scrollHeight表示元素总高度.不管可见不可见，也不管有没有设置OVERFLOW为HIDDEN 它是由元素中有多少内容决定的
        var canSee = document.documentElement.clientHeight; //offsetHeight与clientHeight的区别-->从网上得到资料与自己实践得来的结果有很大不同 在这里只有用clientHeight才能得到想要的结果 而offsetHeight得到的与scrollHeight一样

        var scroll=document.documentElement.scrollTop||document.body.scrollTop;//兼容写法
        //console.log(total,canSee);
        if (total - canSee === scroll) { //这个表示滚动条触底
          window.removeEventListener('touchmove',this.lazyLoad);//这时先关掉滑动 不然会可能会一直触发
          window.removeEventListener('scroll',this.lazyLoad);
          //count+=10;
          if(this.count+6>this.totalRecommendSongList.length){
            this.every=this.totalRecommendSongList.length-this.count;
            if(this.every===0){
              this.every++
            }
          }
          this.canSee=true;
          setTimeout(()=>{
            for (var i = this.count; i < this.count + this.every; i++) {
              if(!this.totalRecommendSongList[i]){
                this.nomore=true;
                this.canSee=true;
                this.isloading='没有更多了'
                Indicator.close();
                return
              }
              if (this.totalRecommendSongList[i].title.length > 25) {

                var ti = this.totalRecommendSongList[i].title.slice(0, 20) + '...';
                //console.log(ti);
                this.totalRecommendSongList[i].title = ti
              }
              this.recommendSong.push(this.totalRecommendSongList[i])
            }
            window.addEventListener('touchmove',this.lazyLoad,false);//数据加载完后再开启滑动绑定
            window.addEventListener('scroll',this.lazyLoad,false);
            Indicator.close();
            this.canSee=false;

            this.count += this.every;
          },500)
          Indicator.open()
          //console.log(this.recommendSong);

        }
        //if(total-canSee)
        // console.log(total-canSee);
        // console.log(document.documentElement.scrollTop);
      }

    },
    savePosition(e){
      this.handPosition=e.touches[0].pageY;
      //console.log(e);
    },
    godetail(e,index) {
      //console.log(index);
     if(e.changedTouches[0].pageY!=this.handPosition){return};//如果是为了滑动不而不是点击
      this.$router.push({
        name: 'detail',
        params: { //路由传参
          id: index + 1, //传个ID用以标识路径 那边用:id做接收就可以了
          dataa: this.saveSongList[index]
        }
      })
    },
    playSong(e,index){
       if(e.changedTouches[0].pageY!=this.handPosition){return};//如果是为了滑动不而不是点击
      this.$axios.get(`https://api.mlwei.com/music/api/wy/?key=523077333&cache=1&type=song&id=${this.recommendSong[index].id}`).then(res=>{
        //console.log(res.data.url);
        this.$store.commit('addToSong',res.data.url);
        this.$store.commit('addToTitle',this.recommendSong[index].title);
        this.$store.commit('addToAuthor',this.recommendSong[index].author);
        this.$store.commit('addToPic',this.recommendSong[index].pic);
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
                //console.log('recom');
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
  created() {
    this.$axios.get('https://api.mlwei.com/music/api/wy/?key=523077333&cache=1&type=songlist&id=2793222783').then(res => {
      this.count += 10;
      this.totalRecommendSongList = res.data.Body;
      for (let i = 0; i < this.count; i++) {
        this.recommendSong.push(res.data.Body[i])
      }
      //console.log(this.recommendSong);
    });
    //下面把推荐歌单详情 请求到保存下来
    for (let j = 0; j < 4; j++) { //注意要用LET声明 否则FOR循环在异步操作下得不到自己想要的结果
      this.$axios.get(`https://api.mlwei.com/music/api/wy/?key=523077333&cache=1&type=songlist&id=${this.recommendSongList[j].id}`).then(res => {
        this.saveSongList[j] = res.data.Body;
        //console.log(res);
      });
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
.wrap h2{
  font-size: 0.045rem;
  font-weight: bold;
  margin-top: 0.05rem;
  margin-bottom: 0.03rem;
  border-bottom: 2px solid red;
}
.wrap .songlist{
  width: 100%;
  padding: 0;
}
.wrap .songlist::after{
  content: '';
  display: block;
  clear: both;
}
.wrap .songlist li{
  float: left;
  width: 0.42rem;
  margin-top: 0.02rem

}
.wrap .songlist li:nth-child(even){
  margin-left: 0.05rem
}
.wrap .songlist li img{
  display: block;
  width: 100%;
  height: 100%;
}
.wrap .songlist li p{
font-size: 0.04rem
}
.wrap .song{
  width: 100%;
}
.wrap .song .left{
  float: left;
font-size: 0.04rem
}
.wrap .song .left .author{
  color: rgb(148, 156, 159)
}
.wrap .song .right{
  float: right;
  font-size: 0.06rem;
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
.isloading{
  text-align: center;
  color: rgb(172, 167, 172);
  font-size: 16px;
  padding: 8px 0;
}
</style>
<!-- http://www.mlwei.com/1446.html   2793222783-->
