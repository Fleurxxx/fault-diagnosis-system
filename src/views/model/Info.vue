
<template>
  <div class="box">
    <div class="box-title">
      <p class="title">模型信息</p>
    </div>
    <div class="box-reminder">
      <div class="reminder">
        <div class="top">
          <el-avatar :fit="fit" :size="35" src='https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar'/>
          <p >Fleurxxx · 更新于<Time :time="data.time" /> · 私人</p>
        </div>
        <div class="info" >
          <h1>{{data.name}}</h1>
          <p @click="change('txt1')" class="cur"><i class="fa fa-pencil-square-o"></i> {{ data.introduce }}</p>
        </div>
        <div class="analyse">
          <Button class="analyse-but" type="primary" shape="circle" @click="download()">&nbsp;<Icon type="md-download" />&nbsp;下载（{{data.filesize}}）&nbsp;</Button>
          <Tabs v-model="activeTab">
              <TabPane label="数据卡" name="name1">
                标签一的内容
              </TabPane>
              <TabPane label="设置" name="name2">
                <div id="txt1">
                  修改信息
                </div>
              </TabPane>
              <!-- <TabPane label="标签三" name="name3">标签三的内容</TabPane> -->
          </Tabs>
        </div>

      </div>
    </div>
    <div class="box-table">

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import  {Message} from 'view-ui-plus'
import { ElMessageBox,ElMessage } from 'element-plus';
import ScrollIntoView from 'scroll-into-view-if-needed'
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
const data = reactive({
  name:'模型数据1',
  introduce:'添加描述信息',
  filesize:'5MB',
  time: (new Date()).getTime() - 60 * 3 * 1000,
})

const back =()=>{
  router.push({ path: "/info" });
}


const activeTab = ref('name1')
const change = (index) => {
  activeTab.value = 'name2'
  // console.log(activeTab.value)
  document?.getElementById(index)?.scrollIntoView({
    behavior: "smooth", //smooth:平滑，auto：直接定位
    block: "start",
    inline: "start",
  });
};

const download = () =>{
  console.log(22222)
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

.box{
  flex-direction: column;
  box-sizing: border-box;
  position: sticky;
  top:0;
  width:100%;
  height: 190vh;
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
    padding:5% 18% 0 14%;
    .reminder{
      text-align: left;
    }
    .top {
      display: flex;
      align-items: center;
    }
    .el-avatar {
      margin-right: 10px; /* 根据需要调整元素之间的间距 */
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
      padding-top: 18px;
    }


    .analyse{
      margin-top: 35px;
      // position: relative;
      .analyse-but{
        position: absolute;
        right: 23%;
        z-index:10;
      }
    }


  }
  .cur{
    cursor: pointer; /*鼠标悬停变小手*/
  }
  .box-reminder h1{

    line-height: 2;
  }

  .box-table{
    margin-top: 50px;


  }
}



</style>
