<template>
  <session>
    <div class="container">
      <el-form :form="form" label-width="80px">
        <el-form-item label="游戏作者">
          <el-radio-group v-model="form.use_auth">
            <el-radio label="1">作者</el-radio>
            <el-radio label="2">公会</el-radio>
            <el-button type="primary" @click="onCreate">生成</el-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-scrollbar max-height="1000px">
        <p class="code" v-for="(item, index) in codes" :key="index">
          {{ item }}
        </p>
        <div style="display: flex">
          <div class="code-table">
            <p class="code-title">作者</p>
            <p class="code" v-for="(item, index) in author_codes" :key="index">
              <span>
                <el-tag>{{ index + 1 }}</el-tag>
              </span>
              <span>{{ item }}</span>
              <span
                ><el-button size="small" type="success" @click="copyCode(item)"
                  >复制</el-button
                ></span
              >
            </p>
          </div>
          <div class="code-table">
            <p class="code-title">工会</p>
            <p class="code" v-for="(item, index) in guid_codes" :key="index">
              <span>
                <el-tag>{{ index + 1 }}</el-tag>
              </span>
              <span>{{ item }}</span>
              <span
                ><el-button size="small" type="success" @click="copyCode(item)"
                  >复制</el-button
                ></span
              >
            </p>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </session>
</template>

<script lang="ts">
export default {
  name: 'Invitation'
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import { createCode } from '../../api/invitation'
import { ElMessage } from 'element-plus'
const form = ref<{
  use_auth: string
}>({
  use_auth: '1'
})

const codes = ref<string[]>([])
const author_codes = ref<string[]>([])
const guid_codes = ref<string[]>([])
async function onCreate() {
  const res: any = await createCode({ use_auth: form.value.use_auth })
  if (res.code == 200) {
    if (form.value.use_auth === '1') {
      author_codes.value.push(res.data.code)
      ElMessage.success('生成作者邀请码成功')
    } else {
      guid_codes.value.push(res.data.code)
      ElMessage.success('生成工会邀请码成功')
    }
  }
}

const copyCode = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // 复制成功的处理逻辑
      ElMessage.success('复制成功')
    })
    .catch((error) => {
      // 复制失败的处理逻辑
      ElMessage.error('复制失败', error)
    })
}
</script>

<style lang="less" scoped>
.code {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;
  height: 30px;
  color: rgb(99, 98, 98);
  transform: translateY(1px);
}
.code-table {
  width: 550px;
  border: 1px solid #ccc;
  min-height: 60px;
  margin-right: 30px;
}
.code-title {
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #ccc;
  color: gray;
}
</style>
