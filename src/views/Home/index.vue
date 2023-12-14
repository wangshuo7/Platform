<template>
  <session>
    <div>欢迎</div>
  </session>
</template>

<script lang="ts">
export default {
  name: 'Home'
}
</script>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { getConfig } from '../../api/setting'
async function query() {
  await getConfig({})
}
onMounted(() => {
  query()
})
</script>

<style lang="less" scoped></style>
