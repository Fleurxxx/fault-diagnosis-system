<!-- 柱状图数据分析 (全部正确版)
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
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-card class="box-card" shadow="hover"  v-for="item in data" :key="item.id">
            <template #header>
              <div class="card-header" >
                <span><i :class="item.activeIndex === 0 ? 'fa fa-key':'fa fa-dot-circle-o'"></i>&nbsp;&nbsp;&nbsp;{{ item.name }}</span>
                <!-- <el-button class="button" text>Operation button</el-button> -->
              </div>
            </template>
            <div class="left">
              <el-alert  :title="item.tips" :type="item.state === true ? 'success':'error'" :closable="false" />
              <div style="margin:20px auto;"></div>
              <Bar :ids="item.ids" />
            </div>
            <div class="right">
              <div class="content">
                <div class="demo-progress">
                  <el-progress :percentage="item.rate1" >
                  <!-- <el-progress :percentage="100" > -->
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
                      <p>{{ item.data1 }}</p>
                      <p>{{ item.rate1 }}%</p>
                    </Space>
                    <Space class="analysis-data">
                      <p>{{ item.data2 }}</p>
                      <p>{{ item.rate2 }}%</p>
                    </Space>
                    <Space class="analysis-data">
                      <p>{{ item.data3 }}</p>
                      <p>{{ item.rate3 }}%</p>
                    </Space>
                    <br />
                    <div >
                      <p>{{ item.standard }}</p>
                    </div>
                  </Space>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-pagination
          background
          layout="prev, pager, next"
          :total="220"
          class="mt-4 paging"
        />
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
const sum1 = ref([]);
const info = () =>{
  // 计算随机的20个分割点
  for (let i = 0; i < 20; i++) {
    const randomPoint = Math.floor(Math.random() * 10000);
    sum1.value.push(randomPoint);
  }

  // 添加20个数据到data变量
  for (let i = 0; i < 5; i++) {
    // let sum = sum1.value[i];
    let sum = Math.floor(Math.random() * (5320 - 4980 + 1)) + 4980;
    let data2 = Math.floor(Math.random() * (sum * 0.25));
    let data3 = Math.floor(Math.random() * (sum * 0.25));
    let zero = Math.random(); // 生成0的概率
    let zeros = 0.8; // 0的概率大于80%
    let tips = ''
    let state = true
    // 根据0的概率判断是否设置为0
    if (zero < zeros) {
      data2 = 0;
      data3 = 0;
      tips = '该特征所有节点健康'
      state = true
    }
    let data1 = sum - data2 - data3;
    let rate1 = Math.round(data1 / sum * 10000) / 100 ;
    let rate2 = Math.round(data2 / sum * 10000) / 100 ;
    let rate3 = Math.round(data3 / sum * 10000) / 100 ;

    let endNumber = generateRandomNumber(3, 8635283); // 生成结尾的随机数
    let formattedEndNumber = formatNumberWithCount(endNumber);
    // console.log(endNumber)

    data.value.push({
      id: i + 1,
      checked: false,
      activeIndex: 1,
      state: state,
      ids: "str" + i,
      name: "feature" + i,
      tips: tips,
      data1: data1,
      data2: data2,
      data3: data3,
      rate1: rate1,
      rate2: rate2,
      rate3: rate3,
      standard:formattedEndNumber
    });

    // if(i==0){
    //   data.value.push({
    //     id: i + 1,
    //     checked: false,
    //     activeIndex:0,
    //     state:true,
    //     ids:"str"+ i,
    //     name: "feature"+i,
    //     tips:'该特征所有节点健康',
    //     data1:'',
    //     data2:'',
    //     data3:'',
    //     // 其他属性...
    //   });
    // }else{

    // }

  }
}



const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min; //均匀分布
};

//大数单位转换
const formatNumberWithCount = (number) => {
      let absNumber = Math.abs(number);
      let units = ["", "k", "m", "b", "t", "e"];
      let unitIndex = 0;

      while (absNumber >= 1000 && unitIndex < units.length - 1) {
        absNumber /= 1000;
        unitIndex++;
      }

      let formattedNumber = absNumber.toFixed(1);
      let unit = units[unitIndex];

      if(number>0){
         return `${formattedNumber}${unit}`;
      }else{
        return `-${formattedNumber}${unit}`;
      }

    };


onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  axios.post("/echarts/bar").then((res) => {
    console.log("模拟测试数据", res);
  });
  info();

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
.box{
  height: 100%;
}
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
  margin-right: 60px;
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

/* 当前状态颜色 */
/deep/ .el-progress-bar__outer {
  background-color: rgba(255, 2, 2, 0.542);
}
// /* 进度条的背景色 */
// /deep/ .el-progress-bar__inner {
//   background-color: #ba1010;
// }

.paging{
  padding-top:20px;
  padding-right: 10px;
  float:right;
}

</style>
