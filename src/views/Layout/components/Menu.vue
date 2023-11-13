<template>
  <div class="left">
    <div class="logo">
      <img class="logo-img" src="@/assets/huLogo1.jpg" alt="" />
    </div>
    <div>
      <el-menu :default-active="getActiveMenu(route.path)" class="el-menu-vertical-demo" router>
        <el-menu-item index="/language">
          <el-icon><Orange /></el-icon>
          <template #title>{{ $t('language') }}</template>
        </el-menu-item>
        <el-menu-item index="/category">
          <el-icon><icon-menu /></el-icon>
          <template #title>{{ $t('category') }}</template>
        </el-menu-item>
        <el-menu-item index="/platform">
          <el-icon><SwitchFilled /></el-icon>
          <template #title>{{ $t('platform') }}</template>
        </el-menu-item>
        <el-menu-item index="/invitation">
          <el-icon><Key /></el-icon>
          <template #title>{{ $t('invitation') }}</template>
        </el-menu-item>
        <el-menu-item index="/payment">
          <el-icon><Iphone /></el-icon>
          <template #title>{{ $t('payment') }}</template>
        </el-menu-item>
        <el-menu-item index="/withdraw">
          <el-icon><CreditCard /></el-icon>
          <template #title>{{ $t('withdraw') }}</template>
        </el-menu-item>
        <el-menu-item index="/setting">
          <el-icon><setting /></el-icon>
          <template #title>{{ $t('setting') }}</template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  SwitchFilled,
  Menu as IconMenu,
  Orange,
  Setting,
  CreditCard,
  Iphone,
  Key
} from '@element-plus/icons-vue'
import {useRoute} from 'vue-router'
const route = useRoute()
const getActiveMenu = (path:string) => {
  return path;
}
</script>
<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
  height: 100%;
  border-right: 2px solid #dcdfe6;
}
.left {
  width: 100%;
  height: 100%;
  border-right: 2px solid #dcdfe6;
  display: flex;
  flex-direction: column;
  .logo {
    height: 70px;
    background-color: orange;
    border-bottom: 1px solid skyblue;
    .logo-img {
      display: block;
      width: 35%;
      overflow: hidden;
      margin: 0 auto;
    }
  }
}
:deep(.el-menu) {
  border: none;
}
</style>
