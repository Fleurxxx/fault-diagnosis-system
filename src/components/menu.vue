<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    router
    style="
      min-height: 90%;
      box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, 0.06);
    "
  >
    <el-menu-item index="/dataScreen" class="el-menu-font">
      <el-icon><PieChart /></el-icon>
      <template #title>数据大屏</template>
    </el-menu-item>
    <el-menu-item index="/bucketList" class="el-menu-font">
      <el-icon><FolderOpened /></el-icon>
      <template #title>Bucket列表</template>
    </el-menu-item>
    <el-sub-menu index="/dataServer">
      <template #title>
        <el-icon><List /></el-icon>
        <span class="el-menu-font">数据服务</span>
      </template>
      <el-menu-item index="/dataCopy">数据复制</el-menu-item>
      <el-menu-item index="/dataImport">数据导入</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><TrendCharts /></el-icon>
        <span class="el-menu-font">资源管理</span>
      </template>
      <el-menu-item index="/userManage">子用户管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="5">
      <template #title>
        <el-icon><Star /></el-icon>
        <span class="el-menu-font">收藏Bucket</span>
      </template>
      <el-menu-item
      class="collectList"
        v-for="collectBucket in state.collectBuckets"
        :key="collectBucket.id"
        @click="toBucket(collectBucket.name)"
        index=""
        >{{ collectBucket.name }}
        <el-button
        @click="deleteCollect(collectBucket.name)"
      link
      >
        <el-icon class="delete"><Close /></el-icon></el-button>
        </el-menu-item
      >
      <el-menu-item
      @click="openCollectBucket"
      index=""
        ><el-icon 
        ><Plus /></el-icon>新增Bucket</el-menu-item
      >
    </el-sub-menu>
    <button class="open-btn">
      <el-icon class="open-icon" v-show="isCollapse"
        ><ArrowRightBold
      /></el-icon>
      <el-icon v-show="!isCollapse"
        ><ArrowLeftBold class="open-icon"
      /></el-icon>
    </button>
    <el-dialog
    v-model="isVisit"
    width="45%"
     title="收藏bucket"
      append-to-body
      >
      <template #default>
        <el-form label-width="120px">
        <el-form-item style="font-weight: bold;" label="添加方式">
      <el-radio-group v-model="collectBucketWay">
        <el-radio label="1" >从我的Bucket添加</el-radio>
        <el-radio label="2" >从其他已授权Bucket添加</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="collectBucketWay==1" style="font-weight: bold;" required label="Bucket">
      <el-select v-model="state.selectBucketName" style="width: 60%;" placeholder="请选择要收藏的Bucket">
        <el-option v-for="bucket in state.myBucket" :key="bucket.name" :label="bucket.name" :value="bucket.name"/>
      </el-select>
    </el-form-item>
    <el-form-item v-if="collectBucketWay==2" style="font-weight: bold;" required label="Bucket">
      <el-input style="width: 60%;" placeholder="请输入你要收藏的Bucket名字" v-model="state.selectBucketName" />
    </el-form-item>
    </el-form>
      </template>
      <template #footer>
        <div style="flex: auto; justify-content: center">
        <el-button type="primary" @click="confirmClick"
          >确定</el-button
        >
        <el-button @click="isVisit=false"
          >取消</el-button
        >
      </div>
      </template>
      </el-dialog>
  </el-menu>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "vue";
import "../assets/style/base.scss";
// import apiFun from "../utils/api";
import { ElMessage, ElMessageBox } from "element-plus";
import router from "../router";

const collectBucketWay = ref('1')
const isVisit = ref(false)//新增bucket收藏弹窗
const state = reactive({
  collectBuckets: [],
  myBucket:[],
  selectBucketName:'',//用户选择收藏的bucket
});

onMounted(()=>{
  pre()
})
const deleteCollect = (name) => {
  ElMessageBox.confirm(`确定取消收藏该Bukcet吗?`, {
      type: 'warning',
    })
    .then(() => {
      apiFun.bucket.userDelete(name).then(res=>{
    state.collectBuckets=res.data
    ElMessage.success('操作成功！')
  })
    })
    .catch(() => {});

}
const openCollectBucket = () => {
  isVisit.value=true
  // apiFun.bucket.getList(1,200,'').then((res)=>{
  //   console.log(res)
  //  if(res.code==200){
  //   state.myBucket=res.data.rows
  //   console.log(state.myBucket)
  //  }
  //  else
  //  ElMessage.error(res.msg)
  // })
}
function pre(){
  // apiFun.bucket.getCollect().then((res)=>{
  //   console.log(res)
  //  if(res.code==200){
  //    state.collectBuckets=res.data
  //  }
  //  else
  //  ElMessage.error(res.msg)
  // })
}
/* 进入Bucket */
const toBucket = (name) => {
  router.push({path:'/fileList',query:{
    bucketName:name
  }})
}
/* 确认收藏 */
const confirmClick = () => {
  /* 判断是否已被收藏 */
  for(let index=0;index<state.collectBuckets.length;index++){
    let item = state.collectBuckets[index]
    if(state.selectBucketName==item.name){
      ElMessage.warning('该bucket已被收藏!')
      return
    }
  }
  apiFun.bucket.collect(state.selectBucketName).then(res=>{
    if(res.code==200){
    console.log(res)
    isVisit.value=false
    ElMessage.success('操作成功！')
    state.collectBuckets=res.data
    }else{
      ElMessage.error(res.msg)
    }
  })
}
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
const isCollapse = ref(false); //设置主菜单收起/显示状态
</script>

<style lang="scss">
$primary-color: #6477b7;
$back-color: #f0f2f8;
$second-color: #f0f1f8;

.el-menu.el-menu-item {
  font-size: 10px;
}.collectList{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.open-btn {
  border-radius: 0;
  width: 15px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid #dde0e6;
  background: #fff;
  height: 30px;
  position: absolute;
  bottom: 50vh;
  right: -15px;
  &:hover {
    background-color: $second-color;
  }
  transform: translateY(-50%);
  transition: right 0.3s ease-in-out;
}
.el-menu-vertical-demo.is-collapsed .open-btn {
  right: 170px;
}
.open-icon {
  color: #7e7e7e;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-width: 240px;
  float: left;
  max-width: 240px;
}
.el-menu-font {
  font-weight: bold;
  color: #4e4e4e;
}
.plus-icon {
  margin-left: 10px;
}.dialog{
       width: 34%;
} .delete {
    opacity: 0; /* 设置默认透明度 */
  }
  .delete:hover {
    opacity: 1; /* 设置鼠标悬浮时的不透明度 */
  }
</style>
