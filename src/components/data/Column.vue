<!-- 柱状图数据分析
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-12 22:49:14
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-06-18 16:28:56
 * @FilePath: \maintenance\src\components\data\Column.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="box">
    <div>
      <!-- <BarChart /> -->
      <!-- <el-divider></el-divider> -->
      <div style="height: 20px;"></div>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-card class="box-card" shadow="hover"  v-for="item in data" :key="item.id">
            <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
            <template #header>
              <div class="card-header" >
                <span><i :class="item.activeIndex === 0 ? 'fa fa-key':'fa fa-dot-circle-o'"></i>&nbsp;&nbsp;&nbsp;Card name</span>
                <el-button class="button" text>Operation button</el-button>
              </div>
            </template>
            <div class="left">
              <el-alert  title="success alert" :type="item.state === true ? 'success':'error'" :closable="false" />
              <div style="margin:20px auto;"></div>
              <!-- <el-alert  title="warninsg alert" type="warning" /> -->
              <Bar :ids="item.ids"/>
            </div>
            <div class="right">
              <div class="content">
                <div class="demo-progress">
                  <el-progress :percentage="100">
                    <el-button text></el-button>
                  </el-progress>
                </div>
                <div class="analysis">
                  <Space direction="vertical" class="analysis-name">
                    <Badge status="success" text="有效的" />
                    <Badge status="warning" text="不匹配" />
                    <Badge status="error" text="丢失的" />
                    <br />
                    <p>标准差</p>
                  </Space>
                  <Space direction="vertical" >
                    <Space class="analysis-data">
                      <p>6739</p>
                      <p>100%</p>
                    </Space>
                    <Space class="analysis-data">
                      <p>0</p>
                      <p>0%</p>
                    </Space>
                    <Space class="analysis-data">
                      <p>0</p>
                      <p>0%</p>
                    </Space>
                    <br />
                    <div >
                      <p>87%</p>
                    </div>
                  </Space>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import axios from "axios";
import { useRoute, useRouter } from 'vue-router';
import BarChart from '../chart/bar/BarChart.vue';
import Bar from '../chart/BarGraph.vue'
// import { id } from 'element-plus/es/locale';

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
// const data = reactive({})
const data = ref([]);

// 添加20个数据到data变量
for (let i = 0; i < 20; i++) {
  if(i==0){
    data.value.push({
      id: i + 1,
      checked: false,
      activeIndex:0,
      state:true,
      ids:"str"+ i
      // name:"23547375424",
      // 其他属性...
    });
  }else{
    data.value.push({
      id: i + 1,
      checked: false,
      activeIndex:1,
      state:false,
      ids:"str"+ i
      // name:"23547375424",
      // 其他属性...
    });
  }

}


onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  axios.post("/echarts/bar").then((res) => {
    console.log("模拟测试数据", res);
  });

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
// .box{
//   height: 100%;
// }
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

// .box-card {
//    width: 480px;
// }

.left{
  width:40%;
  height:100%;
  float: left;
  margin-right: 50px;
}
.right{
  display: flex;
}
.content{
  flex-direction:column;
}

.demo-progress .el-progress--line {
  // margin-bottom: 15px;
  width: 500px;
  height:10px;
}
.analysis{
  width: 500px;
}
.analysis-name{
  padding-top: 20px;
  // margin-left: -10%;
  margin-right: 62%;
}
.analysis-data{
  text-align:right;
}
</style>
