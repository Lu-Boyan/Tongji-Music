<template>
  <div class="background">
    <div class="login-register">
    <vue-particles
    color="#dedede"
    :particleOpacity="0.7"
    :particlesNumber="180"
    shapeType="circle"
    :particleSize="4"
    linesColor="#dedede"
    :linesWidth="1"
    :lineLinked="true"
    :lineOpacity="0.4"
    :linesDistance="150"
    :moveSpeed="3"
    :hoverEffect="true"
     hoverMode="grab"
     :clickEffect="true"
     clickMode="push"
   >
</vue-particles>
    <el-container>
      <el-header>
        <tjmHeader/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
      <tjmFooter/>
  </div>
</div>
</template>


<script>
import tjmHeader from '../components/tjmHeader/tjmHeader.vue'
import tjmMusiclist from '../components/tjmMusiclist/tjmMusiclist.vue'
import mainPage from '../views/mainPage.vue'
import tjmFooter from "../components/tjmFooter/tjmFooter";
export default{
  components:{
    tjmHeader,
    tjmMusiclist,
    mainPage,
    tjmFooter,
  },
  mounted:function () {   //自动触发写入的函数
    let id=JSON.parse(window.localStorage.getItem("userToken")).userId;
    this.$http.get('http://localhost:8082/api/songslist/get/'+id)
      .then(res =>{//获取创建的歌单
        console.log(res.data);
        if(res.data.length>0){
          let t=res.data[0].songsListId;
          window.localStorage.setItem("selectedSongslistId",t);
          window.localStorage.setItem("selectedSongslistName",res.data[0].songsListName);
          window.localStorage.setItem('defaultPlaylist',t);

          this.$http.get('http://localhost:8082/api/songs/get_songsdetail/'+t)
            .then(res =>{
              console.log(res);
              window.localStorage.setItem("currentSongsName",res.data[0].songsName);
              window.localStorage.setItem("currentSongsId",res.data[0].songsId);
              window.localStorage.setItem('currentIndex','0');
              let table=[];
              for(let i = 0;i<res.data.length;i++)
              {
                table.push(res.data[i]);
              }
              window.localStorage.setItem('currentPlayList',JSON.stringify(table));
            })
            .catch(err => {
              console.log(err);
            })
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.background{
    background-image: url(../assets/background.jpeg);
    height: 85%;
		width: 100%;
		background-size: 100% 100%;
    background-repeat: no-repeat;
    }
    #particles-js{
        width: 100%;
        height: 100%;
        position: absolute;
    }
</style>
