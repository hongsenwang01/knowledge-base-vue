<template>
  <div v-if="visible" class="upload-dialog-overlay" @click="handleOverlayClick">
    <div class="upload-dialog" @click.stop>
      <!-- 对话框头部 -->
      <div class="dialog-header">
        <div class="header-content">
          <i data-lucide="upload-cloud" class="header-icon"></i>
          <div class="header-text">
            <h3>文件上传</h3>
            <p>选择文件上传到当前目录</p>
          </div>
        </div>
        <button class="close-btn" @click="close">
          <i data-lucide="x" class="close-icon"></i>
        </button>
      </div>

      <!-- 文件选择区域 -->
      <div class="file-selector">
        <div 
          class="drop-zone"
          :class="{ 
            'drag-over': isDragOver,
            'has-files': selectedFiles.length > 0
          }"
          @dragover.prevent="handleDragOver"
          @dragleave.prevent="handleDragLeave"
          @drop.prevent="handleDrop"
          @click="triggerFileInput"
        >
          <input
            ref="fileInput"
            type="file"
            multiple
            accept="*/*"
            style="display: none"
            @change="handleFileSelect"
          >
          
          <div v-if="selectedFiles.length === 0" class="drop-zone-content">
            <div class="drop-icon">
              <i data-lucide="upload" class="upload-icon"></i>
            </div>
            <h4>拖拽文件到此处，或点击选择文件</h4>
            <p>支持单个或批量上传，最大文件大小 100MB</p>
          </div>

          <div v-else class="selected-files">
            <div class="files-header">
              <h4>已选择 {{ selectedFiles.length }} 个文件</h4>
              <button class="add-more-btn" @click="triggerFileInput">
                <i data-lucide="plus" class="plus-icon"></i>
                添加更多
              </button>
            </div>
            
            <div class="files-list">
              <div 
                v-for="(file, index) in selectedFiles" 
                :key="index"
                class="file-item"
              >
                <div class="file-icon">
                  <i :data-lucide="getFileIcon(file)" class="file-icon-svg"></i>
                </div>
                <div class="file-info">
                  <h5 class="file-name">{{ file.name }}</h5>
                  <p class="file-size">{{ formatFileSize(file.size) }}</p>
                </div>
                <button class="remove-btn" @click="removeFile(index)">
                  <i data-lucide="trash-2" class="remove-icon"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 文件描述 -->
        <div class="description-input">
          <label for="file-description" class="input-label">文件描述（可选）</label>
          <textarea
            id="file-description"
            v-model="description"
            placeholder="为这些文件添加描述信息..."
            class="description-textarea"
            rows="3"
          ></textarea>
        </div>
      </div>

      <!-- 上传进度区域 -->
      <div v-if="isUploading" class="upload-progress">
        <div class="progress-header">
          <h4>上传进度</h4>
          <span class="progress-text">{{ uploadProgress }}%</span>
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: uploadProgress + '%' }"
          ></div>
        </div>
        <div class="upload-stats">
          <span class="upload-speed">{{ uploadSpeed }}</span>
          <span class="remaining-time">剩余时间: {{ remainingTime }}</span>
        </div>
      </div>

      <!-- 对话框底部 -->
      <div class="dialog-footer">
        <button class="btn btn-secondary" @click="close" :disabled="isUploading">
          取消
        </button>
        <button 
          class="btn btn-primary" 
          @click="handleUpload"
          :disabled="selectedFiles.length === 0 || isUploading"
        >
          <i data-lucide="upload" class="btn-icon"></i>
          {{ isUploading ? '上传中...' : '开始上传' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { fileAPI } from '@/api/file.js'

export default {
  name: 'FileUploadDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    directoryId: {
      type: [String, Number],
      required: true
    }
  },
  emits: ['close', 'upload-success', 'upload-error'],
  setup(props, { emit }) {
    const fileInput = ref(null)
    const selectedFiles = ref([])
    const description = ref('')
    const isDragOver = ref(false)
    const isUploading = ref(false)
    const uploadProgress = ref(0)
    const uploadSpeed = ref('0 B/s')
    const remainingTime = ref('--')

    // 文件选择处理
    const triggerFileInput = () => {
      fileInput.value?.click()
    }

    const handleFileSelect = (event) => {
      const files = Array.from(event.target.files)
      addFiles(files)
      // 清空input值，允许重复选择同一文件
      event.target.value = ''
    }

    const addFiles = (newFiles) => {
      // 过滤已存在的文件
      const filteredFiles = newFiles.filter(newFile => {
        return !selectedFiles.value.some(existingFile => 
          existingFile.name === newFile.name && existingFile.size === newFile.size
        )
      })
      
      selectedFiles.value.push(...filteredFiles)
      
      // 初始化图标
      nextTick(() => {
        if (window.lucide) {
          window.lucide.createIcons()
        }
      })
    }

    const removeFile = (index) => {
      selectedFiles.value.splice(index, 1)
    }

    // 拖拽处理
    const handleDragOver = () => {
      isDragOver.value = true
    }

    const handleDragLeave = () => {
      isDragOver.value = false
    }

    const handleDrop = (event) => {
      isDragOver.value = false
      const files = Array.from(event.dataTransfer.files)
      addFiles(files)
    }

    // 文件上传处理
    const handleUpload = async () => {
      if (selectedFiles.value.length === 0) return

      isUploading.value = true
      uploadProgress.value = 0

      try {
        const uploadPromises = selectedFiles.value.map(file => {
          return fileAPI.uploadFile(file, props.directoryId, description.value, (progress) => {
            // 更新上传进度
            updateUploadProgress(progress)
          })
        })

        const results = await Promise.all(uploadPromises)
        
        // 上传成功
        emit('upload-success', results)
        close()
        
      } catch (error) {
        console.error('文件上传失败:', error)
        emit('upload-error', error)
      } finally {
        isUploading.value = false
        uploadProgress.value = 0
      }
    }

    const updateUploadProgress = (progress) => {
      uploadProgress.value = progress.percent
      
      // 计算上传速度
      const speed = formatFileSize(progress.loaded / ((Date.now() - uploadStartTime) / 1000))
      uploadSpeed.value = speed + '/s'
      
      // 计算剩余时间
      const remainingBytes = progress.total - progress.loaded
      const bytesPerSecond = progress.loaded / ((Date.now() - uploadStartTime) / 1000)
      const remainingSeconds = Math.round(remainingBytes / bytesPerSecond)
      remainingTime.value = formatTime(remainingSeconds)
    }

    let uploadStartTime = 0

    // 工具函数
    const getFileIcon = (file) => {
      const extension = file.name.split('.').pop()?.toLowerCase()
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
      return iconMap[extension] || 'file'
    }

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const formatTime = (seconds) => {
      if (!seconds || seconds === Infinity) return '--'
      if (seconds < 60) return `${seconds}秒`
      if (seconds < 3600) return `${Math.floor(seconds / 60)}分${seconds % 60}秒`
      return `${Math.floor(seconds / 3600)}小时${Math.floor((seconds % 3600) / 60)}分钟`
    }

    // 对话框控制
    const close = () => {
      if (isUploading.value) return
      
      selectedFiles.value = []
      description.value = ''
      uploadProgress.value = 0
      emit('close')
    }

    const handleOverlayClick = () => {
      close()
    }

    // 键盘事件处理
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    onMounted(() => {
      document.addEventListener('keydown', handleKeyDown)
      if (window.lucide) {
        window.lucide.createIcons()
      }
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeyDown)
    })

    return {
      fileInput,
      selectedFiles,
      description,
      isDragOver,
      isUploading,
      uploadProgress,
      uploadSpeed,
      remainingTime,
      triggerFileInput,
      handleFileSelect,
      removeFile,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      handleUpload,
      getFileIcon,
      formatFileSize,
      close,
      handleOverlayClick
    }
  }
}
</script>

