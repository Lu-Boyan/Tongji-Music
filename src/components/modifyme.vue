<template>
  <el-card>
       <el-card-content style="text-align: left">
        <h1>修改个人信息</h1>

          <div class="course-title" >昵称：<el-input
      class="mb-4"
      v-model="this.name"
      placeholder="请输入修改后的内容"
      outline
    />
          </div>
          <div class="course-title" >地区：<el-input
      class="mb-4"
      v-model="this.area"
      placeholder="请输入修改后的内容"
      outline
    />
          </div>
          <div class="course-title" >个人介绍：<el-input
      class="mb-4"
      v-model="this.content"
      placeholder="请输入修改后的内容"
      outline
    />
          </div>
          </div>
          <div class="course-title" >年龄：<el-input
      class="mb-4"
      v-model="this.age"
      placeholder="请输入修改后的内容"
      outline
    />
          </div>
          <el-button @click="modify()" color="#e0e5df" style="color: rgb(40,40,40)">确认修改</el-button>
           </el-card-content>
  </el-card>

</template>

<script>
export default {
    data () {
        return {
          id: '',
      name: '',
      age: '',
      area: '',
      content: '',


        }
    },
    mounted () {

 //通过登录获得id
    //this.id = localStorage.getItem("userId")
    //用上面的替换下面这一行
    //this.id=1
    this.id =localStorage.getItem("userId")
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

    },
  methods: {
     //接口待完成
    modify()
    {

    }

  }
}
</script>

<style>
.course-title {
    /* text-align: left; */
    font-size: 25px;
    font-weight: bold;
    color: #656565;
    margin-bottom: 15px
}

.course-description {
    font-size: 25px;
    font-weight: bold;
    color: #656565;
    margin-bottom: 15px
}

.course-year{
    font-size: 25px;
    font-weight: bold;
    color: #656565;
    margin-bottom: 15px
}
.course-semester{
    font-size: 25px;
    font-weight: bold;
    color: #656565;
    margin-bottom: 15px
}
</style>
