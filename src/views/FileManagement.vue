<template>
  <div class="file-management">
    <div class="file-management-container">
      <!-- 页面头部 -->
      <header class="page-header">
        <div class="header-content">
          <div class="header-icon">
            <i data-lucide="folder-open" class="header-icon-svg"></i>
          </div>
          <div class="header-text">
            <h1 class="page-title">文件管理</h1>
            <p class="page-subtitle">管理您的文件和文档</p>
          </div>
        </div>
        <div class="header-actions">
          <router-link to="/" class="btn btn-secondary">
            <i data-lucide="home" class="btn-icon"></i>
            返回首页
          </router-link>
        </div>
      </header>

      <!-- 主要内容区域 -->
      <div class="main-content">
        <!-- 左侧目录树区域 -->
        <aside class="sidebar">
          <div class="sidebar-header">
            <div class="sidebar-title">
              <i data-lucide="folder-tree" class="sidebar-icon"></i>
              <h3>目录结构</h3>
            </div>
          </div>
          <div class="directory-tree">
            <div v-if="directoryStore.loading" class="tree-loading">
              <div class="loading-spinner"></div>
              <p>加载中...</p>
            </div>
            <div v-else-if="directoryStore.directoryTree.length > 0" class="tree-content">
              <TreeNode
                v-for="directory in directoryStore.directoryTree"
                :key="directory.id"
                :node="directory"
                :current-id="currentDirectoryId"
                :level="0"
                @node-select="selectDirectory"
              />
            </div>
            <div v-else class="tree-placeholder">
              <div class="placeholder-icon">
                <i data-lucide="folder" class="placeholder-icon-svg"></i>
              </div>
              <h4>暂无目录</h4>
              <p>请先创建一些目录</p>
            </div>
          </div>
        </aside>

        <!-- 右侧文件区域 -->
        <main class="content-area">
          <!-- 工具栏 -->
          <div class="toolbar">
            <div class="search-section">
              <div class="search-input-wrapper">
                <i data-lucide="search" class="search-icon"></i>
                <input 
                  type="text" 
                  placeholder="搜索文件..." 
                  class="search-input"
                  disabled
                >
              </div>
            </div>
            <div class="action-section">
              <button 
                class="btn btn-primary" 
                @click="showUploadDialog"
                :disabled="!currentDirectoryId || currentDirectoryId === 'root'"
              >
                <i data-lucide="upload-cloud" class="btn-icon"></i>
                上传文件
              </button>
            </div>
          </div>

          <!-- 文件列表区域 -->
          <FileListView
            :files="fileStore.sortedFiles"
            :loading="fileStore.loading"
            :error="fileStore.error"
            :selected-file-ids="fileStore.selectedFileIds"
            @file-select="selectFile"
            @file-download="downloadFile"
            @reload="reloadCurrentDirectory"
          />
        </main>
      </div>
    </div>

    <!-- 文件上传对话框 -->
    <FileUploadDialog
      :visible="uploadDialogVisible"
      :directory-id="currentDirectoryId"
      @close="handleUploadDialogClose"
      @upload-success="handleUploadSuccess"
      @upload-error="handleUploadError"
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useDirectoryStore } from '@/stores/directory'
import { useFileStore } from '@/stores/file'
import TreeNode from '@/components/common/TreeNode.vue'
import FileUploadDialog from '@/components/common/FileUploadDialog.vue'
import FileListView from '@/components/FileListView.vue'
import { fileAPI, fileDataTransform } from '@/api/file.js'

export default {
  name: 'FileManagement',
  components: {
    TreeNode,
    FileUploadDialog,
    FileListView
  },
  setup() {
    const directoryStore = useDirectoryStore()
    const fileStore = useFileStore()
    
    const currentDirectoryId = ref('root')
    const uploadDialogVisible = ref(false)

    onMounted(async () => {
      // 初始化 Lucide 图标
      if (window.lucide) {
        window.lucide.createIcons()
      }
      
      // 加载目录树
      await directoryStore.fetchDirectoryTree()
      
      // 默认选择第一个可用的目录
      if (directoryStore.directoryTree.length > 0) {
        const firstDirectory = directoryStore.directoryTree[0]
        
        // 如果第一个目录有子目录，选择第一个子目录
        if (firstDirectory.children && firstDirectory.children.length > 0) {
          const firstChild = firstDirectory.children[0]
          currentDirectoryId.value = firstChild.id
          directoryStore.setCurrentDirectory(firstChild)
          await loadDirectoryFiles(firstChild.id)
        } else {
          // 否则选择第一个目录本身
          currentDirectoryId.value = firstDirectory.id
          directoryStore.setCurrentDirectory(firstDirectory)
          await loadDirectoryFiles(firstDirectory.id)
        }
      }
    })

    const selectDirectory = async (directory) => {
      currentDirectoryId.value = directory.id
      directoryStore.setCurrentDirectory(directory)
      await loadDirectoryFiles(directory.id)
    }

    const loadDirectoryFiles = async (directoryId) => {
      try {
        fileStore.loading = true
        fileStore.error = null
        
        console.log('正在加载目录文件:', directoryId)
        const response = await fileAPI.getFilesByDirectory(directoryId)
        
        // 处理API响应 - response包含 { code, message, data, timestamp }
        const filesData = response.data || []
        console.log('获取到文件数据:', filesData)
        
        // 转换文件数据格式
        const transformedFiles = filesData.map(file => fileDataTransform.transformFile(file))
        fileStore.files = transformedFiles
        
        console.log('文件列表加载成功，共', transformedFiles.length, '个文件')
      } catch (error) {
        console.error('加载文件列表失败:', error)
        fileStore.error = error.message || '加载文件列表失败'
        fileStore.files = []
      } finally {
        fileStore.loading = false
      }
    }

    const selectFile = (file) => {
      fileStore.selectFile(file)
    }

    const downloadFile = async (file) => {
      try {
        const blob = await fileAPI.downloadFile(file.id)
        // 创建下载链接
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('下载文件失败:', error)
      }
    }

    // 上传对话框相关方法
    const showUploadDialog = () => {
      uploadDialogVisible.value = true
    }

    const handleUploadDialogClose = () => {
      uploadDialogVisible.value = false
    }

    const handleUploadSuccess = async (uploadResults) => {
      console.log('文件上传成功:', uploadResults)
      uploadDialogVisible.value = false
      
      // 刷新当前目录的文件列表
      if (currentDirectoryId.value && currentDirectoryId.value !== 'root') {
        await loadDirectoryFiles(currentDirectoryId.value)
      }
      
      // 显示成功消息（这里可以使用toast组件）
      alert(`成功上传 ${uploadResults.length} 个文件`)
    }

    const handleUploadError = (error) => {
      console.error('文件上传失败:', error)
      // 显示错误消息（这里可以使用toast组件）
      alert('文件上传失败: ' + error.message)
    }

    // 重新加载当前目录
    const reloadCurrentDirectory = async () => {
      if (currentDirectoryId.value && currentDirectoryId.value !== 'root') {
        await loadDirectoryFiles(currentDirectoryId.value)
      }
    }

    return {
      directoryStore,
      fileStore,
      currentDirectoryId,
      uploadDialogVisible,
      selectDirectory,
      selectFile,
      downloadFile,
      showUploadDialog,
      handleUploadDialogClose,
      handleUploadSuccess,
      handleUploadError,
      reloadCurrentDirectory
    }
  }
}
</script>

