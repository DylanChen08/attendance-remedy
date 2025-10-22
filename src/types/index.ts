// 考勤记录类型
export interface AttendanceRecord {
  id: string
  personName: string
  identifyTime: string
  identifyTimeStr: string
  deviceName: string
  similarity: string
  identifyImage: string
  identifyStatus: string
}

// 查询参数类型
export interface QueryParams {
  pageNum: number
  pageSize: number
  total: number
  groupName: string
  month: string
  personName: string
  identifyTime: [string, string]
  startTime: string
  endTime: string
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  msg?: string
  code?: number
}

// 处理后的记录类型
export interface ProcessedRecord {
  id: string
  personName: string
  identifyTime: string
  identifyTimeStr: string
  deviceName: string
  similarity: string
  identifyImage: string
  identifyStatus: string
}
