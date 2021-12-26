<template>
    <!--路由占位符-->
      <div class="background" style="width: 100%; height:100%">
        <div class="test" style="width: 100%">

        <div id="tjm">
        <router-view></router-view>
        </div>
      </div>
      </div>
</template>

<script>

export default{
  components:{
  },
}
</script>

<style scoped="scoped">


.background{
  background-image: url(assets/background.jpeg);
  height: 110%;
  width: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.test{
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position:relative;
  background-color: unset
}
</style>


