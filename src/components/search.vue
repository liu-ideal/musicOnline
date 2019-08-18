<template lang="html">
  <div class="wrap">
    <mt-search v-model="value" placeholder="搜索歌曲" @keyup.native='judgeEmpty' @touchend.native='judgeEmpty' @keydown.enter.native='toSearch' cancel-text=''></mt-search>
  <p v-show='searchShow' @touchend='toSearch'>搜索 {{value}}</p>
  <ul class="song">
    <li v-for='(item,index) in resultData'>
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
      console.log('hh');
      var namer=this.value;
      if(namer){
        var name=encodeURI(namer);//URL中必须对中文编码才行
        this.$axios.get(`https://api.mlwei.com/music/api/wy/?key=523077333&id=${name}&type=so&cache=0&nu=10`).then(res=>{
          if(res.data.Body){
            this.resultData=res.data.Body;
            console.log(this.resultData);
          }
        });
      }
    }
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
