<template>
  <div class="box">
    <div class="box-title">
      <p class="title">维修记录</p>
    </div>
    <div class="middle">
      <div class="left">
        <el-button class="create"  @click="dialogVisible = true"><el-icon><Plus /></el-icon>&nbsp;&nbsp;新建</el-button>
        <el-button class="download" @click="batchDownload">批量下载</el-button>
      </div>
      <div class="right">
        <el-input placeholder="请输入内容进行搜索" v-model="searchText" clearable @input="clear" @clear="clear">
          <template #append>
            <el-button @click="search">搜索</el-button>
          </template>
        </el-input>
      </div>
    </div>
    <div class="content">
      <div class="form">
        <el-drawer
          v-model="dialogVisible"
          title="修改故障记录"
          size="40%">
          <el-form
            class="show"
            ref="addForm"
            :model="form"
            label-width="auto"
            label-position="left">
            <el-form-item label="故障名称" prop="title" :required="true">
              <el-input v-model="form.title" placeholder="请输入故障名称" class="input"></el-input>
            </el-form-item>
            <el-form-item label="故障简介" prop="describe" :required="true">
              <el-input v-model="form.describe" 
                type="textarea" rows="4" placeholder="请简略描述故障" 
                show-word-limit maxlength="200"
                :autosize="{minRows:6,maxRows:12}">
              </el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirmEdit">确 定</el-button>
            </span>
          </template>
        </el-drawer>
      </div>
      <div class="bottom">
        <el-row class="table">
          <el-table
            :data="fixData"
            @selection-change="handleSelectionChange"
            style="width: 100%"
            :header-cell-style="{background: 'rgb(242,243,245)', color: 'rgb(0,0,71)', fonsSize: '22px', height: '60px'}"
            :cell-style="{color: 'rgb(85,68,85)', fontWeight: '350', fonsSize: '18px'}"
            :row-style="{height: '50px'}">
            <el-table-column type="selection" width="40"/>
            <el-table-column prop="id" label="记录编号" width="100px" />
            <el-table-column prop="title" label="记录名称" width="200px"/>
            <el-table-column prop="modelId" label="模型编号" width="120px" />
            <el-table-column prop="courseId" label="故障类型" width="170px" />
            <el-table-column prop="describe" label="描述" width="170px" :formatter="format"/>
            <el-table-column prop="gmtCreate" label="创建时间" width="170px" :formatter="formatDate"/>
            <el-table-column prop="gmtModified" label="修改时间" width="170px" :formatter="format"/>
            <!-- <el-table-column
              prop="status"
              label="状态"
              width="110px">
              <template v-slot="scope">
                <span v-if="scope.row.status === 0">未修复</span>
                <span v-else>已修复</span>
              </template>
            </el-table-column> -->
            <el-table-column fixed="right" label="操作" width="220">
              <template v-slot="scope">
                <!-- <el-button link @click="handleDisplay(scope.row)"
                  ><el-icon><CaretRight /></el-icon></el-button>
                <el-button link @click="handleDownload(scope.row)"
                  ><el-icon><Download /></el-icon></el-button> -->
                <el-button link type="primary" @click="handleCheck(scope.row)"
                  ><el-icon><View /></el-icon> 查看</el-button>
                  <el-button link type="success" @click="handleEdit(scope.row)"
                  ><el-icon><EditPen /></el-icon> 编辑</el-button>
                <el-button link type="danger" @click="handleDelete(scope.row)"
                  ><el-icon><Delete /></el-icon> 删除</el-button>
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
            @current-change="handleCurrentChange"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, reactive, onMounted, computed } from 'vue';
import router from '../../router';
import apiFun from '../../api/api';
let fixData = ref([]);
const multipleSelection = ref([]);
const pageSize = ref(5);
let totalNum = ref(200);
let dialogVisible = ref(false);
let currentPage = ref(1);
const form = reactive({
    id: '',
    title: '',
    describe: null,
  },
);
const searchText = ref('');

onMounted(() => {
  getRecords();
});

const getRecords = () => {
  apiFun.repair.getRepairRecord(searchText.value, currentPage.value, pageSize.value).then((res) => {
    if(res.code === 200){
      fixData.value = res.data.records;
      totalNum.value = res.data.total;

    }else{
      ElMessage.error("获取失败");
    }
  });
};

const format = (row, column) => {
  if(column.property === 'describe'){
    if(row.describe === '' || row.describe === undefined){
      return '--'
    }
    return row.describe;
  }else if(column.property === 'gmtModified'){
    if(row.gmtModified === '' || row.gmtModified === undefined){
      return '--';
    }else{
      return formatDate(row.gmtModified);
    }
  }
};

const formatDate = (date) => {
  let dateObj = ref('');
  if(typeof date === 'object'){
    dateObj = new Date(date.gmtCreate);
  }else{
    dateObj = new Date(date);
  }
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const handleDisplay = (row) => {};

const handleDownload = (row) => {};

const handleCheck = (row) => {
  router.push({
    path:'/detail', 
    query:{id: row.id}
  })
};

const handleEdit = (row) => {
  form.id = row.id;
  form.title = row.title;
  form.describe = row.describe;
  dialogVisible.value = true;
};

const confirmEdit = () => {
  apiFun.repair.changeMaintain(form).then((res) => {
    if(res.code === 200){
      fixData.value = res.data.records;
      totalNum.value = res.data.total;
    }else{
      ElMessage.error("获取失败");
    }
  });
};

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
};

const handleCurrentChange = (val) => {
  currentPage.value = val;
  getRecords();
};

const search = () => {
  if(searchText.value === '' || searchText.value === undefined) {
    ElMessage({
      message: '搜索内容不能为空',
      type: 'warning',
    })
  }else{
    currentPage.value = 1;
    getRecords();
  }
};

const clear = () => {
  currentPage.value = 1;
  getRecords();
};

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
};

</script>
<style lang="less" scoped>
.box{
  flex-direction: column;
  box-sizing: border-box;
  position: sticky;
  top:0;
  width:100%;
  height: 80vh;
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
:deep(.el-input__inner) {
  font-size: 15px;
  font-weight: 400;
  color: #959494;
  line-height: 30px;
}

:deep(.el-textarea__inner) {
  font-size: 15px;
  font-weight: 400;
  color: #959494;
  line-height: 30px;
}

h3{
  font-weight: 540;
}
:deep(.el-drawer__title)  {
    font-size: 18px;
    color: #3b3d3f;
}
</style>
