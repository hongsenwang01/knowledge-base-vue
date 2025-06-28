<template>
  <div class="stats-grid">
    <!-- 加载状态 -->
    <div v-if="loading" class="stats-loading">
      <div class="loading-spinner"></div>
      <p>加载统计数据中...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="stats-error">
      <div class="error-icon">
        <i data-lucide="alert-circle"></i>
      </div>
      <h3>加载失败</h3>
      <p>{{ error }}</p>
      <button class="retry-btn" @click="loadStatistics">
        <i data-lucide="refresh-cw"></i>
        重试
      </button>
    </div>

    <!-- 统计卡片 -->
    <template v-else>
      <div class="stats-card">
        <div class="stats-icon folders">
          <i data-lucide="folder" class="stats-icon-svg"></i>
        </div>
        <div class="stats-content">
          <div class="stats-number">{{ stats.totalFolders.toLocaleString() }}</div>
          <div class="stats-label">总文件夹</div>
        </div>
      </div>
      
      <div class="stats-card">
        <div class="stats-icon files">
          <i data-lucide="file-text" class="stats-icon-svg"></i>
        </div>
        <div class="stats-content">
          <div class="stats-number">{{ stats.totalFiles.toLocaleString() }}</div>
          <div class="stats-label">总文件</div>
        </div>
      </div>
      
      <div class="stats-card">
        <div class="stats-icon storage">
          <i data-lucide="hard-drive" class="stats-icon-svg"></i>
        </div>
        <div class="stats-content">
          <div class="stats-number">{{ stats.totalSize }}</div>
          <div class="stats-label">总大小</div>
        </div>
      </div>
      
      <div class="stats-card">
        <div class="stats-icon time">
          <i data-lucide="clock" class="stats-icon-svg"></i>
        </div>
        <div class="stats-content">
          <div class="stats-number">{{ formatDate(stats.lastModified) }}</div>
          <div class="stats-label">最近修改</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue'
import { statisticsAPI, statisticsDataTransform } from '@/api/statistics.js'

export default {
  name: 'DirectoryStats',
  setup() {
    const stats = ref({
      totalFolders: 0,
      totalFiles: 0,
      totalSize: '0 B',
      totalSizeBytes: 0,
      lastModified: null
    })
    const loading = ref(false)
    const error = ref(null)

    const formatDate = (dateString) => {
      if (!dateString) return '--'
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        month: 'numeric',
        day: 'numeric'
      })
    }

    const loadStatistics = async () => {
      loading.value = true
      error.value = null
      
      try {
        console.log('正在获取系统统计信息...')
        
        // 调用API获取统计数据
        const response = await statisticsAPI.getSystemStatistics()
        console.log('获取到统计数据:', response)
        
        // 转换数据格式以匹配组件需求
        stats.value = statisticsDataTransform.transformSystemStats(response)
        
        console.log('统计数据加载成功:', stats.value)
      } catch (err) {
        console.error('获取统计数据失败:', err)
        error.value = err.message || '获取统计数据失败'
        
        // 设置默认值以防止显示错误
        stats.value = {
          totalFolders: 0,
          totalFiles: 0,
          totalSize: '0 B',
          totalSizeBytes: 0,
          lastModified: null
        }
      } finally {
        loading.value = false
        
        // 重新初始化图标
        nextTick(() => {
          if (window.lucide) {
            window.lucide.createIcons()
          }
        })
      }
    }

    onMounted(() => {
      loadStatistics()
    })

    return {
      stats,
      loading,
      error,
      formatDate,
      loadStatistics
    }
  }
}
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* 加载状态 */
.stats-loading {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #6b7280;
  text-align: center;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 错误状态 */
.stats-error {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: #6b7280;
}

.error-icon {
  width: 64px;
  height: 64px;
  background: #fef2f2;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.error-icon i {
  width: 32px;
  height: 32px;
  color: #ef4444;
}

.stats-error h3 {
  color: #111827;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.retry-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 1rem;
  transition: all 0.2s;
}

.retry-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.retry-btn i {
  width: 16px;
  height: 16px;
}

/* 统计卡片 */
.stats-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stats-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.stats-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stats-icon-svg {
  width: 28px;
  height: 28px;
  color: #3b82f6;
}

.stats-content {
  flex: 1;
}

.stats-number {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
  line-height: 1.2;
}

.stats-label {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stats-card {
    padding: 1rem;
  }
  
  .stats-icon {
    width: 48px;
    height: 48px;
  }
  
  .stats-icon-svg {
    width: 24px;
    height: 24px;
  }
  
  .stats-number {
    font-size: 1.5rem;
  }
}
</style> 