<template>
<div class="playlist">
  <el-table
    :data="recommentTableData"
    height="430"
    style="width: 100%; margin-top:10px !important;">
    <el-table-column label="songsId" align="center" prop="songs_id" v-if="false" />
    <el-table-column label="songsImage" align="center" prop="songs_id" v-if="false" />
    <el-table-column
      prop="songsName"
      label="歌名"
      width="300"
      resizable=“false”>
    </el-table-column>
    <el-table-column
      prop="songsArtistsName"
      label="歌手"
      width="150"
      align= "center"
      resizable=“false”>
    </el-table-column>
    <el-table-column
      prop="songsTime"
      label="时长"
      width="150"
      align= "center"
      resizable=“false”>
    </el-table-column>
    <el-table-column
      label=""
      fixed="right"
      align= "center"
      resizable=“false”
      style="color:#DDDD22 !important">
      <template slot-scope="scope">
        <el-dropdown>
                  <span class="el-dropdown-link">
                      <i class="el-icon-more"></i>
                  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>播放</el-dropdown-item>
            <el-dropdown-item>添加到下一首播放</el-dropdown-item>
            <el-dropdown-item>从播放列表删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
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
        recommentTableData: [{
          songsName: '红红火火',
          songsArtistsName: '周杰伦',
          songsTime: '06:66'
        }, {
          songsName: '红红火火',
          songsArtistsName: '周杰伦',
          songsTime: '06:66'
        }, {
          songsName: '红红火火',
          songsArtistsName: '周杰伦',
          songsTime: '06:66'
        }, {
          songsName: '红红火火',
          songsArtistsName: '周杰伦',
          songsTime: '06:66'
        }]
      }
    }
  }
</script>
