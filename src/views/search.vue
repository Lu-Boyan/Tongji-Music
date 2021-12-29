<template>
<div class="playlist">
  <el-dialog title="添加歌曲到歌单" :visible.sync="dialogFormVisible">
    <el-form>
      <el-form-item label="选择歌单" label-width="120px">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :label="item.songsListName"
            :value="item.songsListId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.native="addSongsToList">确 定</el-button>
    </div>
  </el-dialog>
    <el-row class="demo-autocomplete">
        <el-col :span="12" style="width: 400px !important;">
        <el-autocomplete
        class="inline-input"
        v-model="state"
        style="margin-left:150px;width: 300px !important;"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容进行搜索"
        ></el-autocomplete>
        </el-col>
        <el-button icon="el-icon-search" @click="handleSearch" style="margin-top:10px;margin-left:120px !important;" circle></el-button>
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
            width="350"
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
              align= "center">
              <template slot-scope="scope">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="playthis(scope.$index)">播放</el-dropdown-item>
                    <el-dropdown-item @click.native="addNextPlay(scope.$index)">添加到下一首播放</el-dropdown-item>
                    <el-dropdown-item @click.native="select(scope.$index)">添加到歌单</el-dropdown-item>
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
        options:[],
        value:'',
        state: '',
        dialogFormVisible: false,
        selectIndex:'',
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
        this.$http.get('http://localhost:8082/api/music/getAllMusic')
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
        console.log(window.localStorage.getItem('currentSongsId'));
        window.localStorage.setItem('currentSongsId',this.searchTableData[index].songsId);//播放这首歌
        console.log(window.localStorage.getItem('currentSongsId'));
        let playlist=JSON.parse(window.localStorage.getItem('currentPlayList'));
        let ii=window.localStorage.getItem('currentIndex');
        if(ii==0){//添加到currentIndex指的位置
          playlist.unshift(this.searchTableData[index]);
        }
        else{
          playlist.splice(ii,0,this.searchTableData[index]);
        }
        window.localStorage.setItem('currentPlayList',JSON.stringify(playlist));
        this.$http.post('http://localhost:8082/api/music/addMusic',{
          "songsId": this.searchTableData[index].songsId,
          "songsName": this.searchTableData[index].songsName,
          "songsArtistsName": this.searchTableData[index].songsArtistsName,
          "songsImage": this.searchTableData[index].songsImage,
          "songsTime": this.searchTableData[index].songsTime,
        })
          .then(res =>{
            console.log(this.searchTableData);
          })
          .catch(err => {
            console.log(err);
          })
      },
      addNextPlay(index){
        let playlist=JSON.parse(window.localStorage.getItem('currentPlayList'));
        console.log(playlist);
        let ii=window.localStorage.getItem('currentIndex');
        playlist.splice(ii+1,0,this.searchTableData[index]);
        window.localStorage.setItem('currentPlayList',JSON.stringify(playlist));
        console.log(playlist);
        this.$http.post('http://localhost:8082/api/music/addMusic',{
          "songsId": this.searchTableData[index].songsId,
          "songsName": this.searchTableData[index].songsName,
          "songsArtistsName": this.searchTableData[index].songsArtistsName,
          "songsImage": this.searchTableData[index].songsImage,
          "songsTime": this.searchTableData[index].songsTime,
        })
          .then(res =>{
            console.log(this.searchTableData);
          })
          .catch(err => {
            console.log(err);
          })
      },
      select(index){
        this.selectIndex=index;
        this.dialogFormVisible=true;
      },
      handleSearch() {
        this.$http.get('http://47.101.183.170:3000/search?keywords='+this.state)
          .then(res =>{
            //清空表格
            this.searchTableData.splice(0,this.searchTableData.length);
            console.log(res.data.result.songs);
            for(let i=0;i<res.data.result.songs.length;i++){
              let mt=Math.trunc(res.data.result.songs[i].duration/60000);
              if(mt<10)
                mt="0"+mt.toString();
              let st=Math.trunc(res.data.result.songs[i].duration/1000)-mt*60;
              if(st<10)
                st="0"+st.toString();
              this.searchTableData.push({
                songsId:res.data.result.songs[i].id,
                songsName:res.data.result.songs[i].name,
                songsArtistsName:res.data.result.songs[i].artists[0].name,
                songsTime:mt+':'+st,
                songsImage:res.data.result.songs[i].album.img1v1Url,
              })
            }
          })
          .catch(err => {
            console.log(err);
          })
      },
      addSongsToList(){
        this.dialogFormVisible = false;
        let index=this.selectIndex;
        console.log(this.searchTableData[index]);

        this.$http.post('http://localhost:8082/api/music/addMusic',{
            "songsId": this.searchTableData[index].songsId,
            "songsName": this.searchTableData[index].songsName,
            "songsArtistsName": this.searchTableData[index].songsArtistsName,
            "songsImage": this.searchTableData[index].songsImage,
            "songsTime": this.searchTableData[index].songsTime,
          })
          .then(res =>{
            console.log(this.searchTableData);
          })
          .catch(err => {
            console.log(err);
          });
        this.$http.post('http://localhost:8082/api/songs/add', {
          "songsListId":this.value,
          "songsId":this.searchTableData[index].songsId
        })
          .then(res =>{
            //清空表格
            this.$alert('该歌曲成功添加至歌单！', '消息通知', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          })
          .catch(err => {
            console.log(err);
            this.$alert('由于某种未知原因，歌曲添加至歌单失败！', '消息通知', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          })
      },
    },

    mounted() {
      this.loadAll();
      let table=JSON.parse(window.localStorage.getItem("mySongslist"));
      for(let i=0;i<table.length;i++){
        this.options.push(table[i]);
      }
    }
  }
</script>
