import { defineComponent, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { sendProcessedData } from '@/api'
import { processAttendanceRecord } from '@/utils'
import type { AttendanceRecord } from '../../../types'
// 使用本地类型定义

export default defineComponent({
  name: 'Repost',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    record: {
      type: Object as () => AttendanceRecord | null,
      default: null
    },
    token: {
      type: String,
      default: ''
    },
    onClose: {
      type: Function,
      required: true
    },
    onSuccess: {
      type: Function,
      required: true
    }
  },
  setup(props: any) {
    // 表单数据
    const form = reactive({
      identifyTime: '',
      identifyTimeStr: ''
    })

    const loading = ref(false)

    // 监听弹窗显示，初始化表单
    const initForm = () => {
      if (props.record) {
        form.identifyTime = props.record.identifyTime
        form.identifyTimeStr = props.record.identifyTime
      }
    }

    // 发送数据
    const handleSubmit = async () => {
      if (!form.identifyTime) {
        ElMessage.warning('请选择修改时间')
        return
      }

      if (!props.record) {
        ElMessage.error('数据异常，请重试')
        return
      }

      loading.value = true
      try {
        // 处理数据，使用用户输入的时间
        const processedData = processAttendanceRecord(props.record)
        processedData.identifyTime = form.identifyTime
        processedData.identifyTimeStr = form.identifyTimeStr
        
        // 发送数据
        const response = await sendProcessedData(props.token, processedData)
        
        if (response.code === 200) {
          ElMessage.success('数据发送成功')
          props.onSuccess()
          props.onClose()
        } else {
          ElMessage.error(response.msg || '发送失败')
        }
      } catch (error) {
        console.error('发送失败:', error)
        ElMessage.error('发送失败，请重试')
      } finally {
        loading.value = false
      }
    }

    // 取消操作
    const handleCancel = () => {
      props.onClose()
    }

    return () => (
      <el-dialog
        modelValue={props.visible}
        title="修改时间并发送数据"
        width="500px"
        onClose={handleCancel}
        onOpen={initForm}
        v-slots={{
          footer: () => (
            <div class="dialog-footer">
              <el-button onClick={handleCancel}>取消</el-button>
              <el-button 
                type="primary" 
                onClick={handleSubmit}
                loading={loading.value}
                disabled={!form.identifyTime}
              >
                发送数据
              </el-button>
            </div>
          )
        }}
      >
        <el-form model={form} label-width="120px">
          <el-form-item label="原识别时间">
            <el-input
              value={props.record?.identifyTime || ''}
              disabled
            />
          </el-form-item>
          
          <el-form-item label="修改时间" required>
            <el-date-picker
              v-model={form.identifyTime}
              type="datetime"
              placeholder="请选择修改时间"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </el-form-item>
          
          <el-form-item label="人员姓名">
            <el-input
              value={props.record?.personName || ''}
              disabled
            />
          </el-form-item>
          
          <el-form-item label="设备名称">
            <el-input
              value={props.record?.deviceName || ''}
              disabled
            />
          </el-form-item>
        </el-form>
      </el-dialog>
    )
  }
})
