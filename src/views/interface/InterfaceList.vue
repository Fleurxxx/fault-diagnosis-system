<template>
  <div class="box">
    <div class="box-title">
      <p class="title">接口管理</p>
    </div>
    <div class="middle">
      <div class="left">
        <el-button class="create"  @click="dialogVisible = true"><el-icon><Plus /></el-icon>&nbsp;&nbsp;新建</el-button>
        <el-button class="download" @click="batchDownload">批量删除</el-button>
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
          title="新增接口"
          size="40%">
          <el-form
            class="show"
            ref="fromData"
            :rules="rules"
            :model="form"
            label-width="auto"
            label-position="left">
            <el-form-item label="密钥id" prop="id" :required="true">
              <el-input v-model="form.id" placeholder="由字母和数字组成" class="input"></el-input>
            </el-form-item>
            <el-form-item label="密钥secret" prop="secret" :required="true" >
              <el-input v-model="form.secret" disabled  placeholder="需随机生成密钥" class="input">
                <template #append>
                  <el-button type="primary" @click="become">生成</el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="有效开始时间" prop="describe" >
              <el-date-picker
                    v-model="form.firstTime"
                    type="datetime"
                    placeholder="有效开始时间"
                    style="width: 480px;"
                  />
            </el-form-item>
            <el-form-item label="有效结束时间" prop="describe">
              <el-date-picker
                    v-model="form.lastTime"
                    type="datetime"
                    placeholder="有效结束时间"
                    style="width: 480px;"
                  />
            </el-form-item>
            <el-form-item label="状态" prop="status" :required="true">
              <el-select v-model="form.status" class="m-2" placeholder="选择接口状态" style="width: 480px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
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
            <el-table-column prop="id" label="密钥id" width="100px" />
            <el-table-column prop="secret" label="API Key" width="300px"/>
            <el-table-column prop="url" label="接口路径" width="" >
              <template v-slot="scope">
                <Paragraph copyable copy-text="custom text" style="color:#3f3fc2;margin-bottom: -5px;" :copy-config="{ tooltips: false }" @click="copyURL(scope.row.url)">{{ scope.row.url }}</Paragraph>
              </template>
            </el-table-column>
            <el-table-column prop="endtime" label="到期时间" width="120px" />
            <el-table-column prop="status" label="状态" width="90px" >
              <template v-slot="scope">
                <Tag color="green"  v-if="scope.row.status === 1">正常</Tag>
                <Tag color="orange"  v-else>停用</Tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="220">
              <template v-slot="scope">
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
import { Search } from '@element-plus/icons-vue'
import axios from 'axios'
const options = [
  {
    value: '1',
    label: '正常',
  },
  {
    value: '0',
    label: '停用',
  }
]
let fixData = ref([]);
const multipleSelection = ref([]);
const pageSize = ref(5);
let totalNum = ref(200);
let dialogVisible = ref(false);
let currentPage = ref(1);
let form = reactive({
    id: '',
    secret: '',
    firstTime: '',
    lastTime:'',
    status:''
  },
);
let fromData = reactive(null)
const validateData = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("该项不能为空"));
  }else{
    callback()
  }
}
const rules = reactive({
    id: [
      { validator: validateData , trigger: "blur" },
      { required: true, message: '请输入模型名称', trigger: 'blur'}
    ],
    secret: [
      { validator: validateData , trigger: "blur" },
      { required: true, message: '请输入模型名称', trigger: 'blur'}
    ]
})
const searchText = ref('');

onMounted(() => {
  getRecords();
});

const getRecords = () => {
  //mock模拟数据
  axios.get("/interface/getlist", {
    // params: {
    //   pageindex: this.pageindex,
    //   pagesize: 10,
    // },
  })
  .then((res) => {
    console.log(res);
    fixData.value = res.data.data.list
    totalNum.value =200;
  });

  // apiFun.repair.getRepairRecord(searchText.value, currentPage.value, pageSize.value).then((res) => {
  //   if(res.code === 200){
  //     fixData.value = res.data.records;
  //     totalNum.value = res.data.total;

  //   }else{
  //     ElMessage.error("获取失败");
  //   }
  // });
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

// 随机生成时间
function generateRandomTime() {
  const randomHour = String(Math.floor(Math.random() * 12)).padStart(2, '0'); // 随机生成 00 到 11 的小时数
  const randomMinute = String(Math.floor(Math.random() * 60)).padStart(2, '0'); // 随机生成 00 到 59 的分钟数
  const randomSecond = String(Math.floor(Math.random() * 60)).padStart(2, '0'); // 随机生成 00 到 59 的秒数

  return `${randomHour}:${randomMinute}:${randomSecond}`;
}
// 将时间格式转换
function formatDateTime1(dateTime) {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

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

function generateRandomKey() {
  const characters = 'abcdef0123456789';
  const sections = [8, 4, 4, 4, 12]; // 每个部分的长度
  let uuid = '';
  for (let i = 0; i < sections.length; i++) {
    for (let j = 0; j < sections[i]; j++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uuid += characters.charAt(randomIndex);
    }
    if (i < sections.length - 1) {
      uuid += '-';
    }
  }
  return uuid;
}
//随寄生成五个小写字母
function generateRandom() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    result += letters.charAt(randomIndex);
  }
  return result;
}
const geturl = () =>{
  return 'http://clouddoctor/' +generateRandom()
}

const become = () =>{
  form.secret = generateRandomKey();
}

const confirmEdit = () => {
  // console.log(form)
  // console.log(form.status)
  fixData.value.unshift({
    id: form.id,
    secret: form.secret,
    url: geturl(),
    endtime:generateRandomTime(),
    firstTime: form.firstTime,
    lastTime:form.lastTime,
    status:Number(form.status)
  })
  dialogVisible.value = false;
  
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

//复制链接
const copyURL = (url) =>{
  var input = document.createElement("input"); // 创建input对象
  input.value = url; // 设置复制内容
  document.body.appendChild(input); // 添加临时实例
  input.select(); // 选择实例内容
  document.execCommand("Copy"); // 执行复制
  document.body.removeChild(input); // 删除临时实例
  ElMessage({
    message: '复制成功',
    type: 'success',
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
  height: 100vh;
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
