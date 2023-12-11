<template>
  <session>
    <HModel>
      <template #head>
        <span style="font-weight: bolder">{{ $t('menu.payment') }}</span>
        <div>
          <el-button type="primary" @click="onGenerate">{{
            $t('button.generate')
          }}</el-button>
        </div>
      </template>
      <template #body>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%; height: 800px"
          :loading="loading"
          border
        >
          <el-table-column label="ID">
            <template #default="{ row }">{{ row.id }}</template>
          </el-table-column>
          <el-table-column :label="$t('table.price')">
            <template #default="{ row }">{{ row.price }}</template>
          </el-table-column>
          <el-table-column :label="$t('table.ctime')">
            <template #default="{ row }">{{ formatTime(row.ctime) }}</template>
          </el-table-column>
          <el-table-column label="code">
            <template #default="{ row }">{{ row.code }}</template>
          </el-table-column>
          <el-table-column :label="$t('table.operate')">
            <template #default="{ row }">
              <el-button @click="copyCode(row.code)">复制</el-button>
              <el-button @click="setPrice(row)" type="success">{{
                $t('button.set')
              }}</el-button>
              <el-button @click="delPaymentCard(row)" type="danger">{{
                $t('button.del')
              }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template #foot>
        <div class="pagination">
          <el-pagination
            background
            layout="total,prev, pager, next, sizes"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :page-sizes="[10, 20, 30]"
            :total="totalItems"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </template>
    </HModel>
  </session>
  <el-dialog
    v-model="dialogVisible"
    :title="operation === '生成' ? $t('button.generate') : $t('button.set')"
    width="30%"
  >
    <div>
      <el-form :model="form" label-width="80px">
        <el-form-item :label="$t('table.price')">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.num')" v-if="operation === '生成'">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">{{
          $t('button.cancel')
        }}</el-button>
        <el-button type="primary" @click="confirmPrice">{{
          $t('button.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default {
  name: 'Payment'
}
</script>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import {
  getPaymentList,
  delPayment,
  setPayment,
  createKey
} from '../../api/payment'
import Moment from 'moment'
import HModel from '../../components/HModel/index.vue'
import { ElMessage } from 'element-plus'
import { paymentList } from '../../type/payment'
const tableData = ref<paymentList>()
const dialogVisible = ref<boolean>()
const operation = ref<string>('') // 操作 add \ edit
const cardId = ref<number>() // 编辑时所用id
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
  price: string
  num: string
}>({
  price: '',
  num: ''
})
// 生成
function onGenerate() {
  operation.value = '生成'
  dialogVisible.value = true
}
// 编辑
function setPrice(row: paymentList) {
  operation.value = '设置'
  dialogVisible.value = true
  cardId.value = row.id
}
// 弹出框确定
async function confirmPrice() {
  if (operation.value == '生成') {
    const res: any = await createKey({
      price: form.value.price,
      num: form.value.num
    })
    if (res.code === 200) {
      ElMessage.success('生成成功')
      dialogVisible.value = false
      currentPage.value = 1
      query()
    }
  } else {
    const res: any = await setPayment({
      ids: [cardId.value],
      price: form.value.price
    })
    if (res.code === 200) {
      ElMessage.success('设置成功')
      dialogVisible.value = false
      query()
    }
  }
}
// 删除
async function delPaymentCard(row: paymentList) {
  const res: any = await delPayment({ ids: [row.id] })
  if (res.code === 200) {
    ElMessage.success('删除成功')
    query()
  }
}
// 查询
async function query() {
  try {
    loading.value = true
    const response = await getPaymentList({
      page: currentPage.value,
      page_size: pageSize.value,
      code: ''
    })
    tableData.value = response?.data?.list
    totalItems.value = response?.data?.count
    loading.value = false
  } catch (error) {
    console.error('Error fetching data: ', error)
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
watch(dialogVisible, () => {
  form.value = {
    price: '',
    num: ''
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
