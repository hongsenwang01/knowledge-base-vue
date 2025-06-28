<template>
  <!-- 遮罩层 -->
  <div v-if="show" class="drawer-overlay" @click="handleOverlayClick">
    <!-- 抽屉容器 -->
    <div class="drawer-container" :class="{ 'show': show }">
      <!-- 抽屉头部 -->
      <div class="drawer-header">
        <div class="header-content">
          <div class="header-icon">
            <el-icon class="header-icon-svg"><FolderAdd /></el-icon>
          </div>
          <div class="header-text">
            <h3 class="drawer-title">新建文件夹</h3>
            <p class="drawer-subtitle">在指定位置创建一个新的文件夹</p>
            
            <!-- 文件夹信息输入 -->
            <div class="header-form">
              <div class="form-row">
                <div class="form-group form-group-name">
                  <label class="form-label required">
                    <el-icon class="label-icon"><EditPen /></el-icon>
                    文件夹名称
                  </label>
                  <el-input 
                    v-model="formData.name" 
                    placeholder="请输入文件夹名称"
                    maxlength="100"
                    class="form-input"
                  />
                </div>
                
                <div class="form-group form-group-desc">
                  <label class="form-label">
                    <el-icon class="label-icon"><EditPen /></el-icon>
                    文件夹描述 (可选)
                  </label>
                  <el-input 
                    v-model="formData.description" 
                    placeholder="为您的文件夹添加一些描述"
                    maxlength="500"
                    class="form-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-close" @click="handleCancel">
          <el-icon><Close /></el-icon>
        </button>
      </div>

      <!-- 抽屉主体 -->
      <div class="drawer-body">
        <!-- 目标目录选择 -->
        <div class="target-directory-section">
          <div class="section-header">
            <el-icon class="section-icon"><FolderOpened /></el-icon>
            <h4>选择创建位置</h4>
          </div>
          <p class="section-description">新文件夹将被创建在您选择的目录下</p>

          <!-- 目录树容器 -->
          <div class="directory-tree-container">
            <div class="tree-header">
              <span class="tree-title">目录结构</span>
              <div class="tree-actions">
                <button 
                  class="tree-action-btn" 
                  title="移动到根目录"
                  :class="{ active: formData.parentId === null || formData.parentId === rootDirectoryId }"
                  @click="selectRootDirectory"
                >
                  <el-icon><HomeFilled /></el-icon>
                </button>
              </div>
            </div>
            <div class="directory-tree-content">
              <!-- 根目录提示 -->
              <div v-if="formData.parentId === null || formData.parentId === rootDirectoryId" class="root-selected-tip">
                <el-icon class="tip-icon"><HomeFilled /></el-icon>
                <span>已选择在根目录下创建</span>
              </div>
              
              <el-tree
                ref="treeRef"
                :data="directories"
                :props="{ label: 'name', children: 'children' }"
                node-key="id"
                highlight-current
                :expand-on-click-node="false"
                @node-click="handleNodeClick"
                class="directory-tree"
              />
            </div>
          </div>

          <!-- 错误提示 -->
          <div v-if="validationError" class="error-message">
            <el-icon class="error-icon"><Warning /></el-icon>
            <span>{{ validationError }}</span>
          </div>
        </div>
      </div>

      <!-- 抽屉底部 -->
      <div class="drawer-footer">
        <button type="button" class="btn btn-secondary" @click="handleCancel">
          <el-icon class="btn-icon"><Close /></el-icon>
          取消
        </button>
        <button 
          type="button" 
          class="btn btn-primary" 
          @click="handleConfirm"
          :disabled="isSubmitting || !canCreate"
        >
          <el-icon class="btn-icon" :class="{ 'loading': isSubmitting }">
            <Loading v-if="isSubmitting" />
            <Check v-else />
          </el-icon>
          {{ isSubmitting ? '创建中...' : '确认创建' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { 
  FolderAdd, 
  Close, 
  Check,
  FolderOpened,
  EditPen,
  HomeFilled,
  Warning,
  Loading
} from '@element-plus/icons-vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  directories: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['create', 'cancel'])

const formRef = ref(null)
const treeRef = ref(null)
const isSubmitting = ref(false)
const validationError = ref('')

const initialFormData = {
  name: '',
  parentId: null,
  description: ''
}
const formData = ref({ ...initialFormData })

// 获取根目录ID
const rootDirectoryId = computed(() => {
  return props.directories.length > 0 ? props.directories[0].id : null
})

// 是否可以创建
const canCreate = computed(() => {
  return formData.value.name.trim() && formData.value.parentId !== null
})

watch(() => props.show, (newVal) => {
  if (newVal) {
    isSubmitting.value = false
    validationError.value = ''
    formData.value = { ...initialFormData }
    nextTick(() => {
      if (props.directories.length > 0) {
        const rootNode = props.directories[0]
        if (rootNode) {
          formData.value.parentId = rootNode.id
          treeRef.value?.setCurrentKey(rootNode.id)
        }
      }
    })
  }
})

const handleNodeClick = (data) => {
  formData.value.parentId = data.id
  validationError.value = ''
}

const selectRootDirectory = () => {
  if (props.directories.length > 0) {
    const rootNode = props.directories[0]
    formData.value.parentId = rootNode.id
    treeRef.value?.setCurrentKey(rootNode.id)
    validationError.value = ''
  }
}

const handleConfirm = async () => {
  // 验证表单
  if (!formData.value.name.trim()) {
    validationError.value = '文件夹名称不能为空'
    return
  }
  
  if (formData.value.name.length > 100) {
    validationError.value = '文件夹名称长度不能超过100个字符'
    return
  }
  
  if (!formData.value.parentId) {
    validationError.value = '必须选择一个创建位置'
    return
  }
  
  isSubmitting.value = true
  validationError.value = ''
  
  // 模拟API调用延迟
  setTimeout(() => {
    emit('create', { ...formData.value })
    // 在父组件中处理关闭和提示
  }, 500)
}

const handleCancel = () => {
  emit('cancel')
}

// 处理遮罩点击
const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    emit('cancel')
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
  align-items: flex-start;
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-secondary);
  flex-shrink: 0;
}

