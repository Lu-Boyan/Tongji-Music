<template>
<div class="playlist">
            <el-table
            :data="tableData"
            height="430"
            style="width: 100%; margin-top:10px !important;">
            <el-table-column
            prop="name"
            label="歌名"
            width="400"
            resizable=“false”>
            </el-table-column>
            <el-table-column
            prop="singer"
            label="歌手"
            width="150"
            align= "center"
            resizable=“false”>
            </el-table-column>
            <el-table-column
            prop="time"
            label="时长"
            align= "center"
            resizable=“false”>
            </el-table-column>
            </el-table>
</div>
</template>

<script>
  export default {
      components:{
      },
    data() {
      return {
        tableData: [{
          name: '稻香',
          singer: '周杰伦',
          time: '06:66'
        }, {
          name: '稻香',
          singer: '周杰伦',
          time: '06:66'
        }, {
          name: '稻香',
          singer: '周杰伦',
          time: '06:66'
        }, {
          name: '稻香',
          singer: '周杰伦',
          time: '06:66'
        }]
      }
    }
  }
</script>
