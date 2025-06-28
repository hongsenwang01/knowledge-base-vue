// 统计信息相关API接口
import apiClient from './index.js'

/**
 * 统计信息API接口
 */
export const statisticsAPI = {
  /**
   * 获取系统统计信息
   * @returns {Promise<Object>} 系统统计数据
   */
  async getSystemStatistics() {
    const response = await apiClient.get('/api/v1/statistics')
    return response.data
  },

  /**
   * 获取存储统计信息
   * @returns {Promise<Object>} 存储统计数据
   */
  async getStorageStatistics() {
    const response = await apiClient.get('/api/v1/statistics/storage')
    return response.data
  },

  /**
   * 获取目录统计信息
   * @param {string|number} directoryId 目录ID
   * @returns {Promise<Object>} 目录统计数据
   */
  async getDirectoryStatistics(directoryId) {
    const response = await apiClient.get(`/api/v1/statistics/directory/${directoryId}`)
    return response.data
  }
}

/**
 * 统计数据转换工具函数
 */
export const statisticsDataTransform = {
  /**
   * 转换系统统计数据为前端格式
   * @param {Object} data 后端统计数据
   * @returns {Object} 前端统计数据格式
   */
  transformSystemStats(data) {
    return {
      totalFolders: data.totalDirectories || 0,
      totalFiles: data.totalFiles || 0,
      totalSize: data.totalFileSizeFormatted || '0 B',
      totalSizeBytes: data.totalFileSize || 0,
      lastModified: data.lastModified || new Date().toISOString()
    }
  },

  /**
   * 格式化文件大小
   * @param {number} bytes 字节数
   * @returns {string} 格式化的文件大小
   */
  formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },

  /**
   * 格式化数字
   * @param {number} num 数字
   * @returns {string} 格式化的数字（添加千分位逗号）
   */
  formatNumber(num) {
    return (num || 0).toLocaleString()
  }
} 