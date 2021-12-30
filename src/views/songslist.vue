<template>
  <div class="playlist">
    <row><label style="color: darkblue;padding-left: 45%;font-size: larger">{{this.songsListName}}</label></row>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="songsTableData"
      height="400px"
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
              <el-dropdown-item @click.native="playthis(scope.$index)">播放</el-dropdown-item>
              <el-dropdown-item @click.native="addNextPlay(scope.$index)">添加到下一首播放</el-dropdown-item>
              <el-dropdown-item @click.native="deleteMusic(scope.$index)">从歌单删除</el-dropdown-item>
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
      selectedSongslistId:0,
      loading:true,
      songsListName:''
    }
  },
  methods: {
    successDelete() {
      this.$alert('该歌曲成功从歌单中删除！', '消息通知', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });
    },
    failDelete() {
      this.$alert('很抱歉，由于奇怪的原因，该歌曲从歌单中删除失败！', '消息通知', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });
    },
    deleteMusic(index) {
      alert("hh")
      if(window.localStorage.getItem("modifiable")=='1'){
      this.$http.delete('http://localhost:8082/api/songs/delete',{
        data:{
          'songsListId':this.selectedSongslistId,
          'songsId':this.songsTableData[index].songsId
        }
      })
        .then(res =>{
          console.log(res);
          if(res.data=="删除成功"){
            this.songsTableData.splice(index,1);
            this.successDelete();
          }
          else{
            this.failDelete();
          }
        })
        .catch(err => {
          console.log(err);
        })}
      else{
        this.$alert('抱歉，该歌单不是您创建的，无法删除！', '消息通知', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    },
    playthis(index){

      window.localStorage.setItem('currentSongsId',this.songsTableData[index].songsId);//播放这首歌
      window.localStorage.setItem('currentSongsName',this.songsTableData[index].songsName);//播放这首歌

      let playlist=JSON.parse(window.localStorage.getItem('currentPlayList'));
      let ii=parseInt(window.localStorage.getItem('currentIndex'));
      if(ii==0){//添加到currentIndex指的位置
        playlist.unshift(this.songsTableData[index]);
      }
      else{
        playlist.splice(ii,0,this.songsTableData[index]);
      }
      window.localStorage.setItem('currentPlayList',JSON.stringify(playlist));
    },
    addNextPlay(index){
      let playlist=JSON.parse(window.localStorage.getItem('currentPlayList'));
      let ii=parseInt(window.localStorage.getItem('currentIndex'));
      playlist.splice(ii+1,0,this.songsTableData[index]);
      window.localStorage.setItem('currentPlayList',JSON.stringify(playlist));
    },
  },
  mounted:function () {//自动触发写入的函数
    this.selectedSongslistId=window.localStorage.getItem("selectedSongslistId");
    this.songsListName=window.localStorage.getItem("selectedSongslistName");
    this.$http.get('http://localhost:8082/api/songs/get_songsdetail/'+this.selectedSongslistId)
      .then(res =>{
        console.log(res.data);
        this.songsTableData.splice(0,this.songsTableData.length);
        for(let i = 0;i<res.data.length;i++)
        {
          this.songsTableData.push(res.data[i]);//需要修改
          console.log(this);
        }
      })
      .catch(err => {
        console.log(err);
      })
      this.loading=false;
  }
}
</script>
