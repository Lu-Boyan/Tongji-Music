<template>
<div class="background">
  <div class="block">

    <el-card>

      <div>
        <table>
          <tr>
            <td>
              <h2 >动态</h2>
            </td>
            <td>
              <el-button round size="mini" style="margin-top:-5px;position:absolute;right:35px;" @click="dialogFormVisible = true" >发布动态</el-button>
            </td>
          </tr>
        </table>

      </div>

      <hr color="red" style="margin-top:-10px;">

        <el-timeline style="margin-top:30px; margin-left:-35px">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.momentTime">
              <el-card>
                <table>
                  <tr>
                      <td><img src="../assets/logo.png"  style="width:40px; height:40px"></td>
                      <td><h4 style="margin-top:10px; margin-left:10px">{{theactivities[index].userName}}</h4></td>
                  </tr>
                  </table>
                  <table>
                    <p style="margin-top:10px">{{ activity.momentContent }}</p>

                </table>
                <el-button type="text"  @click="del(activity.momentId)" style="margin-bottom:0px; float:right">删除</el-button>
                <!-- <el-button type="primary" @click="gettheCommunity()">搜索</el-button> -->
              </el-card>
          </el-timeline-item>
        </el-timeline>
    </el-card>

  <el-dialog :visible.sync="dialogFormVisible" width="40%" :close-on-click-modal="false">
    <template slot="title" >
      <div style="color:black">分享</div>
    </template>
    <hr style="margin-top:-30px;">

    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item style="margin-left:-120px; width:100%">
          <el-input v-model="form.momentContent" type="textarea" rows="5" placeholder="说点什么吧~" ></el-input>
        </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = true">添加歌曲</el-button>
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="onSubmit">分享</el-button>
      </div>
  </el-dialog>

  <el-dialog :visible.sync="dialogVisible" width="40%" :close-on-click-modal="false">
        <div class="playlist">
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
                    <el-dropdown-item @click.native="playthis(scope.$index)">选中</el-dropdown-item>
                    <!-- <el-dropdown-item @click.native="addNextPlay(scope.$index)">添加到下一首播放</el-dropdown-item>
                    <el-dropdown-item @click.native="select(scope.$index)">添加到歌单</el-dropdown-item> -->
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
            </el-table>
</div>
        <!-- 此处搜索歌曲入库，逻辑同主页search，返回歌曲id以备发布动态 -->
  </el-dialog>
  </div>
</div>
</template>




<style scoped>
    .background{
      background-image: url(../assets/background.jpeg);
      height: 110%;
      width: 100%;
      background-size: 100% 150%;
      background-repeat: repeat;
    }
</style>


<script>
import axios from 'axios'
  let urlBase;
  urlBase = "/community/";
  export default {
    data() {
      return {
        songsDatas: [],
        searchTableData: [],
        options:[],
        value:'',
        songsid:null,
        selectIndex:'',
        dialogFormVisible: false,
        dialogVisible:false,
        theactivities:[],
        form: {
          userId:0,
          momentContent:'',
          momentTime:'',
          songs_id:null,
        },
        search:'',
        code:[{}],
        state: '',
        i:0,
        activities: [
          // {
          //   // picture:'../assets/logo.png',
          //   name:'海亦',
          //   content: 'Success',
          //   timestamp: '2021-04-17 17:00',
          // },
          // {
          //   // picture:'../assets/logo.png',
          //   name:'初晴',
          //   content: 'Success',
          //   timestamp: '2021-04-16 17:00',
          // },
        ],
      }
    },
    created() {
      // this.loadTable();目前这句没有屁用
      this.gettheCommunity();
      var test=localStorage.getItem('userToken')
      test=JSON.parse(test)
      this.form.userId=test.userId;
      console.log(this.form.userId);
          },
    methods: {
      onSubmit() {
        console.log('submit!')
        alert("分享成功");
        this.dialogFormVisible=false;
        this.posttheCommunity();
      },
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
        this.songsid=window.localStorage.getItem('currentSongsId')
        let playlist=JSON.parse(window.localStorage.getItem('currentPlayList'));
        let ii=window.localStorage.getItem('currentIndex');
        alert("选中成功");
        this.dialogVisible=false;
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
        // alert("选中成功");
        // this.dialogVisible=false;
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
          })
      },
      change(e){
        this.$forceUpdate();
        this.search=e;
        console.log(this.search)
      },
      del(themomentId){
        axios.delete('http://localhost:8082/api/community/delete_community',{
          data:{
            momentId:themomentId
            }
          })
        this.gettheCommunity();
        },

      posttheCommunity(){
        var time=new Date().toLocaleString('chinese',{hour12:false});
        this.form.momentTime = time.toLocaleString( ); //获取日期与时间
        console.log(this.form)
        const data = {
            momentTime:this.form.momentTime,
            momentContent:this.form.momentContent,
            userId:this.form.userId,
            songsId:this.songsid,
        }
        axios.post('http://localhost:8082/api/community/post_community/',data)
        .then((res)=>{
            console.log(res);   //  处理成功的函数 相当于success
        })
        .catch((error)=>{
            console.log(error)  //  错误处理 相当于error
        })
      },
      async gettheCommunity () {
        const { data: res1 } =await this.$http.get('http://localhost:8082/api/community/getall',)
        this.activities=res1;
        console.log(this.activities);
          for(this.i=0;this.i<this.activities.length;this.i++)
          {
            const { data: res2 } =await this.$http.get('http://localhost:8082/api/user/get_user/'+this.activities[this.i].userId,)
            this.theactivities. push. apply ( this.theactivities , [res2] ) ;
          }

        console.log(this.activities);
        console.log(this.theactivities);
        },



      },


}
</script>
