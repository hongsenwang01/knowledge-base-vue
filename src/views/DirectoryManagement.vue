<template>
  <div class="directory-management">
    <div class="directory-management-container">
      <!-- 页面头部 -->
      <header class="page-header">
        <div class="header-content">
          <div class="header-icon">
            <i data-lucide="folder-cog" class="header-icon-svg"></i>
          </div>
          <div class="header-text">
            <h1 class="page-title">目录管理</h1>
            <p class="page-subtitle">管理文件夹结构和权限</p>
          </div>
        </div>
        <div class="header-actions">
          <router-link to="/files" class="btn btn-secondary">
            <i data-lucide="folder-open" class="btn-icon"></i>
            文件管理
          </router-link>
          <router-link to="/" class="btn btn-secondary">
            <i data-lucide="home" class="btn-icon"></i>
            返回首页
          </router-link>
        </div>
      </header>

      <!-- 工具栏 -->
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn btn-primary" disabled>
            <i data-lucide="folder-plus" class="btn-icon"></i>
            新建文件夹
          </button>
          <button class="btn btn-outline" disabled>
            <i data-lucide="edit-3" class="btn-icon"></i>
            批量操作
          </button>
        </div>
        <div class="toolbar-right">
          <div class="view-switcher">
            <button class="btn btn-icon active" title="列表视图">
              <i data-lucide="list" class="view-icon"></i>
            </button>
            <button class="btn btn-icon" title="树形视图">
              <i data-lucide="git-branch" class="view-icon"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <div class="main-content">
        <!-- 目录统计卡片 -->
        <div class="stats-grid">
          <div class="stats-card">
            <div class="stats-icon">
              <i data-lucide="folder" class="stats-icon-svg"></i>
            </div>
            <div class="stats-content">
              <div class="stats-number">--</div>
              <div class="stats-label">总文件夹</div>
            </div>
          </div>
          <div class="stats-card">
            <div class="stats-icon">
              <i data-lucide="file-text" class="stats-icon-svg"></i>
            </div>
            <div class="stats-content">
              <div class="stats-number">--</div>
              <div class="stats-label">总文件</div>
            </div>
          </div>
          <div class="stats-card">
            <div class="stats-icon">
              <i data-lucide="hard-drive" class="stats-icon-svg"></i>
            </div>
            <div class="stats-content">
              <div class="stats-number">--</div>
              <div class="stats-label">总大小</div>
            </div>
          </div>
          <div class="stats-card">
            <div class="stats-icon">
              <i data-lucide="clock" class="stats-icon-svg"></i>
            </div>
            <div class="stats-content">
              <div class="stats-number">--</div>
              <div class="stats-label">最近修改</div>
            </div>
          </div>
        </div>

        <!-- 目录管理表格 -->
        <div class="directory-table-container">
          <div class="table-header">
            <div class="table-title">
              <i data-lucide="folder-tree" class="table-title-icon"></i>
              <h3>目录列表</h3>
            </div>
            <div class="table-actions">
              <div class="search-box">
                <i data-lucide="search" class="search-icon"></i>
                <input 
                  type="text" 
                  placeholder="搜索目录..." 
                  class="search-input"
                  disabled
                >
              </div>
            </div>
          </div>
          
          <div class="table-content">
            <div class="table-placeholder">
              <div class="placeholder-icon">
                <i data-lucide="folder-cog" class="placeholder-icon-svg"></i>
              </div>
              <h3>目录管理功能开发中</h3>
              <p>这里将显示完整的目录管理功能</p>
              <div class="placeholder-features">
                <div class="feature-group">
                  <h4>
                    <i data-lucide="tool" class="feature-group-icon"></i>
                    基础功能
                  </h4>
                  <div class="feature-item">
                    <i data-lucide="check-circle" class="feature-check"></i>
                    目录创建与删除
                  </div>
                  <div class="feature-item">
                    <i data-lucide="check-circle" class="feature-check"></i>
                    目录重命名
                  </div>
                  <div class="feature-item">
                    <i data-lucide="check-circle" class="feature-check"></i>
                    目录移动
                  </div>
                  <div class="feature-item">
                    <i data-lucide="check-circle" class="feature-check"></i>
                    目录复制
                  </div>
                </div>
                <div class="feature-group">
                  <h4>
                    <i data-lucide="bar-chart" class="feature-group-icon"></i>
                    管理功能
                  </h4>
                  <div class="feature-item">
                    <i data-lucide="check-circle" class="feature-check"></i>
                    权限管理
                  </div>
                  <div class="feature-item">
                    <i data-lucide="check-circle" class="feature-check"></i>
                    批量操作
                  </div>
                  <div class="feature-item">
                    <i data-lucide="check-circle" class="feature-check"></i>
                    目录统计
                  </div>
                  <div class="feature-item">
                    <i data-lucide="check-circle" class="feature-check"></i>
                    历史记录
                  </div>
                </div>
                <div class="feature-group">
                  <h4>
                    <i data-lucide="palette" class="feature-group-icon"></i>
                    界面特色
                  </h4>
                  <div class="feature-item">
                    <i data-lucide="check-circle" class="feature-check"></i>
                    树形视图
                  </div>
                  <div class="feature-item">
                    <i data-lucide="check-circle" class="feature-check"></i>
                    列表视图
                  </div>
                  <div class="feature-item">
                    <i data-lucide="check-circle" class="feature-check"></i>
                    拖拽操作
                  </div>
                  <div class="feature-item">
                    <i data-lucide="check-circle" class="feature-check"></i>
                    右键菜单
                  </div>
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
import { onMounted } from 'vue'

