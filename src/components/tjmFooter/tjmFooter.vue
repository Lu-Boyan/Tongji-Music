<template>
<div class="tjmFooter">
  <el-container>
    <el-aside width="900px"><!--680px-->
      <el-container>
         <el-aside width="100px">
          
          <el-button
          style="margin-top:30px !important;"
          class="el-icon-d-arrow-left"
          size="large"
          @click="playSong('../../static/falling-star.mp3')"
          circle/>
          
          <el-button
          class="el-icon-d-arrow-right"
          size="large"
          circle/>
        </el-aside>
        <el-main>
            <audio src="../../static/falling-star.mp3" style="width:100%; " controls="controls">
            Your browser does not support the audio element.
            </audio>
        </el-main>
      </el-container>
    </el-aside>
    <el-main>
        <!--<el-container>
        <el-aside width="190px">-->
          <el-button
          class="el-icon-sort"
          size="medium"
          style="margin-top:10px !important;"
          circle/>
          <el-button
          class="el-icon-chat-dot-square"
          size="medium"
          circle/>
          <!--<el-button
          class="el-icon-microphone"
          size="medium"
          circle/> -->
        <!--</el-aside>
        <el-main>
          <tjmProcess/> 
        </el-main>
      </el-container>-->
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
