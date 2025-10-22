import type { AttendanceRecord } from '../../../types'

// 考勤查询表单数据类型
export interface AttendanceQueryForm {
  token: string
  personName: string
  timeRange: [string, string] | null
}

// 考勤查询组件 Props 类型
export interface AttendanceQueryProps {
  // 可以添加外部传入的 props 类型
}

// 考勤查询组件状态类型
export interface AttendanceQueryState {
  loading: boolean
  records: AttendanceRecord[]
  repostVisible: boolean
  selectedRecord: AttendanceRecord | null
}

// 考勤查询组件方法类型
export interface AttendanceQueryMethods {
  handleQuery: () => Promise<void>
  handleRepost: (record: AttendanceRecord) => void
  handleCloseRepost: () => void
  handleRepostSuccess: () => void
  saveFormToStorage: () => void
  loadFormFromStorage: () => void
}

// Repost 组件 Props 类型
export interface RepostProps {
  visible: boolean
  record: AttendanceRecord | null
  token: string
  onClose: () => void
  onSuccess: () => void
}

// Repost 组件表单数据类型
export interface RepostForm {
  identifyTime: string
  identifyTimeStr: string
}

// Repost 组件状态类型
export interface RepostState {
  loading: boolean
}

// Repost 组件方法类型
export interface RepostMethods {
  initForm: () => void
  handleSubmit: () => Promise<void>
  handleCancel: () => void
}

// AttendanceView 组件 Props 类型
export interface AttendanceViewProps {
  // 可以添加外部传入的 props 类型
}

// JSX 类型声明
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
