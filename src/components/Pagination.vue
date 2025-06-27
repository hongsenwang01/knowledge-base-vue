<template>
  <div class="pagination-container">
    <div class="pagination-info">
      <span>共 {{ total }} 条记录，第 {{ current }} / {{ pages }} 页</span>
    </div>
    
    <div class="pagination-controls">
      <!-- 每页数量选择 -->
      <div class="page-size-selector">
        <span>每页</span>
        <select 
          :value="size" 
          @change="$emit('change-size', parseInt($event.target.value))"
          class="page-size-select"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span>条</span>
      </div>
      
      <!-- 分页按钮 -->
      <div class="pagination-buttons">
        <!-- 首页 -->
        <button 
          class="pagination-btn" 
          :disabled="current === 1"
          @click="$emit('change-page', 1)"
          title="首页"
        >
          <i data-lucide="chevrons-left"></i>
        </button>
        
        <!-- 上一页 -->
        <button 
          class="pagination-btn" 
          :disabled="current === 1"
          @click="$emit('change-page', current - 1)"
          title="上一页"
        >
          <i data-lucide="chevron-left"></i>
        </button>
        
        <!-- 页码按钮 -->
        <template v-for="page in visiblePages" :key="page">
          <button 
            v-if="page === '...'"
            class="pagination-btn pagination-ellipsis"
            disabled
          >
            ...
          </button>
          <button 
            v-else
            class="pagination-btn"
            :class="{ active: page === current }"
            @click="$emit('change-page', page)"
          >
            {{ page }}
          </button>
        </template>
        
        <!-- 下一页 -->
        <button 
          class="pagination-btn" 
          :disabled="current === pages"
          @click="$emit('change-page', current + 1)"
          title="下一页"
        >
          <i data-lucide="chevron-right"></i>
        </button>
        
        <!-- 末页 -->
        <button 
          class="pagination-btn" 
          :disabled="current === pages"
          @click="$emit('change-page', pages)"
          title="末页"
        >
          <i data-lucide="chevrons-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'

export default {
  name: 'Pagination',
  props: {
    current: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    pages: {
      type: Number,
      default: 0
    }
  },
  emits: ['change-page', 'change-size'],
  setup(props) {
    // 计算可见的页码
    const visiblePages = computed(() => {
      const { current, pages } = props
      const maxVisible = 7 // 最多显示7个页码按钮
      
      if (pages <= maxVisible) {
        return Array.from({ length: pages }, (_, i) => i + 1)
      }
      
      const result = []
      const halfVisible = Math.floor(maxVisible / 2)
      
      // 总是显示第一页
      result.push(1)
      
      let start = Math.max(2, current - halfVisible + 1)
      let end = Math.min(pages - 1, current + halfVisible - 1)
      
      // 如果开始位置大于2，添加省略号
      if (start > 2) {
        result.push('...')
      }
      
      // 添加中间的页码
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== pages) {
          result.push(i)
        }
      }
      
      // 如果结束位置小于倒数第二页，添加省略号
      if (end < pages - 1) {
        result.push('...')
      }
      
      // 总是显示最后一页
      if (pages > 1) {
        result.push(pages)
      }
      
      return result
    })

    onMounted(() => {
      // 初始化 Lucide 图标
      if (window.lucide) {
        window.lucide.createIcons()
      }
    })

    return {
      visiblePages
    }
  }
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  background: var(--color-bg-overlay);
  border-top: 1px solid var(--color-border-light);
  gap: var(--spacing-lg);
}

.pagination-info {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.page-size-selector {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.page-size-select {
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--border-radius-md);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.page-size-select:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 2px var(--color-primary-100);
}

.pagination-buttons {
  display: flex;
  gap: var(--spacing-xs);
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--color-border-medium);
  border-radius: var(--border-radius-md);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.pagination-btn:hover:not(:disabled) {
  background: var(--color-bg-tertiary);
  border-color: var(--color-primary-300);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn.active {
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
  border-color: var(--color-primary-500);
}

.pagination-btn.pagination-ellipsis {
  border: none;
  background: transparent;
  cursor: default;
}

.pagination-btn i {
  width: 16px;
  height: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .pagination-container {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .pagination-controls {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .pagination-buttons {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style> 