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
              <button class="btn btn-primary" disabled>
                <i data-lucide="upload-cloud" class="btn-icon"></i>
                上传文件
              </button>
            </div>
          </div>

          <!-- 文件列表区域 -->
          <div class="file-list">
            <div v-if="fileStore.loading" class="list-loading">
              <div class="loading-spinner"></div>
              <p>加载文件中...</p>
            </div>
            <div v-else-if="fileStore.files.length > 0" class="file-grid">
              <div 
                v-for="file in fileStore.sortedFiles" 
                :key="file.id"
                class="file-item"
                @click="selectFile(file)"
                :class="{ selected: fileStore.selectedFileIds.includes(file.id) }"
              >
                <div class="file-icon">
                  <i :data-lucide="getFileIcon(file.extension)" class="file-icon-svg"></i>
                </div>
                <div class="file-info">
                  <h4 class="file-name">{{ file.name }}</h4>
                  <p class="file-details">{{ file.formattedSize }} • {{ formatDate(file.updatedAt) }}</p>
                </div>
                <div class="file-actions">
                  <button class="action-btn" @click.stop="downloadFile(file)">
                    <i data-lucide="download" class="action-icon"></i>
                  </button>
                </div>
              </div>
            </div>
            <div v-else class="list-placeholder">
              <div class="placeholder-icon">
                <i data-lucide="folder-open" class="placeholder-icon-svg"></i>
              </div>
              <h3>此目录为空</h3>
              <p>这里还没有文件，可以上传一些文件</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useDirectoryStore } from '@/stores/directory'
import { useFileStore } from '@/stores/file'
import TreeNode from '@/components/common/TreeNode.vue'

export default {
  name: 'FileManagement',
  components: {
    TreeNode
  },
  setup() {
    const directoryStore = useDirectoryStore()
    const fileStore = useFileStore()
    
    const currentDirectoryId = ref('root')

    onMounted(async () => {
      // 初始化 Lucide 图标
      if (window.lucide) {
        window.lucide.createIcons()
      }
      
      // 加载目录树和文件数据
      await directoryStore.fetchDirectoryTree()
      // 默认加载根目录下的文件，但根目录通常没有直接文件，所以加载第一个子目录的文件
      if (directoryStore.directoryTree.length > 0 && directoryStore.directoryTree[0].children) {
        const firstChild = directoryStore.directoryTree[0].children[0]
        if (firstChild) {
          currentDirectoryId.value = firstChild.id
          await fileStore.fetchFiles(firstChild.id)
        }
      }
    })

    const selectDirectory = async (directory) => {
      currentDirectoryId.value = directory.id
      directoryStore.setCurrentDirectory(directory)
      await fileStore.fetchFiles(directory.id)
    }

    const selectFile = (file) => {
      fileStore.selectFile(file)
    }

    const downloadFile = async (file) => {
      // 这里可以实现文件下载逻辑
      console.log('下载文件:', file.name)
    }

    const getFileIcon = (extension) => {
      const iconMap = {
        pdf: 'file-text',
        doc: 'file-text',
        docx: 'file-text',
        txt: 'file-text',
        md: 'file-text',
        jpg: 'image',
        jpeg: 'image',
        png: 'image',
        gif: 'image',
        mp4: 'video',
        mp3: 'music',
        zip: 'archive',
        rar: 'archive',
        xlsx: 'file-spreadsheet',
        xls: 'file-spreadsheet',
        pptx: 'presentation',
        ppt: 'presentation',
        js: 'code',
        ts: 'code',
        html: 'code',
        css: 'code',
        vue: 'code'
      }
      return iconMap[extension?.toLowerCase()] || 'file'
    }

    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })
    }

    return {
      directoryStore,
      fileStore,
      currentDirectoryId,
      selectDirectory,
      selectFile,
      downloadFile,
      getFileIcon,
      formatDate
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
  grid-template-columns: 320px 1fr;
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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  backdrop-filter: var(--backdrop-blur-lg);
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

/* 文件列表区域 */
.file-list {
  flex: 1;
  padding: var(--spacing-2xl);
  overflow-y: auto;
}

/* 占位符样式 */
.tree-placeholder,
.list-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--color-text-secondary);
}

.tree-placeholder {
  min-height: 200px;
}

.list-placeholder {
  min-height: 400px;
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

.tree-placeholder h4,
.list-placeholder h3 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  font-weight: var(--font-weight-semibold);
}

.tree-placeholder p,
.list-placeholder p {
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
.tree-loading,
.list-loading {
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

/* 文件网格样式 */
.file-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  padding: var(--spacing-md);
}

.file-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  backdrop-filter: var(--backdrop-blur-sm);
}

.file-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary-300);
}

.file-item.selected {
  background: var(--color-primary-50);
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.file-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-200));
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.file-icon-svg {
  width: 24px;
  height: 24px;
  color: var(--color-primary-600);
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-details {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.file-actions {
  display: flex;
  gap: var(--spacing-xs);
}

.action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.action-btn:hover {
  background: var(--color-primary-500);
  border-color: var(--color-primary-500);
  color: var(--color-text-inverse);
}

.action-icon {
  width: 16px;
  height: 16px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 280px 1fr;
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