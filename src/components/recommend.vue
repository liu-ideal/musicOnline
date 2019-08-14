<template lang="html">
  <div class="">
    推荐页面
  </div>
</template>

<script>
export default {
  name:'recommend',
  data(){
    return{
     recommendSongList:[
        {id:2341985523,img:'http://p2.music.126.net/I2X59vERhvifkYJGMFkreA==/109951164290090765.jpg?imageView&thumbnail=246x0&quality=75&tostatic=0'},
      {id:2322365891,img:'http://p2.music.126.net/UPqvCn0n6Aolz6naEyvFiQ==/109951164071320121.jpg?imageView&thumbnail=246x0&quality=75&tostatic=0'},
      {id:2830897310,img:'http://p2.music.126.net/Wc8ImEkyNSYEjj6VzpZlaA==/109951164127242419.jpg?imageView&thumbnail=246x0&quality=75&tostatic=0'},
      {id:2903165559,img:'http://p2.music.126.net/kZTGMPpDGFQH_owg7eot-w==/109951164247934402.jpg?imageView&thumbnail=246x0&quality=75&tostatic=0'}
    ]
    }
  },
  methods:{

  },
  created(){
    this.$axios.get('https://api.mlwei.com/music/api/wy/?key=523077333&cache=1&type=songlist&id=2341985523').then(res=>{
      console.log(res.data);
    })
  }
}
</script>

<style lang="css" scoped>
</style>
<!-- http://www.mlwei.com/1446.html -->
