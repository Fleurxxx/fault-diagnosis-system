<template>
  <div class="box">
    <div class="box-title">
      <p class="title">模型管理</p>
    </div>
    <div class="middle">
      <div class="left">
        <el-button class="create"  @click="dialogVisible = true"><el-icon><Plus /></el-icon>&nbsp;&nbsp;新建</el-button>
        <el-button class="download" @click="batchDownload">批量下载</el-button>
      </div>
      <div class="right">
      <el-input placeholder="请输入内容进行搜索" v-model="searchText" clearable @clear="clear" >
        <template #append>
          <el-button @click="search">搜索</el-button>
        </template>
      </el-input>
    </div>
      <basic-container >
        <el-row :gutter="12" v-loading="loading" style="padding:20px ">
          <!-- date遍历循环的数据 -->
          <el-col :span="6" v-for="item in data" :key="item.id" style="padding-bottom: 12px;">
            <el-card shadow="hover" ><!--style="background-color: #5daf34"  灰 #e1e1e1 绿 #5daf34-->
              <!-- 卡片的头部位 -->
              <template #header>
                <div class="card-header">
                  <!--
                    这里声明一下,我在多选时,往数组中添加的是对象
                    label属性:是多选框的值,若该标签中无内容,则该属性也充当 checkbox 按钮后的介绍
                    @change:改变事件,多选框勾选和取消勾选都会触发事件,所以在取消勾选时要删除勾选状态下的值
                  -->
                  <!-- <el-checkbox v-model="checked" :label="item.id" @change="ids(item)">{{name}}</el-checkbox> -->
                  <el-checkbox class="card-check" v-model="item.checked" :label="item.id" @change="ids(item)">{{item.name}}</el-checkbox>
                  <div class="card-but">
                    <!-- 修改按钮 -->
                    <el-button type="text" class="button" @click="handleUpdate(item)"><i class="fa fa-pencil fa-fw"></i></el-button>
                    <!-- 删除按钮 -->
                    <el-button type="text" class="button" @click="rowDel(item.id)"><i class="fa fa-trash-o fa-fw"></i></el-button>
                    <!-- 开关按钮 -->
                    <el-button type="text" class="button" @click="devicePowerBtn(item)"><i class="fa fa-ban fa-fw"></i></el-button>
                  </div>
                </div>
              </template>
              <!-- 卡片显示的内容 -->
              <div class="card-content" v-on:click="handleClick">
                <h2>数据模型</h2>
                <p>这是一段简单介绍</p>
                <p>这是一段简单介绍</p>
                <p>这是一段简单介绍</p>
                <p>这是一段简单介绍</p>
              </div>
              </el-card>
          </el-col>
        </el-row>

        <!-- 分页 -->
        <div class="blockPage">
          <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :page-sync="page"
            :pager-count="10"
            :page-sizes="[12,24,36,48]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
          </el-pagination>
        </div>
      </basic-container>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import  {Message} from 'view-ui-plus'
import { ElMessageBox,ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
// import { add, getDetail, getList, remove, update } from "@/api/接口js文件";

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

const checked = ref(false);
const page = reactive({
  pageSize: 12,
  currentPage: 1,
  total: 0,
});
const selectionList = ref([]);
const data = ref([]);

// 添加20个数据到data变量
for (let i = 0; i < 20; i++) {
  data.value.push({
    id: i + 1,
    checked: false,
    // name:"23547375424",
    // 其他属性...
  });
}

// 获取数组中数值的下标
function indexOf(val, ids) {
  for (let i = 0; i < ids.length; i++) {
    if (ids[i] === val)
      return i;
  }
  return -1;
}

// 多选赋值ids
function ids(val) {
  console.log(val)
  const ids = selectionList.value;
  const index = indexOf(val, ids);
  if (ids.length > 0 && index > -1) {
    ids.splice(index, 1);
  } else {
    ids.push(val);
    ids.join(",");
  }
}

// 新增接口
function rowSave(row) {
  // add(row).then(() => {
  //   onLoad(page);
  //   console.log("操作成功!");
  // }, error => {
  //   console.log(error);
  // });
}

// 修改接口
function rowUpdate(row, index) {
  // update(row).then(() => {
  //   onLoad(page);
  //   console.log("操作成功!");
  // }, error => {
  //   console.log(error);
  // });
}

// 删除接口
function rowDel(row) {
  // remove(row.id)
  //   .then(() => {
  //     onLoad(page);
  //     console.log("操作成功!");
  //   });
}

//点击卡片跳转页面
const handleClick = () => {
  // 处理点击事件的逻辑
  console.log('Div clicked!');
  router.push({ path: "/info" });
}

function searchReset() {
  // query = {};
  // onLoad(page);
}

function searchChange(params) {
  // query = params;
  // page.currentPage = 1;
  // onLoad(page, params);
}

function selectionClear() {
  // $refs.crud.toggleSelection();
}

function currentChange(currentPage) {
  page.currentPage = currentPage;
}

function sizeChange(pageSize) {
  page.pageSize = pageSize;
}

function refreshChange() {
  // onLoad(page, query);
}

// 分页接口
function onLoad(page, params = {}) {
  // loading = true;
  // getList(page.currentPage, page.pageSize, Object.assign(params, query))
  //   .then(res => {
  //     const data = res.data.data;
  //     page.total = data.total;
  //     data.value = data.records;
  //     loading = false;
  //     selectionClear();
  //   });
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
    float: left;
    padding-top: 22px;
    padding-left: 50px;
  }
  .title{
    font-size:18px;
    font-weight:bold;
  }

  .middle{
    // display: flex;
    position: absolute;
    justify-content: space-between;
    top: 30px;

  }
  .left{
    // display: flex;
    // flex-wrap:flex-wrap;
    // flex-direction: row;
    position: relative;
    left: -38.7%;
    top:30px;
  }
  .right{
    position: relative;
    left: 77.7%;
    width:250px;
    background-color: rgb(242,243,245);
  }
  .create {
    background-color: rgb(34,101,255);
    color: #fff;
  }
  .download{
    background-color: rgb(247,248,250);
    border: rgb(247,248,250);
  }
  .download:hover{
    color: rgb(96,119,169);
    border: rgb(247,248,250);
  }
  .card-header{
    height: 15px;
  }
  .card-content{
    height: 100px;
    cursor: pointer; /*悬停变小手的属性*/
  }
  .card-check{
    position: relative;
    left: -110px;
    top: -8px;
  }
  .card-but{
    v-index:8;
    position: relative;
    top: -40px;
    left: 30%;
  }
  .button{
    width:20px;
    // background-color: transparent; /* 使背景透明 */
    // border-color: transparent; /* 去掉边框颜色 */
    box-shadow: none !important; /* 去掉阴影效果 */
    // color: inherit !important; /* 继承父元素的文字颜色 */
    // text-decoration: none !important; /* 去掉下划线效果 */
    // cursor: pointer; /* 修改鼠标样式为指针 */
    // outline: none; /* 去掉点击后的外边框 */
  }
  .blockPage{
    float: right;
    margin-right: 30px;;
  }


}


</style>
