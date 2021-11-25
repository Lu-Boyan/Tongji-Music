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
      
      <el-main>
      
      <el-row style="height:40px">
        <el-col :span="12" ><h2 id="username" >陆伯言很连清</h2></el-col>
        <el-col :span="12"><button style="width:200px;height:40px">编辑个人资料</button></el-col>
        
      </el-row>
      
        <el-row style="height:140px">
          <el-col :span="3">
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
        </el-row>
        <el-row id="info">
      
          社交网络：
        </el-row>
       
      </el-main>
    </el-container>


    
    <el-container>
      <el-header>我创建的歌单（5）</el-header>
      <el-main>

      
         <el-col :span="3" >
           <div class="photo">
            <el-row id="p1"><img src="https://tse1-mm.cn.bing.net/th/id/R-C.64995cddf138b3b450fa61c2dca65ef5?rik=Q5x0uFKfJyJhag&riu=http%3a%2f%2fp1.music.126.net%2fAZEa0RlZxNkxWAi0wpDI4w%3d%3d%2f109951163097632993.jpg&ehk=bD80vbjw5P71deykLDw3AGeaYpv1j0F67YjwAr0HE4E%3d&risl=&pid=ImgRaw&r=0" width="150" height="150"></el-row>
            <el-row>
              <h1>2017</h1>
                
            </el-row>
            </div></el-col>

            <el-col :span="3" >
           <div class="photo">
            <el-row  id="p1"><img src="https://tse1-mm.cn.bing.net/th/id/R-C.64995cddf138b3b450fa61c2dca65ef5?rik=Q5x0uFKfJyJhag&riu=http%3a%2f%2fp1.music.126.net%2fAZEa0RlZxNkxWAi0wpDI4w%3d%3d%2f109951163097632993.jpg&ehk=bD80vbjw5P71deykLDw3AGeaYpv1j0F67YjwAr0HE4E%3d&risl=&pid=ImgRaw&r=0" width="150" height="150"></el-row>
            <el-row>
              <h1>2017</h1>
            </el-row>
            </div></el-col>


            <el-col :span="3" >
           <div class="photo">
            <el-row id="p1"><img src="https://tse1-mm.cn.bing.net/th/id/R-C.64995cddf138b3b450fa61c2dca65ef5?rik=Q5x0uFKfJyJhag&riu=http%3a%2f%2fp1.music.126.net%2fAZEa0RlZxNkxWAi0wpDI4w%3d%3d%2f109951163097632993.jpg&ehk=bD80vbjw5P71deykLDw3AGeaYpv1j0F67YjwAr0HE4E%3d&risl=&pid=ImgRaw&r=0" width="150" height="150"></el-row>
            <el-row>
              <h1>2017</h1>
            </el-row>
            </div></el-col>


            <el-col :span="3" >
           <div class="photo">
            <el-row id="p1"><img src="https://tse1-mm.cn.bing.net/th/id/R-C.64995cddf138b3b450fa61c2dca65ef5?rik=Q5x0uFKfJyJhag&riu=http%3a%2f%2fp1.music.126.net%2fAZEa0RlZxNkxWAi0wpDI4w%3d%3d%2f109951163097632993.jpg&ehk=bD80vbjw5P71deykLDw3AGeaYpv1j0F67YjwAr0HE4E%3d&risl=&pid=ImgRaw&r=0" width="150" height="150"></el-row>
            <el-row>
              <h1>2017</h1>
            </el-row>
            </div></el-col>


          <el-col :span="3" >
           <div class="photo">
            <el-row id="p1"><img src="https://tse1-mm.cn.bing.net/th/id/R-C.64995cddf138b3b450fa61c2dca65ef5?rik=Q5x0uFKfJyJhag&riu=http%3a%2f%2fp1.music.126.net%2fAZEa0RlZxNkxWAi0wpDI4w%3d%3d%2f109951163097632993.jpg&ehk=bD80vbjw5P71deykLDw3AGeaYpv1j0F67YjwAr0HE4E%3d&risl=&pid=ImgRaw&r=0" width="150" height="150"></el-row>
            <el-row>
              <h1>2017</h1>
            </el-row>
            </div></el-col>
      </el-main>
    </el-container>
   
  <!-- </div>
  </div> -->
</div>
</template>

<script>


export default {
  name: 'Me',
  components: {
    // HelloWorld
  },
  data () {
    return {

    }
  },
  methods: {
    
    
  }
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
/* .el-container
{
  height:100%;
} */
.photo
{
  margin-bottom: 20px;
  height: 200px;
  margin-right: 80px;
}
#info
{
 
  text-align: left;
  height: 40px;
}
#p1
{
  height: 120px;
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
  text-align: center;
  line-height: 100px;

}

.el-main {
  /* background-color: #e9eef3; */
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 10px;
  height: 300px;
  
}

/* body > .el-container {
  margin-bottom: 50px;
} */
.el-row {
  margin-bottom: 20px;
  height: 90px;
  text-align: left;
    /* &:last-child {
      margin-bottom: 0;
    } */
}
.el-col {
  border-radius: 4px;
  /* height :20px; */
  /* font-size: 20px; */
  /* line-height: 20px; */
}
.bg-purple {
  
  text-align: left;
}
.bg-purple-light {
  /* background: #e5e9f2; */
  text-align: right;
}
  /* .grid-content {
    border-radius: 4px;
    min-height: 36px;
  } */

/* .el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
</style>