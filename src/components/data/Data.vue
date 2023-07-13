<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-07-02 10:25:04
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-13 20:42:43
 * @FilePath: \maintenance\src\components\data\Data.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="data-box">
    <div class="line">
      <span class="fa fa-bar-chart title title_logo"></span>
      <MassData style="width:95%"/>
    </div>
    <div class="table">
      <span class="fa fa-table title">&nbsp;&nbsp;数据详情</span>
      <el-table-v2
        fixed
        :columns="columns"
        :data="tableData"
        :width="900"
        :height="550"
      />
    </div>

  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import Papa from 'papaparse';
import MassData from '../../components/chart/MassData.vue';
import { TableV2FixedDir, TableV2SortOrder } from 'element-plus'

export default {
  components: { MassData },
  setup() {
    const columns = ref([]);
    const tableData = ref([]);

    onBeforeMount(() => {
      loadCSVData();
    });

    const loadCSVData = () => {
      const csvFilePath = 'src/assets/preprocess_train.csv'; // 请替换为实际的CSV文件路径

      axios
        .get(csvFilePath)
        .then(response => {
          const csvData = response.data;
          parseCSV(csvData);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    const parseCSV = csvData => {
      Papa.parse(csvData, {
        complete: results => {
          if (results && results.data) {
            const [header, ...rows] = results.data;
            columns.value = header.map((column, index) => ({
              key: `column-${index}`,
              dataKey: `column-${index}`,
              title: column,
              width: 150,
            }));
            tableData.value = rows.map((row, rowIndex) =>
              row.reduce(
                (rowData, column, columnIndex) => ({
                  ...rowData,
                  [`column-${columnIndex}`]: column,
                }),
                { id: `row-${rowIndex}`, parentId: null }
              )
            );
            columns.value[0].fixed = true;
            columns.value[108].fixed = TableV2FixedDir.RIGHT;
          }
        },
      });
    };

    return {
      columns,
      tableData,
    };
  },
};
</script>

<style scoped lang="less">

.line{
  padding-top: 20px;
  padding-bottom: 40px;
}
.title{
  font-size: 18px;
  font-weight: bolder;
  padding-left: 5px;
  padding-bottom: 20px;
}
.title_logo{
  position: relative;
  top: 41px;
  left: -5px;
}
</style>
