<template>
  <div class="container">
    <el-form :form="form">
      <el-form-item label="游戏作者">
        <el-radio-group v-model="form.use_auth">
          <el-radio label="1">作者</el-radio>
          <el-radio label="2">公会</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCreate">生成</el-button>
      </el-form-item>
    </el-form>
    <el-scrollbar max-height="400px">
      <p class="code" v-for="(item, index) in codes" :key="index">
        {{ item }}
      </p>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Invitation'
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import { createCode } from '../../api/invitation'
const form = ref<{
  use_auth: string
}>({
  use_auth: '1'
})

const codes = ref<string[]>([])
async function onCreate() {
  const res = await createCode({ use_auth: form.value.use_auth })
  codes.value.push(res.data.code)
}
</script>

<style lang="less" scoped>
.container {
  margin: 50px 0 0 150px;
}
.code {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: skyblue;
  color: rgb(99, 98, 98);
}
</style>
