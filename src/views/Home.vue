<template>
  <div class="home">
    <div class="home-container">
      <header class="home-header">
        <h1 class="home-title">文件管理系统</h1>
        <p class="home-subtitle">现代化的文件管理解决方案</p>
      </header>

      <div class="home-content">
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">📁</div>
            <h3>目录管理</h3>
            <p>创建、编辑、删除文件夹，轻松管理目录结构</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📤</div>
            <h3>文件上传</h3>
            <p>支持多文件批量上传，拖拽上传，实时进度显示</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3>智能搜索</h3>
            <p>快速搜索文件名、类型，精准定位目标文件</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">👁️</div>
            <h3>文件预览</h3>
            <p>支持图片、文档、视频等多种格式在线预览</p>
          </div>
        </div>

        <div class="action-buttons">
          <router-link to="/files" class="btn btn-primary">
            <span class="btn-icon">🗂️</span>
            开始管理文件
          </router-link>
          
          <router-link to="/directories" class="btn btn-secondary">
            <span class="btn-icon">⚙️</span>
            目录管理
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  setup() {
    return {}
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-primary-100) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
}

.home-container {
  max-width: 1200px;
  width: 100%;
  text-align: center;
}

.home-header {
  margin-bottom: var(--spacing-xl);
}

.home-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-400));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.home-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin-bottom: 0;
}

.home-content {
  background: var(--color-bg-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(10px);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.feature-card {
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border-light);
  transition: all var(--transition-normal);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary-200);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.feature-card p {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  font-weight: 500;
  transition: all var(--transition-normal);
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: var(--color-primary-500);
  color: white;
}

.btn-primary:hover {
  background: var(--color-primary-600);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-light);
}

.btn-secondary:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-primary-200);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.btn-icon {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .home-title {
    font-size: 2rem;
  }
  
  .home-subtitle {
    font-size: 1rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}
</style> 