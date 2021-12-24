<template>

  <div class="common-layout">
   

    <el-container>
      <el-aside ><img src='../assets/logo.png' width="200" height="200"></el-aside>
      
      <el-main>
      
      <el-row style="height:40px">
        <el-col :span="12" ><h2 id="username" >{{this.name}}</h2></el-col>
        <el-col :span="12">
          <!-- <el-button @click="change()" style="width:200px;height:40px">编辑个人资料</el-button> -->
          <router-link to="/tjmusic/personal/me/modify">编辑个人资料</router-link>
          </el-col>
        
      </el-row>
      
        <el-row style="height:140px">
          <el-col :span="3">
            <el-row style="height:40px"><h1>85</h1></el-row>
            <el-row >动态</el-row>
            </el-col>
          <el-col :span="3"><el-row style="height:40px"><h1>{{this.fans.length}}</h1></el-row>
           <el-row >
             <!-- /tjmusic/personal/like -->
             <!-- <router-link :to="{path:'/tjmusic/personal/like',params: {id:this.id}}">关注</router-link> -->
             <router-link :to="'/tjmusic/personal/like/'+this.id">关注</router-link> 
             </el-row></el-col>
         <el-col :span="3"><el-row style="height:40px"><h1>{{this.focus.length}}</h1></el-row>
             <el-row>
              <router-link :to="'/tjmusic/personal/fans/'+this.id">粉丝</router-link>
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
        </el-row>
       
       
      </el-main>
    </el-container>


    
    <el-container>
      <el-header>我创建的歌单（{{this.songslist.length}}）</el-header>
      <el-main>

       <va-card 
            v-for="(songslis, index) in this.songslist"
            :key="index"
            color="#b5c4b1" 
            gradient
            style="margin-bottom: 10px"
            >
              <va-card-content style="rgb(60, 60, 60); font-weight: bold">
                <el-col :span="3" >
           <div class="photo">
            <el-row id="p1"><img src="https://pic1.zhimg.com/v2-4fc5ca746aa56334ad772504557907d1_r.jpg?source=1940ef5c" width="150" height="150"></el-row>
            <el-row>
                <router-link :to="'/tjmusic/personal/lists/'+songslis.songsListId">{{listname[index]}}</router-link>
            </el-row>
            </div></el-col>
                

              </va-card-content>
              
            </va-card>
         
      </el-main>
    </el-container>
   
  <!-- </div>
  </div> -->
</div>
</template>

<script>


export default {
 data () {
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
      listname:[]
    }
  },
   mounted () {
     //通过登录获得id
    //this.id = localStorage.getItem("userId")
    //用上面的替换下面这一行（other里141行+方法里）
    this.id=1
  
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
        // console.log("666")
        // console.log(res)
        for(var i in res)
        {
          this.fans.push(res[i].fansId)
        }
        
      })
    })
     fetch("http://localhost:8904/follow/get_fans/" + this.id, {
      method: "GET"
    }).then((res) => {
      var result = res.json()
      result.then((res) => {
        console.log("666")
        console.log(res)
        for(var i in res)
        {
          this.focus.push(res[i].focusId)
        }
        console.log(this.focus)
      })
    })
 fetch( "http://localhost:8908/songslist/get/" + this.id, {
      method: "GET"
    }).then((res) => {
      var result = res.json()
      result.then((res) => {
        //console.log(res)
        this.songslist=res
        console.log(this.songslist[0].songsListId)
        for(var i in res)
        {
          this.listname.push(res[i].songsListName)
        }
        console.log(this.listname)
      })
    })
    
    
  },
  methods: {
    
    
  }
}
</script>

<style scoped>

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
  height: 140px;
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