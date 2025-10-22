import axios from 'axios'
import type { QueryParams, ApiResponse, AttendanceRecord, ProcessedRecord } from '../types'

// 创建axios实例
const api = axios.create({
  timeout: 10000,
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log('请求配置:', config)
    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log('响应数据:', response.data)
    return response
  },
  (error) => {
    console.error('响应错误:', error)
    return Promise.reject(error)
  }
)

// 查询考勤记录
export const queryAttendanceRecordsApi = async (
  token: string,
  personName: string,
  timeRange: [string, string]
): Promise<ApiResponse<AttendanceRecord[]>> => {
  const params: QueryParams = {
    pageNum: 1,
    pageSize: 10,
    total: 0,
    groupName: '',
    month: '',
    personName,
    identifyTime: timeRange,
    startTime: timeRange[0],
    endTime: timeRange[1],
  }

  console.log('查询参数:', params)
  console.log('请求头 satoken:', token)

  const response = await api.post<ApiResponse<AttendanceRecord[]>>(
    'https://api.maxvisioncloud.com/bp-acs/record/queryIdentifyRecordByPersonPerm',
    params,
    {
      headers: {
        satoken: token,
      },
    }
  )

  return response.data
}

// 发送处理后的数据
export const sendProcessedData = async (
  token: string,
  data: ProcessedRecord
): Promise<ApiResponse> => {
  console.log('发送数据:', data)
  console.log('请求头 satoken:', token)

  const response = await api.post<ApiResponse>(
    'https://api.maxvisioncloud.com/bp-acs/demo/kafka',
    data,
    {
      headers: {
        satoken: token,
      },
    }
  )

  return response.data
}
