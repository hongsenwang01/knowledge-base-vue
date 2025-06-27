<template>
  <div v-if="show" class="modal-overlay" @click="handleCancel">
    <div class="modal-dialog" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">
          <i data-lucide="edit-2" class="modal-icon"></i>
          更新目录
        </h3>
        <button class="modal-close" @click="handleCancel">
          <i data-lucide="x"></i>
        </button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="handleSubmit" class="directory-form">
          <div class="form-group">
            <label for="updateName" class="form-label">目录名称</label>
            <input 
              type="text" 
              id="updateName" 
              v-model="formData.name"
              class="form-input"
              placeholder="请输入目录名称"
              required
            >
          </div>
          <div class="form-group">
            <label for="updateDescription" class="form-label">描述信息</label>
            <textarea 
              id="updateDescription" 
              v-model="formData.description"
              class="form-textarea"
              placeholder="请输入目录描述（可选）"
              rows="3"
            ></textarea>
          </div>
          <div class="form-actions">
            <button type="button" @click="handleCancel" class="btn btn-outline">
              <i data-lucide="x" class="btn-icon"></i>
              取消
            </button>
            <button type="submit" class="btn btn-primary">
              <i data-lucide="save" class="btn-icon"></i>
              更新目录
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'

export default {
  name: 'UpdateDirectoryModal',
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

    // 监听弹窗显示状态，初始化图标
    watch(() => props.show, (show) => {
      if (show && window.lucide) {
        setTimeout(() => {
          window.lucide.createIcons()
        }, 100)
      }
    })

    const handleSubmit = () => {
      const name = formData.value.name.trim()
      if (!name) {
        alert('目录名称不能为空')
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

    onMounted(() => {
      if (window.lucide) {
        window.lucide.createIcons()
      }
    })

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
  background: var(--color-bg-modal);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-index-modal);
}

.modal-dialog {
  background: var(--color-bg-overlay);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  max-width: 400px;
  width: 100%;
  box-shadow: var(--shadow-lg);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-tertiary);
}

.modal-title {
  margin: 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.modal-icon {
  width: 20px;
  height: 20px;
}

.modal-close {
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: var(--color-gray-100);
  color: var(--color-text-primary);
  transform: scale(1.1);
}

.modal-body {
  padding: var(--spacing-xl);
}

.directory-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.form-label {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.form-input,
.form-textarea {
  padding: var(--spacing-md);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--border-radius-lg);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: inherit;
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
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
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-normal);
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-size: var(--font-size-base);
}

.btn-outline {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-medium);
}

.btn-outline:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-primary-300);
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: var(--color-text-inverse);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-icon {
  width: 18px;
  height: 18px;
}
</style> 