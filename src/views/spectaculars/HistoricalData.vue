<template>
  <div :gutter="14" >
    <Row >
      <!-- <MassData /> -->
    </Row>
    <Row :gutter="4">
        <Col span="12">
          <div class="search-box">
              <Space size="large" wrap class="search-space">
                <DatePicker type="date" placeholder="选择查询日期" style="width: 300px;" />
                <el-button @click="search">查找</el-button>
              </Space>
          </div>
          <div class="title-box">
            <p class="title">故障分布</p>
          </div>
          <PieAndLine class="auv" />
        </Col>
        <Col span="12">
          <MassData class="auv" style="width: 98%;"/>
          <div class="title-box">
            <p class="title" >故障原因分布</p>
          </div>
          <Bubble />
        </Col>
    </Row>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import MassData from '../../components/chart/MassData.vue'
import Bubble from '../../components/chart/Bubble.vue';
import PieAndLine from '../../components/chart/PieAndLine.vue';
/**
* 仓库
*/
const store = useStore();
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const data = reactive({})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(()=>{
})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='less'>

.title-box{
  width: 300px;
  height: 20px;
  border-left: 5px solid #6C91c2; //实线
}
.title{
  padding-left: 10px;;
  text-align: left;
  font-weight: bolder;
  font-size: 20;
  padding-bottom: 5px;
}
.auv{
  padding-top:30px;
  padding-bottom:30px;
}
.search-box{
  padding-top:10px;
  height: 80px;
  .search-space{
    float: left;
  }
}
</style>
