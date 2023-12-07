<template>
  <session>
    <div class="query">
      <el-form
        :form="queryForm"
        label-width="50px"
        @submit.prevent
        :loading="loading"
        inline
      >
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
  </session>
  <session>
    <HModel>
      <template #head>
        <span style="font-weight: bolder">{{ $t('menu.category') }}</span>
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
            <template #default="{ row }">{{ row.game_cate_id }}</template>
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
              <el-button @click="editCate(row)" type="success">{{
                $t('button.edit')
              }}</el-button>
              <el-button @click="delCate(row)" type="danger">{{
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
    :title="operation === '添加' ? $t('button.add') : $t('button.edit')"
    width="30%"
  >
    <div>
      <el-form
        :rules="rules"
        ref="ruleFormRef"
        :model="form"
        label-width="80px"
      >
        <el-form-item prop="title" :label="$t('table.title')">
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
        <el-button type="primary" @click="confirmCate">{{
          $t('button.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default {
  name: 'Category'
}
</script>
<script lang="ts" setup>
import { ref, onMounted, watch, reactive } from 'vue'
import {
  getCategoryList,
  addCategory,
  editCategory,
  delCategory
} from '../../api/category'
import Moment from 'moment'
import HModel from '../../components/HModel/index.vue'
import { ElMessage, FormInstance } from 'element-plus'
import { categoryList } from '../../type/category'

const queryForm = ref<any>({
  title: ''
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<any>({
  title: [
    {
      required: true,
      message: '标题不能为空'
    },
    {
      min: 2,
      message: '标题至少两个字符'
    }
  ]
})
const tableData = ref<categoryList[]>()
const dialogVisible = ref<boolean>()
const operation = ref<string>('') // 操作 add \ edit
const editId = ref<number>() // 编辑时所用id
const loading = ref<boolean>(false) // 表格加载

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
function editCate(row: categoryList) {
  operation.value = '编辑'
  setTimeout(() => {
    form.value.title = row?.title
    form.value.remark = row?.remark
  }, 50)
  dialogVisible.value = true
  editId.value = row.game_cate_id
}
// 弹出框确定
function confirmCate() {
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      if (operation.value == '添加') {
        const res: any = await addCategory({
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
        const res: any = await editCategory({
          id: editId.value,
          title: form.value.title,
          remark: form.value.remark
        })
        if (res.code === 200) {
          dialogVisible.value = false
          ElMessage.success('编辑成功')
          query()
        }
      }
    } else {
      //
    }
  })
}
// 删除
async function delCate(row: categoryList) {
  const res: any = await delCategory({ ids: [row.game_cate_id] })
  if (res.code === 200) {
    ElMessage.success('删除成功')
    query()
  }
}
// 查询
async function query() {
  try {
    loading.value = true
    const response = await getCategoryList({
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
  ruleFormRef.value?.clearValidate('title')
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
  .el-input {
    width: 250px;
  }
}
</style>