<style scoped>
.file-management {
  min-height: 100vh;
  background: var(--color-bg-primary);
}

.file-management-container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--spacing-lg);
}

/* 页面头部 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-xl);
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-xl);
  backdrop-filter: var(--backdrop-blur-lg);
}

.header-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.header-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
}

.header-icon-svg {
  width: 32px;
  height: 32px;
  color: var(--color-text-inverse);
}

.header-text h1 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.header-text p {
  color: var(--color-text-secondary);
  margin: 0;
  font-size: var(--font-size-base);
}

.header-actions .btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-normal);
  border: none;
  cursor: pointer;
}

.btn-secondary {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-medium);
}

.btn-secondary:hover {
  background: var(--color-bg-quaternary);
  border-color: var(--color-primary-300);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

/* 主要内容区域 */
.main-content {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: var(--spacing-xl);
  min-height: calc(100vh - 240px);
}

/* 左侧边栏 */
.sidebar {
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  backdrop-filter: var(--backdrop-blur-lg);
}

.sidebar-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-tertiary);
}

.sidebar-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.sidebar-icon {
  width: 20px;
  height: 20px;
  color: var(--color-primary-600);
}

.sidebar-title h3 {
  margin: 0;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.directory-tree {
  padding: var(--spacing-lg);
}

/* 右侧内容区域 */
.content-area {
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-xl);
  overflow: visible;
  display: flex;
  flex-direction: column;
  backdrop-filter: var(--backdrop-blur-lg);
  min-width: 0; /* 允许flex子项收缩 */
}

/* 工具栏 */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-tertiary);
  gap: var(--spacing-lg);
}

.search-section {
  flex: 1;
  max-width: 400px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-md) var(--spacing-2xl);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--border-radius-lg);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  transition: all var(--transition-normal);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.search-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.search-icon {
  position: absolute;
  left: var(--spacing-md);
  width: 20px;
  height: 20px;
  color: var(--color-text-tertiary);
  pointer-events: none;
}

.action-section .btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-normal);
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: var(--color-text-inverse);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}



/* 占位符样式 */
.tree-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--color-text-secondary);
  min-height: 200px;
}

.placeholder-icon {
  width: 80px;
  height: 80px;
  margin-bottom: var(--spacing-lg);
  background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-200));
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon-svg {
  width: 40px;
  height: 40px;
  color: var(--color-primary-600);
}

.tree-placeholder h4 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  font-weight: var(--font-weight-semibold);
}

.tree-placeholder p {
  margin-bottom: var(--spacing-xl);
  color: var(--color-text-tertiary);
}

.placeholder-features {
  display: grid;
  gap: var(--spacing-md);
  text-align: left;
  max-width: 300px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
}

.feature-check {
  width: 16px;
  height: 16px;
  color: var(--color-success-600);
  flex-shrink: 0;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

/* 目录树样式 */
.tree-content {
  padding: var(--spacing-md);
}

/* 加载状态 */
.tree-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  color: var(--color-text-secondary);
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border-light);
  border-top: 3px solid var(--color-primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-md);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}



/* 响应式设计 */
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 320px 1fr;
  }
}

@media (max-width: 768px) {
  .file-management-container {
    padding: var(--spacing-md);
  }
  
  .page-header {
    flex-direction: column;
    gap: var(--spacing-lg);
    text-align: center;
  }
  
  .header-content {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .main-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .toolbar {
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: stretch;
  }
  
  .search-section {
    max-width: none;
  }
  
  .action-section {
    display: flex;
    justify-content: center;
  }
}
</style> 