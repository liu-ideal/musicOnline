<template lang="html">
  <div class="wrap">
    <mt-search v-model="value" placeholder="搜索歌曲"></mt-search>
  <p>搜索{{value}}</p>
  </div>
</template>

<script>
export default {
  name:'search',
  data(){
    return{
        value:''
    }


  },
  created(){
    var namer='小幸运';
    var name=encodeURI(namer);//URL中必须对中文编码才行
    console.log(name);
    this.$axios.get(`https://api.mlwei.com/music/api/wy/?key=523077333&id=${name}&type=so&cache=0&nu=10`).then(res=>{
      console.log(res.data);
    })
  }
}
</script>

<style lang="css" scoped>
.mint-search{
  height: auto;
}
p{
  color: #507daf
}
</style>