.header-content {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  flex: 1;
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
  min-width: 0;
}

.drawer-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-xs) 0;
}

.drawer-subtitle {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  margin: 0 0 var(--spacing-lg) 0;
}

/* 头部表单 */
.header-form {
  margin-top: var(--spacing-md);
}

.form-row {
  display: flex;
  gap: var(--spacing-lg);
  align-items: flex-start;
}

/* 关闭按钮 */
.btn-close {
  width: 32px;
  height: 32px;
  border: 1px solid var(--color-border-medium);
  background: var(--color-bg-primary);
  color: var(--color-text-tertiary);
  border-radius: var(--border-radius-full);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  font-size: 16px;
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
  height: 100%;
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

/* 目录树样式 */
.directory-tree {
  background-color: transparent;
}

:deep(.el-tree-node__content) {
  height: 36px;
  border-radius: var(--border-radius-md);
}

:deep(.el-tree-node.is-current > .el-tree-node__content) {
  background-color: var(--color-primary-100);
  color: var(--color-primary-600);
  font-weight: var(--font-weight-semibold);
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

/* 表单组 */
.form-group {
  margin-bottom: 0;
  flex: 1;
  min-width: 0;
}

.form-group-name {
  flex: 0 0 40%;
}

.form-group-desc {
  flex: 1;
}

.form-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-sm);
  white-space: nowrap;
}

.form-label.required::after {
  content: '*';
  color: var(--color-danger-500);
  margin-left: var(--spacing-xs);
}

.label-icon {
  width: 14px;
  height: 14px;
  color: var(--color-primary-600);
  font-size: 14px;
}

.form-input :deep(.el-input__wrapper) {
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border-medium);
  background: var(--color-bg-primary);
  transition: all var(--transition-fast);
  min-height: 48px;
  height: 48px;
  padding: var(--spacing-md) var(--spacing-lg);
}

.form-input :deep(.el-input__inner) {
  height: 100%;
  line-height: 1.5;
}

.form-input :deep(.el-input__count) {
  position: absolute;
  right: var(--spacing-md);
  bottom: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.form-input :deep(.el-input__wrapper):hover {
  border-color: var(--color-primary-300);
}

.form-input :deep(.el-input__wrapper.is-focus) {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 2px var(--color-primary-100);
}

.form-input :deep(.el-textarea__inner) {
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border-medium);
  background: var(--color-bg-primary);
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
  
  .header-content {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .header-form {
    width: 100%;
  }
  
  .form-row {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .form-group-name,
  .form-group-desc {
    flex: none;
  }
  
  .directory-tree-container {
    max-height: 300px;
  }
  
  .form-label {
    font-size: var(--font-size-xs);
  }
  
  .form-input :deep(.el-input__wrapper) {
    min-height: 44px;
    height: 44px;
    padding: var(--spacing-sm) var(--spacing-md);
  }
}
</style> 