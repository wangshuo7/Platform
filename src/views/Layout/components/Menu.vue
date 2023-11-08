<template>
  <div class="left">
    <div class="logo">
      <img class="logo-img" src="@/assets/huLogo1.jpg" alt="" />
    </div>
    <div>
      <el-menu default-active="1" class="el-menu-vertical-demo" router>
        <el-menu-item index="language">
          <el-icon><Orange /></el-icon>
          <template #title>{{ $t('menu.lang') }}</template>
        </el-menu-item>
        <el-menu-item index="category">
          <el-icon><icon-menu /></el-icon>
          <template #title>{{ $t('menu.category') }}</template>
        </el-menu-item>
        <el-menu-item index="platform">
          <el-icon><SwitchFilled /></el-icon>
          <template #title>{{ $t('menu.platform') }}</template>
        </el-menu-item>
        <el-menu-item index="invitation">
          <el-icon><Key /></el-icon>
          <template #title>{{ $t('menu.invitation') }}</template>
        </el-menu-item>
        <el-menu-item index="payment">
          <el-icon><Iphone /></el-icon>
          <template #title>{{ $t('menu.payment') }}</template>
        </el-menu-item>
        <el-menu-item index="withdraw">
          <el-icon><CreditCard /></el-icon>
          <template #title>{{ $t('menu.withdraw') }}</template>
        </el-menu-item>
        <el-menu-item index="setting">
          <el-icon><setting /></el-icon>
          <template #title>{{ $t('menu.setting') }}</template>
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
// import router from '../../../router'
// function goLanguage() {
//   router.push('/language')
// }
// function goCategory() {
//   router.push('/category')
// }
// function goPlatform() {
//   router.push('/platform')
// }
// function goInvitation() {
//   router.push('/invitation')
// }
// function goPayment() {
//   router.push('/payment')
// }
// function goWithdraw() {
//   router.push('/withdraw')
// }
// function goSetting() {
//   router.push('/setting')
// }
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
