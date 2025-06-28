// 文件管理相关API接口
import apiClient from './index.js'

/**
 * 文件API接口
 */
export const fileAPI = {
  /**
   * 上传文件
   * @param {File} file 文件对象
   * @param {number} directoryId 目录ID
   * @param {string} [description] 文件描述
   * @param {Function} [onProgress] 上传进度回调
   * @returns {Promise<Object>} 上传结果
   */
  async uploadFile(file, directoryId, description = '', onProgress = null) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('directoryId', directoryId)
    if (description) {
      formData.append('description', description)
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    // 如果提供了进度回调，添加上传进度监听
    if (onProgress && typeof onProgress === 'function') {
      config.onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress({
          loaded: progressEvent.loaded,
          total: progressEvent.total,
          percent: percentCompleted
        })
      }
    }

    const response = await apiClient.post('/api/v1/files/upload', formData, config)
    return response.data
  },

  /**
   * 批量上传文件
   * @param {FileList|File[]} files 文件列表
   * @param {number} directoryId 目录ID
   * @param {string} [description] 文件描述
   * @param {Function} [onProgress] 上传进度回调
   * @returns {Promise<Object>} 上传结果
   */
  async uploadFiles(files, directoryId, description = '', onProgress = null) {
    const formData = new FormData()
    
    // 添加多个文件
    Array.from(files).forEach((file, index) => {
      formData.append('file', file)
    })
    
    formData.append('directoryId', directoryId)
    if (description) {
      formData.append('description', description)
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    // 如果提供了进度回调，添加上传进度监听
    if (onProgress && typeof onProgress === 'function') {
      config.onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress({
          loaded: progressEvent.loaded,
          total: progressEvent.total,
          percent: percentCompleted
        })
      }
    }

    const response = await apiClient.post('/api/v1/files/upload', formData, config)
    return response.data
  },

  /**
   * 获取目录下的文件列表
   * @param {number} directoryId 目录ID
   * @returns {Promise<Array>} 文件列表
   */
  async getFilesByDirectory(directoryId) {
    const response = await apiClient.get(`/api/v1/files/directory/${directoryId}`)
    return response.data || []
  },

  /**
   * 获取文件详情
   * @param {number} fileId 文件ID
   * @returns {Promise<Object>} 文件详情
   */
  async getFileById(fileId) {
    const response = await apiClient.get(`/api/v1/files/${fileId}`)
    return response.data
  },

  /**
   * 下载文件
   * @param {number} fileId 文件ID
   * @returns {Promise<Blob>} 文件数据
   */
  async downloadFile(fileId) {
    const response = await apiClient.get(`/api/v1/files/download/${fileId}`, {
      responseType: 'blob'
    })
    return response
  },

  /**
   * 删除文件
   * @param {number} fileId 文件ID
   * @returns {Promise<boolean>} 删除结果
   */
  async deleteFile(fileId) {
    await apiClient.delete(`/api/v1/files/${fileId}`)
    return true
  },

  /**
   * 重命名文件
   * @param {number} fileId 文件ID
   * @param {string} newName 新文件名
   * @returns {Promise<Object>} 更新后的文件信息
   */
  async renameFile(fileId, newName) {
    const response = await apiClient.put(`/api/v1/files/${fileId}`, { name: newName })
    return response.data
  },

  /**
   * 移动文件
   * @param {number} fileId 文件ID
   * @param {number} targetDirectoryId 目标目录ID
   * @returns {Promise<Object>} 移动后的文件信息
   */
  async moveFile(fileId, targetDirectoryId) {
    const response = await apiClient.patch(`/api/v1/files/${fileId}/move`, {
      directoryId: targetDirectoryId
    })
    return response.data
  }
}

/**
 * 数据转换工具函数
 */
export const fileDataTransform = {
  /**
   * 转换后端文件数据为前端格式
   * @param {Object} file 后端文件数据
   * @returns {Object} 前端文件数据格式
   */
  transformFile(file) {
    return {
      id: file.id,
      name: file.originalName || file.name,
      originalName: file.originalName || file.name,
      storedName: file.storedName,
      extension: this.getFileExtension(file.originalName || file.name),
      size: file.fileSize || file.size || 0,
      formattedSize: file.fileSizeFormatted || this.formatFileSize(file.fileSize || file.size || 0),
      mimeType: file.mimeType,
      directoryId: file.directoryId,
      directoryName: file.directoryName,
      description: file.description || '',
      downloadCount: file.downloadCount || 0,
      md5Hash: file.md5Hash,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt,
      createTime: file.createdAt,
      updateTime: file.updatedAt
    }
  },

  /**
   * 获取文件扩展名
   * @param {string} filename 文件名
   * @returns {string} 扩展名
   */
  getFileExtension(filename) {
    if (!filename) return ''
    const parts = filename.split('.')
    return parts.length > 1 ? parts.pop().toLowerCase() : ''
  },

  /**
   * 格式化文件大小
   * @param {number} bytes 字节数
   * @returns {string} 格式化的文件大小
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
}

export default fileAPI 