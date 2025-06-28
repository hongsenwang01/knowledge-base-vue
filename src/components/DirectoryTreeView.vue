<template>
  <div class="directory-tree-view">
    <!-- 树形视图头部 -->
    <div class="tree-header">
      <div class="tree-title">
        <el-icon class="tree-title-icon"><FolderOpened /></el-icon>
        <h3>目录结构</h3>
      </div>
      <div class="tree-actions">
        <button 
          class="btn btn-icon btn-sm" 
          title="展开所有"
          @click="expandAll"
        >
          <el-icon><Plus /></el-icon>
        </button>
        <button 
          class="btn btn-icon btn-sm" 
          title="折叠所有"
          @click="collapseAll"
        >
          <el-icon><Minus /></el-icon>
        </button>
      </div>
    </div>

    <!-- 树形内容 -->
    <div class="tree-content">
      <!-- 加载状态 -->
      <div v-if="loading" class="tree-loading">
        <div class="loading-spinner"></div>
        <p>加载目录结构中...</p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="tree-error">
        <div class="error-icon">
          <el-icon class="error-icon-svg"><Warning /></el-icon>
        </div>
        <h4>加载失败</h4>
        <p>{{ error }}</p>
        <button class="btn btn-primary btn-sm" @click="$emit('reload')">
          <el-icon class="btn-icon"><Refresh /></el-icon>
          重新加载
        </button>
      </div>

      <!-- 目录树 -->
      <div v-else-if="directories.length > 0" class="tree-nodes">
        <DirectoryTreeViewNode
          v-for="directory in directories"
          :key="directory.id"
          :node="directory"
          :current-id="currentId"
          :level="0"
          :expand-all="expandAllFlag"
          :collapse-all="collapseAllFlag"
          @node-select="handleNodeSelect"
          @node-action="handleNodeAction"
        />
      </div>

      <!-- 空状态 -->
      <div v-else class="tree-placeholder">
        <div class="placeholder-icon">
          <el-icon class="placeholder-icon-svg"><FolderDelete /></el-icon>
        </div>
        <h4>暂无目录</h4>
        <p>系统中还没有创建任何目录</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import DirectoryTreeViewNode from './DirectoryTreeViewNode.vue'
// 导入Element Plus图标
import {
  FolderOpened,
  Plus,
  Minus,
  Warning,
  Refresh,
  FolderDelete
} from '@element-plus/icons-vue'

export default {
  name: 'DirectoryTreeView',
  components: {
    DirectoryTreeViewNode,
    // 注册图标组件
    FolderOpened,
    Plus,
    Minus,
    Warning,
    Refresh,
    FolderDelete
  },
  props: {
    directories: {
      type: Array,
      default: () => []
    },
    currentId: {
      type: [String, Number],
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  },
  emits: ['node-select', 'node-action', 'reload'],
  setup(props, { emit }) {
    const expandAllFlag = ref(false)
    const collapseAllFlag = ref(false)

    // 展开所有节点
    const expandAll = () => {
      expandAllFlag.value = !expandAllFlag.value
    }

    // 折叠所有节点
    const collapseAll = () => {
      collapseAllFlag.value = !collapseAllFlag.value
    }

    // 处理节点选择
    const handleNodeSelect = (node) => {
      emit('node-select', node)
    }

    // 处理节点操作
    const handleNodeAction = (action, node) => {
      emit('node-action', action, node)
    }

    return {
      expandAllFlag,
      collapseAllFlag,
      expandAll,
      collapseAll,
      handleNodeSelect,
      handleNodeAction
    }
  }
}
</script>

<style scoped>
.directory-tree-view {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
}

/* 树形头部 */
.tree-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border-light);
}

.tree-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.tree-title-icon {
  width: 20px;
  height: 20px;
  color: var(--color-primary-600);
  font-size: 20px;
}

.tree-title h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.tree-actions {
  display: flex;
  gap: var(--spacing-xs);
}

/* 树形内容 */
.tree-content {
  max-height: 600px;
  overflow-y: auto;
  padding: var(--spacing-md);
}

/* 加载状态 */
.tree-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  text-align: center;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border-light);
  border-top: 3px solid var(--color-primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-md);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.tree-loading p {
  color: var(--color-text-secondary);
  margin: 0;
}

/* 错误状态 */
.tree-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  text-align: center;
}

.error-icon {
  width: 48px;
  height: 48px;
  background: var(--color-danger-100);
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
}

.error-icon-svg {
  width: 24px;
  height: 24px;
  color: var(--color-danger-600);
  font-size: 24px;
}

.tree-error h4 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.tree-error p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
}

/* 空状态 */
.tree-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  text-align: center;
}

.placeholder-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-200));
  border-radius: var(--border-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-xl);
}

.placeholder-icon-svg {
  width: 32px;
  height: 32px;
  color: var(--color-primary-600);
  font-size: 32px;
}

.tree-placeholder h4 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.tree-placeholder p {
  color: var(--color-text-tertiary);
  margin: 0;
}

/* 按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-normal);
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.btn-icon {
  padding: var(--spacing-sm);
  width: 32px;
  height: 32px;
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-xs);
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
  background: transparent;
  color: var(--color-text-tertiary);
  border: 1px solid var(--color-border-medium);
}

.btn-icon:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
  border-color: var(--color-primary-300);
}

.btn-icon .el-icon {
  width: 16px;
  height: 16px;
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tree-header {
    padding: var(--spacing-md);
  }
  
  .tree-content {
    max-height: 400px;
    padding: var(--spacing-sm);
  }
  
  .tree-loading,
  .tree-error,
  .tree-placeholder {
    padding: var(--spacing-lg);
  }
}
</style> 