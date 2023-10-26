<template>
  <div id="login">
    <div class="top"></div>
    <img :src="logo" width="237px" height="31.4px" />
    <h2>{{ msg }}</h2>
    <div>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="user.userName"></mt-field>
      <mt-field label="密  码" placeholder="请输入密码" type="password" v-model="user.password"></mt-field>
      <mt-switch size="normal" style="margin-top: 20px; margin-left: 35px" v-model="user.isRemember">记住账号密码</mt-switch>
      <mt-button size="normal" style="
            width: 130px;
            margin-top: 20px;
            margin-left: 10px;
            margin-right: 10px;
            background-color: #2449a4;
          " type="primary" @click.native="login">登&nbsp;&nbsp;&nbsp;&nbsp;录</mt-button>
      <mt-button size="normal" style="
            width: 130px;
            margin-top: 20px;
            margin-left: 10px;
            margin-right: 10px;
            background-color: #2449a4;
          " type="primary" @click.native="exitApp">退&nbsp;&nbsp;&nbsp;&nbsp;出</mt-button>
    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import logo from "../../assets/logo.png";
import { encrypt, decrypt } from "@/utils";
import { getAuthInfo } from "@/apis/login";


export default {
  name: "login",
  data() {
    return {
      logo,
      user: {
        userName: "",
        password: "",
        isRemember: false,
        userId: '',
        phone:''
      },
      msg: "欢迎登录 顶固 WMS 系统",
    };
  },
  created() {
    var userSecret = localStorage.getItem("authorization");
    if (userSecret !== null) {
      const user = JSON.parse(decrypt(userSecret));
      if (user.isRemember) {
        this.user = user;
      }
    }
  },
  methods: {


    login() {
      if (
        this.user.userName.trim().length > 0 &&
        this.user.password.trim().length > 0
      ) {
        Indicator.open();
        this.$store
          .dispatch("user/login", this.user)
          .then((response) => {
            var d = response;

            getAuthInfo().then(response => {
              if (response.code === 1) {
                let userInfo = response.data;
                this.user.userName = userInfo.userName;
                this.user.userId = userInfo.id;
                this.user.phone=userInfo.phone;

                const secrityUser = encrypt(JSON.stringify(this.user)); //加密
                localStorage.setItem("authorization", secrityUser);
                Indicator.close();
                this.$router.push({ name: "main" });
              }
            })
          })
          .catch((error) => {
            Indicator.close();
            this.$toast(error);
            console.log(error);
          });
      } else {
        this.$toast("请输入用户名和密码!");
      }
    },


    // 退出

  
    exitApp() {
      // this.$toast("退出");
      plus.runtime.quit();
    },
  },
};
</script>

<style>
#login {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  text-align: center;
  color: #2c3e50;
}

#login img {
  padding-top: 30px;
  padding-bottom: 15px;
}

#login h2 {
  padding-bottom: 15px;
  font-weight: bold;
}

body {
  background-color: #fff;
}

.top {
  width: 100%;
  height: 10px;
  background-color: #2449a4;
}
</style>
