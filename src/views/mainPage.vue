<template>
<div class="mainPage">
<el-container>
  <el-container>
  <el-aside width="20%">
    <tjmMusiclist/>
  </el-aside>
  <el-main>
    <el-container>
    <el-aside width="700px">
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
    <el-main>
      <tjmSongWords/>
    </el-main>
    </el-container>
    <el-footer height="200px">
      <tjmFooter/>
    </el-footer>
  </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
import tjmSongWords from '../components/tjmSongWords/tjmSongWords.vue'
import tjmMusiclist from '../components/tjmMusiclist/tjmMusiclist.vue'
import tjmFooter from '../components/tjmFooter/tjmFooter.vue'
export default{
    components:{
        tjmMusiclist,
        tjmSongWords,
        tjmFooter,
    },
}
</script>

<style>

</style>
