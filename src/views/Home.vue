<template>
  <div class="home">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <div class="home-container">
      <!-- 主要内容 -->
      <div class="hero-section">
        <div class="hero-icon">
          <i data-lucide="hard-drive" class="hero-icon-svg"></i>
        </div>
        
        <h1 class="hero-title">文件管理系统</h1>
        <p class="hero-subtitle">现代化的文件管理解决方案，为您的数字生活提供强大支持</p>
        
        <div class="hero-actions">
          <router-link to="/files" class="btn btn-primary">
            <i data-lucide="folder-open" class="btn-icon"></i>
            开始管理文件
          </router-link>
          
          <router-link to="/directories" class="btn btn-secondary">
            <i data-lucide="settings" class="btn-icon"></i>
            目录管理
          </router-link>
        </div>
      </div>

      <!-- 功能特色 -->
      <div class="features-section">
        <div class="section-header">
          <h2 class="section-title">强大功能</h2>
          <p class="section-subtitle">为您的文件管理需求提供全方位支持</p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <i data-lucide="folder-plus" class="feature-icon-svg"></i>
            </div>
            <h3 class="feature-title">智能目录管理</h3>
            <p class="feature-description">创建、编辑、删除文件夹，支持拖拽移动，轻松管理目录结构</p>
            <div class="feature-tags">
              <span class="tag">拖拽操作</span>
              <span class="tag">批量管理</span>
            </div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i data-lucide="upload-cloud" class="feature-icon-svg"></i>
            </div>
            <h3 class="feature-title">高效文件上传</h3>
            <p class="feature-description">支持多文件批量上传，拖拽上传，实时进度显示，断点续传</p>
            <div class="feature-tags">
              <span class="tag">批量上传</span>
              <span class="tag">进度跟踪</span>
            </div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i data-lucide="search" class="feature-icon-svg"></i>
            </div>
            <h3 class="feature-title">智能搜索</h3>
            <p class="feature-description">快速搜索文件名、类型、内容，支持高级筛选，精准定位目标文件</p>
            <div class="feature-tags">
              <span class="tag">实时搜索</span>
              <span class="tag">高级筛选</span>
            </div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i data-lucide="eye" class="feature-icon-svg"></i>
            </div>
            <h3 class="feature-title">文件预览</h3>
            <p class="feature-description">支持图片、文档、视频等多种格式在线预览，无需下载即可查看</p>
            <div class="feature-tags">
              <span class="tag">多格式支持</span>
              <span class="tag">即时预览</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 统计信息 -->
      <div class="stats-section">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-icon">
              <i data-lucide="zap" class="stat-icon-svg"></i>
            </div>
            <div class="stat-content">
              <div class="stat-number">99.9%</div>
              <div class="stat-label">系统可用性</div>
            </div>
          </div>
          
          <div class="stat-item">
            <div class="stat-icon">
              <i data-lucide="shield-check" class="stat-icon-svg"></i>
            </div>
            <div class="stat-content">
              <div class="stat-number">256位</div>
              <div class="stat-label">安全加密</div>
            </div>
          </div>
          
          <div class="stat-item">
            <div class="stat-icon">
              <i data-lucide="clock" class="stat-icon-svg"></i>
            </div>
            <div class="stat-content">
              <div class="stat-number">24/7</div>
              <div class="stat-label">全天候服务</div>
            </div>
          </div>
          
          <div class="stat-item">
            <div class="stat-icon">
              <i data-lucide="users" class="stat-icon-svg"></i>
            </div>
            <div class="stat-content">
              <div class="stat-number">10K+</div>
              <div class="stat-label">用户信赖</div>
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
  name: 'Home',
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
.home {
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, 
    var(--color-primary-50) 0%, 
    var(--color-bg-primary) 40%, 
    var(--color-primary-50) 100%
  );
}

/* 背景装饰 */
.background-decoration {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: var(--border-radius-full);
  filter: blur(60px);
  opacity: 0.1;
  animation: float 20s ease-in-out infinite;
}

.blob-1 {
  width: 300px;
  height: 300px;
  background: var(--color-primary-400);
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.blob-2 {
  width: 200px;
  height: 200px;
  background: var(--color-primary-600);
  top: 50%;
  right: 20%;
  animation-delay: -7s;
}

.blob-3 {
  width: 250px;
  height: 250px;
  background: var(--color-primary-300);
  bottom: 20%;
  left: 20%;
  animation-delay: -14s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); }
  33% { transform: translateY(-30px) scale(1.1); }
  66% { transform: translateY(20px) scale(0.9); }
}

.home-container {
  position: relative;
  z-index: 1;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--spacing-2xl) var(--spacing-lg);
}

/* Hero 区域 */
.hero-section {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
  padding: var(--spacing-3xl) 0;
}

.hero-icon {
  width: 120px;
  height: 120px;
  margin: 0 auto var(--spacing-xl);
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  border-radius: var(--border-radius-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-xl);
  backdrop-filter: var(--backdrop-blur-md);
}

.hero-icon-svg {
  width: 60px;
  height: 60px;
  color: var(--color-text-inverse);
}

.hero-title {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
  line-height: var(--line-height-tight);
  background: linear-gradient(135deg, var(--color-text-primary), var(--color-primary-600));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-2xl);
  line-height: var(--line-height-relaxed);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  flex-wrap: wrap;
}

/* 功能特色区域 */
.features-section {
  margin-bottom: var(--spacing-3xl);
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.section-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.section-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 500px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.feature-card {
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-xl);
  backdrop-filter: var(--backdrop-blur-lg);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-primary-200), transparent);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-2xl);
  border-color: var(--color-primary-200);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin-bottom: var(--spacing-lg);
  background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-200));
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon-svg {
  width: 32px;
  height: 32px;
  color: var(--color-primary-600);
}

.feature-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.feature-description {
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-lg);
}

.feature-tags {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.tag {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

/* 统计信息区域 */
.stats-section {
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-2xl);
  padding: var(--spacing-2xl);
  backdrop-filter: var(--backdrop-blur-lg);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  text-align: left;
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon-svg {
  width: 24px;
  height: 24px;
  color: white;
}

.stat-number {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

/* 按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg) var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  transition: all var(--transition-normal);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left var(--transition-slow);
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-lg);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.btn-secondary {
  background: var(--color-bg-overlay);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-medium);
  backdrop-filter: var(--backdrop-blur-md);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-300);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-container {
    padding: var(--spacing-lg) var(--spacing-md);
  }
  
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stat-item {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style> 