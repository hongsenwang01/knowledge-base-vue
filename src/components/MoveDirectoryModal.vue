<template>
  <!-- 遮罩层 -->
  <div v-if="show" class="drawer-overlay" @click="handleOverlayClick">
    <!-- 抽屉容器 -->
    <div class="drawer-container" :class="{ 'show': show }">
      <!-- 抽屉头部 -->
      <div class="drawer-header">
        <div class="header-content">
          <div class="header-icon">
            <el-icon class="header-icon-svg"><Sort /></el-icon>
          </div>
          <div class="header-text">
            <h3 class="drawer-title">移动目录</h3>
            <p class="drawer-subtitle">
              将目录 "{{ directory?.name }}" 移动到新位置
            </p>
            <!-- 移动预览信息 -->
            <div v-if="selectedParentId !== null" class="header-preview">
              <div class="preview-item">
                <span class="preview-label">原路径：</span>
                <span class="preview-value from">{{ directory?.path || '/' }}</span>
              </div>
              <div class="preview-arrow">→</div>
              <div class="preview-item">
                <span class="preview-label">新路径：</span>
                <span class="preview-value to">{{ movePreview?.newPath || '/' }}</span>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-close" @click="$emit('cancel')">
          <el-icon><Close /></el-icon>
        </button>
      </div>

      <!-- 抽屉主体 -->
      <div class="drawer-body">


        <!-- 目标目录选择 -->
        <div class="target-directory-section">
          <div class="section-header">
            <el-icon class="section-icon"><FolderOpened /></el-icon>
            <h4>选择目标位置</h4>
          </div>
          <p class="section-description">选择要移动到的目标目录</p>

          <!-- 目录树容器 -->
          <div class="directory-tree-container">
            <div class="tree-header">
              <span class="tree-title">目录结构</span>
              <div class="tree-actions">
                <button 
                  class="tree-action-btn" 
                  title="展开所有"
                  @click="expandAll"
                >
                  <el-icon><Plus /></el-icon>
                </button>
                <button 
                  class="tree-action-btn" 
                  title="折叠所有"
                  @click="collapseAll"
                >
                  <el-icon><Minus /></el-icon>
                </button>
                <button 
                  class="tree-action-btn" 
                  title="移动到根目录"
                  :class="{ active: selectedParentId === null }"
                  @click="selectDirectory(null)"
                >
                  <el-icon><HomeFilled /></el-icon>
                </button>
              </div>
            </div>
            <div class="directory-tree-content">
              <!-- 根目录提示 -->
              <div v-if="selectedParentId === null" class="root-selected-tip">
                <el-icon class="tip-icon"><HomeFilled /></el-icon>
                <span>已选择移动到根目录</span>
              </div>
              
              <DirectoryTreeNode
                v-for="dir in availableDirectories"
                :key="dir.id"
                :directory="dir"
                :selected-id="selectedParentId"
                :disabled-id="directory?.id"
                :level="0"
                :expand-all="expandAllFlag"
                :collapse-all="collapseAllFlag"
                @select="selectDirectory"
              />
            </div>
          </div>

          <!-- 错误提示 -->
          <div v-if="error" class="error-message">
            <el-icon class="error-icon"><Warning /></el-icon>
            <span>{{ error }}</span>
          </div>
        </div>


      </div>

      <!-- 抽屉底部 -->
      <div class="drawer-footer">
        <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
          <el-icon class="btn-icon"><Close /></el-icon>
          取消
        </button>
        <button 
          type="button" 
          class="btn btn-primary" 
          @click="handleMove"
          :disabled="loading || !canMove"
        >
          <el-icon class="btn-icon" :class="{ 'loading': loading }">
            <Loading v-if="loading" />
            <Check v-else />
          </el-icon>
          {{ loading ? '移动中...' : '确认移动' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import DirectoryTreeNode from './DirectoryTreeNode.vue'
// 导入Element Plus图标
import {
  Sort,
  Close,
  Folder,
  FolderOpened,
  HomeFilled,
  Warning,
  Plus,
  Minus,
  Check,
  Loading
} from '@element-plus/icons-vue'

export default {
  name: 'MoveDirectoryModal',
  components: {
    DirectoryTreeNode,
    // 注册图标组件
    Sort,
    Close,
    Folder,
    FolderOpened,
    HomeFilled,
    Warning,
    Plus,
    Minus,
    Check,
    Loading
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    directory: {
      type: Object,
      default: null
    },
    directories: {
      type: Array,
      default: () => []
    }
  },
  emits: ['move', 'cancel'],
  setup(props, { emit }) {
    const selectedParentId = ref(null)
    const loading = ref(false)
    const error = ref('')
    const expandAllFlag = ref(false)
    const collapseAllFlag = ref(false)

    // 获取可选择的目录（排除自身和子目录）
    const availableDirectories = computed(() => {
      if (!props.directory) return props.directories

      const filterDirectories = (directories, excludeId, excludePath) => {
        return directories.filter(dir => {
          // 排除自身
          if (dir.id === excludeId) return false
          
          // 排除子目录（防止循环引用）
          if (dir.path && excludePath && dir.path.startsWith(excludePath + '/')) {
            return false
          }
          
          return true
        }).map(dir => ({
          ...dir,
          children: dir.children ? filterDirectories(dir.children, excludeId, excludePath) : []
        }))
      }

      return filterDirectories(props.directories, props.directory.id, props.directory.path)
    })

    // 是否可以移动
    const canMove = computed(() => {
      // 如果选择的是当前的父目录，则不能移动
      return selectedParentId.value !== props.directory?.parentId
    })

    // 移动预览
    const movePreview = computed(() => {
      if (!props.directory) return null

      let newPath = ''
      if (selectedParentId.value === null) {
        // 移动到根目录
        newPath = `/${props.directory.name}`
      } else {
        // 移动到指定目录
        const targetDir = findDirectoryById(selectedParentId.value, props.directories)
        if (targetDir) {
          newPath = `${targetDir.path}/${props.directory.name}`
        }
      }

      return {
        newPath,
        oldPath: props.directory.path
      }
    })



    // 查找目录
    const findDirectoryById = (id, directories) => {
      for (const dir of directories) {
        if (dir.id === id) return dir
        if (dir.children) {
          const found = findDirectoryById(id, dir.children)
          if (found) return found
        }
      }
      return null
    }

    // 选择目录
    const selectDirectory = (directoryId) => {
      selectedParentId.value = directoryId
      error.value = ''
    }

    // 展开所有
    const expandAll = () => {
      expandAllFlag.value = !expandAllFlag.value
    }

    // 折叠所有
    const collapseAll = () => {
      collapseAllFlag.value = !collapseAllFlag.value
    }

    // 处理移动
    const handleMove = async () => {
      if (!canMove.value) {
        error.value = '不能移动到相同位置'
        return
      }

      loading.value = true
      error.value = ''

      try {
        // 发出移动事件
        emit('move', {
          directoryId: props.directory.id,
          newParentId: selectedParentId.value
        })
      } catch (err) {
        error.value = err.message || '移动失败'
      } finally {
        loading.value = false
      }
    }

    // 处理遮罩点击
    const handleOverlayClick = (event) => {
      if (event.target === event.currentTarget) {
        emit('cancel')
      }
    }

    // 监听弹窗显示状态，重置表单
    watch(() => props.show, (newShow) => {
      if (newShow) {
        selectedParentId.value = null
        error.value = ''
        loading.value = false
      }
    })

    return {
      selectedParentId,
      loading,
      error,
      expandAllFlag,
      collapseAllFlag,
      availableDirectories,
      canMove,
      movePreview,
      selectDirectory,
      expandAll,
      collapseAll,
      handleMove,
      handleOverlayClick
    }
  }
}
</script>

<style scoped>
/* 抽屉遮罩层 */
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-overlay);
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* 抽屉容器 */
.drawer-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 33.333%; /* 三分之一宽度 */
  min-width: 400px;
  max-width: 600px;
  height: 100vh;
  background: var(--color-bg-primary);
  box-shadow: var(--shadow-2xl);
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
  overflow: hidden;
}

