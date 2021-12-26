<template>
  <div id="app">
    <!--路由占位符-->

    <router-view></router-view>
        <el-container >

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
  </div>
</template>

<style scoped>
.el-container
{
  margin-top: 0px;
  background-color:skyblue;
  /* position: fixed; */
}
  /* audio {
    position: fixed;
  } */

</style>


