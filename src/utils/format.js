/**
 * 格式化相关工具函数
 */

/**
 * 格式化日期时间
 * @param {string|Date} date 日期
 * @param {string} format 格式 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD' | 'HH:mm:ss' | 'relative'
 * @returns {string} 格式化后的日期时间
 */
export function formatDateTime(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return ''
  
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  
  if (format === 'relative') {
    return formatRelativeTime(d)
  }
  
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  
  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`
    case 'HH:mm:ss':
      return `${hours}:${minutes}:${seconds}`
    case 'YYYY-MM-DD HH:mm':
      return `${year}-${month}-${day} ${hours}:${minutes}`
    default:
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
}

/**
 * 格式化相对时间
 * @param {Date} date 日期对象
 * @returns {string} 相对时间字符串
 */
export function formatRelativeTime(date) {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  // 转换为秒
  const seconds = Math.floor(diff / 1000)
  
  if (seconds < 60) {
    return '刚刚'
  }
  
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes}分钟前`
  }
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours}小时前`
  }
  
  const days = Math.floor(hours / 24)
  if (days < 7) {
    return `${days}天前`
  }
  
  const weeks = Math.floor(days / 7)
  if (weeks < 4) {
    return `${weeks}周前`
  }
  
  const months = Math.floor(days / 30)
  if (months < 12) {
    return `${months}个月前`
  }
  
  const years = Math.floor(days / 365)
  return `${years}年前`
}

/**
 * 格式化数字，添加千分位分隔符
 * @param {number} num 数字
 * @param {number} decimals 小数位数
 * @returns {string} 格式化后的数字
 */
export function formatNumber(num, decimals = 0) {
  if (isNaN(num)) return '0'
  
  const fixed = Number(num).toFixed(decimals)
  return fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 格式化百分比
 * @param {number} value 数值
 * @param {number} total 总数
 * @param {number} decimals 小数位数
 * @returns {string} 百分比字符串
 */
export function formatPercentage(value, total, decimals = 1) {
  if (total === 0) return '0%'
  
  const percentage = (value / total) * 100
  return `${percentage.toFixed(decimals)}%`
}

/**
 * 格式化文件路径
 * @param {string} path 文件路径
 * @param {number} maxLength 最大显示长度
 * @returns {string} 格式化后的路径
 */
export function formatPath(path, maxLength = 50) {
  if (!path || path.length <= maxLength) {
    return path || '/'
  }
  
  const parts = path.split('/')
  if (parts.length <= 2) {
    return path
  }
  
  // 保留开头和结尾部分
  const start = parts.slice(0, 2).join('/')
  const end = parts.slice(-2).join('/')
  
  return `${start}/.../${end}`
}

/**
 * 格式化错误信息
 * @param {Error|string} error 错误对象或字符串
 * @returns {string} 格式化后的错误信息
 */
export function formatError(error) {
  if (!error) return '未知错误'
  
  if (typeof error === 'string') {
    return error
  }
  
  if (error.message) {
    return error.message
  }
  
  return '发生了未知错误'
}

/**
 * 截断文本
 * @param {string} text 文本
 * @param {number} maxLength 最大长度
 * @param {string} suffix 后缀
 * @returns {string} 截断后的文本
 */
export function truncateText(text, maxLength = 20, suffix = '...') {
  if (!text || text.length <= maxLength) {
    return text || ''
  }
  
  return text.slice(0, maxLength - suffix.length) + suffix
}

/**
 * 首字母大写
 * @param {string} str 字符串
 * @returns {string} 首字母大写的字符串
 */
export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * 驼峰命名转换为短横线命名
 * @param {string} str 驼峰命名字符串
 * @returns {string} 短横线命名字符串
 */
export function camelToKebab(str) {
  return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
}

/**
 * 短横线命名转换为驼峰命名
 * @param {string} str 短横线命名字符串
 * @returns {string} 驼峰命名字符串
 */
export function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
}

/**
 * 格式化URL参数
 * @param {Object} params 参数对象
 * @returns {string} URL参数字符串
 */
export function formatUrlParams(params) {
  const searchParams = new URLSearchParams()
  
  Object.keys(params).forEach(key => {
    const value = params[key]
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, String(value))
    }
  })
  
  return searchParams.toString()
}

/**
 * 解析URL参数
 * @param {string} search URL search字符串
 * @returns {Object} 参数对象
 */
export function parseUrlParams(search) {
  const params = {}
  const searchParams = new URLSearchParams(search)
  
  searchParams.forEach((value, key) => {
    params[key] = value
  })
  
  return params
}

/**
 * 格式化JSON字符串（带缩进）
 * @param {any} obj 要格式化的对象
 * @param {number} indent 缩进空格数
 * @returns {string} 格式化后的JSON字符串
 */
export function formatJSON(obj, indent = 2) {
  try {
    return JSON.stringify(obj, null, indent)
  } catch (error) {
    return String(obj)
  }
} 