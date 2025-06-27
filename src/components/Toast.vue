<template>
  <transition name="toast" appear>
    <div v-if="show" :class="['toast', `toast-${type}`]">
      <div class="toast-content">
        <div class="toast-icon">
          <el-icon v-if="type === 'success'"><CircleCheck /></el-icon>
          <el-icon v-else-if="type === 'error'"><CircleClose /></el-icon>
          <el-icon v-else-if="type === 'warning'"><Warning /></el-icon>
          <el-icon v-else><InfoFilled /></el-icon>
        </div>
        <div class="toast-message">{{ message }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { CircleCheck, CircleClose, Warning, InfoFilled } from '@element-plus/icons-vue'

export default {
  name: 'Toast',
  components: {
    CircleCheck,
    CircleClose,
    Warning,
    InfoFilled
  },
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'success',
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const show = ref(true)
    let timer = null

    const close = () => {
      show.value = false
      setTimeout(() => {
        emit('close')
      }, 300) // 等待动画完成
    }

    onMounted(() => {
      timer = setTimeout(() => {
        close()
      }, props.duration)
    })

    onUnmounted(() => {
      if (timer) {
        clearTimeout(timer)
      }
    })

    return {
      show,
      close
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  min-width: 300px;
  max-width: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.toast-content {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
}

.toast-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  font-size: 20px;
}

.toast-message {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

/* 成功样式 */
.toast-success {
  border-left: 4px solid #10b981;
}

.toast-success .toast-icon {
  color: #10b981;
}

/* 错误样式 */
.toast-error {
  border-left: 4px solid #ef4444;
}

.toast-error .toast-icon {
  color: #ef4444;
}

/* 警告样式 */
.toast-warning {
  border-left: 4px solid #f59e0b;
}

.toast-warning .toast-icon {
  color: #f59e0b;
}

/* 信息样式 */
.toast-info {
  border-left: 4px solid #3b82f6;
}

.toast-info .toast-icon {
  color: #3b82f6;
}

/* 动画效果 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .toast {
    right: 16px;
    left: 16px;
    min-width: auto;
  }
}
</style> 