<template>
  <div class="box">
    <div class="box-title">
      <p class="title">维修记录</p>
    </div>
    <div class="middle">
      <div class="left">
        <el-button class="create"  @click="dialogVisible = true"><el-icon><Plus /></el-icon>&nbsp&nbsp新建</el-button>
        <el-button class="download" @click="batchDownload">批量下载</el-button>
      </div>
      <div class="right">
        <el-input placeholder="请输入内容进行搜索" v-model="searchText" clearable @clear="clear">
          <template #append>
            <el-button @click="search">搜索</el-button> 
          </template>
        </el-input>
      </div>
    </div>
    <div class="content">
      <div class="form">
        <el-dialog
          v-model="dialogVisible"
          title="新建维修记录"
          width="35%">
          <el-form
            class="show"
            ref="addForm"
            :model="form"
            label-width="auto"
            label-position="left"
          >
            <el-form-item label="模型" prop="name" :required="true">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="测试数据集" prop="name" :required="true">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="故障类型" prop="type" :required="true">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option v-for="item in nameList" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="故障原因" prop="type" :required="true">
              <el-input v-model="form.type" type="textarea" rows="4" placeholder="描述"></el-input>
            </el-form-item>
            <el-form-item label="解决方法" prop="type" :required="true">
              <el-input v-model="form.type" type="textarea" rows="4" placeholder="描述"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime" :required="true">
              <el-date-picker
                v-model="form.createTime"
                type="date"
                placeholder="Pick a time"
                :disabledDate="disabledDate"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="状态" prop="status" :required="true">
              <el-radio-group v-model="form.status">
                <el-radio :label="0" >未修复</el-radio>
                <el-radio :label="1" >已修复</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleAdd">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <div class="bottom">
        <el-row class="table">
          <el-table
            :data="fixData"
            @selection-change="handleSelectionChange"
            style="width: 100%"
            :header-cell-style="{
              background: 'rgb(242,243,245)',
              color: 'rgb(0,0,71)',
              fonsSize: '18px',
            }"
            :cell-style="{color: 'rgb(85,68,85)', fontWeight: '350'}"
          >
            <el-table-column type="selection" width="50"/>
            <el-table-column prop="id" label="数据编号" width="110px" />
            <el-table-column
              prop="name"
              label="数据名称"
              width="208px"
            >
            </el-table-column>
            <el-table-column prop="size" label="总大小" width="120px" />
            <el-table-column prop="type" label="故障类型" width="170px" />
            <el-table-column prop="createTime" label="创建时间" width="140px" />
            <el-table-column
              prop="status"
              label="状态"
              width="110px">
              <template v-slot="scope">
                <span v-if="scope.row.status === 0">未修复</span>
                <span v-else>已修复</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="210">
              <template v-slot="scope">
                <el-button link @click="handleDisplay(scope.row)"
                  ><el-icon><CaretRight /></el-icon></el-button>
                <el-button link @click="handleDownload(scope.row)"
                  ><el-icon><Download /></el-icon></el-button>
                <el-button link type="primary" @click="handleCheck(scope.row)"
                  >查看</el-button>
                <el-button link type="danger" @click="handleDelete(scope.row)"
                  >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="pager">
          <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="totalNum"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, reactive, onMounted, computed } from 'vue';
import router from '../../router';
// import { apiFun } from '/api/api.js';
const fixData = [
  {
    id: '1',
    name: 'Tom',
    createTime: '2016-05-03',
    size: 10767,
    type: '规则筛选',
    status: 0,
  },
  {
    id: '2',
    createTime: '2016-05-02',
    name: 'Tom',
    size: 10767,
    type: '规则筛选',
    status: 0,
  },
  {
    id: '3',
    createTime: '2016-05-04',
    name: 'Tom',
    size: 10767,
    type: '规则筛选',
    status: 0,
  },
  {
    id: '4',
    createTime: '2016-05-01',
    name: 'Tom',
    size: 10767,
    type: '人工',
    status: 1,
  },
  {
    id: '5',
    createTime: '2016-05-08',
    name: 'Tom',
    size: 10767,
    type: '人工',
    status: 1,
  },
  {
    id: '6',
    createTime: '2016-05-06',
    name: 'Tom',
    size: 10767,
    type: '规则筛选',
    status: 1,
  },
  {
    id: '7',
    createTime: '2016-05-07',
    name: 'Tom',
    size: 10767,
    type: '规则筛选',
    status: 1,
  },
];
const multipleSelection = ref([]);
const pageSize = ref(10);
let totalNum = ref(200);
let dialogVisible = ref(false);
let currentPage = ref(1);
const form = reactive({
    id: '',
    name: '',
    createTime: ref(new Date()),
    size: null,
    type: null,
    status: null,
  },
);
onMounted(() => {
  const getRecords = (val) => {
    // const res = getRecordsApi(pageSize, currentPage, searchText);
  };
  getRecords();
});
const handleDisplay = (row) => {

}
const handleDownload = (row) => {

}
const handleCheck = (row) => {
  router.push('/detail');
}
const handleDelete = (row) => {
  ElMessageBox.confirm(
    '确定删除吗',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  .then(() => {
    // const res = apiFun.fix.deleteFixRecord(row.id);

  })
  .catch(() => {
    ElMessage({
      type: 'info',
      message: '取消删除',
    })
  });
}
const handleAdd = () => {
  dialogVisible.value = false;
}
const handleCurrentChange = (val) => {
  currentPage = val;
  // getRecords();
}
const nameList = reactive([]);
const searchText = ref('');

const search = () => {
  if(searchText.value === '' || searchText.value === undefined) {
    ElMessage({
      message: '搜索内容不能为空',
      type: 'warning',
    })
  }else{
    currentPage = 1;
    // getRecords(searchText);`
  }
}

const clear = () => {
  currentPage = 1;
  // getRecords(searchText);
}

const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

const batchDownload = () => {
  if(multipleSelection.value.length === 0){
    ElMessage({
      message: '请选择批量下载的内容',
      type: 'warning',
    })
  }else{

  }
}

// 限制选择范围在今天以前
const disabledDate = (time) => {
  // 获取当前日期
  const today = new Date();
  // 清除时分秒的部分，只保留年月日
  today.setHours(0, 0, 0, 0);
  // 禁用今天之后的日期
  return time.getTime() > today.getTime();
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
  justify-content: space-between;
  margin-top: 10px;
  padding: 22px 50px 0 50px;
  .left{
    display: flex;
    flex-direction: row;
  }
  .right{
    background-color: rgb(242,243,245);
  }
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
.pager {
  float: right;
  margin-top: 40px;
}
.table {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(85,68,85);
  font-weight: 400;
}
.content {
  background-color: #fff;
  padding: 0 50px 0 50px;
}
h3{
  font-weight: 540;
}
</style>
