/**
 * 验证相关工具函数
 */

/**
 * 验证邮箱地址
 * @param {string} email 邮箱地址
 * @returns {boolean} 是否有效
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 验证手机号码
 * @param {string} phone 手机号码
 * @returns {boolean} 是否有效
 */
export function validatePhone(phone) {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

/**
 * 验证URL
 * @param {string} url URL地址
 * @returns {boolean} 是否有效
 */
export function validateUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 验证密码强度
 * @param {string} password 密码
 * @returns {Object} 验证结果 { isValid: boolean, strength: string, errors: string[] }
 */
export function validatePassword(password) {
  const result = {
    isValid: false,
    strength: 'weak',
    errors: []
  }
  
  if (!password) {
    result.errors.push('密码不能为空')
    return result
  }
  
  if (password.length < 6) {
    result.errors.push('密码长度不能少于6位')
  }
  
  if (password.length > 50) {
    result.errors.push('密码长度不能超过50位')
  }
  
  const hasLower = /[a-z]/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  
  let score = 0
  if (hasLower) score++
  if (hasUpper) score++
  if (hasNumber) score++
  if (hasSpecial) score++
  
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  
  // 确定强度
  if (score >= 5) {
    result.strength = 'strong'
  } else if (score >= 3) {
    result.strength = 'medium'
  } else {
    result.strength = 'weak'
  }
  
  // 基本要求：至少6位，包含字母和数字
  result.isValid = password.length >= 6 && (hasLower || hasUpper) && hasNumber
  
  if (!result.isValid) {
    if (!hasLower && !hasUpper) {
      result.errors.push('密码必须包含字母')
    }
    if (!hasNumber) {
      result.errors.push('密码必须包含数字')
    }
  }
  
  return result
}

/**
 * 验证身份证号码
 * @param {string} idCard 身份证号码
 * @returns {boolean} 是否有效
 */
export function validateIdCard(idCard) {
  const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return idCardRegex.test(idCard)
}

/**
 * 验证文件名
 * @param {string} filename 文件名
 * @returns {Object} 验证结果 { isValid: boolean, errors: string[] }
 */
export function validateFilename(filename) {
  const result = {
    isValid: false,
    errors: []
  }
  
  if (!filename) {
    result.errors.push('文件名不能为空')
    return result
  }
  
  if (filename.length > 255) {
    result.errors.push('文件名长度不能超过255个字符')
  }
  
  // 检查非法字符
  const invalidChars = /[<>:"/\\|?*]/
  if (invalidChars.test(filename)) {
    result.errors.push('文件名不能包含以下字符: < > : " / \\ | ? *')
  }
  
  // 检查保留名称（Windows）
  const reservedNames = [
    'CON', 'PRN', 'AUX', 'NUL',
    'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9',
    'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'
  ]
  
  const nameWithoutExt = filename.split('.')[0].toUpperCase()
  if (reservedNames.includes(nameWithoutExt)) {
    result.errors.push('文件名不能使用系统保留名称')
  }
  
  // 检查是否以点或空格开头/结尾
  if (filename.startsWith('.') || filename.startsWith(' ') || 
      filename.endsWith('.') || filename.endsWith(' ')) {
    result.errors.push('文件名不能以点或空格开头或结尾')
  }
  
  result.isValid = result.errors.length === 0
  return result
}

/**
 * 验证目录名
 * @param {string} dirname 目录名
 * @returns {Object} 验证结果 { isValid: boolean, errors: string[] }
 */
export function validateDirectoryName(dirname) {
  const result = {
    isValid: false,
    errors: []
  }
  
  if (!dirname) {
    result.errors.push('目录名不能为空')
    return result
  }
  
  if (dirname.length > 100) {
    result.errors.push('目录名长度不能超过100个字符')
  }
  
  // 检查非法字符
  const invalidChars = /[<>:"/\\|?*]/
  if (invalidChars.test(dirname)) {
    result.errors.push('目录名不能包含以下字符: < > : " / \\ | ? *')
  }
  
  // 检查特殊目录名
  if (dirname === '.' || dirname === '..') {
    result.errors.push('目录名不能为"."或".."')
  }
  
  // 检查是否以点或空格开头/结尾
  if (dirname.startsWith('.') || dirname.startsWith(' ') || 
      dirname.endsWith('.') || dirname.endsWith(' ')) {
    result.errors.push('目录名不能以点或空格开头或结尾')
  }
  
  result.isValid = result.errors.length === 0
  return result
}

/**
 * 验证文件大小
 * @param {number} size 文件大小（字节）
 * @param {number} maxSize 最大允许大小（字节）
 * @returns {Object} 验证结果 { isValid: boolean, errors: string[] }
 */
export function validateFileSize(size, maxSize = 100 * 1024 * 1024) {
  const result = {
    isValid: false,
    errors: []
  }
  
  if (size <= 0) {
    result.errors.push('文件大小必须大于0')
    return result
  }
  
  if (size > maxSize) {
    const maxSizeMB = Math.round(maxSize / 1024 / 1024)
    result.errors.push(`文件大小不能超过${maxSizeMB}MB`)
  }
  
  result.isValid = result.errors.length === 0
  return result
}

/**
 * 验证文件类型
 * @param {string} filename 文件名
 * @param {string[]} allowedTypes 允许的文件类型
 * @returns {Object} 验证结果 { isValid: boolean, errors: string[] }
 */
export function validateFileType(filename, allowedTypes = []) {
  const result = {
    isValid: false,
    errors: []
  }
  
  if (!filename) {
    result.errors.push('文件名不能为空')
    return result
  }
  
  if (allowedTypes.length === 0) {
    result.isValid = true
    return result
  }
  
  const extension = filename.split('.').pop()?.toLowerCase()
  if (!extension) {
    result.errors.push('文件必须有扩展名')
    return result
  }
  
  if (!allowedTypes.includes(extension)) {
    result.errors.push(`不支持的文件类型，仅支持: ${allowedTypes.join(', ')}`)
  }
  
  result.isValid = result.errors.length === 0
  return result
}

/**
 * 验证IP地址
 * @param {string} ip IP地址
 * @returns {boolean} 是否有效
 */
export function validateIP(ip) {
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return ipRegex.test(ip)
}

/**
 * 验证端口号
 * @param {number|string} port 端口号
 * @returns {boolean} 是否有效
 */
export function validatePort(port) {
  const portNum = Number(port)
  return Number.isInteger(portNum) && portNum >= 1 && portNum <= 65535
}

/**
 * 验证MAC地址
 * @param {string} mac MAC地址
 * @returns {boolean} 是否有效
 */
export function validateMAC(mac) {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
  return macRegex.test(mac)
}

/**
 * 验证中文姓名
 * @param {string} name 姓名
 * @returns {boolean} 是否有效
 */
export function validateChineseName(name) {
  const nameRegex = /^[\u4e00-\u9fa5]{2,20}$/
  return nameRegex.test(name)
}

/**
 * 验证用户名
 * @param {string} username 用户名
 * @returns {Object} 验证结果 { isValid: boolean, errors: string[] }
 */
export function validateUsername(username) {
  const result = {
    isValid: false,
    errors: []
  }
  
  if (!username) {
    result.errors.push('用户名不能为空')
    return result
  }
  
  if (username.length < 3) {
    result.errors.push('用户名长度不能少于3位')
  }
  
  if (username.length > 20) {
    result.errors.push('用户名长度不能超过20位')
  }
  
  const usernameRegex = /^[a-zA-Z0-9_]+$/
  if (!usernameRegex.test(username)) {
    result.errors.push('用户名只能包含字母、数字和下划线')
  }
  
  if (/^\d/.test(username)) {
    result.errors.push('用户名不能以数字开头')
  }
  
  result.isValid = result.errors.length === 0
  return result
}

/**
 * 验证必填字段
 * @param {any} value 值
 * @param {string} fieldName 字段名
 * @returns {Object} 验证结果 { isValid: boolean, errors: string[] }
 */
export function validateRequired(value, fieldName = '字段') {
  const result = {
    isValid: false,
    errors: []
  }
  
  if (value === null || value === undefined || value === '') {
    result.errors.push(`${fieldName}不能为空`)
  } else {
    result.isValid = true
  }
  
  return result
} 