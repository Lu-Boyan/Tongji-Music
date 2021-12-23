<template xmlns:style="http://www.w3.org/1999/xhtml">
  <div class="background">
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
</vue-particles>
	<div class="contain">
		<div class="big-box" :class="{active:isLogin}">
				<div class="big-contain" v-if="!isLogin">
					<div class="btitle">账户登录</div>
					<div class="bform">
						<input type="user_id" placeholder="账号" v-model="form.user_id" maxlength="7">
						<span class="errTips" v-if="login_existed">* 账号填写错误 *</span>
						<input type="password" placeholder="密码" v-model="form.userpwd" maxlength="16">
						<span class="errTips" v-if="passwordError">* 密码填写错误 *</span>
					</div>
					<button class="bbutton" @click="login">登录</button>
				</div>
				<div class="big-contain" v-else>
					<div class="btitle">创建账户</div>
					<div class="bform">
						<input type="username" placeholder="用户名" v-model="form.username" maxlength="7">
						<span class="errTips" v-if="register_existed">* 用户名已经存在！ *</span>
						<input type="email" placeholder="邮箱" v-model="form.useremail">
						<input type="password" placeholder="密码" v-model="form.userpwd" maxlength="16">
					</div>
					<button class="bbutton" @click="register">注册</button>
				</div>
			</div>
			<div class="small-box" :class="{active:isLogin}">
				<div class="small-contain" v-if="!isLogin">
					<img src='@/assets/logo.png' style:width=100px height=100px>
					<p class="scontent">开始注册，进入TJ Music的世界吧！</p>
					<button class="sbutton" @click="changeType">注册</button>
				</div>
				<div class="small-contain" v-else>
					<img src='@/assets/logo.png' style:width=100px height=100px>
					<p class="scontent">点击下方，登录你的账户</p>
					<button class="sbutton" @click="changeType">登录</button>
				</div>
			</div>
	</div>
   </div>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  name:'login-register',
  data(){
    return {
      isLogin:false,
      passwordError: false,
      login_existed: false,
      register_existed: false,
      id_notexisted:false,
      binded:false,
      form:{
        user_id:'',
        username:'',
        useremail:'',
        userpwd:'',
      },
    }
  },
  methods:{
    changeType() {
      this.isLogin = !this.isLogin
      this.form.user_id = ''
      this.form.username = ''
      this.form.useremail = ''
      this.form.userpwd = ''
    },
    login() {
      const self = this;
      if (self.form.user_id != "" && self.form.userpwd != "") {
        axios.get('http://localhost:8901/user/login', {
          params: {
            userId: self.form.user_id,
            userPassword: self.form.userpwd
          }
        })
          .then(function (res) {
            console.log(res);
            switch (res.data.token) {
              case "登录成功": {
                alert("登录成功！");
                window.localStorage.setItem("userToken", JSON.stringify(res.data));
                self.$router.push({path:'/tjmusic/mainPage',
                  query:{userId:res.data.userId,userName:res.data.userName,userEmail:res.data.userEmail,userArea:res.data.userArea,
                    userAge:res.data.userAge,userContent:res.data.userContent}});
                break;
              }
              case "登录失败": {
                alert("用户名或密码错误！");
                self.passwordError = true;
                self.login_existed = true;
                break;
              }
            }
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        alert("填写不能为空！");
      }
    },
    register() {
      const self = this;
      if (self.form.username != "" && self.form.useremail != "" && self.form.userpwd != "") {
        axios.post('http://localhost:8901/user/add_user', {
          "userId": "",
          "userPassword": self.form.userpwd,
          "userEmail": self.form.useremail,
          "userName": self.form.username,
        })
          .then(function (res) {
            switch (res.data.token) {
              case "注册成功":
                alert("注册成功！");
                self.form.user_id=res.data.userId;
                self.login();
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        alert("填写不能为空！");
      }
    }
  }
}
</script>

<style scoped="scoped">
    .background{
    background-image: url(../assets/background.jpeg);
    height: 110%;
		width: 100%;
		background-size: 100% 100%;
    background-repeat: no-repeat;
    }
    #particles-js{
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .login-register{
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
    position:relative;
	background-color: unset
	}
	.contain{
		width: 60%;
		height: 60%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: unset;
		border-radius: 20px;
		box-shadow: 0 0 3px #00f7ff,
					0 0 6px #00e1ff;
	}
	.big-box{
		width: 70%;
		height: 100%;
		position:relative;
		top: 0;
		left: 30%;
		transform: translateX(0%);
		transition: all 1s;
	}
	.big-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
        position:relative;
	}
	.btitle{
		font-size: 1.5em;
		font-weight: bold;
		color: rgb(95, 202, 216);
        position:relative;
	}
	.bform{
		width: 100%;
		height: 40%;
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
        position:relative;
	}
	.bselect{
		position:relative;
		top:-27px;
		left:2px;
	}
	.bform .errTips{
		display: block;
		width: 50%;
		text-align: left;
		color: red;
		font-size: 0.7em;
		margin-left: 1em;
        position:relative;
	}
	.bform input{
		width: 50%;
		height: 30px;
		border: none;
		outline: none;
		border-radius: 10px;
		padding-left: 2em;
		background-color: #f0f0f0;
        position:relative;
	}
	.bbutton{
		width: 20%;
		height: 40px;
		border-radius: 24px;
		border: none;
		outline: none;
		background-color: rgb(0, 153, 255);
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
        position:relative;
	}
	.small-box{
		width: 30%;
		height: 100%;
		background: linear-gradient(135deg,rgb(0, 179, 250),rgb(0, 132, 255));
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(0%);
		transition: all 1s;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}
	.small-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
	}
	.stitle{
		font-size: 2em;
		font-weight: bold;
		color: #fff;
        position:relative;
	}
	.scontent{
		font-size: 0.8em;
		color: #fff;
		text-align: center;
		padding: 2em 4em;
		line-height: 1.7em;
	}
	.sbutton{
		width: 60%;
		height: 40px;
		border-radius: 24px;
		border: 1px solid #fff;
		outline: none;
		background-color: transparent;
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
        position:relative;
	}

	.big-box.active{
		left: 0;
		transition: all 0.5s;
        position: absolute;
	}
	.small-box.active{
		left: 100%;
    border-radius: 1 inherit inherit 0;
    transform: translateX(-100%);
		transition: all 1s;
        position: absolute;
	}
	  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
	  height:50%;
    position: absolute;
  }
  .el-icon-arrow-down {
    font-size: 20px;
    position: absolute;
  }
</style>
