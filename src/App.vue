<template>
  <div style="position: fixed; top: 20%; font-size: 24px;">
    <router-link to="/" active-class="active">diff-product-json</router-link>
    <router-link to="/specs" style="margin-left: 24px" active-class="active">Specs</router-link>
  </div>
  <router-view></router-view>
</template>

<style scoped>
.active {
  color: #2c3e50;
}
</style>