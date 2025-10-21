// 查询请求参数
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

// 考勤记录数据
export interface AttendanceRecord {
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
  id: number
  identifyRecordId: string
  deviceId: string
  deviceName: string
  personId: string
  personName: string
  personIdType: string
  identifyType: string
  identifyStatus: string
  identifyTime: string
  taskId: string
  identityId: string
  similarity: string
  identifyImage: string
  teamId: number
  keepImage: string
  identity: string | null
  areaId: string | null
  areaName: string | null
  organizeId: string | null
  organizeName: string | null
  identifyInfo: string
  identifyDesc: string
  errCode: number
  deviceCardNumber: string
  personCardNumber: string | null
  number: string
  passStatus: string
}

// API响应
export interface ApiResponse<T = any> {
  code: number
  msg: string
  data: T
  total?: number
  success: boolean
}

// 处理后的数据
export interface ProcessedRecord {
  id: number
  identifyRecordId: string
  deviceId: string
  deviceName: string
  personId: string
  personName: string
  personIdType: string
  identifyType: string
  identifyStatus: string
  identifyTime: string
  identifyTimeStr: string
  taskId: string
  identityId: string
  similarity: string
  identifyImage: string
  managerId: string
  keepImage: string
  identity: string
  areaId: string
  areaName: string
  organizeId: string
  organizeName: string
  identifyInfo: string
  identifyDesc: string
}
