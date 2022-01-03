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
  <el-table
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
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
  export default {
      components:{
      },
    data() {
      return {
        recommentTableData: [],
        loading:true,
        selectIndex:'',
        dialogFormVisible:false,
        value:'',
        options:[]
      }
    },
    methods:{
      playthis(index){
        console.log(window.localStorage.getItem('currentSongsId'));
        window.localStorage.setItem("currentSongsName",this.recommentTableData[index].songsName);
        window.localStorage.setItem('currentSongsId',this.recommentTableData[index].songsId);//播放这首歌
        console.log(window.localStorage.getItem('currentSongsId'));
        let playlist=JSON.parse(window.localStorage.getItem('currentPlayList'));
        let ii=parseInt(window.localStorage.getItem('currentIndex'));
        if(ii==0){//添加到currentIndex指的位置
          playlist.unshift(this.recommentTableData[index]);
        }
        else{
          playlist.splice(ii,0,this.recommentTableData[index]);
        }
        window.localStorage.setItem('currentPlayList',JSON.stringify(playlist));
        this.$http.post('http://localhost:8082/api/music/addMusic',{
          "songsId": this.recommentTableData[index].songsId,
          "songsName": this.recommentTableData[index].songsName,
          "songsArtistsName": this.recommentTableData[index].songsArtistsName,
          "songsImage": this.recommentTableData[index].songsImage,
          "songsTime": this.recommentTableData[index].songsTime,
        })
          .then(res =>{
            console.log(this.recommentTableData);
          })
          .catch(err => {
            console.log(err);
          })
      },
      addNextPlay(index){
        let playlist=JSON.parse(window.localStorage.getItem('currentPlayList'));
        console.log(playlist);
        let ii=parseInt(window.localStorage.getItem('currentIndex'));
        playlist.splice(ii+1,0,this.recommentTableData[index]);
        window.localStorage.setItem('currentPlayList',JSON.stringify(playlist));
        console.log(playlist);
        this.$http.post('http://localhost:8082/api/music/addMusic',{
          "songsId": this.recommentTableData[index].songsId,
          "songsName": this.recommentTableData[index].songsName,
          "songsArtistsName": this.recommentTableData[index].songsArtistsName,
          "songsImage": this.recommentTableData[index].songsImage,
          "songsTime": this.recommentTableData[index].songsTime,
        })
          .then(res =>{
            console.log(this.recommentTableData);
          })
          .catch(err => {
            console.log(err);
          })
      },
      select(index){
        this.selectIndex=index;
        this.dialogFormVisible=true;
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
    mounted:function () {
      let table=JSON.parse(window.localStorage.getItem("mySongslist"));
      for(let i=0;i<table.length;i++){
        this.options.push(table[i]);
      }
      this.$http.get('http://localhost:8082/api/songs/get_recommend/'+JSON.parse(window.localStorage.getItem("userToken")).userId)
        .then(res =>{
          console.log(res);
          this.recommentTableData.splice(0,this.recommentTableData.length);
          for(let i=0;i<res.data.length;i++){
            this.$http.get('http://47.101.183.170:3000/search?keywords='+res.data[i])
              .then(res =>{
                //清空表格
                console.log(res.data.result.songs);
                for(let i=0;i<5;i++){
                  let mt=Math.trunc(res.data.result.songs[i].duration/60000);
                  if(mt<10)
                    mt="0"+mt.toString();
                  let st=Math.trunc(res.data.result.songs[i].duration/1000)-mt*60;
                  if(st<10)
                    st="0"+st.toString();
                  this.recommentTableData.push({
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
          };
          this.loading=false;
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
</script>
