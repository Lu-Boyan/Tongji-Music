
<template>
    <div class="common-layout">
   

    <el-container>
      <el-aside ><img src='../assets/logo.png' width="200" height="200"></el-aside>
      
      <el-main id="me">
      
      <el-row style="height:40px">
        <el-col :span="12" ><h2 id="username" style="height:20px">{{this.name}}</h2></el-col>
       
        
      </el-row>
      
        <el-row style="height:140px;text-align:left">
          <el-col :span="3" >
            <el-row style="height:40px"><h1>85</h1></el-row>
            <el-row >动态</el-row>
            </el-col>
          <el-col :span="3"><el-row style="height:40px"><h1>{{this.fans.length}}</h1></el-row>
           <el-row >
              <router-link :to="'/tjmusic/personal/like/'+this.id">关注</router-link>
             </el-row></el-col>
         <el-col :span="3"><el-row style="height:40px"><h1>{{this.focus.length}}</h1></el-row>
             <el-row>
               粉丝
               </el-row></el-col>
        </el-row>



        <br>
        <el-row id="info"> 
         个人介绍：{{this.content}}
          
        </el-row>
        <el-row id="info">
           
          所在地区：{{this.area}}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          年龄：{{this.age}}
        </el-row >
        
       
      </el-main>
    </el-container>



    <el-container id="f">
      <el-header>粉丝列表</el-header>
      <el-main>
        
        <el-row>     
         <el-col  id="fan">
    <el-container v-for="(focu, index) in this.focus":key="index" id="lis">  
          
       <el-aside id="as" width="16%"><img src="../assets/logo.png" height="80" width="80"></el-aside>
      <el-main id="love"  style="height:200px !important;">
        
       <el-row style="text-align: left">
        <el-col :span="12" style="height: 1px"><a id="username" style='color:black;height:1px;text-align: left'>{{fname[index]}}</a></el-col>
        <el-col :span="12" style="height :1px"><button style="width:200px;height:40px"  ><router-link :to="'/tjmusic/personal/other/'+focus" >查看主页</router-link> </button></button></el-col>
        
      </el-row>
      <el-row>
          <el-col :span="3">
            <a>动态 1</a>
          </el-col>

          <el-col :span="3">
            <a><router-link :to="'/tjmusic/personal/like/'+focus">关注</router-link> {{ffocus[index]}}</a>
          </el-col>
          <el-col :span="3">
            <a><router-link :to="'/tjmusic/personal/fans/'+focus">粉丝</router-link> {{ffans[index]}}</a>
          </el-col>
        </el-row>  
       
      </el-main> 
    </el-container>

    
    
         </el-col>
       </el-row>
      </el-main>
    </el-container>
   
  </div>
  <!-- </div>
  </div> -->
</template>
<script>

export default {
    name: 'like',
    data(){
       return {
      showAvatar: false,
      id: '',
      name: '',
      age: '',
      area: '',
      content: '',
      fans:[],
      focus:[],
      songslist:[],
      listname:[],
      fname:[],
      ffocus:[],
      ffans:[]
    }
          
    },
    mounted () {
     
    this.id=this.$route.params.id
  
    fetch("http://localhost:8904/api/v1/user/get_user/" + this.id, {
      method: "GET"
    }).then((res) => {
      var result = res.json()
      result.then((res) => {
        // console.log("666")
        // console.log(res)
        this.name = res.userName
        this.area = res.userArea
        this.age = res.userAge
        this.content = res.userContent
      })
    })
    
     fetch("http://localhost:8904/follow/get_focus/" + this.id, {
      method: "GET"
    }).then((res) => {


      var result = res.json()
      result.then((res) => {
        //console.log("666")
        //console.log(res)
        
        for(var i in res)
        {
          this.fans.push(res[i].fansId)
          
        }
        console.log(this.focus)
      })
    })
    
     fetch("http://localhost:8904/follow/get_fans/" + this.id, {
      method: "GET"
    }).then((res) => {
      var result = res.json()
      result.then((res) => {
        
        console.log(this.focus)
        for(var i in res)
        {
          //登录的id
          if(res[i].focusId!=1)
         { 
           this.focus.push(res[i].focusId)
          
          console.log(res[i].focusId)
        fetch("http://localhost:8904/api/v1/user/get_user/" + res[i].focusId, {
      method: "GET"
    }).then((res) => {
      var result = res.json()
      result.then((res) => {
        //console.log(res)
        this.fname.push(res.userName)
        
        console.log("woshi"+this.fname)
      })
    })
fetch("http://localhost:8904/follow/get_focus/" + res[i].focusId, {
      method: "GET"
    }).then((res) => {
      var result = res.json()
      result.then((res) => {
       
        this.ffocus.push(res.length)
        
        //console.log(this.ffocus)
      })
    })


fetch("http://localhost:8904/follow/get_fans/" + res[i].focusId, {
      method: "GET"
    }).then((res) => {
      var result = res.json()
      result.then((res) => {
       
        //console.log(res)
        this.ffans.push(res.length)
        
        //console.log(this.ffans)
      })
    })
    }
        }
        
      })
    })
    console.log("898")
    
    console.log("nihis"+this.focus[1])
    console.log(this.focus)
    console.log(resdata)
  },
    methods:{
       
                
            
        },
 
    
}
</script>

<style scoped>

/* .background
{
    background-image: url(../assets/background.jpeg);
    height: 110%;
		width: 100%;
		background-size: 100% 100%;
    background-repeat: no-repeat;
}
#particles-js
{
        width: 100%;
        height: 100%;
        position: absolute;
} */
#f
{
  height: 280px;
  /* background-color: aquamarine; */
}
#lis
{
  height: 100px;
  
}
#info
{
  text-align: left;
  line-height: 10px;
  
}
#fan
{
    height: 250px;
}
#love
{
  height: 110px;
  text-align: left;
}
#as
{
  height: 125px;
}
#p1
{
  /* background-color: aqua; */
  /* margin-bottom: 20px; */
  line-height: 10px;
  /* height: 10px; */
}
#me
{
  
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 70px;
}
#me >.el-col
{
  border-radius: 5px;
}
#me>.el-row
{
 
  margin-bottom: 20px;
  height: 10px;
  text-align: left;
}

#love >.el-col
{
  border-radius: 1px;
}
#love>.el-row
{
  margin-bottom: 20px;
  height: 0px;
}
.el-header
{
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: left;
  line-height: 60px;
}
.el-aside {
  /* background-color: #d3dce6; */
  
 
  color: var(--el-text-color-primary);
  text-align: left;
  line-height: 100px;

}

.el-main {
  /* background-color: #e9eef3; */
  color: var(--el-text-color-primary);
  text-align: left;
  line-height: 70px;
}

/* body > .el-container {
  margin-bottom: 50px;
} */
.el-row {
  margin-bottom: 20px;
  /* height: 20px; */

    /* &:last-child {
      margin-bottom: 0;
    } */
}
.el-col {
  border-radius: 1px;
  /* font-size: 20px; */
  /* line-height: 20px; */
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  
  text-align: left;
}
.bg-purple-light {
  /* background: #e5e9f2; */
  text-align: right;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
    
</style>
