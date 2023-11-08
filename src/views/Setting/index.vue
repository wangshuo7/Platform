<template>
  <div class="form-box">
    <el-form :model="form" label-width="300px">
      <el-form-item :label="$t('system.min_tx_price')">
        <el-input v-model="form.min_tx_price" />
      </el-form-item>
      <el-form-item :label="$t('system.max_tx_price')">
        <el-input v-model="form.max_tx_price" />
      </el-form-item>
      <el-form-item :label="$t('system.day')">
        <el-input v-model="form.day" min="1" max="31" />
      </el-form-item>
      <el-form-item :label="$t('system.min_zz_price')">
        <el-input v-model="form.min_zz_price" />
      </el-form-item>
      <el-form-item :label="$t('system.max_zz_price')">
        <el-input v-model="form.max_zz_price" />
      </el-form-item>
      <el-form-item :label="$t('system.lw_choucheng')">
        <el-input v-model="form.lw_choucheng" />
      </el-form-item>
      <el-form-item :label="$t('system.game_choucheng_pt')">
        <el-input v-model="form.game_choucheng_pt" />
      </el-form-item>
      <el-form-item :label="$t('system.game_choucheng_gh')">
        <el-input v-model="form.game_choucheng_gh" />
      </el-form-item>
      <el-form-item :label="$t('system.zhibo_deldou')">
        <el-input v-model="form.zhibo_deldou" />
      </el-form-item>
      <el-form-item>
        <el-button style="margin-right: 50px" type="primary" @click="onSave">{{
          $t('button.save')
        }}</el-button>
        <el-button @click="onCancel">{{ $t('button.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getConfig, setConfig } from '../../api/setting'
import { ElMessage } from 'element-plus'
import { settingList } from '../../type/setting'

const form = ref<settingList>({
  min_tx_price: '',
  max_tx_price: '',
  day: '',
  min_zz_price: '',
  max_zz_price: '',
  lw_choucheng: '',
  game_choucheng_pt: '',
  game_choucheng_gh: '',
  zhibo_deldou: ''
})

// 保存
async function onSave() {
  const res: any = await setConfig({ ...form.value })
  if (res.code === 200) {
    ElMessage.success(res.msg)
    query()
  }
}
// 取消
function onCancel() {
  query()
}
// 查询
async function query() {
  try {
    const res: any = await getConfig({
      ...form.value
    })
    if (res?.code === 200) {
      form.value.min_tx_price = res?.data?.one.min_tx_price
      form.value.max_tx_price = res?.data?.one.max_tx_price
      form.value.day = res?.data?.one.day
      form.value.min_zz_price = res?.data?.one.min_zz_price
      form.value.max_zz_price = res?.data?.one.max_zz_price
      form.value.lw_choucheng = res?.data?.one.lw_choucheng
      form.value.game_choucheng_pt = res?.data?.one.game_choucheng_pt
      form.value.game_choucheng_gh = res?.data?.one.game_choucheng_gh
      form.value.zhibo_deldou = res?.data?.one.zhibo_deldou
    }
  } catch (error) {
    console.error('Error fetching data: ', error)
  }
}

onMounted(() => {
  query()
})
</script>

<style lang="less" scoped>
.form-box {
  width: 50%;
  margin-top: 50px;
  // background-color: gray;
}
:deep(.el-input-number) {
  width: 100%;
  .el-input-number__decrease,
  .el-input-number__increase {
    display: none;
  }
}
:deep(.el-input) {
  width: 350px;
}
</style>
