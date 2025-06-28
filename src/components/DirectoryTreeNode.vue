<template>
  <div class="tree-node">
    <!-- 当前节点 -->
    <div 
      class="node-item"
      :class="{ 
        'selected': selectedId === directory.id,
        'disabled': disabledId === directory.id
      }"
      :style="{ paddingLeft: `${level * 20 + 16}px` }"
      @click="handleSelect"
    >
      <!-- 展开/折叠按钮 -->
      <button 
        v-if="hasChildren"
        class="node-toggle"
        @click.stop="toggleExpanded"
      >
        <el-icon class="toggle-icon" :class="{ 'expanded': isExpanded }">
          <CaretRight />
        </el-icon>
      </button>
      <div v-else class="node-spacer"></div>

      <!-- 选择按钮 -->
      <input 
        type="radio" 
        :checked="selectedId === directory.id"
        :disabled="disabledId === directory.id"
        readonly
        class="node-radio"
      >

      <!-- 目录图标 -->
      <el-icon class="node-icon">
        <Folder />
      </el-icon>

      <!-- 目录信息 -->
      <div class="node-info">
        <span class="node-name">{{ directory.name }}</span>
        <span class="node-path">{{ directory.path }}</span>
      </div>

      <!-- 禁用标识 -->
      <span v-if="disabledId === directory.id" class="node-disabled-tag">
        当前目录
      </span>
    </div>

    <!-- 子节点 -->
    <div v-if="isExpanded && hasChildren" class="node-children">
      <DirectoryTreeNode
        v-for="child in directory.children"
        :key="child.id"
        :directory="child"
        :selected-id="selectedId"
        :disabled-id="disabledId"
        :level="level + 1"
        :expand-all="expandAll"
        :collapse-all="collapseAll"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
// 导入Element Plus图标
import {
  CaretRight,
  Folder
} from '@element-plus/icons-vue'

export default {
  name: 'DirectoryTreeNode',
  components: {
    // 注册图标组件
    CaretRight,
    Folder
  },
  props: {
    directory: {
      type: Object,
      required: true
    },
    selectedId: {
      type: [String, Number],
      default: null
    },
    disabledId: {
      type: [String, Number],
      default: null
    },
    level: {
      type: Number,
      default: 0
    },
    expandAll: {
      type: Boolean,
      default: false
    },
    collapseAll: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select'],
  setup(props, { emit }) {
    const isExpanded = ref(false)

    // 是否有子节点
    const hasChildren = computed(() => {
      return props.directory.children && props.directory.children.length > 0
    })

    // 切换展开状态
    const toggleExpanded = () => {
      isExpanded.value = !isExpanded.value
    }

    // 处理选择
    const handleSelect = () => {
      // 不能选择禁用的目录
      if (props.disabledId === props.directory.id) {
        return
      }
      
      emit('select', props.directory.id)
    }

    // 监听展开所有
    watch(() => props.expandAll, (newValue) => {
      if (newValue && hasChildren.value) {
        isExpanded.value = true
      }
    })

    // 监听折叠所有
    watch(() => props.collapseAll, (newValue) => {
      if (newValue) {
        isExpanded.value = false
      }
    })

    return {
      isExpanded,
      hasChildren,
      toggleExpanded,
      handleSelect
    }
  }
}
</script>

<style scoped>
.tree-node {
  font-size: var(--font-size-sm);
}

/* 节点项 */
.node-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  border-radius: var(--border-radius-md);
  margin: 1px 0;
}

.node-item:hover:not(.disabled) {
  background: var(--color-primary-50);
}

.node-item.selected {
  background: var(--color-primary-100);
  border: 1px solid var(--color-primary-300);
}

.node-item.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: var(--color-bg-tertiary);
}

/* 展开/折叠按钮 */
.node-toggle {
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.node-toggle:hover {
  background: var(--color-bg-tertiary);
}

.toggle-icon {
  width: 12px;
  height: 12px;
  color: var(--color-text-tertiary);
  transition: transform var(--transition-fast);
  font-size: 12px;
}

.toggle-icon.expanded {
  transform: rotate(90deg);
}

.node-spacer {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* 选择按钮 */
.node-radio {
  width: 16px;
  height: 16px;
  accent-color: var(--color-primary-500);
  flex-shrink: 0;
}

.node-radio:disabled {
  opacity: 0.5;
}

/* 目录图标 */
.node-icon {
  width: 18px;
  height: 18px;
  color: var(--color-primary-600);
  flex-shrink: 0;
  font-size: 18px;
}

.node-item.disabled .node-icon {
  color: var(--color-text-tertiary);
}

/* 目录信息 */
.node-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.node-name {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-item.disabled .node-name {
  color: var(--color-text-tertiary);
}

.node-path {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 禁用标识 */
.node-disabled-tag {
  font-size: var(--font-size-xs);
  color: var(--color-warning-600);
  background: var(--color-warning-100);
  padding: 2px var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-warning-200);
  flex-shrink: 0;
}

/* 子节点容器 */
.node-children {
  margin-left: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .node-item {
    padding: var(--spacing-md);
  }
  
  .node-info {
    gap: var(--spacing-xs);
  }
  
  .node-name,
  .node-path {
    font-size: var(--font-size-sm);
  }
}
</style> 