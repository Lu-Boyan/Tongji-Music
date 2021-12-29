<template>
<div class="playlist">
            <el-table
            :data="playlistTableData"
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
                      <el-dropdown-item @click.native="playthis(scope.$index)">播放</el-dropdown-item>
                      <el-dropdown-item @click.native="addNextPlay(scope.$index)">添加到下一首播放</el-dropdown-item>
                      <el-dropdown-item @click.native="remove(scope.$index)">从播放列表删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
</div>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        playlistId:0,
        playlistTableData: [],
      }
    },
    methods:{
      playthis(index){
        window.localStorage.setItem('currentSongsId',this.playlistTableData[index].songsId);//播放这首歌
        let playlist=JSON.parse(window.localStorage.getItem('currentPlayList'));
        let ii=window.localStorage.getItem('currentIndex');
        playlist.splice(ii+index,1);//删除这首歌
        if(ii==0){//添加到currentIndex指的位置
          playlist.unshift(this.playlistTableData[index]);
        }
        else{
          playlist.splice(ii-1,0,this.playlistTableData[index]);
        }
        window.localStorage.setItem('currentPlayList',JSON.stringify(playlist));
      },
      addNextPlay(index){
        let playlist=JSON.parse(window.localStorage.getItem('currentPlayList'));
        let ii=window.localStorage.getItem('currentIndex');
        if(ii+index!=0){
          playlist.splice(ii+index,1);//删除这首歌
          playlist.splice(ii,0,this.playlistTableData[index]);
          window.localStorage.setItem('currentPlayList',JSON.stringify(playlist));
        }
      },
      remove(index){
        let playlist=JSON.parse(window.localStorage.getItem('currentPlayList'));
        let ii=window.localStorage.getItem('currentIndex');
        playlist.splice(ii+index,ii+index+1);
        window.localStorage.setItem('currentPlayList',JSON.stringify(playlist));
      }
    },
    mounted:function () {//自动触发写入的函数
      let playlist=JSON.parse(window.localStorage.getItem('currentPlayList'));
      if(playlist.length<1){
        let t=window.localStorage.getItem('defaultPlaylist');
        this.$http.get('http://localhost:8082/api/songs/get_songsdetail/'+t)
        .then(res =>{
            console.log(res);
            window.localStorage.setItem('currentIndex','0');
            for(let i = 0;i<res.data.length;i++)
            {
              this.playlistTableData.push(res.data[i]);
            }
            window.localStorage.setItem('currentPlayList',JSON.stringify(this.playlistTableData));
          })
          .catch(err => {
            console.log(err);
          })
      }
      else{
        this.playlistTableData=[];
        for(let i=window.localStorage.getItem('currentIndex');i<playlist.length;i++)
          this.playlistTableData.push(playlist[i]);
      }
    }
  }
</script>
