<template>
  <div class="directory-table-container">
    <div class="table-header">
      <div class="table-title">
        <el-icon class="table-title-icon"><FolderOpened /></el-icon>
        <h3>目录列表</h3>
      </div>
      <div class="table-actions">
        <div class="search-box">
          <el-icon class="search-icon"><Search /></el-icon>
          <input 
            type="text" 
            placeholder="搜索目录..." 
            class="search-input"
            v-model="searchKeyword"
            @input="handleSearch"
            @keyup.enter="handleSearch"
          >
          <button 
            v-if="searchKeyword" 
            class="search-clear"
            @click="clearSearch"
            title="清除搜索"
          >
            <el-icon><Close /></el-icon>
          </button>
        </div>
        <button class="btn btn-primary" @click="$emit('create-directory')">
          <el-icon class="btn-icon"><FolderAdd /></el-icon>
          新建文件夹
        </button>
      </div>
    </div>
    
    <div class="table-content">
      <!-- 加载状态 -->
      <div v-if="loading" class="table-loading">
        <div class="loading-spinner"></div>
        <p>正在加载目录数据...</p>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="error" class="table-error">
        <div class="error-icon">
          <el-icon class="error-icon-svg"><Warning /></el-icon>
        </div>
        <h3>加载失败</h3>
        <p>{{ error }}</p>
        <button class="btn btn-primary btn-sm" @click="$emit('reload')">
          <el-icon class="btn-icon"><Refresh /></el-icon>
          重新加载
        </button>
      </div>
      
      <!-- 目录列表表格 -->
      <div v-else-if="directories.length > 0" class="directory-table">
        <table class="data-table">
          <thead>
            <tr>
              <th>目录名称</th>
              <th>路径</th>
              <th>层级</th>
              <th>父目录</th>
              <th>描述</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="directory in filteredDirectories" :key="directory.id">
              <td>
                <div class="directory-name">
                  <el-icon class="directory-icon"><Folder /></el-icon>
                  <span>{{ directory.name }}</span>
                  <span v-if="directory.id === 1" class="directory-badge root">根目录</span>
                </div>
              </td>
              <td>
                <code class="directory-path">{{ directory.path }}</code>
              </td>
              <td>
                <span class="directory-level">{{ directory.level }}</span>
              </td>
              <td>
                <span v-if="directory.parentId">
                  {{ getParentDirectoryName(directory.parentId) }}
                </span>
                <span v-else class="text-muted">无</span>
              </td>
              <td>
                <span class="directory-description">
                  {{ directory.description || '暂无描述' }}
                </span>
              </td>
              <td>
                <time class="directory-time">
                  {{ formatDateTime(directory.createdAt) }}
                </time>
              </td>
              <td>
                <div class="directory-actions">
                  <button 
                    class="btn btn-icon btn-sm btn-primary" 
                    title="移动" 
                    @click="$emit('move', directory)"
                    :disabled="directory.id === 1"
                  >
                    <el-icon><Sort /></el-icon>
                  </button>
                  <button 
                    class="btn btn-icon btn-sm btn-secondary" 
                    title="更新" 
                    @click="$emit('update', directory)"
                    :disabled="directory.id === 1"
                  >
                    <el-icon><Edit /></el-icon>
                  </button>
                  <button 
                    class="btn btn-icon btn-sm btn-danger" 
                    title="删除" 
                    @click="$emit('delete', directory)"
                    :disabled="directory.id === 1"
                  >
                    <el-icon><Delete /></el-icon>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 分页组件 -->
      <div v-if="!searchKeyword && directories.length > 0" class="directory-pagination">
        <Pagination
          :current="pagination.current"
          :size="pagination.size"
          :total="pagination.total"
          :pages="pagination.pages"
          @change-page="$emit('change-page', $event)"
          @change-size="$emit('change-size', $event)"
        />
      </div>
      
      <!-- 搜索结果统计 -->
      <div v-if="searchKeyword" class="search-result-info">
        <p>
          <el-icon><Search /></el-icon>
          搜索 "{{ searchKeyword }}" 找到 {{ filteredDirectories.length }} 个结果
        </p>
      </div>
      
      <!-- 空状态 -->
      <div v-if="!searchKeyword && directories.length === 0" class="table-empty">
        <div class="empty-icon">
          <el-icon class="empty-icon-svg"><FolderDelete /></el-icon>
        </div>
        <h3>暂无目录</h3>
        <p>系统中还没有创建任何目录</p>
      </div>
      
      <!-- 搜索无结果 -->
      <div v-if="searchKeyword && filteredDirectories.length === 0" class="search-empty">
        <div class="empty-icon">
          <el-icon class="empty-icon-svg"><Search /></el-icon>
        </div>
        <h3>未找到匹配的目录</h3>
        <p>尝试使用其他关键词搜索</p>
        <button class="btn btn-primary btn-sm" @click="clearSearch">
          清除搜索
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, watch, ref, computed } from 'vue'
import Pagination from '@/components/Pagination.vue'
// 导入Element Plus图标
import {
  FolderOpened,
  Search,
  Warning,
  Refresh,
  Folder,
  Sort,
  Edit,
  Delete,
  FolderDelete,
  FolderAdd,
  Close
} from '@element-plus/icons-vue'

