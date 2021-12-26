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
