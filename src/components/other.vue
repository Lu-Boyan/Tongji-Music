<template>

  <div class="common-layout">


    <el-container>
      <el-aside ><img src='../assets/logo.png' width="200" height="200"></el-aside>

      <el-main>

      <el-row style="height:40px">
        <el-col :span="12" ><h2 id="username" >{{this.name}}</h2></el-col>
        <el-col :span="12">
          <el-button v-if="this.on==0" @click="follow()" style="width:200px;height:40px">{{this.foll[this.on]}}</el-button>

          <el-button v-if="this.on!=0" @click="delete1()" style="width:200px;height:40px">{{this.foll[this.on]}}</el-button>
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
      <el-header>{{this.name}}创建的歌单（{{this.songslist.length}}）</el-header>
      <el-main>

       <va-card
            v-for="(songslist, index) in this.songslist"
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
              <!-- <h4 @click="tolist()">{{listname[index]}}</h4> -->
                <!-- <el-button type="primary" plain round size="medium" @click="tolist()">{{listname[index]}}</el-button> -->
                <a>{{listname[index]}}</a>
                <div style="height:20px" />
                <el-button @click="collect(songslist)">收藏</el-button>
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
import axios from 'axios'

export default {

 data () {
    return {
      showAvatar: false,
      visible4:false,
      on:0,
      id: '',
      name: '',
      age: '',
      area: '',
      content: '',
      fans:[],
      focus:[],
      songslist:[],
      listname:[],
      foll:["关注","取消关注"]
    }
  },
   mounted () {
     //通过登录获得id
    //this.id = localStorage.getItem("userId")
    //用上面的替换下面这一行
    this.id=this.$route.params.id
    console.log(this.id)
    fetch("http://localhost:8082/api/user/get_user/" + this.id, {
      method: "GET",
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
    fetch("http://localhost:8082/api/follow/get_focus/" + this.id, {
      method: "GET",
    }).then((res) => {
      var result = res.json()
      result.then((res) => {
        // console.log("666")
        // console.log(res)
        for(var i in res)
        {
           //通过登录获得id
    //this.id = localStorage.getItem("userId")
          this.id =localStorage.getItem("userToken").userId
    //用上面的替换下面这一行

          this.fans.push(res[i].fansId)
        }

      })
    })
     fetch("http://localhost:8082/api/follow/get_fans/" + this.id, {
      method: "GET",
    }).then((res) => {
      var result = res.json()
      result.then((res) => {
        console.log("666")
        console.log(res)
        for(var i in res)
        {
           if(res[i].focusId==1)
            {
                this.on=1
            }
          this.focus.push(res[i].focusId)
        }
        console.log(this.focus)
      })
    })
 fetch( "http://localhost:8082/api/songslist/get/" + this.id, {
      method: "GET",
    }).then((res) => {
      var result = res.json()
      result.then((res) => {
        console.log(res)
        this.songslist=res

        for(var i in res)
        {
          this.listname.push(res[i].songsListName)
        }
        console.log(this.listname)
      })
    })


  },
  methods: {
    collect(songslist)
    {
      console.log(songslist)
      // var a=localStorage.getItem("userId")
      // //a=Number(a)
      // console.log(this.$route.params.id)
      // songslist.songsListId=String(songslist.songsListId)
        // let req = {
        //         songsListId: songslist.songsListId,
        //         collectorId:localStorage.getItem("userId")
        //     }
        //     console.log(req)
        //     fetch("http://localhost:8907/listcollect/add", {
        //         method: "POST",
        //         body: JSON.stringify(req),
        //     }).then(response => {
        //         console.log(response)
        //         let result = response.json()
        //         result.then(res => {
        //         console.log(res)
        //         if(res.status==200)
        //           alert("收藏成功")
        //         else
        //           alert("您已经收藏了该歌单")
        //         })
        //     })
        axios.post('http://localhost:8082/api/listcollect/add', {
          songsListId: songslist.songsListId,
          collectorId:localStorage.getItem("userId")
        })
          .then(function (res) {
            console.log(res)
            if(res.status==200)
              alert("收藏成功")
            else
              alert("您已经收藏该歌单")
          })
          .catch(err => {
            alert("您已经收藏该歌单")
          })

    },
    handleClick4() {
      this.visible4 = true;
    },
    follow()
    {
        let req = {
                focusId: 1,
                fansId:this.id
            }

            fetch("http://localhost:8082/api/follow/add", {
                method: "POST",
                body: JSON.stringify(req),

            }).then(response => {
                console.log(response)
                let result = response.json()
                result.then(res => {
                console.log(res)

                   alert("关注成功")
                    location.reload(true)
                    this.on=1


                })
            })

    },
    delete1()
    {
         //通过登录获得id
    //this.id = localStorage.getItem("userId")
    //用上面的替换下面这一行（other里141行）
fetch( "http://localhost:8082/api/follow/remove?focusId=" + 1+"&fansId="+this.id, {
      method: "DELETE",
    }).then((res) => {
      var result = res.json()
      result.then((res) => {
          console.log(res)
          alert("取消关注成功")
            location.reload(true)
            this.on=0
      })
    })
    }
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