<style scoped>
.upload-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.upload-dialog {
  background: var(--color-bg-primary);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-xl);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid var(--color-border-light);
}

/* 对话框头部 */
.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-overlay);
  border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;
}

.header-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.header-icon {
  width: 24px;
  height: 24px;
  color: var(--color-primary-600);
}

.header-text h3 {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.header-text p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.close-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.close-btn:hover {
  background: var(--color-bg-secondary);
}

.close-icon {
  width: 18px;
  height: 18px;
  color: var(--color-text-secondary);
}

/* 文件选择区域 */
.file-selector {
  padding: var(--spacing-lg);
}

.drop-zone {
  border: 2px dashed var(--color-border-medium);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  background: var(--color-bg-overlay);
  margin-bottom: var(--spacing-lg);
}

.drop-zone:hover {
  border-color: var(--color-primary-400);
  background: var(--color-primary-50);
}

.drop-zone.drag-over {
  border-color: var(--color-primary-500);
  background: var(--color-primary-100);
  transform: scale(1.02);
}

.drop-zone.has-files {
  text-align: left;
  padding: var(--spacing-md);
}

.drop-zone-content {
  padding: var(--spacing-lg);
}

.drop-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-lg);
  background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-200));
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-icon {
  width: 32px;
  height: 32px;
  color: var(--color-primary-600);
}

.drop-zone-content h4 {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

.drop-zone-content p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

/* 已选择文件列表 */
.files-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.files-header h4 {
  margin: 0;
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

.add-more-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.add-more-btn:hover {
  background: var(--color-primary-600);
}

.plus-icon {
  width: 14px;
  height: 14px;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  max-height: 200px;
  overflow-y: auto;
}

.file-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-md);
}

.file-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-200));
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.file-icon-svg {
  width: 16px;
  height: 16px;
  color: var(--color-primary-600);
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  margin: 0;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.remove-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
  color: var(--color-text-tertiary);
}

.remove-btn:hover {
  background: var(--color-danger-100);
  color: var(--color-danger-600);
}

.remove-icon {
  width: 14px;
  height: 14px;
}

/* 描述输入 */
.description-input {
  margin-top: var(--spacing-lg);
}

.input-label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.description-textarea {
  width: 100%;
  padding: var(--spacing-md);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--border-radius-lg);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  transition: all var(--transition-normal);
}

.description-textarea:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

/* 上传进度 */
.upload-progress {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
  background: var(--color-bg-overlay);
}

.progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.progress-header h4 {
  margin: 0;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.progress-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-600);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--color-bg-tertiary);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  margin-bottom: var(--spacing-md);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary-500), var(--color-primary-600));
  border-radius: var(--border-radius-md);
  transition: width var(--transition-normal);
}

.upload-stats {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* 对话框底部 */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
  background: var(--color-bg-overlay);
  border-radius: 0 0 var(--border-radius-xl) var(--border-radius-xl);
}

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
  font-size: var(--font-size-base);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-medium);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--color-bg-quaternary);
  border-color: var(--color-primary-300);
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: var(--color-text-inverse);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-icon {
  width: 16px;
  height: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .upload-dialog {
    width: 95%;
    margin: var(--spacing-md);
  }
  
  .dialog-header {
    padding: var(--spacing-md);
  }
  
  .file-selector {
    padding: var(--spacing-md);
  }
  
  .drop-zone {
    padding: var(--spacing-lg);
  }
  
  .dialog-footer {
    padding: var(--spacing-md);
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style> 