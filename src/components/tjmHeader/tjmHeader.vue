<template>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="background-color: unset;
		border-radius: 20px;
    border-bottom: 0px;
		box-shadow: 0 0 3px #00f7ff,
					0 0 6px #00e1ff;">
  <el-menu-item class="el-icon-s-grid" style="color:#22DDDD !important;" index="1">TJMusic</el-menu-item>
  <el-menu-item index="2" style="color:#22DDDD !important;" ><router-link to="/tjmusic/mainPage">主页面</router-link></el-menu-item>
  <el-menu-item index="3" style="color:#22DDDD !important;" ><router-link to="/tjmusic/community">云村</router-link></el-menu-item>
  <el-menu-item index="4" style='position: absolute;right:10px;top:5px;color:#22DDDD;'>
    <el-dropdown split-button type="primary">
      {{name}}
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item> <router-link to="/tjmusic/personal">个人信息</router-link></el-dropdown-item>
        <el-dropdown-item ><label @click="quit">退出</label></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>



  </el-menu-item>
</el-menu>

</template>

<script>
export default{
  data() {
    return {
      name: '',
    }
  },



      methods:
    {


      quit() {
        this.$http.get('http://localhost:8901/user/logout')
        .then(res => {
            console.log(res)
          })
        window.location.href="blank"
      },
      showInfo()
      {
        var tmp  = JSON.parse(window.localStorage.getItem("userToken"))
        this.name = tmp.userName+'('+ tmp.userId+')'

      },
    },
  mounted() {
    this.showInfo()
  }


}
</script>
