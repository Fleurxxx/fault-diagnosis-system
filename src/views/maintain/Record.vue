<template>
  <div class="box">
    <div class="box-title">
      <p class="title">维修中心</p>
    </div>
    <div class="content_2">
      <div class="correct">
        <el-image style="width: 60px" :src="url" :fit="fit" />
      </div>
      <div class="step-content">
          <div class="step-title">{{ steps[status].title }}</div>
          <div class="step-description">{{ steps[status].description }}</div>
        </div>
      <div>
        <el-button class="next" @click="backToList">返回列表</el-button>
      </div>
    </div>
    <div class="middle">
      <Steps v-bind:steps="steps"></Steps>
    </div>
    <div class="bottom">
      <div class="content-bottom">
        <div class="left">
          <el-card class="card" shadow="hover">
            <template #header>
              <div class="card-header-2" >
                <span><i class='fa fa-dot-circle-o'></i>&nbsp;&nbsp;&nbsp;故障原因</span>
              </div>
            </template>
            <div class="small-div-body fault">
                {{ faultAnalysis.cause }}
            </div>
            <div class="small-div-body fault" v-if="faultAnalysis.cause === ''">
              <el-empty description="未找到故障原因" image-size="130">
              </el-empty>
            </div>
          </el-card>
        </div>
        <div class="right">
          <div class="info">
            <h2 class="info-title1">人员分析</h2>
            <h3 class="info-title2">基本信息</h3>
            <div class="info-content">
              <!-- <el-form
                label-width="100px"
                ref="formlabelref"
                :rules="rules"
                :inline="true"
                :model="formlabel"
                class="con-form">
                <el-form-item label="人员分析"  prop="introduce" class="form-input"> -->
                  <el-input class="input"
                    ref="myInput"
                    v-model="data.analysis"
                    maxlength="2000"
                    placeholder="请描述解决方案"
                    show-word-limit
                    :autosize="{minRows:6,maxRows:12}"
                    type="textarea"
                    :required="true"/>
                <!-- </el-form-item>
              </el-form> -->
            </div>
          </div>
        </div>
      </div>
      <div>
        <!-- <el-button class="lef_btn" @click="">上一步</el-button> -->
        <el-button class="next" @click="next">下一步</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { ref, reactive, onMounted, computed } from 'vue';
import MyTimeLine from '../../components/MyTimeLine.vue';
import Steps from '../../components/Steps.vue';
import { useRouter, useRoute } from "vue-router";
import apiFun from '../../api/api';
const router = useRouter();
const route = useRoute();
const status = ref(1);
const url = ref('src/assets/image/correct.svg');
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
    title: '上传故障集',
    description: '进行重新分析',
    status: 'completed',
  },
  {
    title: '人员分析中',
    description: '请耐心等待哦',
    status: 'in-progress',
  },
  {
    title: '完成',
    description: '重新分析完成',
    status: 'uncompleted',
  },
]);
const data = reactive({
  failureId: '',
  courseId: '',
  analysis: ''
})
const faultAnalysis = reactive({
  // cause: '网络连接故障：可能由于网络中断、不稳定的连接或配置错误导致。资源耗尽：系统资源（如内存、磁盘空间）耗尽，导致应用程序无法正常运行。配置错误：错误的配置参数或设置可能导致系统出现问题。',
  // solution: '检查网络连接：确保网络连接正常，检查网络设备、电缆和路由器是否正常工作。如果发现问题，修复或更换故障设备。优化资源利用：分析系统资源使用情况，查找资源耗尽的原因。清理不必要的文件或进程，增加可用资源。如果需要，考虑升级硬件或调整系统配置。检查配置设置：仔细检查系统配置文件和参数设置，确保其正确性。如果发现配置错误，及时进行修复并重新启动应用程序。',
  cause: '',
  solution: '',
});

onMounted(() => {
  getDetail();
})
const getDetail = () => {
  
};
const next = () => {
  apiFun.repair.humanAnalysis(data.failureId, data.courseId, data.analysis).then((res) => {
    if(res.code === 200){
      router.push({
      path:'/finish', 
      query:{id: route.query.id}
    })
    }else{
      ElMessage.error("人员分析提交失败");
    }
  });
}
const backToList = () => {
  router.push({
    path:'/detail', 
    query:{id: route.query.id}
  })
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

  .content-bottom {
    width: 100%;
    display: flex;
    gap: 25px;
    padding: 0 80px 0 80px;

    .left {
      flex: 1;
      display: flex;
      gap: 25px;
      flex-direction: column;
      height: 100%;
    }

    .right {
      flex: 1;
      display: flex;
      gap: 25px;
      flex-direction: column;
      height: 100%;
    }

    .card {
      margin: 20px 0 20px 0;
      display: flex;
      flex-direction: column;

      .card-header-2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 10px;
      }

      .small-div-body {
        padding: 20px;
        padding-top: 0;
        font-size: 15px;
        font-weight: 400;
        color: #666666;
        line-height: 30px;
      }

      .fault {
        max-height: 300px;
        text-align: left;
        overflow: auto;
      }
    }
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
// h3{
//   font-weight: 540;
// }
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
  }
}

.info{
  padding: 4% 14% 0 4%;
  text-align: left;

  .info-title1{
    margin-bottom: 20px;
  }
  .info-title2{
    margin-bottom: 5px;
  }
  .info-content{
    margin-left: -30px;
    .input{
      width: 400px;
      background-color: #fff;
      margin-left: 4%;
    }
  }
  .form-button{
    margin-left: 420px;
  }
}
.next {
  background-color: rgb(34,101,255);
  color: #fff;
}
</style>
<style src="src/assets/style/base.scss"></style>
