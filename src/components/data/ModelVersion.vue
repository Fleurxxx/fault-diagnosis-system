<!-- 数据历史版本
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-18 20:21:35
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-02 10:02:36
 * @FilePath: \maintenance\src\components\data\ModelVersion.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div >
    <div class="left">
      <Timeline>
        <TimelineItem color="green" class="cur" @click="open()">
          <Row>
              <Col span="10">
                <p class="time">
                  <Time :time="time3" type="date" />
                </p>
                <p class="content">发布1.0版本</p>
              </Col>
              <Col span="12">
                <Tag color="geekblue">初始版本</Tag>
              </Col>
          </Row>
        </TimelineItem>
        <TimelineItem color="green" class="cur" @click="open()">
          <Row>
              <Col span="10">
                <p class="time">
                  <Time :time="time2" type="date" />
                </p>
                <p class="content">发布2.0版本</p>
              </Col>
              <Col span="10">
                <Trend flag="up">12.5%</Trend>
              </Col>
          </Row>
        </TimelineItem>
        <TimelineItem color="red" class="cur" @click="open()">
          <Row>
              <Col span="10">
                <p class="time">
                  <Time :time="time2" />
                </p>
                <p class="content">严重故障</p>
              </Col>
              <Col span="12">
                  <Trend flag="down">24%</Trend>
              </Col>
          </Row>
        </TimelineItem>
        <TimelineItem color="blue" class="cur" @click="open()">
          <Row>
              <Col span="10">
                <p class="time">
                  <Time :time="time1" :interval="1" />
                </p>
                <p class="content">发布3.0版本</p>
              </Col>
              <Col span="12">
                <Trend flag="up">32.1%</Trend>
              </Col>
          </Row>
        </TimelineItem>
        <TimelineItem><a href="#">查看更多</a></TimelineItem>
      </Timeline>
    </div>
    <div class="right">
      <img v-if="showimg" src="../../assets/icon/暂无记录.png" class="image" />
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { ElMessageBox,ElMessage,ElInput } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
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
const props =defineProps({  //获取传参的数据
  showimg:String,
})
const data = reactive({})
const time1 = new Date()
const time2 = (new Date()).getTime() - 86400 * 3 * 1000
const time3 = (new Date()).getTime() - 186400 * 3 * 1000

const open = () =>{

  ElMessage({
    message: '成功查看该版本',
    type: 'success',
  })
}


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
.left{
  float: left;
  width:60%;
}
.right{
  display: flex;
}
.time{
    font-size: 14px;
    font-weight: bold;
}
.content{
    padding-left: 5px;
}
.image{
  width:250px;
}
.cur{
    cursor: pointer; /*鼠标悬停变小手*/
  }
</style>
