<template>
<div class="tjmFooter">
  <el-container>
    <el-aside width="650px">
      <el-container>
        <el-aside width="190px">

          <el-button
          class="el-icon-d-arrow-left"
          size="large"
          style="margin-top:30px !important;"
          circle/>
          <el-button
          class="el-icon-video-play"
          size="large"
          circle/>
          <el-button
          class="el-icon-d-arrow-right"
          size="large"
          circle/>
        </el-aside>
        <el-main>
            <tjmProcess style="margin-top:20px !important;"/>
        </el-main>
      </el-container>
    </el-aside>
    <el-main>
        <el-container>
        <el-aside width="190px">
          <el-button
          class="el-icon-sort"
          size="medium"
          style="margin-top:10px !important;"
          circle/>
          

          <el-button
          class="el-icon-chat-dot-square"
          size="medium"
          circle>
          <router-link to="search"></router-link>
          </el-button>
          <el-button
          class="el-icon-microphone"
          size="medium"
          circle/>
        </el-aside>
        <el-main>
            <tjmProcess/>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</div>
</template>

<script>
import tjmProcess from '../tjmProcessBar/tjmProcessBar.vue'

export default{
    components:{
        tjmProcess
    }
}
</script>
