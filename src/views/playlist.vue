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
                      <el-dropdown-item @click="playthis(scope.$index)">播放</el-dropdown-item>
                      <el-dropdown-item @click="addNextPlay(scope.$index)">添加到下一首播放</el-dropdown-item>
                      <el-dropdown-item @click="remove(scope.$index)">从播放列表删除</el-dropdown-item>
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
      remove(index){
        let playlist=window.localStorage.getItem('curruntPlayList');
        let ii=window.localStorage.getItem('curruntIndex');
        playlist.splice(ii+index,ii+index+1);
        window.localStorage.setItem('curruntPlayList',playlist);
      }
    },
    beforeMount() {
        this.playlistId=window.localStorage.getItem('defaultPlayslist');
    },
    mounted:function () {//自动触发写入的函数
      if(this.playlistTableData==[]){
      this.playlistTableData.splice(0,this.playlistTableData.length);
      this.$http.get('http://localhost:8903/songs/get_songs/'+this.playlistId)
      .then(res =>{
          console.log(res);
          let list={
            songsName:'',
            songsArtistsName:'',
            songsTime:''
          };
          let index=window.localStorage.getItem('curruntIndex');
          for(let i = index;i<res.data.length;i++)
          {
            list.songsName=res.data[i].songsName;//需要修改
            list.songsArtistsName=res.data[i].songsArtistsName;
            list.songsTime=res.data[i].songsTime;
            this.playlistTableData.push(list);
          }
          window.localStorage.setItem('curruntPlayList',this.playlistTableData)
        })
        .catch(err => {
          console.log(err);
        })
      }
      else{
          this.playlistTableData=window.localStorage.getItem('curruntPlayList');
      }
    }
  }
</script>
