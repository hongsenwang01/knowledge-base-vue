import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockAPI } from '@/data'

export const useFileStore = defineStore('file', () => {
  // 状态
  const files = ref([])
  const selectedFiles = ref([])
  const loading = ref(false)
  const error = ref(null)
  const viewMode = ref('grid') // 'grid' | 'list'
  const sortBy = ref('name') // 'name' | 'size' | 'createTime'
  const sortOrder = ref('asc') // 'asc' | 'desc'
  
  // 计算属性
  const sortedFiles = computed(() => {
    const sorted = [...files.value].sort((a, b) => {
      let aValue = a[sortBy.value]
      let bValue = b[sortBy.value]
      
      if (sortBy.value === 'size') {
        aValue = Number(aValue)
        bValue = Number(bValue)
      } else if (sortBy.value === 'createTime') {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      } else {
        aValue = String(aValue).toLowerCase()
        bValue = String(bValue).toLowerCase()
      }
      
      if (sortOrder.value === 'desc') {
        return bValue > aValue ? 1 : -1
      }
      return aValue > bValue ? 1 : -1
    })
    
    return sorted
  })
  
  const selectedFileIds = computed(() => {
    return selectedFiles.value.map(file => file.id)
  })
  
  const hasSelectedFiles = computed(() => {
    return selectedFiles.value.length > 0
  })
  
  // 模拟数据生成器
  const generateMockFiles = (directoryId, count = 10) => {
    const fileTypes = [
      { ext: 'pdf', type: 'application/pdf', icon: '📄' },
      { ext: 'doc', type: 'application/msword', icon: '📝' },
      { ext: 'docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', icon: '📝' },
      { ext: 'xls', type: 'application/vnd.ms-excel', icon: '📊' },
      { ext: 'xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', icon: '📊' },
      { ext: 'ppt', type: 'application/vnd.ms-powerpoint', icon: '📋' },
      { ext: 'pptx', type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', icon: '📋' },
      { ext: 'txt', type: 'text/plain', icon: '📄' },
      { ext: 'jpg', type: 'image/jpeg', icon: '🖼️' },
      { ext: 'jpeg', type: 'image/jpeg', icon: '🖼️' },
      { ext: 'png', type: 'image/png', icon: '🖼️' },
      { ext: 'gif', type: 'image/gif', icon: '🖼️' },
      { ext: 'mp4', type: 'video/mp4', icon: '🎬' },
      { ext: 'mp3', type: 'audio/mpeg', icon: '🎵' },
      { ext: 'zip', type: 'application/zip', icon: '📦' },
    ]
    
    const mockFiles = []
    for (let i = 0; i < count; i++) {
      const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)]
      const fileNames = {
        pdf: ['年度报告', '产品说明书', '用户手册', '技术文档'],
        doc: ['会议纪要', '项目计划', '需求文档', '设计方案'],
        docx: ['工作总结', '项目报告', '分析报告', '策划书'],
        xlsx: ['数据统计', '财务报表', '销售数据', '库存清单'],
        jpg: ['产品图片', '宣传海报', '活动照片', '截图'],
        png: ['界面设计', '图标素材', '背景图片', '示意图'],
        mp4: ['产品演示', '培训视频', '宣传片', '录屏'],
        mp3: ['背景音乐', '语音备忘', '音频资料', '录音'],
        txt: ['备忘录', '代码片段', '配置文件', '日志文件'],
        zip: ['项目文件', '资源包', '备份文件', '压缩包']
      }
      
      const nameList = fileNames[fileType.ext] || ['未知文件']
      const baseName = nameList[Math.floor(Math.random() * nameList.length)]
      const fileName = `${baseName}_${i + 1}.${fileType.ext}`
      
      mockFiles.push({
        id: `file_${directoryId}_${i + 1}`,
        name: fileName,
        originalName: fileName,
        extension: fileType.ext,
        size: Math.floor(Math.random() * 10000000) + 1000, // 1KB - 10MB
        mimeType: fileType.type,
        directoryId,
        path: `/storage/files/${directoryId}/${fileName}`,
        url: `/api/files/download/file_${directoryId}_${i + 1}`,
        thumbnailUrl: fileType.type.startsWith('image/') ? `/api/files/thumbnail/file_${directoryId}_${i + 1}` : null,
        createTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        updateTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        md5: Math.random().toString(36).substring(2, 34),
        isPublic: Math.random() > 0.7,
        downloadCount: Math.floor(Math.random() * 100),
        icon: fileType.icon
      })
    }
    
    return mockFiles
  }
  
  // 方法
  const fetchFiles = async (directoryId) => {
    loading.value = true
    error.value = null
    
    try {
      // 使用模拟API获取文件列表
      const fileList = await mockAPI.getFilesByDirectory(directoryId)
      files.value = fileList
      selectedFiles.value = []
    } catch (err) {
      error.value = err.message || '获取文件列表失败'
    } finally {
      loading.value = false
    }
  }
  
  const searchFiles = async (keyword, directoryId = null, fileType = null) => {
    loading.value = true
    error.value = null
    
    try {
      // 使用模拟API搜索文件
      let searchResults = await mockAPI.searchFiles(keyword)
      
      // 应用额外的过滤条件
      if (directoryId) {
        searchResults = searchResults.filter(file => file.directoryId === directoryId)
      }
      if (fileType) {
        searchResults = searchResults.filter(file => file.extension === fileType)
      }
      
      files.value = searchResults.slice(0, 20) // 限制搜索结果数量
      selectedFiles.value = []
    } catch (err) {
      error.value = err.message || '搜索文件失败'
    } finally {
      loading.value = false
    }
  }
  
  const selectFile = (file) => {
    const index = selectedFiles.value.findIndex(f => f.id === file.id)
    if (index > -1) {
      selectedFiles.value.splice(index, 1)
    } else {
      selectedFiles.value.push(file)
    }
  }
  
  const selectAllFiles = () => {
    if (selectedFiles.value.length === files.value.length) {
      selectedFiles.value = []
    } else {
      selectedFiles.value = [...files.value]
    }
  }
  
  const clearSelection = () => {
    selectedFiles.value = []
  }
  
  const deleteFiles = async (fileIds) => {
    loading.value = true
    error.value = null
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500))
      
      files.value = files.value.filter(file => !fileIds.includes(file.id))
      selectedFiles.value = selectedFiles.value.filter(file => !fileIds.includes(file.id))
      
      return { success: fileIds.length, failed: 0 }
    } catch (err) {
      error.value = err.message || '删除文件失败'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const renameFile = async (fileId, newName) => {
    loading.value = true
    error.value = null
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const file = files.value.find(f => f.id === fileId)
      if (!file) {
        throw new Error('文件不存在')
      }
      
      file.name = newName
      file.updateTime = new Date().toISOString()
      
      return file
    } catch (err) {
      error.value = err.message || '重命名文件失败'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const moveFiles = async (fileIds, targetDirectoryId) => {
    loading.value = true
    error.value = null
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 400))
      
      files.value.forEach(file => {
        if (fileIds.includes(file.id)) {
          file.directoryId = targetDirectoryId
          file.updateTime = new Date().toISOString()
        }
      })
      
      return { success: fileIds.length, failed: 0 }
    } catch (err) {
      error.value = err.message || '移动文件失败'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const downloadFile = async (fileId) => {
    try {
      const file = files.value.find(f => f.id === fileId)
      if (!file) {
        throw new Error('文件不存在')
      }
      
      // 模拟下载（实际项目中这里会是真实的下载逻辑）
      console.log(`下载文件: ${file.name}`)
      
      // 增加下载次数
      file.downloadCount++
      
      return true
    } catch (err) {
      error.value = err.message || '下载文件失败'
      throw err
    }
  }
  
  const setViewMode = (mode) => {
    viewMode.value = mode
  }
  
  const setSortBy = (field) => {
    if (sortBy.value === field) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortBy.value = field
      sortOrder.value = 'asc'
    }
  }
  
  const clearError = () => {
    error.value = null
  }
  
  return {
    // 状态
    files,
    selectedFiles,
    loading,
    error,
    viewMode,
    sortBy,
    sortOrder,
    
    // 计算属性
    sortedFiles,
    selectedFileIds,
    hasSelectedFiles,
    
    // 方法
    fetchFiles,
    searchFiles,
    selectFile,
    selectAllFiles,
    clearSelection,
    deleteFiles,
    renameFile,
    moveFiles,
    downloadFile,
    setViewMode,
    setSortBy,
    clearError
  }
}) 