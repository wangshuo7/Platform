<template>
  <div class="layout">
    <Menu class="menu"></Menu>
    <Content class="content"></Content>
  </div>
</template>

<script lang="ts" setup>
import Menu from './components/Menu.vue'
import Content from './components/Content.vue'
</script>

<style lang="less" scoped>
.layout {
  .menu {
    width: 200px;
    min-height: 500px;
    position: fixed;
    top: 0;
    bottom: 0;
  }
  .content {
    margin-left: 200px;
  }
}
</style>
