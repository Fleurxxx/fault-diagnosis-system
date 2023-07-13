<template>
  <div class="box">
    <div ref="vantaRef" style="width: 100%; height: 100vh"></div>
    <div class="banner">
      <h1 style="font-size:99px;">CloudDoctor</h1>
      <h5>
        &ensp;&ensp;
        分&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        布&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        式&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        系&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        统&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        故&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        障&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        诊&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        断&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        系&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        统&ensp;
        <!-- &ensp;&ensp;SHUI&ensp;&ensp;&ensp;XIANG&ensp;&ensp;&ensp;&ensp;MU&ensp;&ensp;&ensp;&ensp;&ensp;YU -->
      </h5>
      <!-- <p>活动时间：待定</p>
      <p>组织单位：待定</p> -->

    </div>
    <div class="content">
      <div class="left">
        <h2>Welcome</h2>
        <p>欢迎再次回来</p>
      </div>
      <div class="right" >
        <Space class="right-top">
          <!-- <img class="logo" src="../../assets/image/logo1.jpg"> -->
          <h2 class="title">登&ensp;录</h2>
        </Space>
        <div class="login-box">
          <!-- 账号框 -->
          <div class="login-title">
            <el-icon><User /></el-icon><span style="color: gray"> Username</span>
          </div>
          <input
            v-model="username"
            type="text"
            class="fontStyle"
            name="username"
            placeholder="请输入您的账号"
            required
            autofocus
          />
          <br />
          <br />

          <!-- 密码框 -->
          <div class="login-title">
            <el-icon><Lock /></el-icon><span style="color: gray"> Password</span>
          </div>
          <input
            v-model="password"
            show-password
            minlength="5"
            maxlength="20"
            type="password"
            class="fontStyle"
            name="password"
            placeholder="请输入您的密码"
            required
            autocomplete="current-password"
          />
          <br /><br />
          <div style="display: flex">
            <!-- 记住密码 -->
            <div style="width: 180px">
              <input id="remember" type="checkbox" />
              <span> Remember me</span>
            </div>
          </div>
          <br />
          <!-- 登录 -->
          <button class="login-btn" @click="login">
            登 录
            <el-icon><Right /></el-icon>
          </button>
        </div>

        <!-- 注册 -->
        <div>
        <router-link to="/register" class="register" style="text-decoration: none"
          ><span>注册新账号</span></router-link
        >
      </div>
      </div>
      </div>
  </div>
</template>

<script>
import * as THREE from "three";
// import WAVES from "vanta/src/vanta.waves";
// import BIRDS from "vanta/src/vanta.birds";
// import Fog from "vanta/src/vanta.fog";
// import Clouds from "vanta/src/vanta.clouds";
// import Clouds2 from "vanta/src/vanta.clouds2"; // 有问题
// import Globe from "vanta/src/vanta.globe";
import Net from "vanta/src/vanta.net";
// import Cells from "vanta/src/vanta.cells";
// import Trunk from "vanta/src/vanta.trunk"; //不可用
// import Topology from "vanta/src/vanta.topology"; //不可用
// import Dots from "vanta/src/vanta.dots"; //不可用
// import Rings from "vanta/src/vanta.rings";
// import Halo from "vanta/src/vanta.halo";

import { ElMessage } from "element-plus";
import apiFun from "../../api/api";
import jwt_decode from "jwt-decode"; //解析token
import { localSet } from '../../api/index'

