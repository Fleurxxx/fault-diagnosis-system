<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-02 08:14:33
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-07 10:59:57
 * @FilePath: \maintenance\src\components\Files.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
      <div>
          <Card>
              <Upload
                  multiple
                  type="drag"
                  action=""
                 :before-upload="beforeUpload">
                  <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>Click or drag files here to upload</p>
                  </div>
              </Upload>
              <!-- <Upload action="" :before-upload="beforeUpload">
                  <Button icon="ios-cloud-upload-outline">上传Csv文件</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;点击上传Csv文件
              </Upload> -->
              <!-- <p>util.js提供两个方法用来实现这个功能：</p>
              <p class="update-table-intro"><Icon style="margin-right: 10px;" :size="10" type="md-heart"/><span class="code-high-line">getArrayFromFile</span>：将Csv文件解析为二维数组</p>
              <p class="update-table-intro"><Icon style="margin-right: 10px;" :size="10" type="md-heart"/><span class="code-high-line">getTableDataFromArray</span>：将二维数组转为表格数据，具体请看文档</p> -->
          </Card>
      </div>
  </div>
  <div class="table">
    <el-table-v2
      fixed
      :columns="columns"
      :data="tableData"
      :width="1135"
      :height="500"
    />
      <!-- <Table :height="500" :columns="columns" :data="tableData"/> -->
  </div>
</template>


<script>
import { getArrayFromFile, getTableDataFromArray } from '../../utils/util'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed,h } from 'vue';
import  {Message} from 'view-ui-plus'
import { ElMessageBox,ElMessage,ElNotification } from 'element-plus';
import api from "../../api/api";
import { localGet } from '../../api/index'
import axios from 'axios'
import {
ElButton,
ElCheckbox,
ElIcon,
ElPopover,
TableV2FixedDir,
} from 'element-plus';
import { Filter } from '@element-plus/icons-vue';
import apiFun from '../../api/api';
import Files from '../../components/updata/Files.vue'
import Hand from '../../components/updata/Hand.vue'

const generateColumns = (length = 40, prefix = 'column-', props = {}) => {
return Array.from({ length }).map((_, columnIndex) => ({
 ...props,
 key: `${prefix}${columnIndex}`,
 dataKey: `${prefix}${columnIndex}`,
 title: `Column ${columnIndex}`,
 width: 150,
}));
};

const generateData = (columns, length = 200, prefix = 'row-') => {
return Array.from({ length }).map((_, rowIndex) => {
 return columns.reduce((rowData, column, columnIndex) => {
   rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
  //  console.log(column.dataKey)
   return rowData;
 }, {
   id: `${prefix}${rowIndex}`,
   parentId: null,
 });
});
};

export default {
setup(props,content) {

  let columns = ref([]);
  let tableData = ref([]);
  let beforeUpload = (file) => {
    getArrayFromFile(file).then(data => {
      let { columns: newColumns, tableData: newTableData } = getTableDataFromArray(data)
      columns.value = newColumns;
      tableData.value = newTableData;
      // tableData.value = generateData(newColumns, 10000);
      columns.value[0].fixed = true
      // console.log(columns.value)
      // console.log(newTableData)
      // console.log(tableData)
    }).catch(() => {
      ElNotification({
          title: '只能上传Csv文件',
          message: '只能上传Csv文件，请重新上传',
          type: 'warning',
        })
      // this.$Notice.warning({
      //   title: '只能上传Csv文件',
      //   desc: '只能上传Csv文件，请重新上传'
      // })
    })

    // let myfile = dataURLtoFile(file, 'hhh.csv')
    // console.log(myfile)
    console.log(file)
    let formData = new FormData();
    formData.append('uploadFile',file);

    //上传文件
    let config = {
      baseURL: 'http://192.168.50.35:8080/', //后端开发环境地址(部署后端到本机后只需修改此地址)
      timeout: 50000    //设置最大请求时间
    }
    const _axios = axios.create(config);
    _axios.post('/file/upload', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": localGet('token'),
      },
    }).then((res) => {
      console.log(res)
      if(res.data.code===200){
        let param = {
          fileName: res.data.data.fileName,
          size: res.data.data.size,
          url: res.data.data.url
        }
        childData(param)
      }else{
        ElMessage.error(res.data.message)
      }
    }).catch((err) => {
      console.log(err);
    })
 }

  function childData(param){
    console.log(param)
    content.emit('fileInfo',param)
  }

 const  dataURLtoFile = (dataurl, name) => {
   var arr = dataurl.split(","),
   mime = arr[0].match(/:(.*?);/)[1],
   bstr = atob(arr[1]),
   n = bstr.length,
   u8arr = new Uint8Array(n);
   while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
   }
   return new File([u8arr], name, {
         type: mime
    });
  }



 return {
   beforeUpload,
   columns,
   tableData,
   childData
 };
},
};
</script>


<style scoped lang='less'>
.update-table-intro{
margin-top: 10px;
}
.code-high-line{
color: #2d8cf0;
}
.table{
border: 1px solid rgba(227, 220, 220, 0.6);
margin-top: 25px;
}
/deep/ .el-table-v2__header-cell {
background-color: #eff3f8;
}
</style>
