<template>
  <div v-if="show" class="modal-overlay" @click="handleCancel">
    <div class="modal-dialog" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">
          <i data-lucide="trash-2" class="modal-icon text-danger"></i>
          删除目录
        </h3>
        <button class="modal-close" @click="handleCancel">
          <i data-lucide="x"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="delete-warning">
          <div class="warning-icon">
            <i data-lucide="alert-triangle" class="warning-icon-svg"></i>
          </div>
          <div class="warning-content">
            <h4>确认删除目录</h4>
            <p>您即将删除目录 <strong>"{{ directory?.name }}"</strong></p>
            <p class="warning-text">此操作不可逆，请谨慎操作！</p>
          </div>
        </div>
        <div class="form-actions">
          <button type="button" @click="handleCancel" class="btn btn-outline">
            <i data-lucide="x" class="btn-icon"></i>
            取消
          </button>
          <button type="button" @click="handleConfirm" class="btn btn-danger">
            <i data-lucide="trash-2" class="btn-icon"></i>
            确认删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, onMounted } from 'vue'

export default {
  name: 'DeleteDirectoryModal',
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
  emits: ['confirm', 'cancel'],
  setup(props, { emit }) {
    // 监听弹窗显示状态，初始化图标
    watch(() => props.show, (show) => {
      if (show && window.lucide) {
        setTimeout(() => {
          window.lucide.createIcons()
        }, 100)
      }
    })

    const handleConfirm = () => {
      emit('confirm')
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
      handleConfirm,
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
  max-width: 500px;
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

.modal-icon.text-danger {
  color: var(--color-danger-600);
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

.delete-warning {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--color-danger-50);
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--spacing-lg);
}

.warning-icon {
  width: 40px;
  height: 40px;
  background: var(--color-danger-100);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.warning-icon-svg {
  width: 20px;
  height: 20px;
  color: var(--color-danger-600);
}

.warning-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.warning-content h4 {
  margin: 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.warning-content p {
  margin: 0;
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.warning-text {
  font-style: italic;
  color: var(--color-text-tertiary);
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

.btn-danger {
  background: linear-gradient(135deg, var(--color-danger-500), var(--color-danger-600));
  color: var(--color-text-inverse);
}

.btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-icon {
  width: 18px;
  height: 18px;
}
</style> 