<template>
  <div class="tree-node">
    <div 
      class="node-content" 
      :class="{ active: currentId === node.id }"
      @click="handleNodeClick"
    >
      <div class="node-toggle" @click.stop="toggleExpanded" v-if="hasChildren">
        <i 
          :data-lucide="isExpanded ? 'chevron-down' : 'chevron-right'" 
          class="toggle-icon"
        ></i>
      </div>
      <div class="node-toggle placeholder" v-else></div>
      
      <i data-lucide="folder" class="node-icon"></i>
      <span class="node-name" :title="node.name">{{ node.name }}</span>
      <span class="node-count" v-if="node.fileCount !== undefined">({{ node.fileCount }})</span>
    </div>
    
    <div v-if="hasChildren && isExpanded" class="node-children">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :current-id="currentId"
        :level="level + 1"
        @node-select="$emit('node-select', $event)"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue'

export default {
  name: 'TreeNode',
  props: {
    node: {
      type: Object,
      required: true
    },
    currentId: {
      type: String,
      default: ''
    },
    level: {
      type: Number,
      default: 0
    }
  },
  emits: ['node-select'],
  setup(props, { emit }) {
    const isExpanded = ref(props.level === 0) // 根节点默认展开
    
    const hasChildren = computed(() => {
      return props.node.children && props.node.children.length > 0
    })
    
    const toggleExpanded = () => {
      isExpanded.value = !isExpanded.value
      // 重新初始化图标
      nextTick(() => {
        if (window.lucide) {
          window.lucide.createIcons()
        }
      })
    }
    
    const handleNodeClick = () => {
      emit('node-select', props.node)
    }
    
    onMounted(() => {
      // 初始化图标
      if (window.lucide) {
        window.lucide.createIcons()
      }
    })
    
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
.tree-node {
  margin-bottom: var(--spacing-xs);
}

.node-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-sm);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  color: var(--color-text-secondary);
  user-select: none;
}

.node-content:hover {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

.node-content.active {
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  font-weight: var(--font-weight-medium);
}

.node-toggle {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
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
}

.node-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--color-primary-500);
}

.node-name {
  flex: 1;
  font-size: var(--font-size-sm);
  line-height: 1.4;
  word-break: break-word;
  min-width: 0;
  max-height: 2.8em; /* 允许最多2行 */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.node-count {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-normal);
}

.node-children {
  margin-left: var(--spacing-md);
  border-left: 1px solid var(--color-border-light);
  padding-left: var(--spacing-sm);
  margin-top: var(--spacing-xs);
}

/* 根据层级调整样式 */
.tree-node[data-level="1"] .node-content {
  font-size: var(--font-size-sm);
}

.tree-node[data-level="2"] .node-content {
  font-size: var(--font-size-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
}

.tree-node[data-level="3"] .node-content {
  font-size: var(--font-size-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  opacity: 0.9;
}
</style> 