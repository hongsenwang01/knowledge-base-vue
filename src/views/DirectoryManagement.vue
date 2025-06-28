<template>
  <div class="directory-management">
    <div class="directory-management-container">
      <!-- 页面头部 -->
      <header class="page-header">
        <div class="header-content">
          <div class="header-icon">
            <el-icon class="header-icon-svg"><Setting /></el-icon>
          </div>
          <div class="header-text">
            <h1 class="page-title">目录管理</h1>
            <p class="page-subtitle">管理文件夹结构和权限</p>
          </div>
        </div>
        <div class="header-actions">
          <router-link to="/files" class="btn btn-secondary">
            <el-icon class="btn-icon"><FolderOpened /></el-icon>
            文件管理
          </router-link>
          <router-link to="/" class="btn btn-secondary">
            <el-icon class="btn-icon"><HomeFilled /></el-icon>
            返回首页
          </router-link>
        </div>
      </header>

      <!-- 工具栏 -->
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn btn-primary" @click="handleCreateDirectory">
            <el-icon class="btn-icon"><FolderAdd /></el-icon>
            新建文件夹
          </button>
          <button class="btn btn-outline" disabled>
            <el-icon class="btn-icon"><EditPen /></el-icon>
            批量操作
          </button>
        </div>
        <div class="toolbar-right">
          <div class="view-switcher">
            <button 
              class="btn btn-icon" 
              :class="{ active: viewMode === 'table' }"
              title="列表视图"
              @click="setViewMode('table')"
            >
              <el-icon class="view-icon"><List /></el-icon>
            </button>
            <button 
              class="btn btn-icon" 
              :class="{ active: viewMode === 'tree' }"
              title="树形视图"
              @click="setViewMode('tree')"
            >
              <el-icon class="view-icon"><Share /></el-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <div class="main-content">
        <!-- 目录统计卡片 -->
        <DirectoryStats :stats="stats" />

        <!-- 列表视图 -->
        <DirectoryTable
          v-if="viewMode === 'table'"
          :directories="directoryStore.pageDirectories"
          :pagination="directoryStore.pagination"
          :loading="directoryStore.loading"
          :error="directoryStore.error"
          :all-directories="allDirectories"
          @reload="loadDirectories"
          @move="handleMoveDirectory"
          @update="handleUpdateDirectory"
          @delete="handleDeleteDirectory"
          @change-page="handlePageChange"
          @change-size="handlePageSizeChange"
        />

        <!-- 树形视图 -->
        <DirectoryTreeView
          v-if="viewMode === 'tree'"
          :directories="directoryStore.directoryTree"
          :loading="directoryStore.loading"
          :error="directoryStore.error"
          :current-id="currentDirectoryId"
          @node-select="handleNodeSelect"
          @node-action="handleNodeAction"
          @reload="loadDirectoryTree"
        />
      </div>
    </div>

    <!-- 更新目录弹窗 -->
    <UpdateDirectoryModal
      :show="showUpdateModal"
      :directory="currentDirectory"
      @update="confirmUpdate"
      @cancel="cancelOperation"
    />

    <!-- 删除目录弹窗 -->
    <DeleteDirectoryModal
      :show="showDeleteModal"
      :directory="currentDirectory"
      @confirm="confirmDelete"
      @cancel="cancelOperation"
    />

    <!-- 移动目录弹窗 -->
    <MoveDirectoryModal
      :show="showMoveModal"
      :directory="currentDirectory"
      :directories="directoryStore.directoryTree"
      @move="confirmMove"
      @cancel="cancelOperation"
    />

    <!-- 新建目录弹窗 -->
    <CreateDirectoryModal
      :show="showCreateModal"
      :directories="directoryStore.directoryTree"
      @create="confirmCreate"
      @cancel="cancelOperation"
    />
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import { systemStats } from '@/data'
import { useDirectoryStore } from '@/stores/directory'
import DirectoryStats from '@/components/DirectoryStats.vue'
import DirectoryTable from '@/components/DirectoryTable.vue'
import DirectoryTreeView from '@/components/DirectoryTreeView.vue'
import UpdateDirectoryModal from '@/components/UpdateDirectoryModal.vue'
import DeleteDirectoryModal from '@/components/DeleteDirectoryModal.vue'
import MoveDirectoryModal from '@/components/MoveDirectoryModal.vue'
import CreateDirectoryModal from '@/components/CreateDirectoryModal.vue'
import toast from '@/utils/toast'
// 导入Element Plus图标
import { 
  Setting, 
  FolderOpened, 
  HomeFilled, 
  FolderAdd, 
  EditPen, 
  List, 
  Share 
} from '@element-plus/icons-vue'

