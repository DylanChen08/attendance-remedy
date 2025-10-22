// 日期选择器快捷选项配置
export const datePickerShortcuts = [
  {
    text: '今天',
    value: () => {
      const today = new Date()
      const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
      const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
      return [start, end]
    }
  },
  {
    text: '昨天',
    value: () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const start = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 0, 0, 0)
      const end = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59)
      return [start, end]
    }
  },
  {
    text: '最近7天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 6)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      return [start, end]
    }
  },
  {
    text: '最近30天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 29)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      return [start, end]
    }
  },
  {
    text: '最近3个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 3)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      return [start, end]
    }
  },
  {
    text: '最近6个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 6)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      return [start, end]
    }
  }
]

// 日期选择器默认时间配置
export const datePickerDefaultTime = [
  new Date(2000, 1, 1, 0, 0, 0), 
  new Date(2000, 1, 1, 23, 59, 59)
]

// 日期选择器格式化配置
export const datePickerFormat = {
  format: 'YYYY-MM-DD HH:mm:ss',
  valueFormat: 'YYYY-MM-DD HH:mm:ss'
}
