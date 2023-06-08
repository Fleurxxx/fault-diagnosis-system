<template>
  <el-table-v2
    fixed
    :columns="fixedColumns"
    :data="data"
    :width="1200"
    :height="600"
  >
  <!-- <template #overlay>
      <div
        class="el-loading-mask"
        style="display: flex; align-items: center; justify-content: center"
      >
        <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
          <loading-icon />
        </el-icon>
      </div>
    </template> -->
  </el-table-v2>
</template>

<script>
import { Loading as LoadingIcon } from '@element-plus/icons-vue'
import { ref, h } from 'vue';
import {
  ElButton,
  ElCheckbox,
  ElIcon,
  ElPopover,
  TableV2FixedDir,
} from 'element-plus';
import { Filter } from '@element-plus/icons-vue';
import { column } from 'element-plus/es/components/table-v2/src/common';

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
      return rowData;
    }, {
      id: `${prefix}${rowIndex}`,
      parentId: null,
    });
  });
};

 console.log(generateColumns(20))
 console.log(typeof generateColumns(20))
 console.log(generateData(generateColumns(20), 1000))
export default {
  setup() {
    const columns = generateColumns(20);
    const data = ref(generateData(columns, 1000));

    const shouldFilter = ref(false);
    const popoverRef = ref();

    //按钮
    const onFilter = () => {
      // console.log(data)
      // console.log(columns)
      popoverRef.value.hide();
      if (shouldFilter.value) {
        data.value = generateData(columns, 100, 'filtered-');
      } else {
        data.value = generateData(columns, 200);
      }
    };

    //按钮
    const onReset = () => {
      shouldFilter.value = false;
      console.log(fixedColumns)
      onFilter();

    };

    // 定义表头的headerCellRenderer方法 （表头第一个按钮
    columns[0].headerCellRenderer = (props) => {
      return (
        h('div', { class: 'flex items-center justify-center' }, [
          h('span', { class: 'mr-2 text-xs' }, props.column.title),
          h(ElPopover, { ref: popoverRef, trigger: 'click', width: '200' }, {
            // popover的内容
            default: () => [
              h('div', { class: 'filter-wrapper' }, [
                h('div', { class: 'filter-group' }, [
                  // 使用ElCheckbox来实现过滤功能
                  h(ElCheckbox, { modelValue: shouldFilter.value, 'onUpdate:modelValue': (value) => shouldFilter.value = value }, 'Filter Text')
                ]),
                h('div', { class: 'el-table-v2__demo-filter' }, [
                  // 确认按钮
                  h(ElButton, { text: true, onClick: onFilter }, 'Confirm'),
                  // 重置按钮
                  h(ElButton, { text: true, onClick: onReset }, 'Reset')
                ])
              ]),
            ],
            // popover的触发器
            reference: () => [
              h(ElIcon, { class: 'cursor-pointer' }, [
                h(Filter)
              ])
            ],
          }),
        ])
      );
    };

    // 生成固定列的配置
    const fixedColumns = columns.map((column, columnIndex) => {
      // console.log(column)
      // console.log(columnIndex)
      let fixed = undefined;
      if (columnIndex < 1) fixed = TableV2FixedDir.LEFT;
      // if (columnIndex > 11) fixed = TableV2FixedDir.RIGHT;
      return { ...column, fixed, width: 100 };
    });



    return {
      fixedColumns,
      data,
    };
  },
};
</script>

<style scoped>
.el-table-v2__demo-filter {
  border-top: var(--el-border);
  margin: 12px -12px -12px;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
}
.example-showcase .el-table-v2__overlay {
  z-index: 9;
}
</style>