export default {
  data() {
    return {
      username:'',
      email:'',
      password:'',
    };
  },
  mounted() {
    this.vantaEffect = Net({
      el: this.$refs.vantaRef,
      THREE: THREE,
    });
    // VANTA.Net({
    //   el: "#your-element-selector",
    //   mouseControls: true,
    //   touchControls: true,
    //   gyroControls: false,
    //   minHeight: 200.00,
    //   minWidth: 200.00,
    //   scale: 1.00,
    //   scaleMobile: 1.00,
    //   color: 0x17de,
    //   backgroundColor: 0x181821
    // });
    VANTA.NET({
      el: this.$refs.vantaRef,
      /*以下为样式配置*/
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xd0d0ff,
      backgroundColor: 0x7e7e7e,
      points: 13.0,
      maxDistance: 21.0,
      spacing: 16.0,
    });
    // VANTA.WAVES({
    //   el: this.$refs.vantaRef,
    //   /*以下为样式配置*/
    //   mouseControls: true,
    //   touchControls: true,
    //   gyroControls: false,
    //   minHeight: 200.0,
    //   minWidth: 200.0,
    //   scale: 1.0,
    //   scaleMobile: 1.0,
    //   color: 0x5f88,
    //   shininess: 76.0,
    //   waveHeight: 12.0,
    //   waveSpeed: 0.95,
    //   zoom: 0.89,
    // });
  },
  beforeDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  },
  methods:{
    login(){
      console.log(this.username)
      // 登录
      if (this.username == "" || this.password == "") {
        ElMessage.error("账号或密码不能为空");
      } else {
        apiFun.user.login({
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          let token = res.data;
          // window.localStorage.setItem("token", token);
          localSet("token", token);
          //解析token
          const decode = jwt_decode(token);
          console.log("token解析内容", decode); //decode是一个对象
          //把解析后的token内容放进store中
          // useStore.id = decode.id;
          // useStore.username = decode.username;
          // useStore.token = token;

          if(res.code === 200){
            ElMessage.success("登录成功");
            this.$router.push('/h')
            // window.location.href = 'http://localhost:8080/#/home' //跳转到主页面管理界面
          }else{
            console.log(res.message)
            ElMessage.error("登录失败");
            // router.push({ path: "/home" }); //跳转到主页面
          }
        }).catch((err)=>{
          console.log(err);
        });
      }
    },
  }
};
</script>

<style lang="less" scoped>
.box {
  position: relative;
  .banner {
    z-index: 999;
    position: absolute;
    top: 40%;
    left: 7%;
    color: #fff;
  }
}
h1 {
  font-size: 66px;
}
p {
  margin-top: 60px;
  font-size: 18px;
}
.content{
  z-index: 999;
  position:absolute;
  top:30%;
  right: 10%;
  width:600px;
  height: 300px;
  border-radius : 10px;
  background-color: #5e616d;

}
.left{
  position: absolute;
  top: 25%;
  left: 5%;
  h2{
    font-size:33px;
    color: #fff;
  }
  p{
    color: #fff;
  }
}
.right{
  position: relative;
  top: -15%;
  left:  35%;
  width: 345px;
  height: 395px;
  border-radius : 10px;
  background-color:#fff;
  border-color:darkgray;
  box-shadow: 0 0 1px #000 inset;
}
.right-top{
  position: absolute;
  top: 9%;
  left: 40%;
}
.logo{
  width:80px;
}
.title{
  font-size:27px;
}



.login-box{
  position: absolute;
  top:25%;

}
.login-title{
  float: left;
  padding-left: 32px;
}
.login-btn {
  width: 250px;
  height: 34px;
  color: white;
  border-style: none;
  border-radius: 2px;
  background-color: #586cb1;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #4e5e9b;
  box-shadow: 0 3px 1px -2px rgb(104, 103, 103);
}

.fontStyle {
  width: 280px;
  height: 36px;
  padding: 0 10px;
  border-color: rgba(228, 227, 227, 0.719);
  outline: none;
  border: none;
  border-bottom: 1px solid #626364;
}

.fontStyle:hover {
  box-shadow: 0 3px 1px -2px rgb(104, 103, 103);
}

.register {
  font-style: 8px;
  color: #4e5e9b;
  position: absolute;
  bottom: 20px;
  left: 130px;
  background-color: white;
  text-align: center;
}
</style>
