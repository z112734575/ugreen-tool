<script setup>
import {ref, computed} from 'vue'
import copy from 'copy-to-clipboard';
import {
  Delete,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const textarea = ref('')
const formInline = ref([
  {title: '', content: ''}
])
const onSubmit = () => {
  formInline.value.push({title: '', content: ''})
}
const deleteRow = (index) => {
  console.log(index, 'index')
  formInline.value.splice(index, 1)
}
const splittData = computed(() => {
  const  liPattern = /<li>(.*?)<\/li>/g;
  const  extractedContent = [];
  let match;

  while (match = liPattern.exec(textarea.value)) {
    console.log(match[1], 'match[1]')
    extractedContent.push(match[1]);
  }
  return extractedContent
})
const splitData = () => {
  console.log(splittData.value, 'splittData')
  const splittDataValue = splittData.value
  const formInlineArray = []
  splittDataValue.map(item => {
    const data = item.split(':')
    console.log(data.length, 'ddd')
    if (data.length !== 2) {
      const title = undefined
      const content = item
      formInlineArray.push({title, content})
      return
    }
    const title = item.split(':')[0]
    const content = item.split(':')[1]
    formInlineArray.push({title, content})
  })
  console.log(formInlineArray, 'formInlineArray')
  formInline.value = formInlineArray
}

const copyData = () => {
  const data = formInline.value.map(item => `<li>${item.title ? `<strong>${item.title}</strong>` : '' }${item.content}</li>`).join('')
  const desc = `<ul>${data}</ul>`
  copy(desc)
  ElMessage({
    message: '复制成功!',
    type: 'success',
  })
}
</script>

<template>
  <el-input
      style="width: 800px;"
      v-model="textarea"
      :rows="2"
      type="textarea"
      placeholder="自动分割文本"
      clearable
  />

  <el-form :model="formInline" class="demo-form-inline" style="margin-top: 24px">
    <el-button @click="splitData" type="success">内容分割</el-button>
    <el-row :gutter="20" v-for="(item, index) in formInline">
      <el-col :span="10">
        <el-form-item label="卖点标题">
          <el-input v-model="item.title" placeholder="卖点标题" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="卖点内容">
          <el-input v-model="item.content" placeholder="卖点内容" clearable />
        </el-form-item>
      </el-col>
      <el-button type="danger" :icon="Delete" circle @click="deleteRow(index)"/>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">添加行</el-button>
    </el-form-item>
  </el-form>
  <el-button type="warning" @click="copyData">复制内容</el-button>
</template>

<style scoped>

</style>