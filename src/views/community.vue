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
        <el-input v-model="search" suffix-icon="el-icon-search" placeholder="搜索" @input="change($event)"
                  @keyup.enter.native="searchHandler"></el-input>
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
  urlBase = "/api/v1/community/";
  export default {
    data() {
      return {
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
      this.userId=test.userId;
          },
    methods: {
      onSubmit() {
        console.log('submit!')
        alert("分享成功"); 
        this.dialogFormVisible=false;
        this.posttheCommunity();
      },
      handeleSelect(){

      },
      searchHandler(){
          this.$http.get('http://localhost:3000/search?keywords='+this.search)
          .then(res =>{
            // 清空表格
            // this.searchTableData.splice(0,this.searchTableData.length);
            console.log(res);

            // let obj = {
            //   songsId:'',
            //   songsName:'',
            //   songsArtistsName:'',
            //   songsTime:'',
            //   songsImage:'',
            // };

            // for(let i=0;i<res.data.result.songs.length;i++){
            //   obj.songsId=res.data.result.songs[i].id;
            //   obj.songsName=res.data.result.songs[i].name;
            //   obj.songsArtistsName=res.data.result.songs[i].artists.name;
            //   let mt=Math.trunc(res.data.result.songs[i].duration/60000);
            //   let st=(res.data.result.songs[i].duration/1000)-mt*60;
            //   obj.songsTime=mt+':'+st;
            //   obj.songsImage=res.data.result.songs[i].album.img1v1Url;
            //   //push进this.tableData中
            //   this.searchTableData.push(obj);
            // }
            // console.log(this.searchTableData);
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
        axios.delete('http://localhost:8910/community/delete_community',{
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
            userId:1,
        }
        axios.post('http://localhost:8910/community/post_community/',data)
        .then((res)=>{
            console.log(res);   //  处理成功的函数 相当于success
        })
        .catch((error)=>{
            console.log(error)  //  错误处理 相当于error
        })
      },
      async gettheCommunity () {
        const { data: res1 } =await this.$http.get('http://localhost:8910/community/getall',)
        this.activities=res1;
        console.log(this.activities);
          for(this.i=0;this.i<this.activities.length;this.i++)
          {
            const { data: res2 } =await this.$http.get('http://localhost:8901/user/get_user/'+this.activities[this.i].userId,)
            this.theactivities. push. apply ( this.theactivities , [res2] ) ;
          }
        
        console.log(this.activities);
        console.log(this.theactivities);
        },



      },
  

}
</script>