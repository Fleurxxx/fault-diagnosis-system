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
        <el-button class="lef_btn" v-if="status === 4" @click="printResult">打印结果</el-button>
        <el-button class="lef_btn" v-else @click="toInfo">查看详情</el-button>
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
          <el-drawer
            v-model="drawVisible"
            title="重新上传分析"
            width="35%">
            <el-form
              class="show"
              ref="addForm"
              :model="form"
              label-width="auto"
              label-position="left"
            >
              <el-form-item label="数据集上传" prop="name">
                <div class="form-update">
                  <Upload multiple type="drag" action="" :before-upload="beforeUpload">
                    <div style="padding: 20px 20px">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>Click or drag files here to upload</p>
                    </div>
                  </Upload>
                </div>
              </el-form-item>
              <el-form-item label="分析描述" prop="status" :required="true">
                <el-input v-model="form.name" type="textarea" :autosize="{ minRows: 5, maxRows: 5}"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="drawVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAnalysis">确 定</el-button>
              </span>
            </template>
          </el-drawer>
          <el-card class="card" shadow="hover">
            <template #header>
              <div class="card-header-2" >
                <span><i class='fa fa-dot-circle-o'></i>&nbsp;&nbsp;&nbsp;解决方案</span>
              </div>
            </template>
            <div class="fault small-div-body ">
              {{ faultAnalysis.solution }}
            </div>
            <div class="fault small-div-body">
              <el-empty description="未找到解决方案" image-size="90" v-if="faultAnalysis.solution === ''">
                <el-button type="primary" @click="handleAnalysis">重新上传分析</el-button>
              </el-empty>
            </div>
          </el-card>
        </div>
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
const router = useRouter();
const route = useRoute();
const status = ref(2);
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
    status: 'completed',
  },
  {
    title: '完成',
    description: '重新分析完成',
    status: 'completed',
  },
]);
const faultAnalysis = reactive({
  // cause: '网络连接故障：可能由于网络中断、不稳定的连接或配置错误导致。资源耗尽：系统资源（如内存、磁盘空间）耗尽，导致应用程序无法正常运行。配置错误：错误的配置参数或设置可能导致系统出现问题。',
  // solution: '检查网络连接：确保网络连接正常，检查网络设备、电缆和路由器是否正常工作。如果发现问题，修复或更换故障设备。优化资源利用：分析系统资源使用情况，查找资源耗尽的原因。清理不必要的文件或进程，增加可用资源。如果需要，考虑升级硬件或调整系统配置。检查配置设置：仔细检查系统配置文件和参数设置，确保其正确性。如果发现配置错误，及时进行修复并重新启动应用程序。',
  cause: '',
  solution: '',
});

const backToList = () => {
  router.push({
    path:'/detail', 
    query:{id: route.query.id}
  })
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
.next {
  background-color: rgb(34,101,255);
  color: #fff;
}

.content-bottom {
  width: 100%;
  display: flex;
  gap: 25px;
  padding: 0 20px 0 20px;

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

    .form-update{
      width: 100%;
      border: 1px solid #dcdfe6 ;
      padding: 10px;
      border-radius: 4px;
    }
  }

  .card {
    margin: 20px 0 20px 0;
    .demo-drawer-profile{
      font-size: 16px;
      text-align: left;
    }
    .card-header-2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 10px;
      
      .alert {
        font-size: 10px;
      }
    }

    .detail {
      .status-create {
        display: flex;
        justify-content: space-between;
      }
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
</style>
<style src="src/assets/style/base.scss"></style>
