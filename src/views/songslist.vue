<template>
  <div class="playlist">
    <el-table
      :data="songsTableData"
      height="430"
      style="width: 100%; margin-top:10px !important;" >
      <el-table-column label="songsId" align="center" prop="songsId" v-if="false" />
      <el-table-column label="songsImage" align="center" prop="songsImage" v-if="false" />
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
              <el-dropdown-item @click="playthis(scope.$index)">播放</el-dropdown-item>
              <el-dropdown-item @click="addNextPlay(scope.$index)">添加到下一首播放</el-dropdown-item>
              <el-dropdown-item @click="deleterow(scope.$index)">从歌单删除</el-dropdown-item>
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
      songsTableData: [],
      selectedSongslistId:0
    }
  },
  methods: {
    deleteRow(index) {
      this.$http.get('http://localhost:8903/listcollect/get_list/'+rows[index].songsId)
        .then(res =>{
          console.log(res);

        })
        .catch(err => {
          console.log(err);
        })
    },
    playthis(index){
      window.localStorage.setItem('curruntSongsId',this.playlistTableData[index].songsId);
      let playlist=window.localStorage.getItem('curruntPlayList');
      let ii=window.localStorage.getItem('curruntIndex');
      let newplaylist=[];
      newplaylist.push(this.playlistTableData[index]);
      for(let i=0;i<this.playlistTableData.length;i++){
        if(i==index)
          continue;
        else{
          newplaylist.push(this.playlistTableData[i]);
        }
      }
      this.playlistTableData=newplaylist;
      playlist.splice(ii,this.songsTableData.length);
      for(let i=0;i<newplaylist.length;i++){
        playlist.push(newplaylist[i])
      }
      window.localStorage.setItem('curruntPlayList',playlist);

    },
    addNextPlay(index){
      let playlist=window.localStorage.getItem('curruntPlayList');
      let ii=window.localStorage.getItem('curruntIndex');
      let newplaylist=[];
      newplaylist.push(this.playlistTableData[index]);
      for(let i=1;i<this.playlistTableData.length;i++){
        if(i==index)
          continue;
        else{
          newplaylist.push(this.playlistTableData[i]);
        }
      }
      this.playlistTableData=newplaylist;
      playlist.splice(ii+1,this.songsTableData.length);
      for(let i=0;i<newplaylist.length;i++){
        playlist.push(newplaylist[i])
      }
      window.localStorage.setItem('curruntPlayList',playlist);
    },
  },
  mounted:function () {//自动触发写入的函数
    this.selectedSongslistId=window.localStorage.getItem("selectedSongslistId");
    this.$http.get('http://localhost:8903/listcollect/get_list/'+this.selectedSongslistId)
      .then(res =>{
        console.log(res.data);
        this.songsTableData.splice(0,this.songsTableData.length);
        for(var i = 0;i<res.data.length;i++)
        {
          this.songsTableData.push(res.data[i]);//需要修改
          console.log(this);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}
</script>
