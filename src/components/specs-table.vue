<template>
  <el-button @click="stringify" type="success" style="margin-bottom: 20px">复制数据</el-button>
  <div>
    <el-button @click="addRow">添加行</el-button>
<!--    <el-button @click="addColumn">添加列</el-button>-->
  </div>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" :label="item===1 ? '标题' :`值`" width="180"
                       v-for="item in tableInfo.column">
        <template #default="scope">
          <el-input v-model="scope.row[`title`]" placeholder="请输入对比标题" v-if="item===1"></el-input>
          <el-input v-model="scope.row.value" placeholder="请输入内容" v-else></el-input>
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

const tableData = [
  {
    title: "",
    value: []
  }
]
export default {
  name: 'specs-table',
  data() {
    return {
      title: '',
      tableData,
      tableInfo: {
        row: 1,
        column: 2
      },

    }
  },
  methods: {
    addRow() {
      this.tableData.push({
        title: "",
        value: ""
      })
    },
    addColumn() {
      this.tableInfo.column++
    },
    deleteRow(index) {
      this.tableData.splice(index, 1)
    },
    stringify() {
      const result = this.tableData.map(item => {
        return `<tr><td><b>${item.title}</b></td><td>${item.value}</td></tr>`
          })
      const html = `<table class="ug-product-specs">
${result.join('\n')}
</table>`
copy(html)
    }
  }
}
</script>