export default {
  name: 'DirectoryTable',
  components: {
    Pagination,
    // 注册图标组件
    FolderOpened,
    Search,
    Warning,
    Refresh,
    Folder,
    Sort,
    Edit,
    Delete,
    FolderDelete,
    FolderAdd,
    Close
  },
  props: {
    directories: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    },
    allDirectories: {
      type: Array,
      default: () => []
    }
  },
  emits: ['reload', 'move', 'update', 'delete', 'change-page', 'change-size', 'create-directory', 'search'],
  setup(props, { emit }) {
    // 搜索相关状态
    const searchKeyword = ref('')
    const isSearching = ref(false)
    
    const formatDateTime = (dateString) => {
      if (!dateString) return '--'
      const date = new Date(dateString)
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    // 获取父目录名称
    const getParentDirectoryName = (parentId) => {
      // 首先在当前页面数据中查找
      const parent = props.directories.find(dir => dir.id === parentId)
      if (parent) {
        return parent.name
      }
      
      // 如果当前页面没有，在树形数据中查找
      const parentInTree = props.allDirectories.find(dir => dir.id === parentId)
      return parentInTree ? parentInTree.name : '未知目录'
    }

    // 过滤后的目录列表
    const filteredDirectories = computed(() => {
      if (!searchKeyword.value.trim()) {
        return props.directories
      }
      
      const keyword = searchKeyword.value.toLowerCase().trim()
      return props.directories.filter(directory => {
        return (
          directory.name.toLowerCase().includes(keyword) ||
          directory.path.toLowerCase().includes(keyword) ||
          (directory.description && directory.description.toLowerCase().includes(keyword))
        )
      })
    })

    // 搜索处理函数
    const handleSearch = () => {
      if (searchKeyword.value.trim()) {
        isSearching.value = true
        // 发送搜索事件给父组件
        emit('search', searchKeyword.value.trim())
      } else {
        clearSearch()
      }
    }

    // 清除搜索
    const clearSearch = () => {
      searchKeyword.value = ''
      isSearching.value = false
      emit('search', '')
    }

    // 监听 directories 变化，Element Plus图标会自动渲染
    watch(() => props.directories, () => {
      // Element Plus 图标会自动渲染，无需手动初始化
    })

    onMounted(() => {
      // Element Plus 图标会自动渲染，无需手动初始化
    })

    return {
      searchKeyword,
      isSearching,
      filteredDirectories,
      handleSearch,
      clearSearch,
      formatDateTime,
      getParentDirectoryName
    }
  }
}
</script>

<style scoped>
.directory-table-container {
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  backdrop-filter: var(--backdrop-blur-lg);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-tertiary);
}

.table-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.table-title-icon {
  width: 20px;
  height: 20px;
  color: var(--color-primary-600);
  font-size: 20px;
}

.table-title h3 {
  margin: 0;
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}

.table-actions {
  display: flex;
  gap: var(--spacing-md);
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-md) var(--spacing-2xl);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--border-radius-lg);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  width: 280px;
  transition: all var(--transition-normal);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.search-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.search-icon {
  position: absolute;
  left: var(--spacing-md);
  width: 18px;
  height: 18px;
  color: var(--color-text-tertiary);
  pointer-events: none;
  font-size: 18px;
}

.search-clear {
  position: absolute;
  right: var(--spacing-md);
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  color: var(--color-text-tertiary);
  cursor: pointer;
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.search-clear:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
}

.table-content {
  padding: var(--spacing-2xl);
  min-height: 400px;
}

