<script setup>
import {ref, computed} from 'vue'
import {ElInput} from 'element-plus'
import copy from 'copy-to-clipboard';

const pcUrl = ref('')
const mobileUrl = ref('')
const result = computed(() => {
  const pcPngType = pcUrl.value.split('.').pop()
  const mobilePngType = mobileUrl.value.split('.').pop()
  const pcPngUrl = pcUrl.value.replace(`.${pcPngType}`, '')
  const mobilePngUrl = mobileUrl.value.replace(`.${mobilePngType}`, '')
  return `
<picture>
    <source srcset="${mobilePngUrl}_750x.${mobilePngType}"
            media="(max-width: 375px)">
    <source srcset="${mobilePngUrl}_1536x.${mobilePngType}"
            media="(max-width: 768px)">
    <source srcset="${pcPngUrl}_1920x.${pcPngType}"
            media="(max-width: 1080px)">
    <source srcset="${pcPngUrl}_2560x.${pcPngType}"
            media="(max-width: 1200px)">
    <source srcset="${pcPngUrl}_3840x.${pcPngType}"
            media="(max-width: 1920px)">
    <img src="${pcUrl.value}" alt="ugreen" />
</picture>
  `
})
</script>

<template>
  <el-input v-model="pcUrl" placeholder="请输入pc端链接" style="width: 300px"></el-input>
  <el-input v-model="mobileUrl" placeholder="请输入移动端链接" style="width: 300px"></el-input>
  <el-button type="primary" @click="evt => copy(result)">复制</el-button>
</template>

<style scoped>

</style>