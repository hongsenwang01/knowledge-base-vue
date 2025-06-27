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
            <div class="tree-placeholder">
              <div class="placeholder-icon">
                <i data-lucide="folder" class="placeholder-icon-svg"></i>
              </div>
              <h4>目录树组件开发中</h4>
              <p>即将支持完整的目录树功能</p>
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
            <div class="list-placeholder">
              <div class="placeholder-icon">
                <i data-lucide="files" class="placeholder-icon-svg"></i>
              </div>
              <h3>文件列表组件开发中</h3>
              <p>这里将显示当前目录下的所有文件</p>
              <div class="placeholder-features">
                <div class="feature-item">
                  <i data-lucide="check-circle" class="feature-check"></i>
                  文件列表展示
                </div>
                <div class="feature-item">
                  <i data-lucide="check-circle" class="feature-check"></i>
                  文件类型图标
                </div>
                <div class="feature-item">
                  <i data-lucide="check-circle" class="feature-check"></i>
                  文件大小和修改时间
                </div>
                <div class="feature-item">
                  <i data-lucide="check-circle" class="feature-check"></i>
                  文件操作菜单
                </div>
                <div class="feature-item">
                  <i data-lucide="check-circle" class="feature-check"></i>
                  批量选择操作
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'FileManagement',
  setup() {
    onMounted(() => {
      // 初始化 Lucide 图标
      if (window.lucide) {
        window.lucide.createIcons()
      }
    })

    return {}
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