/* 目录表格样式 */
.directory-table {
  background: var(--color-bg-overlay);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border-light);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  background: var(--color-bg-secondary);
  padding: var(--spacing-md);
  text-align: left;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-border-light);
  font-size: var(--font-size-sm);
}

.data-table td {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border-light);
  vertical-align: middle;
}

.data-table tbody tr:hover {
  background: var(--color-bg-secondary);
}

.directory-name {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.directory-icon {
  width: 16px;
  height: 16px;
  color: var(--color-primary-500);
  font-size: 16px;
}

.directory-badge {
  padding: 2px 8px;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.directory-badge.root {
  background: var(--color-primary-100);
  color: var(--color-primary-700);
}

.directory-path {
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  background: var(--color-bg-secondary);
  padding: 2px 6px;
  border-radius: var(--border-radius-sm);
  color: var(--color-text-secondary);
}

.directory-level {
  display: inline-block;
  width: 24px;
  height: 24px;
  background: var(--color-bg-secondary);
  border-radius: 50%;
  text-align: center;
  line-height: 24px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.directory-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.directory-time {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.directory-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
}

.directory-actions .btn {
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-md);
  transition: all 0.2s ease;
  font-size: var(--font-size-sm);
  border: none;
  cursor: pointer;
}

.directory-actions .btn-primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: var(--color-text-inverse);
}

.directory-actions .btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

.directory-actions .btn-secondary {
  background: linear-gradient(135deg, var(--color-gray-500), var(--color-gray-600));
  color: var(--color-text-inverse);
}

.directory-actions .btn-secondary:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-gray-600), var(--color-gray-700));
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(100, 116, 139, 0.3);
}

.directory-actions .btn-danger {
  background: linear-gradient(135deg, var(--color-danger-500), var(--color-danger-600));
  color: var(--color-text-inverse);
}

.directory-actions .btn-danger:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-danger-600), #b91c1c);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.directory-actions .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.directory-actions .btn .el-icon {
  width: 16px;
  height: 16px;
  font-size: 16px;
}

.text-muted {
  color: var(--color-text-tertiary);
  font-style: italic;
}

/* 加载状态 */
.table-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xxl);
  background: var(--color-bg-overlay);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border-light);
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

/* 错误状态 */
.table-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xxl);
  background: var(--color-bg-overlay);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border-light);
}

.error-icon {
  width: 48px;
  height: 48px;
  background: var(--color-error-100);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
}

.error-icon-svg {
  width: 24px;
  height: 24px;
  color: var(--color-error-600);
  font-size: 24px;
}

.table-error h3 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.table-error p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

/* 空状态 */
.table-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xxl);
  background: var(--color-bg-overlay);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border-light);
}

.empty-icon {
  width: 48px;
  height: 48px;
  background: var(--color-bg-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
}

.empty-icon-svg {
  width: 24px;
  height: 24px;
  color: var(--color-text-tertiary);
  font-size: 24px;
}

.table-empty h3 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.table-empty p {
  color: var(--color-text-secondary);
  text-align: center;
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
  font-size: var(--font-size-base);
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: var(--color-text-inverse);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-sm {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
}

.btn-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
}

/* 分页样式 */
.directory-pagination {
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-light);
  border-top: none;
  border-radius: 0 0 var(--border-radius-xl) var(--border-radius-xl);
  overflow: hidden;
}

/* 搜索结果统计 */
.search-result-info {
  padding: var(--spacing-lg) var(--spacing-xl);
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-light);
  border-top: none;
  border-radius: 0 0 var(--border-radius-xl) var(--border-radius-xl);
}

.search-result-info p {
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.search-result-info .el-icon {
  width: 16px;
  height: 16px;
  font-size: 16px;
  color: var(--color-primary-600);
}

/* 搜索空状态 */
.search-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3xl);
  color: var(--color-text-secondary);
  text-align: center;
}

.search-empty .empty-icon {
  margin-bottom: var(--spacing-lg);
}

.search-empty h3 {
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
}

.search-empty p {
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-base);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .table-header {
    flex-direction: column;
    gap: var(--spacing-lg);
    text-align: center;
  }
  
  .table-actions {
    flex-direction: column;
    gap: var(--spacing-md);
    width: 100%;
  }
  
  .search-box {
    width: 100%;
  }
  
  .search-input {
    width: 100%;
  }
  
  .search-result-info,
  .search-empty {
    padding: var(--spacing-lg);
  }
}
</style> 