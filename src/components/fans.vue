
<template>
<!-- <div class="background">
  <div class="login-register">
		<vue-particles
    color="#dedede"
    :particleOpacity="0.7"
    :particlesNumber="180"
    shapeType="circle"
    :particleSize="4"
    linesColor="#dedede"
    :linesWidth="1"
    :lineLinked="true"
    :lineOpacity="0.4"
    :linesDistance="150"
    :moveSpeed="3"
    :hoverEffect="true"
     hoverMode="grab"
     :clickEffect="true"
     clickMode="push"
   >
   </vue-particles> -->
    <div class="common-layout">
   

    <el-container>
      <el-aside ><img src='../assets/logo.png' width="200" height="200"></el-aside>
      
      <el-main id="me">
      
      <el-row style="height:40px">
        <el-col :span="12" ><h2 id="username" style="height:20px">陆伯言很连清</h2></el-col>
        <el-col :span="12"><button style="width:200px;height:40px">编辑个人资料</button></el-col>
        
      </el-row>
      
        <el-row style="height:140px;text-align:left">
          <el-col :span="3" >
            <el-row style="height:40px"><h1>85</h1></el-row>
            <el-row >动态</el-row>
            </el-col>
          <el-col :span="3"><el-row style="height:40px"><h1>64</h1></el-row>
           <el-row >
             <router-link to="/tjmusic/personal/like">关注</router-link>
             </el-row></el-col>
         <el-col :span="3"><el-row style="height:40px"><h1>56</h1></el-row>
             <el-row>
               <router-link to="/tjmusic/personal/fans">粉丝</router-link>
               </el-row></el-col>
        </el-row>



        <br>
        <el-row id="info"> 
         个人介绍：唯有时光 容得下年少 难以平复的心绪。
          
        </el-row>
        <el-row id="info">
           
          所在地区：上海市
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          年龄：00后
        </el-row >
        <el-row id="info"> 
      
          社交网络：
        </el-row>
       
      </el-main>
    </el-container>



    <el-container id="f">
      <el-header>粉丝列表</el-header>
      <el-main>
       <el-row>     
         <el-col  id="fan">
        <el-container v-for="o in 4" :key="o" id="lis">
      <!-- <el-aside id="as"><img src="../assets/logo.png" height="80" width="80"></el-aside> -->
      <el-aside id="as" width="6%"><img src="../assets/logo.png" height="80" width="80"></el-aside>
      <el-main id="love" style="height:200px !important;">
        
      <el-row style="text-align: left">
        <el-col :span="12" style="height: 1px"><a id="username" style='color:SkyBlue;height:1px;text-align: left'>陆伯言很连清</a></el-col>
        <el-col :span="12" style="height :1px"><button style="width:200px;height:40px">发私信</button></el-col>
        
      </el-row>
      <el-row>
          <el-col :span="3">
            <a>动态 1</a>
          </el-col>

          <el-col :span="3">
            <a><router-link to="/tjmusic/personal/like">关注</router-link> 64</a>
          </el-col>
          <el-col :span="3">
            <a><router-link to="/tjmusic/personal/fans">粉丝</router-link> 56</a>
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
        return 
          
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
