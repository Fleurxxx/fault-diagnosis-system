<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-05-30 20:36:57
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-06-21 19:18:06
 * @FilePath: \maintenance\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <router-view class="main"></router-view>
  </div>
</template>
<script setup>
//发送请求
import axios from "axios";
import { onMounted } from "vue";
onMounted(() => {
  // //get请求
  // axios.get("/home/getdata").then((res) => {
  //   console.log("get请求返回的数据", res);
  // });
  // //post请求
  // axios.post("/home/postdata").then((res) => {
  //   console.log("post请求返回的数据", res);
  // });
  // //测试
  // axios.post("/home/test").then((res) => {
  //   console.log("测试数据", res);
  // });
});

</script>
<style scoped>

html,body {
    margin: 0;
    padding: 0;
    height: 100%;
}

#app{
    height: 100%;
    width:100%;
}

</style>
