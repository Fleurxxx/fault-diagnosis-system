<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-02 08:14:33
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-06-09 01:52:12
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
import { ref, h } from 'vue';
import {
 ElButton,
 ElCheckbox,
 ElIcon,
 ElPopover,
 TableV2FixedDir,
} from 'element-plus';
import { Filter } from '@element-plus/icons-vue';

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
 setup() {

    let columns = ref([]);
    let tableData = ref([]);
    let beforeUpload =(file)=> {
      getArrayFromFile(file).then(data => {
        let { columns: newColumns, tableData: newTableData } = getTableDataFromArray(data)
        columns.value = newColumns;
        tableData.value = newTableData;
        // tableData.value = generateData(newColumns, 10000);
        columns.value[0].fixed = true
        console.log(columns.value)
        console.log(newTableData)
        console.log(tableData)


      }).catch(() => {
        // this.$Notice.warning({
        //   title: '只能上传Csv文件',
        //   desc: '只能上传Csv文件，请重新上传'
        // })
      })
      return false
   }


   return {
     beforeUpload,
     columns,
     tableData,
   };
 },
};
</script>


  <style>
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
  </style>
