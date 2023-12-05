<template>
  <div class="left" :class="{ active: isCollapse }">
    <div class="logo">
      <img class="logo-img" src="/hooyoo.gif" alt="" />
      <div class="logo-title" v-if="!isCollapse">Hooyoo</div>
    </div>
    <div>
      <el-scrollbar>
        <el-menu
          text-color="#fff"
          :default-active="getActiveMenu(route.path)"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          router
        >
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
      </el-scrollbar>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import {
  SwitchFilled,
  Menu as IconMenu,
  Orange,
  Setting,
  CreditCard,
  Iphone,
  Key
} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { useCollapseStore } from '../../../store/collapse'
const collapseStore = useCollapseStore()

const route = useRoute()
const getActiveMenu = (path: string) => {
  return path
}
const isCollapse = computed(() => collapseStore.collapse)
</script>
<style lang="less" scoped>
.el-menu {
  background-color: #191a23 !important;
  border: none !important;
  .el-menu-item:hover {
    background-color: #1c2434;
  }
}
.left {
  width: 100%;
  height: 100%;
  // border-right: 2px solid #dcdfe6;
  background-color: #191a23 !important;
  display: flex;
  flex-direction: column;
  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: space-around;
    // border-bottom: 1px solid skyblue;
    .logo-img {
      display: block;
      height: 100%;
      border-radius: 50%;
    }
    .logo-title {
      color: #fff;
      font-size: 20px;
    }
  }
}

:deep(.el-menu) {
  border: none;
}
</style>
