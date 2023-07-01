<template>
  <div class="box">
    <div class="box-title">
      <p class="title">维修中心</p>
    </div>
    <div class="content_2" v-if="status !== 1">
      <div class="correct">
        <el-image style="width: 60px" :src="url" :fit="fit" />
      </div>
      <div class="step-content">
          <div class="step-title">{{ steps[status - 1].title }}</div>
          <div class="step-description">{{ steps[status - 1].description }}</div>
        </div>
      <div>
        <el-button class="lef_btn" v-if="status === 4" @click="printResult">打印结果</el-button>
        <el-button class="lef_btn" v-else @click="toInfo">查看详情</el-button>
        <el-button class="next" @click="backToList">返回列表</el-button>
      </div>
    </div>
    <div class="middle">
      <MyTimeLine></MyTimeLine>
    </div>
    <div class="bottom" v-if="status === 1">
      <div class="content">
        <div class="form">
          <el-form
            class="show"
            ref="addForm"
            :model="form"
            label-width="auto"
            label-position="left"
          >
            <el-form-item label="选择订单" prop="order" :required="true">
              <el-select v-model="form.order" placeholder="请选择" style="width:100%" @focus="orderFocus">
                <el-option v-for="item in orderList" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预约时间" prop="time" :required="true" >
              <el-date-picker
                v-model="form.time"
                type="date"
                placeholder="Pick a time"
                :disabledDate="disabledDate"
                style="width:100%"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="维修地点" prop="provCityCounty" :required="true">
              <elui-china-area-dht @change="addressChange" style="width:100%"></elui-china-area-dht>
            </el-form-item>
            <el-form-item label="推广地址" prop="createTime" :required="true">
              <el-input v-model="form.address" type="textarea" :autosize="{ minRows: 4, maxRows: 5}"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="card">
          <el-card class="box-card">
            <div class="card-header">
              <div class="avatar">
                <el-image style="width: 100px; height: 120px" :src="person.avatar" :fit="fit" />
              </div>
              <div class="info">
                <ul class="person-info-list">
                  <li>姓名： {{ person.name }}</li>
                  <li>年龄： {{ person.age }}</li>
                  <li>性别： {{ person.gender }}</li>
                  <li>职业： {{ person.occupation }}</li>
                </ul>
              </div>
            </div>
            <div class="card-bottom">
              <div class="title">技能和专长：</div>
              <div class="card-content">
                <ul class="skills-list">
                  <li v-for="(skill, index) in person.skills" :key="index">-  {{ skill }}</li>
                </ul>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div>
        <el-button class="next" @click="next">下一步</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { ref, reactive, onMounted, computed } from 'vue';
import MyTimeLine from '../../components/MyTimeLine.vue';
import { EluiChinaAreaDht } from 'elui-china-area-dht';
import router from '../../router';
const orderList = reactive([]);
const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat;
const status = ref(2);
const url = ref('src/assets/image/correct.svg');
const person = reactive({
  avatar: 'src/assets/image/tx.png',
  name: "John Doe",
  age: 30,
  gender: "男",
  occupation: "工程师",
  skills: ["技能1", "技能2", "技能3","技能1", "技能2", "技能3"]
})
const form = reactive({
    order: '',
    name: '',
    createTime: ref(new Date()),
    provCityCounty: null,
    address: null,
    status: null,
  },
);
const steps = reactive([
  {
    title: '故障分析完成',
    description: '等待人员记录维修过程',
  },
  {
    title: '修复过程记录中',
    description: '请耐心等待哦',
  },
  {
    title: '维修完成',
    description: '如有疑问请立即联系工作人员',
  },
]);
// 限制选择范围在今天以及以后
const disabledDate = (time) => {
  // 获取当前日期
  const today = new Date();
  // 清除时分秒的部分，只保留年月日
  today.setHours(0, 0, 0, 0);
  // 禁用今天之后的日期
  return time.getTime() <= today.getTime();
};
const addressChange = (e) => {
  form.provCityCounty=chinaData[e[0]].label+chinaData[e[1]].label+chinaData[e[2]].label;
};
const next = () => {

}
const backToList = () => {
  router.push("/maintain")
}
//获取所有订单
const orderFocus = () => {

}
const printResult = () => {

}
const toInfo = () => {

}
</script>
<style lang="less" scoped>
.box{
  flex-direction: column;
  box-sizing: border-box;
  position: sticky;
  top:0;
  width:100%;
  height: 190vh;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.08);
  .box-title{
    text-align: left;
    padding-top: 22px;
    padding-left: 50px;
  }
  .title{
    font-size:18px;
    font-weight:bold;
  }
}
.header {
  display: flex;
  justify-content: space-between;
}
.middle{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
}
.bottom {
  display: flex;
  flex-direction: column;
}
.content {
  background-color: #fff;
  display: flex;
  gap: 50px;
  padding: 40px 50px;
  .correct{
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.content_2{
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 70px;
  .correct{
    margin-bottom: 10px;
  }
  .step-content {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .step-title {
    font-size: 16px;
    margin-bottom: 5px;
    color: #000;
    font-weight: bold;
  }
  .step-description {
    font-size: 14px;
    color: #888;
  }
  .lef_btn{
    background-color: rgb(247,248,250);
    border: rgb(247,248,250);
    color: rgb(96, 98, 102);
  }
}
h3{
  font-weight: 540;
}
.form{
  flex: 1;
  gap: 10px;
}
.card{
  flex: 1;
  display: flex;
  padding: 0;
  .box-card{
    display: flex;
    gap: 50px;
    width: 100%;
    .card-header{
      display: flex;
      flex: 1;
      gap: 40px;
      .avatar{
        flex: 1;
      }
      .info{
        flex: 4;
        font-size: 14px;
        text-align: left;
        .person-info-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        .person-info-list li {
          margin-bottom: 10px;
        }

        .person-info-list li:last-child {
          margin-bottom: 0; /* 去除最后一个列表项的底部边距 */
        }
      }
    }
    .card-bottom{
      flex: 1;
      display: flex;
      align-items: center;
      gap: 35px;
      align-items: flex-start;

      .card-content {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        margin-left: 10px; /* 左边距为 10px */
      }

      .skills-list {
        list-style-type: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        margin-top: 0;
        margin-bottom: 0;
        text-align: left;
      }

      .skills-list li {
        flex-basis: 50%; /* 列宽度为父容器的一半 */
        margin-bottom: 5px;
      }
    }
  }
}
.next {
  background-color: rgb(34,101,255);
  color: #fff;
}
</style>
<style src="src/assets/style/base.scss"></style>
