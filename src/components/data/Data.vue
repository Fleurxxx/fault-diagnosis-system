<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-02 08:14:33
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-08 01:32:56
 * @FilePath: \maintenance\src\components\Files.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="data-box">
    <!-- <div class="data-title">
      <span class="fa fa-table">&nbsp;&nbsp;数据预览</span>
    </div> -->
    <div style="height:20px"></div>
    <el-table-v2
      fixed
      :columns="columns"
      :data="tableData"
      :width="1135"
      :height="550"
    />
  </div>
</template>


<script>
import { getArrayFromFile, getTableDataFromArray } from '../../utils/util'
import { ref, h , reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
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

  columns = generateColumns(10)
  tableData = generateData(columns, 200)
  columns[0].fixed = true
  // console.log(columns)
  // console.log(tableData)
 return {
   beforeUpload,
   columns,
   tableData,
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

.data-title{
  padding-top:30px;
  padding-bottom: 20px;
  span{
    font-size: 14px;
    // font-weight: 540;
  }
}
/deep/ .el-table-v2__header-cell {
    background-color: #eff3f8;
}
</style>