export default {
  name: 'DirectoryManagement',
  components: {
    DirectoryStats,
    DirectoryTable,
    DirectoryTreeView,
    UpdateDirectoryModal,
    DeleteDirectoryModal,
    MoveDirectoryModal,
    CreateDirectoryModal,
    // 注册图标组件
    Setting,
    FolderOpened,
    HomeFilled,
    FolderAdd,
    EditPen,
    List,
    Share
  },
  setup() {
    const stats = ref(systemStats)
    const directoryStore = useDirectoryStore()
    
    // 视图模式
    const viewMode = ref('table') // 'table' 或 'tree'
    const currentDirectoryId = ref(null)
    
    // 弹窗相关状态
    const showUpdateModal = ref(false)
    const showDeleteModal = ref(false)
    const showMoveModal = ref(false)
    const showCreateModal = ref(false)
    const currentDirectory = ref(null)
    
    // 获取所有目录的扁平列表
    const allDirectories = computed(() => {
      const flattenDirectories = (directories) => {
        let result = []
        directories.forEach(dir => {
          result.push(dir)
          if (dir.children && dir.children.length > 0) {
            result.push(...flattenDirectories(dir.children))
          }
        })
        return result
      }
      
      return flattenDirectories(directoryStore.directoryTree)
    })

    // 加载目录数据（分页）
    const loadDirectories = async () => {
      try {
        await directoryStore.fetchDirectoriesPage()
        
        // Element Plus 图标会自动渲染，无需手动初始化
      } catch (error) {
        console.error('加载目录失败:', error)
      }
    }

    // 处理页码变化
    const handlePageChange = async (page) => {
      await directoryStore.changePage(page)
      // Element Plus 图标会自动渲染，无需手动初始化
    }

    // 处理每页数量变化
    const handlePageSizeChange = async (size) => {
      await directoryStore.changePageSize(size)
      // Element Plus 图标会自动渲染，无需手动初始化
    }

    // 处理移动目录
    const handleMoveDirectory = (directory) => {
      currentDirectory.value = directory
      showMoveModal.value = true
    }

    // 处理更新目录
    const handleUpdateDirectory = (directory) => {
      currentDirectory.value = directory
      showUpdateModal.value = true
    }

    // 处理删除目录
    const handleDeleteDirectory = (directory) => {
      currentDirectory.value = directory
      showDeleteModal.value = true
    }

    // 处理新建目录
    const handleCreateDirectory = () => {
      showCreateModal.value = true
    }

    // 设置视图模式
    const setViewMode = (mode) => {
      viewMode.value = mode
    }

    // 加载目录树
    const loadDirectoryTree = async () => {
      try {
        await directoryStore.fetchDirectoryTree()
      } catch (error) {
        console.error('加载目录树失败:', error)
      }
    }

    // 处理节点选择
    const handleNodeSelect = (node) => {
      currentDirectoryId.value = node.id
      directoryStore.setCurrentDirectory(node)
    }

    // 处理节点操作
    const handleNodeAction = (action, node) => {
      currentDirectory.value = node
      
      switch (action) {
        case 'move':
          showMoveModal.value = true
          break
        case 'edit':
          showUpdateModal.value = true
          break
        case 'delete':
          showDeleteModal.value = true
          break
        default:
          console.warn('未知的节点操作:', action)
      }
    }

    // 确认更新目录
    const confirmUpdate = async (updates) => {
      if (!currentDirectory.value) return
      
      try {
        await directoryStore.updateDirectory(currentDirectory.value.id, updates)
        
        showUpdateModal.value = false
        currentDirectory.value = null
        
        // 显示成功提示
        toast.success('目录更新成功！')
      } catch (error) {
        console.error('更新目录失败:', error)
        toast.error(error.message || '更新目录失败')
      }
    }

    // 确认删除目录
    const confirmDelete = async () => {
      if (!currentDirectory.value) return
      
      try {
        await directoryStore.deleteDirectory(currentDirectory.value.id)
        
        showDeleteModal.value = false
        currentDirectory.value = null
        
        // 显示成功提示
        toast.success('目录删除成功！')
      } catch (error) {
        console.error('删除目录失败:', error)
        toast.error(error.message || '删除目录失败')
      }
    }

    // 确认移动目录
    const confirmMove = async (moveData) => {
      if (!currentDirectory.value) return
      
      try {
        await directoryStore.moveDirectory(moveData.directoryId, moveData.newParentId)
        
        showMoveModal.value = false
        currentDirectory.value = null
        
        // 显示成功提示
        toast.success('目录移动成功！')
      } catch (error) {
        console.error('移动目录失败:', error)
        
        // 处理不同的错误类型
        if (error.message.includes('目录名称重复') || error.message.includes('重复')) {
          toast.error('目标目录下已存在同名目录')
        } else if (error.message.includes('目录不存在')) {
          toast.error('目标目录不存在，请重新选择')
        } else if (error.message.includes('循环引用') || error.message.includes('子目录')) {
          toast.error('不能移动到自己的子目录下')
        } else if (error.message.includes('根目录')) {
          toast.error('不能移动根目录')
        } else {
          toast.error(error.message || '移动目录失败')
        }
      }
    }

    // 确认创建目录
    const confirmCreate = async (createData) => {
      try {
        await directoryStore.createDirectory(createData)
        
        showCreateModal.value = false
        
        // 显示成功提示
        toast.success('目录创建成功！')
      } catch (error) {
        console.error('创建目录失败:', error)
        
        // 处理不同的错误类型
        if (error.message.includes('目录名称重复') || error.message.includes('重复')) {
          toast.error('目录名称重复，请使用其他名称')
        } else if (error.message.includes('目录不存在')) {
          toast.error('父目录不存在，请重新选择')
        } else if (error.message.includes('不能为空')) {
          toast.warning('目录名称不能为空')
        } else {
          toast.error(error.message || '创建目录失败')
        }
      }
    }

    // 取消操作
    const cancelOperation = () => {
      showUpdateModal.value = false
      showDeleteModal.value = false
      showMoveModal.value = false
      showCreateModal.value = false
      currentDirectory.value = null
    }

    onMounted(async () => {
      // Element Plus 图标会自动渲染，无需手动初始化
      
      // 同时加载分页数据和树形数据
      await Promise.all([
        loadDirectories(), // 加载分页的目录列表
        directoryStore.fetchDirectoryTree() // 加载完整的目录树（用于新建时选择父目录）
      ])
    })



    return {
      stats,
      directoryStore,
      allDirectories,
      loadDirectories,
      handlePageChange,
      handlePageSizeChange,
      // 视图相关
      viewMode,
      currentDirectoryId,
      setViewMode,
      loadDirectoryTree,
      handleNodeSelect,
      handleNodeAction,
      // 弹窗相关
      showUpdateModal,
      showDeleteModal,
      showMoveModal,
      showCreateModal,
      currentDirectory,
      handleMoveDirectory,
      handleUpdateDirectory,
      handleDeleteDirectory,
      handleCreateDirectory,
      confirmUpdate,
      confirmDelete,
      confirmMove,
      confirmCreate,
      cancelOperation
    }
  }
}
</script>

