
<template>
  <div class="box">
    <div class="box-title">
      <p class="title">维修信息</p>
    </div>
    <div class="box-reminder">
      <div class="reminder">
        <div class="top">
          <el-avatar :fit="fit" :size="35" :src=headImg />
          <p v-if="isPublic">Fleurxxx  · 公开</p>
          <p v-else>Fleurxxx  · 私人</p>
        </div>
        <div class="info" >
            <h1>{{data.name}}</h1>
            <!-- <vue-markdown :source="markdownText"></vue-markdown> -->
            <!-- <v-md-editor v-model="text" height="400px"></v-md-editor> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, nextTick, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import  {Message} from 'view-ui-plus'
import { ElMessageBox,ElMessage,ElInput } from 'element-plus';
import ScrollIntoView from 'scroll-into-view-if-needed'
import { useRoute, useRouter } from 'vue-router';
import DataCard from '../../components/data/DataCard.vue'
import Version from '../../components/data/ModelVersion.vue'
import Process from '../../components/deployment/Process.vue'
import DeploymentSettings from '../../components/deployment/DeploymentSettings.vue'
import api from "../../api/api";
import headImg from '../../assets/icon/head/羊1.png'
import modelstore from "../../store/model.js";

const data = reactive({
  radio:"1",
  name:'模型数据1',
  introduce:'添加描述信息',
  filesize:'5MB',
  time: (new Date()).getTime() - 60 * 3 * 1000,
  isPublic:false,
  modelId: '',
  modelDataSets:{}
});

const txt = ref('## 叮当')

/* 文件大小数据转化 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

onMounted(() => {
})
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='less'>
.box{
  flex-direction: column;
  box-sizing: border-box;
  position: sticky;
  top:0;
  width:100%;
  // height: 190vh;
  // height:100%;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.08);
  .box-title{
    float: left;
    padding-top: 22px;
    padding-left: 50px;
  }
  .title{
    font-size:18px;
    font-weight:bold;
  }

  .box-reminder{
    float: center;
    padding:5% 12% 0 14%;
    .reminder{
      text-align: left;
    }
    .top {
      display: flex;
      align-items: center;
    }

    .top p{
      margin:3px 10px;
      font-size:16px;
      font-weight:bold;
    }

    .info{
      margin-top: 90px;
    }
    .info p{
      padding-top: 35px;
    }

    .cur{
      cursor: pointer; /*鼠标悬停变小手*/
    }
    .box-reminder h1{
      line-height: 2;
    }
  }
}
</style>