export default {
  name: 'DirectoryManagement',
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
.directory-management {
  min-height: 100vh;
  background: var(--color-bg-primary);
}

.directory-management-container {
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

.header-actions {
  display: flex;
  gap: var(--spacing-sm);
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

/* 工具栏 */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-xl);
  backdrop-filter: var(--backdrop-blur-lg);
}

.toolbar-left {
  display: flex;
  gap: var(--spacing-md);
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.view-switcher {
  display: flex;
  border: 1px solid var(--color-border-medium);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  background: var(--color-bg-primary);
}

.view-switcher .btn {
  border: none;
  border-radius: 0;
  padding: var(--spacing-sm) var(--spacing-md);
  background: transparent;
  color: var(--color-text-tertiary);
  transition: all var(--transition-fast);
}

.view-switcher .btn.active {
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
}

.view-switcher .btn:hover:not(.active) {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
}

.view-icon {
  width: 16px;
  height: 16px;
}

/* 按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-normal);
  border: none;
  cursor: pointer;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: var(--color-text-inverse);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-outline {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-medium);
}

.btn-outline:hover:not(:disabled) {
  background: var(--color-bg-tertiary);
  border-color: var(--color-primary-300);
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

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.stats-card {
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  transition: all var(--transition-normal);
  backdrop-filter: var(--backdrop-blur-lg);
  position: relative;
  overflow: hidden;
}

.stats-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-primary-200), transparent);
}

.stats-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary-200);
}

.stats-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-200));
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stats-icon-svg {
  width: 28px;
  height: 28px;
  color: var(--color-primary-600);
}

.stats-content {
  flex: 1;
}

.stats-number {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.stats-label {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

/* 目录表格 */
.directory-table-container {
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  backdrop-filter: var(--backdrop-blur-lg);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-tertiary);
}

.table-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.table-title-icon {
  width: 20px;
  height: 20px;
  color: var(--color-primary-600);
}

.table-title h3 {
  margin: 0;
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}

.table-actions {
  display: flex;
  gap: var(--spacing-md);
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-md) var(--spacing-2xl);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--border-radius-lg);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  width: 280px;
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
  width: 18px;
  height: 18px;
  color: var(--color-text-tertiary);
  pointer-events: none;
}

.table-content {
  padding: var(--spacing-2xl);
  min-height: 400px;
}

/* 占位符样式 */
.table-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--color-text-secondary);
  min-height: 400px;
}

.placeholder-icon {
  width: 96px;
  height: 96px;
  margin-bottom: var(--spacing-xl);
  background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-200));
  border-radius: var(--border-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon-svg {
  width: 48px;
  height: 48px;
  color: var(--color-primary-600);
}

.table-placeholder h3 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-xl);
}

.table-placeholder p {
  margin-bottom: var(--spacing-2xl);
  color: var(--color-text-tertiary);
  font-size: var(--font-size-base);
}

.placeholder-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--spacing-xl);
  text-align: left;
  max-width: 900px;
}

.feature-group h4 {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
}

.feature-group-icon {
  width: 18px;
  height: 18px;
  color: var(--color-primary-600);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-md);
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
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .placeholder-features {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .directory-management-container {
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
  
  .header-actions {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .toolbar {
    flex-direction: column;
    gap: var(--spacing-lg);
    align-items: stretch;
  }
  
  .toolbar-left {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .toolbar-right {
    justify-content: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .table-header {
    flex-direction: column;
    gap: var(--spacing-lg);
    text-align: center;
  }
  
  .search-input {
    width: 100%;
  }
}
</style> 