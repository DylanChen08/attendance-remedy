import dayjs from 'dayjs'

// 获取当天时间范围
export const getTodayTimeRange = (): [string, string] => {
  const today = dayjs()
  const startTime = today.startOf('day').format('YYYY-MM-DD HH:mm:ss')
  const endTime = today.endOf('day').format('YYYY-MM-DD HH:mm:ss')
  return [startTime, endTime]
}

// 处理keepImage字段
export const processKeepImage = (keepImage: string): string => {
  if (!keepImage) return ''
  
  // 查找biometric开头，.jpg结尾的部分
  const match = keepImage.match(/biometric.*?\.jpg/)
  return match ? match[0] : ''
}

// 随机修改数字后三位
export const modifyLastThreeDigits = (value: string | number): string => {
  const str = String(value)
  if (str.length < 3) return str
  
  const prefix = str.slice(0, -3)
  const lastThree = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return prefix + lastThree
}

// 处理考勤记录数据
export const processAttendanceRecord = (record: any): any => {
  return {
    id: modifyLastThreeDigits(record.id),
    identifyRecordId: modifyLastThreeDigits(record.identifyRecordId),
    deviceId: record.deviceId,
    deviceName: record.deviceName,
    personId: record.personId,
    personName: record.personName,
    personIdType: record.personIdType,
    identifyType: record.identifyType,
    identifyStatus: record.identifyStatus,
    identifyTime: record.identifyTime,
    identifyTimeStr: record.identifyTime,
    taskId: record.taskId,
    identityId: record.identityId,
    similarity: record.similarity,
    identifyImage: record.identifyImage,
    managerId: record.createBy,
    keepImage: processKeepImage(record.keepImage),
    identity: record.identity || '',
    areaId: record.areaId || '',
    areaName: record.areaName || '',
    organizeId: record.organizeId || '',
    organizeName: record.organizeName || '',
    identifyInfo: record.identifyInfo,
    identifyDesc: record.identifyDesc || '',
  }
}
