<template>
  <div v-if="show" class="modal-overlay" @click="$emit('cancel')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <div class="modal-title">
          <el-icon class="modal-icon text-danger"><Delete /></el-icon>
          <h3>删除目录</h3>
        </div>
        <button class="modal-close" @click="$emit('cancel')">
          <el-icon><Close /></el-icon>
        </button>
      </div>
      
      <div class="modal-body">
        <div class="warning-content">
          <div class="warning-icon">
            <el-icon class="warning-icon-svg"><WarningFilled /></el-icon>
          </div>
          <div class="warning-text">
            <h4>确认删除目录</h4>
            <p>您即将删除目录 <strong>{{ directory?.name }}</strong>，此操作不可恢复。</p>
            <p class="warning-note">请确认您真的要执行此操作。</p>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
          <el-icon class="btn-icon"><Close /></el-icon>
          取消
        </button>
        <button type="button" class="btn btn-danger" @click="$emit('confirm')">
          <el-icon class="btn-icon"><Delete /></el-icon>
          确认删除
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Delete, Close, WarningFilled } from '@element-plus/icons-vue'

export default {
  name: 'DeleteDirectoryModal',
  components: {
    Delete,
    Close,
    WarningFilled
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
  emits: ['confirm', 'cancel'],
  setup(props, { emit }) {
    const handleConfirm = () => {
      emit('confirm')
    }

    const handleCancel = () => {
      emit('cancel')
    }

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

.modal-content {
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
  font-size: 20px;
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

.warning-content {
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
  font-size: 20px;
}

.warning-text {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.warning-text h4 {
  margin: 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.warning-text p {
  margin: 0;
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.warning-note {
  font-style: italic;
  color: var(--color-text-tertiary);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  border-top: 1px solid var(--color-border-light);
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

.btn-secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-medium);
}

.btn-secondary:hover {
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
  font-size: 18px;
}
</style> 