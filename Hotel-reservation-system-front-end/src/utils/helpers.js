// 工具函数

// 日期格式化函数
export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 日期时间格式化函数
export const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return ''
  const date = new Date(dateTimeString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 计算两个日期之间的天数
export const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const timeDiff = end.getTime() - start.getTime()
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

// 格式化金额
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY'
  }).format(amount)
}

// 获取状态标签颜色
export const getStatusColor = (status) => {
  switch (status) {
    case 'PENDING': return 'orange'
    case 'CONFIRMED': return 'green'
    case 'CANCELLED': return 'red'
    case 'CHECKED_IN': return 'blue'
    case 'CHECKED_OUT': return 'purple'
    default: return 'default'
  }
}

// 验证邮箱格式
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// 验证手机号格式
export const validatePhone = (phone) => {
  const re = /^1[3-9]\d{9}$/
  return re.test(phone)
}

// 生成唯一的ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// 防抖函数
export const debounce = (func, delay) => {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

// 节流函数
export const throttle = (func, limit) => {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}