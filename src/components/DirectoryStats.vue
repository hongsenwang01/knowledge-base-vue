<template>
  <div class="stats-grid">
    <div class="stats-card">
      <div class="stats-icon folders">
        <el-icon class="stats-icon-svg"><Folder /></el-icon>
      </div>
      <div class="stats-content">
        <div class="stats-number">{{ stats.totalFolders.toLocaleString() }}</div>
        <div class="stats-label">总文件夹</div>
      </div>
    </div>
    <div class="stats-card">
      <div class="stats-icon files">
        <el-icon class="stats-icon-svg"><Document /></el-icon>
      </div>
      <div class="stats-content">
        <div class="stats-number">{{ stats.totalFiles.toLocaleString() }}</div>
        <div class="stats-label">总文件</div>
      </div>
    </div>
    <div class="stats-card">
      <div class="stats-icon storage">
        <el-icon class="stats-icon-svg"><Monitor /></el-icon>
      </div>
      <div class="stats-content">
        <div class="stats-number">{{ stats.totalSize }}</div>
        <div class="stats-label">总大小</div>
      </div>
    </div>
    <div class="stats-card">
      <div class="stats-icon time">
        <el-icon class="stats-icon-svg"><Clock /></el-icon>
      </div>
      <div class="stats-content">
        <div class="stats-number">{{ formatDate(stats.lastModified) }}</div>
        <div class="stats-label">最近修改</div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { Folder, Document, Monitor, Clock } from '@element-plus/icons-vue'

export default {
  name: 'DirectoryStats',
  components: {
    Folder,
    Document,
    Monitor,
    Clock
  },
  props: {
    stats: {
      type: Object,
      required: true
    }
  },
  setup() {
    const formatDate = (dateString) => {
      if (!dateString) return '--'
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        month: 'numeric',
        day: 'numeric'
      })
    }

    onMounted(() => {
      // Element Plus 图标会自动渲染，无需手动初始化
    })

    return {
      formatDate
    }
  }
}
</script>

<style scoped>
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
  font-size: 28px;
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

/* 响应式设计 */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style> 