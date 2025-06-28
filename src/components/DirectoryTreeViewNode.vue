<template>
  <div class="tree-view-node">
    <!-- 节点内容 -->
    <div 
      class="node-content" 
      :class="{ 
        'active': currentId === node.id,
        'has-children': hasChildren 
      }"
      :style="{ paddingLeft: `${level * 20 + 16}px` }"
      @click="handleNodeClick"
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
      <div v-else class="node-toggle placeholder"></div>
      
      <!-- 目录图标 -->
      <el-icon class="node-icon" :class="{ 'expanded': isExpanded && hasChildren }">
        <FolderOpened v-if="isExpanded && hasChildren" />
        <Folder v-else />
      </el-icon>

      <!-- 目录信息 -->
      <div class="node-info">
        <span class="node-name">{{ node.name }}</span>
        <span v-if="showCounts" class="node-counts">
          <span v-if="node.fileCount !== undefined" class="file-count">
            {{ node.fileCount }} 文件
          </span>
          <span v-if="node.folderCount !== undefined" class="folder-count">
            {{ node.folderCount }} 文件夹
          </span>
        </span>
      </div>

      <!-- 节点操作按钮 -->
      <div v-if="showActions" class="node-actions" @click.stop>
        <button 
          class="action-btn" 
          title="移动"
          @click="$emit('node-action', 'move', node)"
          :disabled="node.id === 1"
        >
          <el-icon><Sort /></el-icon>
        </button>
        <button 
          class="action-btn" 
          title="编辑"
          @click="$emit('node-action', 'edit', node)"
          :disabled="node.id === 1"
        >
          <el-icon><Edit /></el-icon>
        </button>
        <button 
          class="action-btn danger" 
          title="删除"
          @click="$emit('node-action', 'delete', node)"
          :disabled="node.id === 1"
        >
          <el-icon><Delete /></el-icon>
        </button>
      </div>
    </div>
    
    <!-- 子节点 -->
    <div v-if="hasChildren && isExpanded" class="node-children">
      <DirectoryTreeViewNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :current-id="currentId"
        :level="level + 1"
        :expand-all="expandAll"
        :collapse-all="collapseAll"
        :show-actions="showActions"
        :show-counts="showCounts"
        @node-select="$emit('node-select', $event)"
        @node-action="$emit('node-action', $event, arguments[1])"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
// 导入Element Plus图标
import {
  CaretRight,
  Folder,
  FolderOpened,
  Sort,
  Edit,
  Delete
} from '@element-plus/icons-vue'

export default {
  name: 'DirectoryTreeViewNode',
  components: {
    // 注册图标组件
    CaretRight,
    Folder,
    FolderOpened,
    Sort,
    Edit,
    Delete
  },
  props: {
    node: {
      type: Object,
      required: true
    },
    currentId: {
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
    },
    showActions: {
      type: Boolean,
      default: true
    },
    showCounts: {
      type: Boolean,
      default: true
    }
  },
  emits: ['node-select', 'node-action'],
  setup(props, { emit }) {
    const isExpanded = ref(props.level === 0) // 根节点默认展开
    
    const hasChildren = computed(() => {
      return props.node.children && props.node.children.length > 0
    })
    
    // 监听展开所有标志
    watch(() => props.expandAll, (newVal) => {
      if (newVal && hasChildren.value) {
        isExpanded.value = true
      }
    })

    // 监听折叠所有标志
    watch(() => props.collapseAll, (newVal) => {
      if (newVal) {
        isExpanded.value = false
      }
    })
    
    const toggleExpanded = () => {
      isExpanded.value = !isExpanded.value
    }
    
    const handleNodeClick = () => {
      emit('node-select', props.node)
    }
    
    return {
      isExpanded,
      hasChildren,
      toggleExpanded,
      handleNodeClick
    }
  }
}
</script>

<style scoped>
.tree-view-node {
  margin-bottom: 2px;
}

/* 节点内容 */
.node-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--color-text-secondary);
  user-select: none;
  position: relative;
}

.node-content:hover {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

.node-content:hover .node-actions {
  opacity: 1;
}

.node-content.active {
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  font-weight: var(--font-weight-medium);
}

/* 展开/折叠按钮 */
.node-toggle {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
  border: none;
  background: transparent;
  flex-shrink: 0;
}

.node-toggle:hover {
  background: var(--color-bg-tertiary);
}

.node-toggle.placeholder {
  cursor: default;
}

.toggle-icon {
  width: 14px;
  height: 14px;
  color: var(--color-text-tertiary);
  transition: transform var(--transition-fast);
  font-size: 14px;
}

.toggle-icon.expanded {
  transform: rotate(90deg);
}

/* 目录图标 */
.node-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--color-primary-500);
  transition: color var(--transition-fast);
  font-size: 18px;
}

.node-icon.expanded {
  color: var(--color-primary-600);
}

.node-content.active .node-icon {
  color: var(--color-primary-700);
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
  font-size: var(--font-size-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: var(--font-weight-medium);
}

.node-counts {
  display: flex;
  gap: var(--spacing-sm);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.file-count,
.folder-count {
  font-weight: var(--font-weight-normal);
}

/* 节点操作按钮 */
.node-actions {
  display: flex;
  gap: var(--spacing-xs);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.action-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--color-text-tertiary);
}

.action-btn:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.danger:hover {
  background: var(--color-danger-100);
  color: var(--color-danger-600);
}

.action-btn .el-icon {
  width: 14px;
  height: 14px;
  font-size: 14px;
}

/* 子节点容器 */
.node-children {
  margin-left: 0;
  border-left: 1px solid var(--color-border-light);
  margin-top: 2px;
}

/* 根据层级调整样式 */
.tree-view-node[data-level="0"] .node-content {
  font-weight: var(--font-weight-semibold);
}

.tree-view-node[data-level="1"] .node-content {
  font-size: var(--font-size-sm);
}

.tree-view-node[data-level="2"] .node-content {
  font-size: var(--font-size-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
}

.tree-view-node[data-level="3"] .node-content {
  font-size: var(--font-size-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  opacity: 0.9;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .node-content {
    padding: var(--spacing-sm);
  }
  
  .node-actions {
    opacity: 1; /* 在移动端始终显示操作按钮 */
  }
  
  .action-btn {
    width: 28px;
    height: 28px;
  }
  
  .action-btn .el-icon {
    width: 16px;
    height: 16px;
    font-size: 16px;
  }
}
</style> 