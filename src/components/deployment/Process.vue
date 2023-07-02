<template>
   <div class="hint">
      <div class="hint-reminder">
        <div class="hint-left">
          <img src="../../assets/icon/暂无数据.png" class="hint-img"/>
        </div>
        <div class="hint-right">
          <div class="hint-content">
            <p class="title">暂未部署模型</p>
            <div class="hint-progress">
              <MineSteps v-bind:steps="steps"/>
            </div>
            <p>模型部署是为开发者提供应用化API转化功能，来提供对新数据的预测和决策支持。</p>
            <a>立即部署</a>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import MineSteps from '../../components/Steps.vue'
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


//步骤条
const steps = reactive([
  {
    title: '部署设置',
    description: '',
    status: 'in-progress',
  },
  {
    title: '选择部署',
    description: '',
    status: 'uncompleted',
  },
  {
    title: '数据诊断',
    description: '',
    status: 'uncompleted',
  },
]);

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
.title{
    font-size:18px;
    font-weight:bold;
  }
.hint{
  float: center;
  padding:5% 3% 0 3%;
  // background-color:rgba(184, 182, 182, 0.08);
  .hint-reminder{
    padding: 13px 20px 60px 30px; //上右下左
    background-color: rgba(10, 10, 10, 0.054);
    .hint-left{
      width:40%;
      height:100%;
      float: left;
      margin-right: -70px;
      .hint-img{
          width:200px;
        }
    }
    .hint-right{
      display: flex;
    }
    .hint-content{
      flex-direction:column;
      padding: 30px 0 0px 0;
      .hint-progress{
        width: 650px;
        padding: 10px 0 10px 0;
      }
    }

  }
}
</style>
