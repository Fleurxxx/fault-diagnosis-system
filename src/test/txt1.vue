<template>
  <div>
    <button @click="goToSecondTab">跳转到第二个标签</button>
    <Tabs v-model="activeTab">
      <TabPane label="标签一" name="name1">标签一的内容</TabPane>
      <TabPane label="标签二" name="name2">标签二的内容</TabPane>
      <TabPane label="标签三" name="name3">标签三的内容</TabPane>
    </Tabs>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const activeTab = ref('name1')

    const goToSecondTab = () => {
      activeTab.value = 'name2'
    }

    return {
      activeTab,
      goToSecondTab
    }
  }
}
</script>