.drawer-container.show {
  transform: translateX(0);
}

/* 抽屉头部 */
.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-secondary);
  flex-shrink: 0;
}

.header-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.header-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-icon-svg {
  width: 24px;
  height: 24px;
  color: var(--color-text-inverse);
  font-size: 24px;
}

.header-text {
  flex: 1;
}

.drawer-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.drawer-subtitle {
  color: var(--color-text-secondary);
  margin: 0;
  font-size: var(--font-size-sm);
}

/* 头部预览 */
.header-preview {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.preview-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  min-width: 0;
  flex: 1;
}

.preview-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}

.preview-value {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  border: 1px solid;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.preview-value.from {
  background: var(--color-danger-50);
  color: var(--color-danger-700);
  border-color: var(--color-danger-200);
}

.preview-value.to {
  background: var(--color-success-50);
  color: var(--color-success-700);
  border-color: var(--color-success-200);
}

.preview-arrow {
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-sm);
  flex-shrink: 0;
}

.btn-close {
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-lg);
  background: transparent;
  border: 1px solid var(--color-border-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-close:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-border-strong);
  color: var(--color-text-secondary);
}

/* 抽屉主体 */
.drawer-body {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}



/* 目标目录选择部分 */
.target-directory-section {
  padding: var(--spacing-xl);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.section-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.section-icon {
  width: 20px;
  height: 20px;
  color: var(--color-primary-600);
  font-size: 20px;
}

.section-header h4 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.section-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin: 0 0 var(--spacing-lg) 0;
}

/* 目录树容器 */
.directory-tree-container {
  flex: 1;
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-lg);
  background: var(--color-bg-primary);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.tree-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border-light);
}

