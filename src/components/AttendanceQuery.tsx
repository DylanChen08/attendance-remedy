import { defineComponent, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { queryAttendanceRecords } from '@/api'
import { getTodayTimeRange } from '@/utils'
import type { AttendanceRecord } from '@/types'
import styles from './AttendanceQuery.module.scss'
import Repost from './repost'

// JSX类型声明
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

export default defineComponent({
  name: 'AttendanceQuery',
  setup() {
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

    // 查询考勤记录
    const handleQuery = async () => {
      if (!form.token || !form.personName) {
        ElMessage.warning('请填写Token和姓名')
        return
      }

      loading.value = true
      try {
        const timeRange = form.timeRange || getTodayTimeRange()
        const response = await queryAttendanceRecords(form.token, form.personName, timeRange)
        
        if (response.success && response.data) {
          records.value = response.data
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
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                default-time={[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]}
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
                      style="width: 60px; height: 60px"
                      src={row.identifyImage}
                      zoom-rate={1.2}
                      max-scale={7}
                      min-scale={0.2}
                      preview-src-list={records.value.map(r => r.identifyImage)}
                      show-progress
                      initial-index={records.value.findIndex(r => r.id === row.id)}
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
