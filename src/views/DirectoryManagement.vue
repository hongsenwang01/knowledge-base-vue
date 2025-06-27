<template>
  <div class="directory-management">
    <div class="directory-management-container">
      <!-- 页面头部 -->
      <header class="page-header">
        <div class="header-content">
          <h1 class="page-title">目录管理</h1>
          <p class="page-subtitle">管理文件夹结构和权限</p>
        </div>
        <div class="header-actions">
          <router-link to="/files" class="btn btn-secondary">
            <span class="btn-icon">🗂️</span>
            文件管理
          </router-link>
          <router-link to="/" class="btn btn-secondary">
            <span class="btn-icon">🏠</span>
            返回首页
          </router-link>
        </div>
      </header>

      <!-- 工具栏 -->
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn btn-primary" disabled>
            <span class="btn-icon">➕</span>
            新建文件夹
          </button>
          <button class="btn btn-outline" disabled>
            <span class="btn-icon">📝</span>
            批量操作
          </button>
        </div>
        <div class="toolbar-right">
          <div class="view-switcher">
            <button class="btn btn-icon active" title="列表视图">
              <span>📋</span>
            </button>
            <button class="btn btn-icon" title="树形视图">
              <span>🌳</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <div class="main-content">
        <!-- 目录统计卡片 -->
        <div class="stats-grid">
          <div class="stats-card">
            <div class="stats-icon">📁</div>
            <div class="stats-content">
              <div class="stats-number">--</div>
              <div class="stats-label">总文件夹</div>
            </div>
          </div>
          <div class="stats-card">
            <div class="stats-icon">📄</div>
            <div class="stats-content">
              <div class="stats-number">--</div>
              <div class="stats-label">总文件</div>
            </div>
          </div>
          <div class="stats-card">
            <div class="stats-icon">💾</div>
            <div class="stats-content">
              <div class="stats-number">--</div>
              <div class="stats-label">总大小</div>
            </div>
          </div>
          <div class="stats-card">
            <div class="stats-icon">🕒</div>
            <div class="stats-content">
              <div class="stats-number">--</div>
              <div class="stats-label">最近修改</div>
            </div>
          </div>
        </div>

        <!-- 目录管理表格 -->
        <div class="directory-table-container">
          <div class="table-header">
            <h3>目录列表</h3>
            <div class="table-actions">
              <div class="search-box">
                <input 
                  type="text" 
                  placeholder="搜索目录..." 
                  class="search-input"
                  disabled
                >
                <span class="search-icon">🔍</span>
              </div>
            </div>
          </div>
          
          <div class="table-content">
            <div class="table-placeholder">
              <div class="placeholder-icon">🗂️</div>
              <h3>目录管理功能开发中</h3>
              <p>这里将显示完整的目录管理功能</p>
              <div class="placeholder-features">
                <div class="feature-group">
                  <h4>🏗️ 基础功能</h4>
                  <div class="feature-item">✓ 目录创建与删除</div>
                  <div class="feature-item">✓ 目录重命名</div>
                  <div class="feature-item">✓ 目录移动</div>
                  <div class="feature-item">✓ 目录复制</div>
                </div>
                <div class="feature-group">
                  <h4>📊 管理功能</h4>
                  <div class="feature-item">✓ 权限管理</div>
                  <div class="feature-item">✓ 批量操作</div>
                  <div class="feature-item">✓ 目录统计</div>
                  <div class="feature-item">✓ 历史记录</div>
                </div>
                <div class="feature-group">
                  <h4>🎨 界面特色</h4>
                  <div class="feature-item">✓ 树形视图</div>
                  <div class="feature-item">✓ 列表视图</div>
                  <div class="feature-item">✓ 拖拽操作</div>
                  <div class="feature-item">✓ 右键菜单</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DirectoryManagement',
  setup() {
    return {}
  }
}
</script>

<style scoped>
.directory-management {
  min-height: 100vh;
  background: var(--color-bg-primary);
}

.directory-management-container {
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

.header-actions {
  display: flex;
  gap: var(--spacing-sm);
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

/* 工具栏 */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border-light);
}

.toolbar-left {
  display: flex;
  gap: var(--spacing-sm);
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.view-switcher {
  display: flex;
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
}

.view-switcher .btn {
  border: none;
  border-radius: 0;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-bg-primary);
  color: var(--color-text-secondary);
}

.view-switcher .btn.active {
  background: var(--color-primary-500);
  color: white;
}

/* 按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  transition: all var(--transition-normal);
  border: none;
  cursor: pointer;
  text-decoration: none;
}

.btn-primary {
  background: var(--color-primary-500);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-primary-600);
}

.btn-outline {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-light);
}

.btn-outline:hover:not(:disabled) {
  background: var(--color-bg-tertiary);
  border-color: var(--color-primary-200);
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

.btn-icon {
  background: transparent;
  border: none;
  padding: var(--spacing-xs);
  color: var(--color-text-secondary);
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.stats-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: all var(--transition-normal);
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary-200);
}

.stats-icon {
  font-size: 2rem;
  opacity: 0.8;
}

.stats-content {
  flex: 1;
}

.stats-number {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.stats-label {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

/* 目录表格 */
.directory-table-container {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-tertiary);
}

.table-header h3 {
  margin: 0;
  color: var(--color-text-primary);
}

.table-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-sm);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: 0.9rem;
  width: 250px;
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

.table-content {
  padding: var(--spacing-lg);
  min-height: 400px;
}

/* 占位符样式 */
.table-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--color-text-secondary);
  min-height: 300px;
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  opacity: 0.6;
}

.table-placeholder h3 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.table-placeholder p {
  margin-bottom: var(--spacing-lg);
}

.placeholder-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  text-align: left;
  max-width: 800px;
}

.feature-group h4 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: 1rem;
}

.feature-item {
  color: var(--color-success-600);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-xs);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .placeholder-features {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .directory-management-container {
    padding: var(--spacing-sm);
  }
  
  .page-header {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
  
  .toolbar {
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: stretch;
  }
  
  .toolbar-left,
  .toolbar-right {
    justify-content: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .table-header {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
  
  .search-input {
    width: 100%;
  }
}
</style> 