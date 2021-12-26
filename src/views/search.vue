<template>
<div class="playlist">
    <el-row class="demo-autocomplete">
        <el-col :span="12" style="width: 400px !important;">
        <el-autocomplete
        class="inline-input"
        v-model="state"
        style="margin-left:150px !important;"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容进行搜索"
        ></el-autocomplete>
        </el-col>
        <el-button icon="el-icon-search" @click="handleSearch" style="margin-top:10px;margin-left:-220px !important;" circle></el-button>
    </el-row>
            <el-table
            :data="searchTableData"
            height="380"
            style="width: 100%">
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
            <el-table-column>
              <template slot-scope="scope">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click="playthis(scope.$index)">播放</el-dropdown-item>
                    <el-dropdown-item @click="addNextPlay(scope.$index)">添加到下一首播放</el-dropdown-item>
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
        songsDatas: [],
        searchTableData: [{
          songsName: '稻香',
          songsArtistsName: '周杰伦',
          songsTime: '06:66',
          songsId:'6',
          songsImage:'null'
        }],
        state: '',
      }
    },
    methods: {
      querySearch(queryString, cb) {
        var songsDatas = this.songsDatas;
        var results = queryString ? songsDatas.filter(this.createFilter(queryString)) : songsDatas;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (songsData) => {
          return (songsData.songsName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        this.$http.get('http://localhost:8950/music/getAllMusic')
          .then(res =>{
            console.log(res);
            this.songsDatas.splice(0,this.songsDatas.length);
            let obj = {
              songsName:''
            };
            for(let i=0;i<res.data.length;i++){
              obj.songsName=res.data[i].songsName;
              this.songsDatas.push(obj);
            }
          })
          .catch(err => {
            console.log(err);
          })
      },
      playthis(index){
        window.localStorage.setItem('curruntSongsId',this.playlistTableData[index].songsId);//播放这首歌
        let playlist=window.localStorage.getItem('curruntPlayList');
        let ii=window.localStorage.getItem('curruntIndex');
        playlist.splice(ii+index,1);//删除这首歌
        if(ii==0){//添加到curruntIndex指的位置
          playlist.unshift(this.playlistTableData[index]);
        }
        else{
          playlist.splice(ii-1,0,this.playlistTableData[index]);
        }
        window.localStorage.setItem('curruntPlayList',playlist);
      },
      addNextPlay(index){
        let playlist=window.localStorage.getItem('curruntPlayList');
        let ii=window.localStorage.getItem('curruntIndex');
        if(ii+index!=0){
          playlist.splice(ii+index,1);//删除这首歌
          playlist.splice(ii,0,this.playlistTableData[index]);
          window.localStorage.setItem('curruntPlayList',playlist);
        }
      },
      handleSearch() {
        this.$http.get('http://localhost:3000/search?keywords='+this.state)
          .then(res =>{
            //清空表格
            this.searchTableData.splice(0,this.searchTableData.length);
            console.log(res);

            let obj = {
              songsId:'',
              songsName:'',
              songsArtistsName:'',
              songsTime:'',
              songsImage:'',
            };

            for(let i=0;i<res.data.result.songs.length;i++){
              obj.songsId=res.data.result.songs[i].id;
              obj.songsName=res.data.result.songs[i].name;
              obj.songsArtistsName=res.data.result.songs[i].artists.name;
              let mt=Math.trunc(res.data.result.songs[i].duration/60000);
              let st=(res.data.result.songs[i].duration/1000)-mt*60;
              obj.songsTime=mt+':'+st;
              obj.songsImage=res.data.result.songs[i].album.img1v1Url;
              //push进this.tableData中
              this.searchTableData.push(obj);
            }
            console.log(this.searchTableData);
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    mounted() {
      this.loadAll();
      console.log(this.songsDatas);
    }
  }
</script>
