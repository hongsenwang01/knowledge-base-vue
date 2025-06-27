<template>
  <div v-if="show" class="modal-overlay" @click="$emit('cancel')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <div class="modal-title">
          <el-icon class="modal-icon"><EditPen /></el-icon>
          <h3>更新目录</h3>
        </div>
        <button class="modal-close" @click="$emit('cancel')">
          <el-icon><Close /></el-icon>
        </button>
      </div>
      
      <div class="modal-body">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="directoryName" class="form-label">目录名称</label>
            <input
              id="directoryName"
              v-model="formData.name"
              type="text"
              class="form-input"
              placeholder="请输入目录名称"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="directoryDescription" class="form-label">目录描述</label>
            <textarea
              id="directoryDescription"
              v-model="formData.description"
              class="form-textarea"
              placeholder="请输入目录描述（可选）"
              rows="3"
            ></textarea>
          </div>
        </form>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
          <el-icon class="btn-icon"><Close /></el-icon>
          取消
        </button>
        <button type="button" class="btn btn-primary" @click="handleSubmit" :disabled="!formData.name.trim()">
          <el-icon class="btn-icon"><Check /></el-icon>
          保存
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import toast from '@/utils/toast'
// 导入Element Plus图标
import { EditPen, Close, Check } from '@element-plus/icons-vue'

export default {
  name: 'UpdateDirectoryModal',
  components: {
    // 注册图标组件
    EditPen,
    Close,
    Check
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    directory: {
      type: Object,
      default: null
    }
  },
  emits: ['update', 'cancel'],
  setup(props, { emit }) {
    const formData = ref({
      name: '',
      description: ''
    })

    // 监听目录变化，更新表单数据
    watch(() => props.directory, (newDirectory) => {
      if (newDirectory) {
        formData.value = {
          name: newDirectory.name || '',
          description: newDirectory.description || ''
        }
      }
    }, { immediate: true })

    const handleSubmit = () => {
      const name = formData.value.name.trim()
      if (!name) {
        toast.warning('目录名称不能为空')
        return
      }

      emit('update', {
        name,
        description: formData.value.description.trim()
      })
    }

    const handleCancel = () => {
      emit('cancel')
    }

    return {
      formData,
      handleSubmit,
      handleCancel
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

.directory-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
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

.form-input,
.form-textarea {
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
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
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

.btn-secondary {
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
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