<template>
  <div class="file-management">
    <div class="file-management-container">
      <!-- 页面头部 -->
      <header class="page-header">
        <div class="header-content">
          <h1 class="page-title">文件管理</h1>
          <p class="page-subtitle">管理您的文件和文档</p>
        </div>
        <div class="header-actions">
          <router-link to="/" class="btn btn-secondary">
            <span class="btn-icon">🏠</span>
            返回首页
          </router-link>
        </div>
      </header>

      <!-- 主要内容区域 -->
      <div class="main-content">
        <!-- 左侧目录树区域 -->
        <aside class="sidebar">
          <div class="sidebar-header">
            <h3>目录结构</h3>
          </div>
          <div class="directory-tree">
            <div class="tree-placeholder">
              <div class="placeholder-icon">📁</div>
              <p>目录树组件开发中...</p>
            </div>
          </div>
        </aside>

        <!-- 右侧文件区域 -->
        <main class="content-area">
          <!-- 工具栏 -->
          <div class="toolbar">
            <div class="search-section">
              <div class="search-input-wrapper">
                <input 
                  type="text" 
                  placeholder="搜索文件..." 
                  class="search-input"
                  disabled
                >
                <span class="search-icon">🔍</span>
              </div>
            </div>
            <div class="action-section">
              <button class="btn btn-primary" disabled>
                <span class="btn-icon">📤</span>
                上传文件
              </button>
            </div>
          </div>

          <!-- 文件列表区域 -->
          <div class="file-list">
            <div class="list-placeholder">
              <div class="placeholder-icon">📄</div>
              <h3>文件列表组件开发中</h3>
              <p>这里将显示当前目录下的所有文件</p>
              <div class="placeholder-features">
                <div class="feature-item">✓ 文件列表展示</div>
                <div class="feature-item">✓ 文件类型图标</div>
                <div class="feature-item">✓ 文件大小和修改时间</div>
                <div class="feature-item">✓ 文件操作菜单</div>
                <div class="feature-item">✓ 批量选择操作</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileManagement',
  setup() {
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
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-md);
}

/* 页面头部 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border-light);
}

.header-content h1 {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.header-content p {
  color: var(--color-text-secondary);
  margin: 0;
}

.header-actions .btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  text-decoration: none;
  font-weight: 500;
  transition: all var(--transition-normal);
  border: none;
  cursor: pointer;
}

.btn-secondary {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-light);
}

.btn-secondary:hover {
  background: var(--color-bg-quaternary);
  border-color: var(--color-primary-200);
}

/* 主要内容区域 */
.main-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--spacing-lg);
  min-height: calc(100vh - 200px);
}

/* 左侧边栏 */
.sidebar {
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border-light);
  overflow: hidden;
}

.sidebar-header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-tertiary);
}

.sidebar-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.directory-tree {
  padding: var(--spacing-md);
}

/* 右侧内容区域 */
.content-area {
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border-light);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 工具栏 */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-tertiary);
  gap: var(--spacing-md);
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
  padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-sm);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: 0.9rem;
  transition: all var(--transition-normal);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary-300);
  box-shadow: 0 0 0 3px var(--color-primary-50);
}

.search-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.search-icon {
  position: absolute;
  right: var(--spacing-sm);
  color: var(--color-text-secondary);
  pointer-events: none;
}

.action-section .btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  transition: all var(--transition-normal);
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: var(--color-primary-500);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-primary-600);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 文件列表区域 */
.file-list {
  flex: 1;
  padding: var(--spacing-lg);
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
  padding: var(--spacing-xl);
  color: var(--color-text-secondary);
}

.tree-placeholder {
  min-height: 200px;
}

.list-placeholder {
  min-height: 400px;
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  opacity: 0.6;
}

.list-placeholder h3 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.list-placeholder p {
  margin-bottom: var(--spacing-lg);
}

.placeholder-features {
  display: grid;
  gap: var(--spacing-xs);
  text-align: left;
}

.feature-item {
  color: var(--color-success-600);
  font-size: 0.9rem;
}

.btn-icon {
  font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 250px 1fr;
  }
}

@media (max-width: 768px) {
  .file-management-container {
    padding: var(--spacing-sm);
  }
  
  .page-header {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
  
  .main-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
  
  .toolbar {
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: stretch;
  }
  
  .search-section {
    max-width: none;
  }
}
</style> 