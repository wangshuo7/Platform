<template>
  <session>
    <HModel>
      <template #head>
        <span style="font-weight: bolder">{{ $t('menu.withdraw') }}</span>
      </template>
      <template #body>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          :loading="loading"
          border
        >
          <el-table-column label="ID">
            <template #default="{ row }">{{ row.id }}</template>
          </el-table-column>
          <el-table-column :label="$t('table.source')">
            <template #default="{ row }">{{
              row.table === 'user_zhubo'
                ? $t('table.anchor')
                : $t('table.guild')
            }}</template>
          </el-table-column>
          <el-table-column :label="$t('table.nickname')">
            <template #default="{ row }">{{ row.tx_username }}</template>
          </el-table-column>
          <el-table-column :label="$t('table.phoneNumber')">
            <template #default="{ row }">{{ row.tx_mobile }}</template>
          </el-table-column>
          <el-table-column :label="$t('table.withdrawalAccount')">
            <template #default="{ row }">{{ row.tx_card }}</template>
          </el-table-column>
          <el-table-column :label="$t('table.price')">
            <template #default="{ row }">{{ row.price }}</template>
          </el-table-column>
          <el-table-column :label="$t('table.status')">
            <template #default="{ row }">{{
              row.status == 1
                ? $t('table.audit')
                : row.status == 2
                ? $t('table.pass')
                : $t('table.refuse')
            }}</template>
          </el-table-column>
          <el-table-column :label="$t('table.remark')">
            <template #default="{ row }">{{ row.remark }}</template>
          </el-table-column>
          <el-table-column :label="$t('table.ctime')">
            <template #default="{ row }">{{ formatTime(row.ctime) }}</template>
          </el-table-column>
          <el-table-column :label="$t('table.operate')">
            <template #default="{ row }">
              <el-button
                v-if="row.status == 1"
                @click="auditPrice(row)"
                type="success"
                >{{ $t('button.examine') }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template #foot>
        <div class="pagination">
          <el-pagination
            background
            layout="total,prev, pager, next"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="totalItems"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </template>
    </HModel>
  </session>
  <el-dialog v-model="dialogVisible" :title="$t('table.examine')" width="30%">
    <div>
      <el-form :model="form" label-width="80px">
        <el-form-item>
          <el-radio-group v-model="form.status">
            <el-radio label="2">{{ $t('table.pass') }}</el-radio>
            <el-radio label="3">{{ $t('table.refuse') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('table.remark')">
          <el-input v-model="form.remark" type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">{{
          $t('button.cancel')
        }}</el-button>
        <el-button type="primary" @click="confirmExamine">{{
          $t('button.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default {
  name: 'Withdraw'
}
</script>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { getWithdrawList, auditWithdraw } from '../../api/withdraw'
import Moment from 'moment'
import HModel from '../../components/HModel/index.vue'
import { ElMessage } from 'element-plus'
import { withdrawList } from '../../type/withdraw'
const tableData = ref<withdrawList>()
const dialogVisible = ref<boolean>()
const auditId = ref<number>() // 编辑时所用id
const loading = ref<boolean>(false)
// 分页相关
const currentPage = ref<number>(1) // 当前页
const pageSize = ref<number>(10) // 每页显示条数
const totalItems = ref<number>(0) // 总数据条数

// 当每页显示条数发生变化时触发
function handleSizeChange(newSize: number) {
  pageSize.value = newSize
  currentPage.value = 1 // 切换每页显示条数时，重置到第一页
  query()
}

// 当页码发生变化时触发
function handleCurrentChange(newPage: number) {
  currentPage.value = newPage
  query()
}

// 添加表单
let form = ref<{
  status: string
  remark: string
}>({
  status: '2',
  remark: ''
})
// 审核
function auditPrice(row: withdrawList) {
  dialogVisible.value = true
  auditId.value = row.id
}
// 弹出框确定
async function confirmExamine() {
  const res: any = await auditWithdraw({
    id: auditId.value,
    status: form.value.status,
    remark: form.value.remark
  })
  if (res?.code === 200) {
    ElMessage.success('审核成功')
    dialogVisible.value = false
    query()
  }
}
// 查询
async function query() {
  try {
    loading.value = true
    const response = await getWithdrawList({
      page: currentPage.value
    })
    tableData.value = response?.data?.list
    totalItems.value = response?.data?.count
    loading.value = false
  } catch (error) {
    console.error('Error fetching data: ', error)
  }
}

watch(dialogVisible, () => {
  form.value = {
    status: '2',
    remark: ''
  }
})
// 获取列表
onMounted(() => {
  query()
})

// 时间格式化
function formatTime(time: number) {
  return time ? Moment(time * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 500px;
  background-color: rgb(214, 211, 211);
  padding: 10px;
}
.pagination {
  margin-top: 20px;
  margin-right: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
