<template>
  <div>
    <p className="color">首页</p>
    <span id="intro_title">1</span>
    <span id="intro_mine">2</span>
    <div id="intro_save" >3</div>
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
</style>
