<template>
  <div class="tjmFooter">
        <el-container>
          <el-aside width="25%">
            <el-button-group style="margin-left:70%;margin-top:30px !important;">
            <el-button
              class="el-icon-d-arrow-left"
              size="large"
              @click="lastSong()"
              circle/>
            <el-button
              class="el-icon-d-arrow-right"
              size="large"
              @click="nextSong()"
              circle/>
            </el-button-group>
          </el-aside>
          <el-main>
            <audio ref="audio" :src="songsSrc" style="width:80%" controls="controls" @ended="nextSong()">
              Your browser does not support the audio element.
            </audio>
          </el-main>
        </el-container>
  </div>
</template>

<script>
import updateLocalStorage from '../updateLocalStorage/updateLocalStorage'
import tjmProcess from '../tjmProcessBar/tjmProcessBar.vue'
export default{
  components:{
    tjmProcess,
    //VueAudio
  },
  data() {
    return {
      songsSrc:''
    }
  },
  methods:{
    playSong(newId)
    {
      if(newId){
        this.$http.get('http://47.101.183.170:3000/song/url?id='+newId)
          .then(res =>{
            this.songsSrc=res.data.data[0].url;
            this.$refs.audio.play();
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    nextSong()
    {
      let playlist=JSON.parse(window.localStorage.getItem('currentPlayList'));
      let index=parseInt(window.localStorage.getItem("currentIndex"));
      index++;
      if(index==playlist.length)
        index=0;
      window.localStorage.setItem("currentIndex",index);
      window.localStorage.setItem("currentSongsId",playlist[index].songsId);
      window.localStorage.setItem("currentSongsName",playlist[index].songsName);
    },
    lastSong()
    {
      let playlist=JSON.parse(window.localStorage.getItem('currentPlayList'));
      let index=parseInt(window.localStorage.getItem('currentIndex'));
      index--;
      if(index==-1)
        index=playlist.length-1;
      window.localStorage.setItem("currentIndex",index);
      window.localStorage.setItem("currentSongsId",playlist[index].songsId);
      window.localStorage.setItem("currentSongsName",playlist[index].songsName);
    },
    timer:function (){
      window.localStorage.setItem("currentPaused",this.$refs.audio.paused);
    }
  },
  mounted() {
    this.$nextTick(function () {
      setInterval(this.timer, 300);
    })
    const that=this;
    //监听缓存中指定key的值变化
    window.addEventListener("setItemEvent",function(e){
      //e.key : 是值发生变化的key
      //例如 e.key==="token";
      //e.newValue : 是可以对应的新值
      if(e.key==="currentSongsId"){
        that.playSong(e.newValue);
      }
    })

    if(window.localStorage.getItem("currentIndex")==null){
      window.localStorage.setItem("currentIndex",'0');
    }
    if(window.localStorage.getItem("currentSongsId")==null){
      window.localStorage.setItem("currentSongsId",'347230');
      window.localStorage.setItem("currentSongsName",'海阔天空');
    }
    let playlist=JSON.parse(window.localStorage.getItem('currentPlayList'));
    if(playlist){
      this.$http.get('http://47.101.183.170:3000/song/url?id='+playlist[0].songsId)
        .then(res =>{
          window.localStorage.setItem("currentSongsId",playlist[0].songsId);
          window.localStorage.setItem("currentSongsName",playlist[0].songsName);
          console.log(res.data.data[0].url);
          this.songsSrc=res.data.data[0].url;
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
