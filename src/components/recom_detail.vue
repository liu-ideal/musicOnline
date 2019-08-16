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
</div>
</template>

<script>
export default {
  name:'recom_detail',
  data(){
    return {
       songList:this.$route.params.dataa,
       needDisplayList:[],
       count:0
    }
  },
  methods:{
    // getParam(){
    // return  this.shuju=this.$route.params
    // }
  },
  created(){
    if(this.songList){
    for(let i=this.count;i<this.count+10;i++){
      this.needDisplayList.push(this.songList[i])
    }
    this.count+=10;
    //console.log(this.$route.params.dataa);
  }
  },

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
</style>
