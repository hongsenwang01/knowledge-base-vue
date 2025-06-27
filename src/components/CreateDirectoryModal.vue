<template>
  <div v-if="show" class="modal-overlay" @click="$emit('cancel')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <div class="modal-title">
          <el-icon class="modal-icon"><FolderAdd /></el-icon>
          <h3>新建文件夹</h3>
        </div>
        <button class="modal-close" @click="$emit('cancel')">
          <el-icon><Close /></el-icon>
        </button>
      </div>
      
      <div class="modal-body">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="parentDirectory" class="form-label">创建位置</label>
            <select
              id="parentDirectory"
              v-model="formData.parentId"
              class="form-select"
            >
              <option :value="rootDirectoryId">根目录</option>
              <option 
                v-for="directory in filteredDirectories" 
                :key="directory.id" 
                :value="directory.id"
              >
                {{ getDisplayPath(directory) }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="directoryName" class="form-label">文件夹名称 <span class="required">*</span></label>
            <input
              id="directoryName"
              v-model="formData.name"
              type="text"
              class="form-input"
              placeholder="请输入文件夹名称"
              maxlength="100"
              required
            >
            <div class="form-hint">最多100个字符</div>
          </div>
          
          <div class="form-group">
            <label for="directoryDescription" class="form-label">文件夹描述</label>
            <textarea
              id="directoryDescription"
              v-model="formData.description"
              class="form-textarea"
              placeholder="请输入文件夹描述（可选）"
              rows="3"
              maxlength="500"
            ></textarea>
            <div class="form-hint">最多500个字符，当前 {{ formData.description.length }}/500</div>
          </div>
          
          <div class="form-preview" v-if="previewPath">
            <div class="preview-label">预览路径：</div>
            <div class="preview-path">{{ previewPath }}</div>
          </div>
        </form>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
          <el-icon class="btn-icon"><Close /></el-icon>
          取消
        </button>
        <button 
          type="button" 
          class="btn btn-primary" 
          @click="handleSubmit" 
          :disabled="!formData.name.trim() || isSubmitting"
        >
          <el-icon class="btn-icon" v-if="!isSubmitting"><Check /></el-icon>
          <div class="loading-spinner" v-if="isSubmitting"></div>
          {{ isSubmitting ? '创建中...' : '创建' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import toast from '@/utils/toast'
// 导入Element Plus图标
import { FolderAdd, Close, Check } from '@element-plus/icons-vue'

export default {
  name: 'CreateDirectoryModal',
  components: {
    FolderAdd,
    Close,
    Check
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    directories: {
      type: Array,
      default: () => []
    }
  },
  emits: ['create', 'cancel'],
  setup(props, { emit }) {
    const formData = ref({
      name: '',
      description: '',
      parentId: null
    })
    
    const isSubmitting = ref(false)

    // 获取根目录ID（通常是第一个目录的ID，一般是1）
    const rootDirectoryId = computed(() => {
      // 如果有目录树，找到第一个根目录的ID
      if (props.directories && props.directories.length > 0) {
        return props.directories[0].id
      }
      // 默认返回1（通常根目录的ID是1）
      return 1
    })

    // 可选择的目录列表（props.directories 已经是扁平化的数据，无需再次扁平化）
    const availableDirectories = computed(() => {
      const directories = props.directories.map(dir => ({
        ...dir,
        // 确保显示正确的路径
        path: dir.path || `/${dir.name}`,
        // 计算目录层级深度，用于排序
        level: (dir.path || `/${dir.name}`).split('/').length - 1
      }))
      
      // 按路径排序，确保父目录和子目录紧挨着
      return directories.sort((a, b) => {
        // 首先按路径字典序排序，这样父目录会在子目录前面
        return a.path.localeCompare(b.path, 'zh-CN')
      })
    })

    // 过滤后的目录列表（移除根目录本身，避免重复）
    const filteredDirectories = computed(() => {
      return availableDirectories.value.filter(dir => {
        // 只过滤掉根目录本身（ID 等于 rootDirectoryId 或者路径就是 '/'）
        return dir.id !== rootDirectoryId.value && dir.path !== '/'
      })
    })

    // 预览路径
    const previewPath = computed(() => {
      if (!formData.value.name.trim()) return ''
      
      if (formData.value.parentId === rootDirectoryId.value) {
        return `/${formData.value.name}`
      }
      
      const parentDir = availableDirectories.value.find(dir => dir.id === formData.value.parentId)
      if (parentDir) {
        const parentPath = parentDir.path
        return `${parentPath}/${formData.value.name}`
      }
      
      return `/${formData.value.name}`
    })

    // 获取显示路径（带缩进）
    const getDisplayPath = (directory) => {
      const level = directory.level || 0
      const indent = '　'.repeat(level) // 使用全角空格作为缩进
      return `${indent}${directory.path}`
    }

    // 监听弹窗显示状态，重置表单
    watch(() => props.show, (show) => {
      if (show) {
        formData.value = {
          name: '',
          description: '',
          parentId: rootDirectoryId.value // 默认选择根目录
        }
        isSubmitting.value = false
      }
    })

    const handleSubmit = async () => {
      const name = formData.value.name.trim()
      if (!name) {
        toast.warning('文件夹名称不能为空')
        return
      }

      if (name.length > 100) {
        toast.warning('文件夹名称不能超过100个字符')
        return
      }

      if (formData.value.description.length > 500) {
        toast.warning('文件夹描述不能超过500个字符')
        return
      }

      isSubmitting.value = true

      try {
        const createData = {
          name,
          description: formData.value.description.trim(),
          parentId: formData.value.parentId
        }

        await emit('create', createData)
      } catch (error) {
        console.error('创建文件夹失败:', error)
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      formData,
      isSubmitting,
      rootDirectoryId,
      availableDirectories,
      filteredDirectories,
      previewPath,
      getDisplayPath,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 8px;
}

.modal-icon {
  width: 20px;
  height: 20px;
  font-size: 20px;
  color: #3b82f6;
}

.modal-close {
  background: none;
  border: none;
  font-size: 18px;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: #f3f4f6;
  color: #374151;
  transform: scale(1.1);
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.form-label {
  font-weight: 600;
  color: #374151;
  font-size: 14px;
}

.required {
  color: #ef4444;
}

.form-input,
.form-textarea,
.form-select {
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-hint {
  font-size: 12px;
  color: #6b7280;
}

.form-preview {
  margin-top: 16px;
  padding: 12px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
}

.preview-label {
  font-size: 12px;
  color: #0369a1;
  font-weight: 500;
  margin-bottom: 4px;
}

.preview-path {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  color: #1e40af;
  font-weight: 600;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #9ca3af;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
}

.loading-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    max-width: none;
    margin: 16px;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 16px;
  }
  
  .modal-footer {
    flex-direction: column-reverse;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style> 