<style scoped>
.directory-management {
  min-height: 100vh;
  background: var(--color-bg-primary);
}

.directory-management-container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--spacing-lg);
}

/* 页面头部 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-xl);
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-xl);
  backdrop-filter: var(--backdrop-blur-lg);
}



.header-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.header-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
}

.header-icon-svg {
  width: 32px;
  height: 32px;
  color: var(--color-text-inverse);
  font-size: 32px;
}

.header-text h1 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.header-text p {
  color: var(--color-text-secondary);
  margin: 0;
  font-size: var(--font-size-base);
}

.header-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.header-actions .btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-normal);
  border: none;
  cursor: pointer;
}

/* 工具栏 */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-xl);
  backdrop-filter: var(--backdrop-blur-lg);
}

.toolbar-left {
  display: flex;
  gap: var(--spacing-md);
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.view-switcher {
  display: flex;
  border: 1px solid var(--color-border-medium);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  background: var(--color-bg-primary);
}

.view-switcher .btn {
  border: none;
  border-radius: 0;
  padding: var(--spacing-sm) var(--spacing-md);
  background: transparent;
  color: var(--color-text-tertiary);
  transition: all var(--transition-fast);
}

.view-switcher .btn.active {
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
}

.view-switcher .btn:hover:not(.active) {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
}

.view-icon {
  width: 16px;
  height: 16px;
  font-size: 16px;
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
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: var(--color-text-inverse);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-outline {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-medium);
}

.btn-outline:hover:not(:disabled) {
  background: var(--color-bg-tertiary);
  border-color: var(--color-primary-300);
}

.btn-secondary {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-medium);
}

.btn-secondary:hover {
  background: var(--color-bg-quaternary);
  border-color: var(--color-primary-300);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}



/* 占位符样式 */
.table-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--color-text-secondary);
  min-height: 400px;
}

.placeholder-icon {
  width: 96px;
  height: 96px;
  margin-bottom: var(--spacing-xl);
  background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-200));
  border-radius: var(--border-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon-svg {
  width: 48px;
  height: 48px;
  color: var(--color-primary-600);
}

.table-placeholder h3 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-xl);
}

.table-placeholder p {
  margin-bottom: var(--spacing-2xl);
  color: var(--color-text-tertiary);
  font-size: var(--font-size-base);
}

.placeholder-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--spacing-xl);
  text-align: left;
  max-width: 900px;
}

.feature-group h4 {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
}

.feature-group-icon {
  width: 18px;
  height: 18px;
  color: var(--color-primary-600);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-md);
}

.feature-check {
  width: 16px;
  height: 16px;
  color: var(--color-success-600);
  flex-shrink: 0;
}

.btn-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .directory-management-container {
    padding: var(--spacing-md);
  }
  
  .page-header {
    flex-direction: column;
    gap: var(--spacing-lg);
    text-align: center;
  }
  
  .header-content {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .header-actions {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .toolbar {
    flex-direction: column;
    gap: var(--spacing-lg);
    align-items: stretch;
  }
  
  .toolbar-left {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .toolbar-right {
    justify-content: center;
  }
}
</style> 