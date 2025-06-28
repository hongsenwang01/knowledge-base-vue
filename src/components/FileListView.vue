<template>
  <div class="file-list-view">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载文件中...</p>
    </div>
    
    <!-- 错误状态 -->
    <div v-else-if="error" class="error-state">
      <div class="error-icon">
        <i data-lucide="alert-circle"></i>
      </div>
      <h3>加载失败</h3>
      <p>{{ error }}</p>
      <button class="retry-btn" @click="$emit('reload')">
        <i data-lucide="refresh-cw"></i>
        重试
      </button>
    </div>
    
    <!-- 文件列表 -->
    <div v-else-if="files.length > 0" class="file-list">
      <!-- 表头 -->
      <div class="list-header">
        <div class="col-name">名称</div>
        <div class="col-size">大小</div>
        <div class="col-date">修改时间</div>
        <div class="col-actions">操作</div>
      </div>
      
      <!-- 文件行 -->
      <div class="list-body">
        <div 
          v-for="file in files" 
          :key="file.id"
          class="file-item"
          :class="{ selected: selectedFileIds.includes(file.id) }"
          @click="handleFileClick(file)"
          @dblclick="handleDownload(file)"
        >
          <div class="col-name">
            <div class="file-info">
              <div class="file-icon">
                <i :data-lucide="getFileIcon(file.extension)"></i>
              </div>
              <span class="file-name">{{ file.name }}</span>
            </div>
          </div>
          <div class="col-size">{{ file.formattedSize }}</div>
          <div class="col-date">{{ formatDate(file.updatedAt) }}</div>
          <div class="col-actions">
            <button 
              class="action-btn" 
              @click.stop="handleDownload(file)"
              title="下载文件"
            >
              <i data-lucide="download"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 空状态 -->
    <div v-else class="empty-state">
      <div class="empty-icon">
        <i data-lucide="folder-open"></i>
      </div>
      <h3>此目录为空</h3>
      <p>还没有文件，可以上传一些文件</p>
    </div>
  </div>
</template>

<script>
import { onMounted, nextTick, watch } from 'vue'

export default {
  name: 'FileListView',
  props: {
    files: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    },
    selectedFileIds: {
      type: Array,
      default: () => []
    }
  },
  emits: ['file-select', 'file-download', 'reload'],
  setup(props, { emit }) {
    
    const handleFileClick = (file) => {
      emit('file-select', file)
    }

    const handleDownload = (file) => {
      emit('file-download', file)
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

    // 监听props变化，重新初始化图标
    watch([() => props.files, () => props.loading, () => props.error], () => {
      nextTick(() => {
        if (window.lucide) {
          window.lucide.createIcons()
        }
      })
    }, { deep: true })

    onMounted(() => {
      // 初始化 Lucide 图标
      nextTick(() => {
        if (window.lucide) {
          window.lucide.createIcons()
        }
      })
    })

    return {
      handleFileClick,
      handleDownload,
      getFileIcon,
      formatDate
    }
  }
}
</script>

<style scoped>
.file-list-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 2rem;
  color: #6b7280;
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
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
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

.error-state h3 {
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

/* 文件列表 */
.file-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.list-header {
  display: grid;
  grid-template-columns: 2fr 120px 160px 80px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
  font-size: 0.875rem;
  color: #374151;
}

.list-body {
  flex: 1;
  overflow-y: auto;
}

.file-item {
  display: grid;
  grid-template-columns: 2fr 120px 160px 80px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: all 0.2s;
  align-items: center;
}

.file-item:hover {
  background: #f9fafb;
}

.file-item.selected {
  background: #eff6ff;
  border-left: 3px solid #3b82f6;
}

.file-item:last-child {
  border-bottom: none;
}

/* 列样式 */
.col-name {
  display: flex;
  align-items: center;
  min-width: 0;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.file-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.file-icon i {
  width: 18px;
  height: 18px;
  color: #3b82f6;
}

.file-name {
  font-weight: 500;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-item.selected .file-name {
  color: #1d4ed8;
  font-weight: 600;
}

.col-size {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: right;
}

.col-date {
  font-size: 0.875rem;
  color: #6b7280;
  text-align: right;
}

.col-actions {
  display: flex;
  justify-content: center;
}

.action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0;
}

.file-item:hover .action-btn,
.file-item.selected .action-btn {
  opacity: 1;
}

.action-btn:hover {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
  transform: scale(1.05);
}

.action-btn i {
  width: 16px;
  height: 16px;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 2rem;
  text-align: center;
  color: #6b7280;
}

.empty-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.empty-icon i {
  width: 32px;
  height: 32px;
  color: #3b82f6;
}

.empty-state h3 {
  color: #111827;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .list-header,
  .file-item {
    grid-template-columns: 1fr 80px 60px;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
  }
  
  .col-date {
    display: none;
  }
  
  .file-icon {
    width: 28px;
    height: 28px;
  }
  
  .file-icon i {
    width: 16px;
    height: 16px;
  }
  
  .action-btn {
    opacity: 1; /* 移动端始终显示 */
    width: 28px;
    height: 28px;
  }
}

@media (max-width: 480px) {
  .list-header,
  .file-item {
    grid-template-columns: 1fr 50px;
  }
  
  .col-size {
    display: none;
  }
  
  .file-info {
    gap: 0.5rem;
  }
  
  .file-name {
    font-size: 0.875rem;
  }
}
</style>
