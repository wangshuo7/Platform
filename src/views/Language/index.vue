<template>
  <div class="query">
    <el-form :form="queryForm" label-width="80px" @submit.prevent inline>
      <el-form-item :label="$t('table.title')">
        <el-input
          @keyup.enter="query"
          v-model="queryForm.title"
          clearable
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="margin: 0 20px" type="primary" @click="query">{{
          $t('button.query')
        }}</el-button>
        <el-button @click="onClear">{{ $t('button.clear') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
  <HModel>
    <template #head>
      <span style="font-weight: bolder">{{ $t('menu.lang') }}</span>
      <div>
        <el-button type="primary" @click="addLanguage">{{
          $t('button.add')
        }}</el-button>
      </div>
    </template>
    <template #body>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column label="ID">
          <template #default="{ row }">{{ row.game_lang_id }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.title')">
          <template #default="{ row }">{{ row.title }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.remark')">
          <template #default="{ row }">{{ row.remark }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.ctime')">
          <template #default="{ row }">{{ formatTime(row.ctime) }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.utime')">
          <template #default="{ row }">{{ formatTime(row.uptime) }}</template>
        </el-table-column>
        <el-table-column :label="$t('table.operate')">
          <template #default="{ row }">
            <el-button @click="editLanguage(row)" type="success">{{
              $t('button.edit')
            }}</el-button>
            <el-button @click="delLanguage(row)" type="danger">{{
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
  <el-dialog
    v-model="dialogVisible"
    :title="operation === '添加' ? $t('button.add') : $t('button.edit')"
    width="30%"
  >
    <div>
      <el-form :model="form" label-width="80px">
        <el-form-item :label="$t('table.title')">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.remark')">
          <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">{{
          $t('button.cancel')
        }}</el-button>
        <el-button type="primary" @click="confirmLang">{{
          $t('button.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { getLangList, addLang, editLang, delLang } from '../../api/language'
import { langList } from '../../type/language'
import Moment from 'moment'
import HModel from '../../components/HModel/index.vue'
import { ElMessage } from 'element-plus'
const queryForm = ref<any>({
  title: ''
})
const tableData = ref<langList[]>()
const dialogVisible = ref<boolean>()
const operation = ref<string>('') // 操作 add \ edit
const editId = ref<number>() // 编辑时所用id
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
const form = ref<{
  title: string
  remark: string
}>({
  title: '',
  remark: ''
})
// 添加
function addLanguage() {
  operation.value = '添加'
  dialogVisible.value = true
}
// 编辑
function editLanguage(row: langList) {
  operation.value = '编辑'
  setTimeout(() => {
    form.value.title = row.title
    form.value.remark = row.remark
  }, 50)
  dialogVisible.value = true
  editId.value = row.game_lang_id
}
// 弹出框确定
async function confirmLang() {
  if (operation.value == '添加') {
    const res: any = await addLang({
      title: form.value.title,
      remark: form.value.remark
    })
    if (res.code === 200) {
      ElMessage.success('添加成功')
      dialogVisible.value = false
      currentPage.value = 1
      query()
    }
  } else {
    const res: any = await editLang({
      id: editId.value,
      title: form.value.title,
      remark: form.value.remark
    })
    if (res.code === 200) {
      ElMessage.success('编辑成功')
      dialogVisible.value = false
      query()
    }
  }
}
// 删除
async function delLanguage(row: langList) {
  const res: any = await delLang({ ids: [row.game_lang_id] })
  if (res.code === 200) {
    ElMessage.success('删除成功')
    query()
  }
}
// 查询
async function query() {
  try {
    loading.value = true
    const response = await getLangList({
      page: currentPage.value,
      page_size: pageSize.value,
      title: queryForm.value.title
    })
    tableData.value = response?.data?.list
    totalItems.value = response?.data?.count
    loading.value = false
  } catch (error) {
    console.error('Error fetching data: ', error)
  }
}
// 清空
function onClear() {
  queryForm.value = {}
}
watch(dialogVisible, () => {
  form.value = {
    title: '',
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
.query {
  margin-top: 40px;
  .el-input {
    width: 250px;
  }
}
</style>
