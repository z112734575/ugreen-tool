<template>
  <el-button @click="stringify" type="success" style="margin-bottom: 20px">复制数据</el-button>
  <el-checkbox style="margin-left: 24px" @change="handleChange">是否不展示当前商品数据</el-checkbox>
  <el-input v-model="title" placeholder="请输入标题" style="margin-bottom: 20px"></el-input>
  <div>
    <el-button @click="addRow">添加行</el-button>
    <el-button @click="addColumn">添加列</el-button>
  </div>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column :label="'对比标题'" width="180">
        <template #default="scope">
          <el-input v-model="scope.row[`row_name`]" placeholder="请输入对比标题"></el-input>
        </template>
      </el-table-column>

      <el-table-column :label="`列${item}`" width="180"
                       v-for="(item,index) in columns" style="cursor: move!important;"
                       class-name="sortable-item"
                       :column-key="new Date().toDateString()">
        <template #header>
          <div style="display: flex;justify-content: space-between">
            <div>列{{ item + 1 }}</div>
            <div style="width: 24px;height: 24px;border-radius: 50%; border: 1px solid black;display: flex;justify-content: center;align-items: center;cursor: pointer" @click="deleteColumn">X</div>
          </div>
        </template>
        <template #default="scope">
          <!--          <el-input v-model="scope.row[`row_name`]" placeholder="请输入对比标题" v-if="index===1"></el-input>-->
          <el-input v-model="scope.row.row_data[index]" :placeholder="`请输入内容${item+1}`"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button @click="deleteRow(scope.$index)" type="danger" size="small">删除行</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
import copy from 'copy-to-clipboard';
import Sortable from "sortablejs";
import {sortBy, findIndex} from 'lodash'
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'


const tableData = [
  {
    row_name: "",
    row_data: []
  }
]
const Delete2 = Delete
export default {
  name: 'diff-product',
  mounted() {
    this.columnDrop()
  },
  data() {
    return {
      columns: [0, 1],
      title: '',
      show_self: true,
      tableData,
      tableInfo: {
        row: 1,
        column: 3
      },

    }
  },
  computed: {
    tableDataJson() {
      console.log(
          {
            title: this.title,
            products_info: this.tableData
          }
      )
      return {
        show_self: this.show_self,
        title: this.title,
        products_info: this.tableData
      }
    },
  },
  methods: {
    addRow() {
      this.tableData.push({
        row_name: "",
        row_data: []
      })
    },
    addColumn() {
      this.columns.push(this.columns.length)
    },
    deleteColumn(index) {
      this.columns.splice(index, 1)
      this.tableData.forEach(item => {
        item.row_data.splice(index, 1)
      })
    },
    deleteRow(index) {
      this.tableData.splice(index, 1)
    },
    stringify() {
      const data = JSON.stringify(this.tableDataJson)
      console.log(JSON.stringify(this.tableDataJson))
      copy(data);
    },
    columnDrop() {
      const el = document.querySelector('.el-table__header-wrapper tr')
      console.log(el, 'el')
      Sortable.create(el, {
        animation: 150,
        draggable: ".sortable-item",
        onEnd: (evt) => {
          console.log(evt)
          const {newIndex, oldIndex} = evt
          const temp = this.columns[oldIndex - 1]
          // this.$set(this.columns, oldIndex-1, this.columns[newIndex-1])
          // this.$set(this.columns, newIndex-1, temp)
          this.columns[oldIndex - 1] = this.columns[newIndex - 1]
          this.columns[newIndex - 1] = temp
          console.log(this.columns, 'ri')
          this.tableData.forEach(item => {
            const temp = item.row_data[oldIndex - 1]
            item.row_data[oldIndex - 1] = item.row_data[newIndex - 1]
            item.row_data[newIndex - 1] = temp
          })
        }
      })
    },
    handleChange(value) {
      console.log('change', value)
      this.show_self = !value
    },
  }
}
</script>

<style>
.sortable-item {
  cursor: move !important;
}
</style>