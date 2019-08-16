<template lang="html">
  <div class="wrap">
    <h2>推荐歌单</h2>
    <ul class="songlist">
      <li v-for='(item,index) in recommendSongList' @touchend='godetail(index)'> <img :src="item.img"> <p> {{item.title}} </p> </li>
    </ul>
    <h2>推荐单曲</h2>
    <ul class="song">
      <li v-for='(item,index) in recommendSong'>
         <div class="left">
        <p class="title">{{item.title}} </p>
        <p class="author"> {{item.author}}</p>
      </div>
      <div class="right iconfont icon-bofang">

      </div>
    </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'recommend',
  data() {
    return {
      totalRecommendSongList:[],
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
      count:0,
      saveSongList:[     //因为要减少HTTP请求以便不会被网易云服务器拒绝访问，所以一开始就要把数据保存下来 而不是每次点击就发送请求 这里保存的是推荐歌单的详情

      ]
    }
  },
  methods: {
    lazyLoad(){
      var total=document.documentElement.scrollHeight;//scrollHeight表示元素总高度.不管可见不可见，也不管有没有设置OVERFLOW为HIDDEN 它是由元素中有多少内容决定的
      var canSee=document.documentElement.clientHeight;//offsetHeight与clientHeight的区别-->从网上得到资料与自己实践得来的结果有很大不同 在这里只有用clientHeight才能得到想要的结果 而offsetHeight得到的与scrollHeight一样
     if(total-canSee===document.documentElement.scrollTop){//这个表示滚动条触底
        //console.log('ok');
          //count+=10;
          for (var i = this.count; i < this.count+6; i++) {
            if(this.totalRecommendSongList[i].title.length>25){
              var ti=this.totalRecommendSongList[i].title.slice(0,20)+'...' ;
              //console.log(ti);
              this.totalRecommendSongList[i].title=ti
            }
            this.recommendSong.push(this.totalRecommendSongList[i])
          }
          this.count+=6;
          //console.log(this.recommendSong);

     }
      //if(total-canSee)
      // console.log(total-canSee);
      // console.log(document.documentElement.scrollTop);
    },
    godetail(index){
      //console.log(index);
      this.$router.push({name:'detail',params:{ //路由传参
        id:index+1, //传个ID用以标识路径 那边用:id做接收就可以了
        dataa:this.saveSongList[index]
      }})
    }

  },
  created() {
    this.$axios.get('https://api.mlwei.com/music/api/wy/?key=523077333&cache=1&type=songlist&id=2793222783').then(res => {
      this.count+=10;
      this.totalRecommendSongList=res.data.Body;
      for (let i = 0; i < this.count; i++) {
        this.recommendSong.push(res.data.Body[i])
      }
      //console.log(this.recommendSong);
    });
    //下面把推荐歌单详情 请求到保存下来
    for(let j =0;j<4;j++){//注意要用LET声明 否则FOR循环在异步操作下得不到自己想要的结果
      this.$axios.get(`https://api.mlwei.com/music/api/wy/?key=523077333&cache=1&type=songlist&id=${this.recommendSongList[j].id}`).then(res => {
          this.saveSongList[j]=res.data.Body;
        //console.log(res);
      });
    }
  },
  mounted(){
    window.addEventListener('scroll',()=>{this.lazyLoad()},false)
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
</style>
<!-- http://www.mlwei.com/1446.html   2793222783-->
