import { defineComponent, ref, reactive, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { queryAttendanceRecordsApi } from '@/api'
import { getTodayTimeRange } from '@/utils'
import type { AttendanceRecord } from '../../../types'
import { datePickerShortcuts, datePickerDefaultTime, datePickerFormat } from '../../../components/fast-calendar'
import Repost from './repost'
import styles from '../styles/attendance-query.module.scss'

export default defineComponent({
  name: 'AttendanceQuery',
  setup() {
    // localStorage 键名
    const STORAGE_KEY = 'attendance-query-form'
    
    // 表单数据
    const form = reactive({
      token: '',
      personName: '',
      timeRange: getTodayTimeRange(),
    })

    // 状态管理
    const loading = ref(false)
    const records = ref<AttendanceRecord[]>([])
    const repostVisible = ref(false)
    const selectedRecord = ref<AttendanceRecord | null>(null)
    
    // 分页状态
    const currentPage = ref(1)
    const pageSize = ref(10)
    const total = ref(0)

    // 查询考勤记录
    const handleQuery = async (page = 1) => {
      if (!form.token || !form.personName) {
        ElMessage.warning('请填写Token和姓名')
        return
      }

      loading.value = true
      try {
        const timeRange = form.timeRange || getTodayTimeRange()
        const response = await queryAttendanceRecordsApi(form.token, form.personName, timeRange)
        
        if (response.success && response.data) {
          records.value = response.data
          total.value = response.data.length
          currentPage.value = page
          ElMessage.success(`查询成功，共找到 ${response.data.length} 条记录`)
        } else {
          ElMessage.error(response.msg || '查询失败')
        }
      } catch (error) {
        console.error('查询失败:', error)
        ElMessage.error('查询失败，请检查网络连接')
      } finally {
        loading.value = false
      }
    }

    // 分页变化处理
    const handlePageChange = (page: number) => {
      currentPage.value = page
      handleQuery(page)
    }

    // 每页大小变化处理
    const handleSizeChange = (size: number) => {
      pageSize.value = size
      currentPage.value = 1
      handleQuery(1)
    }

    // 打开修改时间弹窗
    const handleRepost = (record: AttendanceRecord) => {
      selectedRecord.value = record
      repostVisible.value = true
    }

    // 关闭弹窗
    const handleCloseRepost = () => {
      repostVisible.value = false
      selectedRecord.value = null
    }

    // 发送成功回调
    const handleRepostSuccess = () => {
      ElMessage.success('数据发送成功')
    }

    // 保存表单数据到 localStorage
    const saveFormToStorage = () => {
      try {
        const formData = {
          token: form.token,
          personName: form.personName,
          timeRange: form.timeRange
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
      } catch (error) {
        console.warn('保存表单数据失败:', error)
      }
    }

    // 从 localStorage 恢复表单数据
    const loadFormFromStorage = () => {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY)
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          if (parsedData.token) form.token = parsedData.token
          if (parsedData.personName) form.personName = parsedData.personName
          if (parsedData.timeRange) form.timeRange = parsedData.timeRange
        }
      } catch (error) {
        console.warn('恢复表单数据失败:', error)
      }
    }

    // 监听表单数据变化，自动保存
    watch(form, saveFormToStorage, { deep: true })

    // 组件挂载时恢复数据
    onMounted(() => {
      loadFormFromStorage()
    })

    return () => (
      <div class={styles.attendanceQuery}>
        <el-card class={styles.queryCard} v-slots={{
          header: () => (
            <div class={styles.cardHeader}>
              <span>考勤查询系统</span>
            </div>
          )
        }}>
          <el-form model={form} label-width="120px" class={styles.queryForm}>
            <el-form-item label="Token">
              <el-input
                v-model={form.token}
                placeholder="请输入Token"
                type="password"
                show-password
              />
            </el-form-item>
            
            <el-form-item label="姓名">
              <el-input
                v-model={form.personName}
                placeholder="请输入姓名"
              />
            </el-form-item>
            
            <el-form-item label="查询时间">
              <el-date-picker
                v-model={form.timeRange}
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                format={datePickerFormat.format}
                value-format={datePickerFormat.valueFormat}
                default-time={datePickerDefaultTime}
                shortcuts={datePickerShortcuts}
              />
            </el-form-item>
            
            <el-form-item>
              <el-button 
                type="primary" 
                onClick={handleQuery}
                loading={loading.value}
                disabled={!form.token || !form.personName}
              >
                查询考勤记录
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>

        {/* 查询结果 */}
        {records.value.length > 0 && (
          <el-card class={styles.resultCard} v-slots={{
            header: () => (
              <div class={styles.cardHeader}>
                <span>查询结果 ({records.value.length} 条记录)</span>
              </div>
            )
          }}>
            
            <el-table data={records.value} stripe style="width: 100%">
              <el-table-column prop="personName" label="姓名" width="120" />
              <el-table-column prop="identifyTime" label="识别时间" width="180" />
              <el-table-column prop="deviceName" label="设备名称" width="200" />
              <el-table-column prop="similarity" label="相似度" width="100" />
              <el-table-column prop="identifyImage" label="照片" >
                {{
                  default: ({ row }: { row: AttendanceRecord }) => (
                    <el-image
                     z-index= {99999}
                     preview-teleported={true}
                      style="width: 60px; height: 60px"
                      src={row.identifyImage}
                      zoom-rate={1.2}
                      max-scale={7}
                      min-scale={0.2}
                      preview-src-list={records.value.map((r: AttendanceRecord) => r.identifyImage)}
                      show-progress
                      initial-index={records.value.findIndex((r: AttendanceRecord) => r.id === row.id)}
                      fit="cover"
                    />
                  )
                }}
              </el-table-column>
              <el-table-column prop="identifyStatus" label="状态" width="80">
                {{
                  default: ({ row }: { row: AttendanceRecord }) => (
                    <el-tag type={row.identifyStatus === '1' ? 'success' : 'danger'}>
                      {row.identifyStatus === '1' ? '成功' : '失败'}
                    </el-tag>
                  )
                }}
              </el-table-column>
              <el-table-column label="操作" width="120">
                {{
                  default: ({ row }: { row: AttendanceRecord }) => (
                    <el-button 
                      type="primary" 
                      size="small" 
                      onClick={() => handleRepost(row)}
                    >
                      修改时间
                    </el-button>
                  )
                }}
              </el-table-column>
            </el-table>
            
            {/* 分页器 */}
            <div class={styles['pagination-container']}>
              <el-pagination
                v-model:current-page={currentPage.value}
                v-model:page-size={pageSize.value}
                page-sizes={[10, 20, 50, 100]}
                layout="total, sizes, prev, pager, next, jumper"
                total={total.value}
                onSize-change={handleSizeChange}
                onCurrent-change={handlePageChange}
                background
              />
            </div>
          </el-card>
        )}

        {/* 修改时间弹窗 */}
        <Repost
          visible={repostVisible.value}
          record={selectedRecord.value}
          token={form.token}
          onClose={handleCloseRepost}
          onSuccess={handleRepostSuccess}
        />
      </div>
    )
  }
})
