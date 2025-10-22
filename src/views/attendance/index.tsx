import { defineComponent } from 'vue'
import AttendanceQuery from './components/attendance-query'
// 使用本地类型定义

export default defineComponent({
  name: 'AttendanceView',
  setup() {
    return () => (
      <div>
        <AttendanceQuery />
      </div>
    )
  }
})
