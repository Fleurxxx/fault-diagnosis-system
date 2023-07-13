<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-01 20:28:39
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-06 21:20:17
 * @FilePath: \maintenance\src\views\home\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="box">
    <p className="color">首页</p>
    <span id="intro_title">1</span>
    <span id="intro_mine">2</span>
    <div id="intro_save" >3</div>
    <div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import Driver from 'driver.js' // 页面引导操作
import 'driver.js/dist/driver.min.css'

onMounted(() => {
  showTips()
})
function showTips() {
  const driver = new Driver({
    prevBtnText: '上一步',
    nextBtnText: '下一步',
    doneBtnText: '我知道了',
    closeBtnText: '关闭'
  })
  const steps = [
    {
      element: '#intro_title',
      popover: {
        title: '这是本站首页',
        description: '本站首页是一些展示性的信息',
        position: 'bottom'
      }
    },
    {
      element: '#intro_mine',
      popover: {
        title: '这是帮助',
        description: '点此处可获取一些本站的相关说明',
        position: 'bottom'
      }
    },
    {
      element: '#intro_save',
      popover: {
        title: '联系我们',
        description: '点击这里可获取我们的相关信息',
        position: 'bottom'
      }
    }
  ]
  driver.defineSteps(steps)
  driver.start()
}

</script>

<style lang="scss" >
div#driver-popover-item .driver-popover-footer button {
  font: 14px;
  text-shadow: none;
  color: #fff;
  background-color: #0089ff;
  border-color: #0089ff;
  border-radius: 5px;
  line-height: 2;
}
div#driver-popover-item .driver-popover-title {
  font: 16px / normal sans-serif;
  font-weight: 600;
}
div#driver-popover-item .driver-popover-footer .driver-close-btn {
  background-color: #fff;
  border-color: #fff;
  border-radius: none;
  color: #a2a3a5;
}
div.driver-popover-footer {
  .driver-btn-group {
    display: flex;
    justify-content: center;
    button.driver-prev-btn {
      display: none !important; // 隐藏上一步按钮操作
    }
  }
}
div#driver-highlighted-element-stage {
  border-radius: 5px;
}

.box{
  flex-direction: column;
  box-sizing: border-box;
  position: sticky;
  top:0;
  width:100%;
  height: 190vh;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.08);
}
</style>
