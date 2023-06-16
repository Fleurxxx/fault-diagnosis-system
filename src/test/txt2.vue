<template>
  <div>
    <div class="box-but">
      <el-button>新增</el-button>
      <el-button>批量操作</el-button>
    </div>
     <basic-container>
      <el-row :gutter="12" v-loading="loading">
        <!-- date遍历循环的数据 -->
        <el-col :span="6" v-for="item in data" :key="item.id">
          <el-card shadow="hover"><!--style="background-color: #5daf34"  灰 #e1e1e1 绿 #5daf34-->
            <!-- 卡片的头部位 -->
            <template #header>
              <div class="card-header">
                <!--
                  这里声明一下,我在多选时,往数组中添加的是对象
                  label属性:是多选框的值,若该标签中无内容,则该属性也充当 checkbox 按钮后的介绍
                  @change:改变事件,多选框勾选和取消勾选都会触发事件,所以在取消勾选时要删除勾选状态下的值
                -->
                <!-- <el-checkbox v-model="checked" :label="item.id" @change="ids(item)">{{name}}</el-checkbox> -->
                <el-checkbox class="card-check" v-model="item.checked" :label="item.id" @change="ids(item)">{{name}}</el-checkbox>
                <div class="card-but">
                  <a><font-awesome-icon icon="fa-brands fa-qq"/></a>
                  <!-- 修改按钮 -->
                  <el-button type="text" icon="el-icon-edit-outline" @click="handleUpdate(item)"/>
                  <!-- 删除按钮 -->
                  <el-button type="text" icon="el-icon-delete" @click="rowDel(item.id)"/>
                  <!-- 开关按钮 -->
                  <el-button type="text" icon="el-icon-switch-button" @click="devicePowerBtn(item)"/>
                </div>
              </div>
            </template>
            <!-- 卡片显示的内容 -->
            <div>
              <h2>数据模型</h2>
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
</template>

<script setup>
import { ref, reactive } from 'vue';
// import { add, getDetail, getList, remove, update } from "@/api/接口js文件";


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
    checked: false
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
<style scoped>
.box-but{
  margin-right: 80%;
}
.card-check{
  position: relative;
  left: -100px;
  top:-10px;
}
.card-but{
  v-index:8;
}

</style>