.tree-title {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
}

.tree-actions {
  display: flex;
  gap: var(--spacing-xs);
}

.tree-action-btn {
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

.tree-action-btn:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
}

.tree-action-btn .el-icon {
  width: 14px;
  height: 14px;
  font-size: 14px;
}

.tree-action-btn.active {
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
}

.tree-action-btn.active:hover {
  background: var(--color-primary-600);
}

.directory-tree-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-sm);
}

/* 根目录选择提示 */
.root-selected-tip {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-success-50);
  border: 1px solid var(--color-success-200);
  border-radius: var(--border-radius-md);
  color: var(--color-success-700);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-md);
}

.tip-icon {
  width: 16px;
  height: 16px;
  font-size: 16px;
  color: var(--color-success-600);
}

/* 错误消息 */
.error-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-danger-600);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-danger-50);
  border: 1px solid var(--color-danger-200);
  border-radius: var(--border-radius-md);
}

.error-icon {
  width: 16px;
  height: 16px;
  font-size: 16px;
  flex-shrink: 0;
}



/* 当前目录信息 */
.current-directory {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.info-item label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
  display: block;
}

.current-path {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-family: var(--font-mono);
  color: var(--color-text-primary);
  background: var(--color-bg-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border-light);
}

.path-icon {
  width: 16px;
  height: 16px;
  color: var(--color-primary-600);
  font-size: 16px;
}

/* 表单组 */
.form-group {
  margin-bottom: var(--spacing-xl);
}

.form-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-base);
}

.form-label.required::after {
  content: '*';
  color: var(--color-danger-500);
  margin-left: var(--spacing-xs);
}

.label-icon {
  width: 16px;
  height: 16px;
  color: var(--color-primary-600);
  font-size: 16px;
}

.form-hint {
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-lg);
  margin-top: 0;
}

/* 目录选项 */
.directory-option {
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--spacing-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.directory-option:hover {
  border-color: var(--color-primary-300);
  background: var(--color-primary-50);
}

.option-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
}

.option-radio {
  width: 16px;
  height: 16px;
  accent-color: var(--color-primary-500);
}

.option-icon {
  width: 20px;
  height: 20px;
  font-size: 20px;
}

.root-icon {
  color: var(--color-warning-600);
}

.option-text {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.option-path {
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  margin-left: auto;
}

/* 目录树 */
.directory-tree {
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-lg);
  background: var(--color-bg-primary);
  max-height: 300px;
  overflow-y: auto;
}

/* 表单错误 */
.form-error {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-danger-600);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-danger-50);
  border: 1px solid var(--color-danger-200);
  border-radius: var(--border-radius-md);
}

.error-icon {
  width: 16px;
  height: 16px;
  font-size: 16px;
  flex-shrink: 0;
}

/* 移动预览 */
.move-preview {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.preview-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
}

.preview-icon {
  width: 18px;
  height: 18px;
  color: var(--color-primary-600);
  font-size: 18px;
}

.preview-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.preview-item {
  flex: 1;
}

.preview-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  display: block;
  margin-bottom: var(--spacing-xs);
}

.preview-path {
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border-medium);
  display: block;
}

.preview-path.from {
  background: var(--color-danger-50);
  border-color: var(--color-danger-200);
  color: var(--color-danger-700);
}

.preview-path.to {
  background: var(--color-success-50);
  border-color: var(--color-success-200);
  color: var(--color-success-700);
}

.preview-arrow {
  color: var(--color-text-tertiary);
  font-size: var(--font-size-lg);
}

/* 抽屉底部 */
.drawer-footer {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  border-top: 1px solid var(--color-border-light);
  background: var(--color-bg-secondary);
  justify-content: flex-end;
  flex-shrink: 0;
}

/* 按钮样式 */
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
  font-size: var(--font-size-base);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: var(--color-text-inverse);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-medium);
}

.btn-secondary:hover {
  background: var(--color-bg-quaternary);
  border-color: var(--color-primary-300);
}

.btn-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
}

.btn-icon.loading {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .drawer-container {
    width: 100%;
    min-width: unset;
    max-width: unset;
  }
  
  .drawer-header,
  .target-directory-section,
  .drawer-footer {
    padding: var(--spacing-lg);
  }
  
  .directory-tree-container {
    max-height: 200px;
  }
}

@media (max-width: 480px) {
  .drawer-header {
    padding: var(--spacing-md);
  }
  
  .header-content {
    flex-direction: column;
    gap: var(--spacing-sm);
    text-align: center;
  }
  
  .header-preview {
    flex-direction: column;
    gap: var(--spacing-xs);
  }
  
  .preview-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
  
  .preview-value {
    max-width: 100%;
    width: 100%;
  }
  
  .target-directory-section,
  .drawer-footer {
    padding: var(--spacing-md);
  }
}
</style> 