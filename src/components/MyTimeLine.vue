<template>
  <div class="timeline">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="step-container"
    >
      <div
        class="step"
        :class="[step.status, { completed: step.status === 'completed' },]"
      >
        <div class="circle" v-if="step.status === 'completed'">&#10003;</div>
        <div class="circle" v-else>{{ index + 1 }}</div>
        <div class="step-content">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-description">{{ step.description }}</div>
        </div>
      </div>
      <div class="step-line" v-if="index < steps.length - 1"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.timeline {
  display: flex;
  align-items: flex-start;
  position: relative;
}
.step-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.step {
  display: flex;
}
.circle {
  width: 30px;
  height: 30px;
  border: 2px solid #c3bfbf;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  color: #c3bfbf;
  margin-right: 10px;
}
.step-content {
  display: flex;
  flex-direction: column;
  text-align: left;
}
.step-title {
  font-size: 16px;
  margin-bottom: 5px;
  color: #888888;
}
.step-description {
  font-size: 14px;
  color: #888;
}
.step-line {
  width: 130px;
  height: 1.5px;
  background-color: #c3bfbf;
  margin: 0 20px 30px 20px;
}
.in-progress .circle {
  background-color: #fff;
  color: rgb(17, 105, 236);
  border-color: rgb(17, 105, 236);
}

.in-progress .step-title {
  color: #000;
}

.in-progress .line {
  color: rgb(17, 105, 236);
}

.in-progress::after {
  background-color: rgb(17, 105, 236);
}

.completed .circle {
  background-color: #fff;
  color: rgb(17, 105, 236);
  border-color: rgb(17, 105, 236);
}
.completed .step-title  {
  color: #000;
}
.completed .line  {
  color: rgb(17, 105, 236);
}
.completed::after {
  background-color: rgb(22,196,175);
}
</style>
<script setup>
import { reactive } from "vue";

const steps = reactive([
  {
    title: '发起申请',
    description: '创建申请',
    status: 'in-progress',
  },
  {
    title: '运维确认',
    description: '等待运维人员受理',
    status: 'uncompleted',
  },
  {
    title: '维修中',
    description: '请耐心等待哦',
    status: 'uncompleted',
  },
  {
    title: '完成',
    description: '维修完成',
    status: 'uncompleted',
  },
]);
</script>