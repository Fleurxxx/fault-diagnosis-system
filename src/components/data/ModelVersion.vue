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
        <template v-for="item in lists" :key="item.id">
          <TimelineItem :color="item.color" class="cur" @click="open(item.id)">
            <Row>
                <Col span="10">
                  <p class="time">
                    <Time :time="item.time" type="date" />
                  </p>
                  <p class="content">{{ item.content }}</p>
                </Col>
                <Col span="10">
                  <Trend :flag="item.trendFlag">{{item.trend }}</Trend>
                </Col>
            </Row>
          </TimelineItem>
        </template>

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
import api from "../../api/api";

const props = defineProps({  //获取传参的数据
  showimg:String,
  modelId:Number,
  default: ""
})
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

const data = reactive({
  modelId:'',
  gmtCreate:'',
  describe:'',
  title:'',
  versionNumber:'',
})
const time1 = new Date()
const time2 = (new Date()).getTime() - 86400 * 3 * 1000
const time3 = (new Date()).getTime() - 186400 * 3 * 1000

let lists = ref([]);
// 添加3个数据到list里面
for (let i = 1; i < 4; i++) {
  if(i===1){
      lists.value.push({
        color: "green",
        time: time2,
        interval: "date",
        content: "发布2.0版本",
        trend: "12.5%",
        trendFlag:'up',
    });
  }else if(i===2){
      lists.value.push({
        color: "red",
        time: time2,
        content: "严重故障",
        trend: "24%",
        trendFlag: "down",
    });
  }else if(i===3){
      lists.value.push({
        color: "blue",
        time: time3,
        interval: 1,
        content: "发布3.0版本",
        trend: "32.1%",
        trendFlag: "up",
    });
  }
}

const open = () =>{

  ElMessage({
    message: '成功查看该版本',
    type: 'success',
  })
}

const getVersions = () => {
  console.log(data.id)
  api.model.getVersions(props.modelId).then((res)=>{
    console.log(res)
    if(res.code===200){
      // for(let i=0; i<res.data.length; i++){
      //     data.list[i].name = res.data[i].name
      //     data.list[i].introduce = res.data[i].name
      //     data.list[i].filesize = res.data[i].name
      //     data.list[i].isPublic = res.data[i].isPublic
      // }
      lists = res.data
    }else{
      ElMessage.error(res.message)
    }
  }).catch((err)=>{
    console.log(err);
  })
}

//日期格式转换
function renderTime(date) {
    var dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}


onBeforeMount(() => {
  data.modelId = props.modelId
  if(data.modelId !== undefined){ //会传两次值，第一次是undefined
    getVersions();
  }
})
onMounted(() => {
  // setTimeout(function() {
  //   console.log("定时器已触发！");

  // }, 1000);

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
