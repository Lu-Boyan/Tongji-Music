<template>
<div class="mainPage">
<el-container >
  <el-container>
  <el-aside width="20%">
    <tjmMusiclist/>
  </el-aside>
  <el-main width="80%">
    <el-container >
    <el-aside width="67%">
    <el-row class="menu-button">
        <el-button class="tjmbutton" type="primary" height:40px plain style="background-color:transparent; border:0px; color:#90F7F7 !important;">
          <router-link to="playlist">正在播放</router-link>
        </el-button>
      <el-button class="tjmbutton" type="primary" height:40px plain style="background-color:transparent; border:0px; color:#90F7F7 !important;">
        <router-link to="songslist">歌单信息</router-link>
      </el-button>
        <el-button class="tjmbutton" type="primary" height:40px plain style="background-color:transparent; border:0px; color:#90F7F7 !important;">
          <router-link to="recommend">推荐</router-link>
        </el-button>
        <el-button class="tjmbutton" type="primary" height:40px plain style="background-color:transparent; border:0px; color:#90F7F7 !important;">
          <router-link to="search">搜索</router-link>
        </el-button>
        <el-button class="tjmbutton" type="primary" height:40px plain style="background-color:transparent; border:0px; color:#90F7F7 !important;">
          <router-link to="comment">评论</router-link>
        </el-button>
    </el-row>
    <router-view/>
    </el-aside>
    <el-main width="33%" style="z-index:999">
      <tjmSongWords style="z-index:999"/>
    </el-main>
    </el-container>
  </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
import tjmSongWords from '../components/tjmSongWords/tjmSongWords.vue'
import tjmMusiclist from '../components/tjmMusiclist/tjmMusiclist.vue'
export default{
    components:{
        tjmMusiclist,
        tjmSongWords,
    },
}
</script>

<style>

</style>
