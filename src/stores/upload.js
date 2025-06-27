import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUploadStore = defineStore('upload', () => {
  // 状态
  const uploadTasks = ref([])
  const isUploading = ref(false)
  const uploadProgress = ref(0)
  const error = ref(null)
  
  // 计算属性
  const completedTasks = computed(() => {
    return uploadTasks.value.filter(task => task.status === 'completed')
  })
  
  const failedTasks = computed(() => {
    return uploadTasks.value.filter(task => task.status === 'failed')
  })
  
  const uploadingTasks = computed(() => {
    return uploadTasks.value.filter(task => task.status === 'uploading')
  })
  
  const totalProgress = computed(() => {
    if (uploadTasks.value.length === 0) return 0
    const totalProgress = uploadTasks.value.reduce((sum, task) => sum + task.progress, 0)
    return Math.round(totalProgress / uploadTasks.value.length)
  })
  
  const hasActiveTasks = computed(() => {
    return uploadTasks.value.some(task => task.status === 'uploading' || task.status === 'pending')
  })
  
  // 创建上传任务
  const createUploadTask = (file, directoryId) => {
    const task = {
      id: `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      file,
      fileName: file.name,
      fileSize: file.size,
      directoryId,
      status: 'pending', // 'pending' | 'uploading' | 'completed' | 'failed' | 'cancelled'
      progress: 0,
      speed: 0,
      remainingTime: 0,
      uploadedSize: 0,
      startTime: null,
      endTime: null,
      error: null,
      fileId: null // 上传成功后的文件ID
    }
    
    uploadTasks.value.push(task)
    return task
  }
  
  // 模拟上传进度
  const simulateUpload = async (task) => {
    return new Promise((resolve, reject) => {
      task.status = 'uploading'
      task.startTime = Date.now()
      isUploading.value = true
      
      const totalSize = task.fileSize
      let uploadedSize = 0
      
      const updateProgress = () => {
        if (task.status === 'cancelled') {
          reject(new Error('上传已取消'))
          return
        }
        
        // 模拟上传速度（每次增加一些随机量）
        const increment = Math.random() * (totalSize / 50) + (totalSize / 100)
        uploadedSize = Math.min(uploadedSize + increment, totalSize)
        
        task.uploadedSize = uploadedSize
        task.progress = Math.round((uploadedSize / totalSize) * 100)
        
        // 计算上传速度和剩余时间
        const elapsed = (Date.now() - task.startTime) / 1000
        task.speed = Math.round(uploadedSize / elapsed)
        
        if (task.speed > 0) {
          task.remainingTime = Math.round((totalSize - uploadedSize) / task.speed)
        }
        
        if (uploadedSize >= totalSize) {
          task.status = 'completed'
          task.progress = 100
          task.endTime = Date.now()
          task.fileId = `file_${task.directoryId}_${Date.now()}`
          
          // 检查是否所有任务都完成
          const activeCount = uploadTasks.value.filter(t => 
            t.status === 'uploading' || t.status === 'pending'
          ).length
          
          if (activeCount === 0) {
            isUploading.value = false
          }
          
          resolve(task)
        } else {
          setTimeout(updateProgress, 100 + Math.random() * 200) // 100-300ms间隔
        }
      }
      
      // 模拟网络延迟
      setTimeout(updateProgress, 200)
    })
  }
  
  // 上传单个文件
  const uploadFile = async (file, directoryId) => {
    error.value = null
    
    try {
      // 文件验证
      const maxSize = 100 * 1024 * 1024 // 100MB
      if (file.size > maxSize) {
        throw new Error(`文件大小不能超过 ${Math.round(maxSize / 1024 / 1024)}MB`)
      }
      
      // 创建上传任务
      const task = createUploadTask(file, directoryId)
      
      // 开始上传
      await simulateUpload(task)
      
      return task
    } catch (err) {
      error.value = err.message || '上传失败'
      throw err
    }
  }
  
  // 批量上传文件
  const uploadFiles = async (files, directoryId) => {
    error.value = null
    
    try {
      const tasks = []
      
      // 创建所有上传任务
      for (const file of files) {
        const task = createUploadTask(file, directoryId)
        tasks.push(task)
      }
      
      // 并发上传（限制并发数）
      const concurrentLimit = 3
      const results = []
      
      for (let i = 0; i < tasks.length; i += concurrentLimit) {
        const batch = tasks.slice(i, i + concurrentLimit)
        const batchPromises = batch.map(task => {
          return simulateUpload(task).catch(err => {
            task.status = 'failed'
            task.error = err.message
            return task
          })
        })
        
        const batchResults = await Promise.all(batchPromises)
        results.push(...batchResults)
      }
      
      return results
    } catch (err) {
      error.value = err.message || '批量上传失败'
      throw err
    }
  }
  
  // 取消上传
  const cancelUpload = (taskId) => {
    const task = uploadTasks.value.find(t => t.id === taskId)
    if (task && (task.status === 'pending' || task.status === 'uploading')) {
      task.status = 'cancelled'
      task.endTime = Date.now()
      
      // 检查是否还有活跃的上传任务
      const activeTaskCount = uploadTasks.value.filter(t => 
        t.status === 'uploading' || t.status === 'pending'
      ).length
      
      if (activeTaskCount === 0) {
        isUploading.value = false
      }
    }
  }
  
  // 重试上传
  const retryUpload = async (taskId) => {
    const task = uploadTasks.value.find(t => t.id === taskId)
    if (task && task.status === 'failed') {
      task.status = 'pending'
      task.progress = 0
      task.uploadedSize = 0
      task.error = null
      task.startTime = null
      task.endTime = null
      
      try {
        await simulateUpload(task)
        return task
      } catch (err) {
        task.status = 'failed'
        task.error = err.message
        throw err
      }
    }
  }
  
  // 清除已完成的任务
  const clearCompletedTasks = () => {
    uploadTasks.value = uploadTasks.value.filter(task => 
      task.status !== 'completed' && task.status !== 'failed'
    )
  }
  
  // 清除所有任务
  const clearAllTasks = () => {
    // 取消所有进行中的任务
    uploadTasks.value.forEach(task => {
      if (task.status === 'uploading' || task.status === 'pending') {
        task.status = 'cancelled'
      }
    })
    
    uploadTasks.value = []
    isUploading.value = false
    uploadProgress.value = 0
  }
  
  // 获取任务详情
  const getTaskById = (taskId) => {
    return uploadTasks.value.find(task => task.id === taskId)
  }
  
  // 格式化文件大小
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  // 格式化上传速度
  const formatSpeed = (bytesPerSecond) => {
    return formatFileSize(bytesPerSecond) + '/s'
  }
  
  // 格式化剩余时间
  const formatRemainingTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds}秒`
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)}分${seconds % 60}秒`
    } else {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      return `${hours}小时${minutes}分钟`
    }
  }
  
  const clearError = () => {
    error.value = null
  }
  
  return {
    // 状态
    uploadTasks,
    isUploading,
    uploadProgress,
    error,
    
    // 计算属性
    completedTasks,
    failedTasks,
    uploadingTasks,
    totalProgress,
    hasActiveTasks,
    
    // 方法
    uploadFile,
    uploadFiles,
    cancelUpload,
    retryUpload,
    clearCompletedTasks,
    clearAllTasks,
    getTaskById,
    formatFileSize,
    formatSpeed,
    formatRemainingTime,
    clearError
  }
}) 