<template>
  <div >
    <el-table
      size="small"
      stripe
      style="width: 100%"
      class="table_info"
      v-loading="loading"
      :data="tableData"
      :summary-method="getSummaries"
      show-summary>
      <el-table-column
        label="标题"
        prop="Title"
        min-width="2">
      </el-table-column>
      <el-table-column
        label="数量A"
        prop="Num1"
        min-width="2">
      </el-table-column>
      <el-table-column
        label="数量B"
        prop="Num2"
        min-width="2">
      </el-table-column>
      <el-table-column
        label="数量C"
        prop="Num3"
        min-width="2">
      </el-table-column>
      <el-table-column
        label="数量D"
        prop="Num4"
        min-width="2">
      </el-table-column>
      <el-table-column
        label="操作"
        width="300">
        <template >
          <div style="line-height: 1; font-size: 0;">
            <el-button size="mini" @click="look">查看</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
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
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const data = reactive({})

// 合计行设置
const showSummariesPosition = () => {
  // 合计行显示在表头
  const table = document.querySelector('.el-table');
  const footer = document.querySelector('.el-table__footer-wrapper');
  const body = document.querySelector('.el-table__body-wrapper');
  table.removeChild(footer);
  table.insertBefore(footer, body);

  // 在合计行的最后一列添加按钮
  const html = table.querySelectorAll('td')[5].querySelector('.cell');
  html.innerHTML = "<el-button size='mini' style='padding: 7px 15px;font-size:12px;border-radius:3px;display: inline-block;display: inline-block;line-height: 1;white-space: nowrap;cursor: pointer;background: #fff;border: 1px solid #dcdfe6;color: #606266;-webkit-appearance: none;text-align: center;box-sizing: border-box;outline: 0;margin: 0;transition: .1s;font-weight: 500;'>查看</el-button>";
  html.onclick = toAllDetails;
};

const tableData = [{
        Title: '2016-05-02',
        Num1: '8',
        Num2: '15',
        Num3: '10',
        Num4: '9',
        address: '10'
    }, {
        Title: '2016-05-04',
        Num1: '8',
        Num2: '15',
        Num3: '10',
        Num4: '9',
        address: '10'
    }, {
        Title: '2016-05-01',
        Num1: '8',
        Num2: '15',
        Num3: '10',
        Num4: '9',
        address: '10'
    }, {
        Title: '2016-05-03',
        Num1: '8',
        Num2: '15',
        Num3: '10',
        Num4: '9',
        address: '10'
    }
]
const getSummaries = ({columns, data}) => {
    let sums = ['合计', '', 35]
    return sums
}
const look = () => {

}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  nextTick(() => {
    showSummariesPosition();
  });
});
watchEffect(()=>{
})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='less'>
</style>
