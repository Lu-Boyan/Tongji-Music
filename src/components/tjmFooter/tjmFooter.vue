<template>
  <div class="tjmFooter">
    <el-container>
      <el-aside width="890px">
        <el-container>

          <el-aside width="150px">

            <el-button
              style="margin-top:30px;margin-left:20px !important;"
              class="el-icon-d-arrow-left"
              size="large"
              @click="lastSong()"
              circle/>

            <el-button
              class="el-icon-d-arrow-right"
              size="large"
              @click="nextSong()"
              circle/>
          </el-aside>
          <el-main>
            <audio ref="audio" src="" style="width:100%; " controls="controls" @ended="nextSong()">
              Your browser does not support the audio element.
            </audio>
          </el-main>
        </el-container>
      </el-aside>
      <el-main>
          <el-aside width="150px">
            <el-button
              class="el-icon-sort"
              size="medium"
              style="margin-top:10px !important;"
              circle/>
            <el-button
              class="el-icon-chat-dot-square"
              size="medium"
              circle/>
          </el-aside>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import tjmProcess from '../tjmProcessBar/tjmProcessBar.vue'
export default{
  components:{
    tjmProcess,
    //VueAudio
  },
  data() {
    return {
    }
  },
  methods:{
    playSong()
    {
      let songsId=window.localStorage.getItem('curruntSongsId');
      if(songsId){
        this.$http.get('http://localhost:3000//song/url?id='+songsId)
          .then(res =>{
            console.log(res.data);
            this.$refs.audio.src=res.data.url;
            this.$refs.audio.play();
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    nextSong()
    {
      let playlist=window.localStorage.getItem('curruntPlayList');
      let index=window.localStorage.getItem("curruntIndex");
      index++;
      if(index==playlist.length)
        index=0;
      window.localStorage.setItem("curruntIndex",index);
      window.localStorage.setItem("curruntIndex",playlist[index].songsId);
    },
    lastSong()
    {
      let playlist=window.localStorage.getItem('curruntPlayList');
      let index=window.localStorage.getItem("curruntIndex");
      index--;
      if(index==-1)
        index=playlist.length-1;
      window.localStorage.setItem("curruntIndex",index);
      window.localStorage.setItem("curruntIndex",playlist[index].songsId);
    }
  },
  mounted() {
    const that=this;
    //监听缓存中指定key的值变化
    window.addEventListener('storage', function (e) {
      if(e.key && e.key == 'curruntSongsId' && e.newValue){
        that.playSong();
      }
    })
    let Id;
    if(window.localStorage.getItem("curruntIndex")==null){
      window.localStorage.setItem("curruntIndex",0);
    }
    if(Id=window.localStorage.getItem("curruntSongsId")==null){
      window.localStorage.setItem("curruntIndex",1);
      Id=1;
    }
    let playlist=window.localStorage.getItem('curruntPlayList');
    if(playlist){
      this.$http.get('http://localhost:3000//song/url?id='+playlist[Id].songsId)
        .then(res =>{
          console.log(res.data);
          this.$refs.audio.src=res.data.url;
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}
</script>

<style scoped>
ul li {
  cursor: pointer;
  list-style-type: none;
  width: 100px;
}
.active {
  background-color: #1989FA;
}

</style>
