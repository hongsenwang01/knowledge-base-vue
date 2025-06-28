import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { directoryAPI, directoryDataTransform } from '@/api/directory.js'

export const useDirectoryStore = defineStore('directory', () => {
  // 状态
  const directoryTree = ref([])
  const currentDirectory = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  // 分页相关状态
  const pageDirectories = ref([]) // 分页的目录列表
  const pagination = ref({
    current: 1,
    size: 10,
    total: 0,
    pages: 0
  })
  
  // 计算属性
  const currentDirectoryPath = computed(() => {
    if (!currentDirectory.value) return '/'
    return currentDirectory.value.path || '/'
  })
  
  const currentDirectoryName = computed(() => {
    if (!currentDirectory.value) return '根目录'
    return currentDirectory.value.name || '根目录'
  })
  
  // 方法
  const fetchDirectoryTree = async () => {
    loading.value = true
    error.value = null
    
    try {
      // 调用真实API获取目录列表
      const directories = await directoryAPI.getDirectories()

      
      // 将扁平的目录列表转换为树形结构
      const tree = directoryDataTransform.transformToTree(directories)
      
      
      directoryTree.value = tree
      
      // 设置默认当前目录为根目录（第一个根目录）
      if (!currentDirectory.value && tree.length > 0) {
        currentDirectory.value = tree[0]
      }
    } catch (err) {
      error.value = err.message || '获取目录树失败'
      console.error('获取目录树失败:', err)
    } finally {
      loading.value = false
    }
  }

  // 分页获取目录列表
  const fetchDirectoriesPage = async (current = 1, size = 10) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await directoryAPI.getDirectoriesPage({ current, size })
      
      // 更新分页数据
      pagination.value = {
        current: response.current,
        size: response.size,
        total: response.total,
        pages: response.pages
      }
      
      // 转换目录数据格式
      pageDirectories.value = response.records.map(dir => 
        directoryDataTransform.transformDirectory(dir)
      )
      
    } catch (err) {
      error.value = err.message || '获取目录列表失败'
      console.error('获取目录列表失败:', err)
    } finally {
      loading.value = false
    }
  }

  // 切换页码
  const changePage = async (page) => {
    if (page === pagination.value.current) return
    await fetchDirectoriesPage(page, pagination.value.size)
  }

  // 切换每页数量
  const changePageSize = async (size) => {
    if (size === pagination.value.size) return
    await fetchDirectoriesPage(1, size)
  }
  
  const setCurrentDirectory = (directory) => {
    currentDirectory.value = directory
  }
  
  const findDirectoryById = (id, tree = directoryTree.value) => {
    for (const node of tree) {
      if (node.id === id) {
        return node
      }
      if (node.children && node.children.length > 0) {
        const found = findDirectoryById(id, node.children)
        if (found) return found
      }
    }
    return null
  }
  
  const createDirectory = async (directoryData) => {
    loading.value = true
    error.value = null
    
    try {
      // 准备创建数据
      const createData = {
        name: directoryData.name,
        parentId: directoryData.parentId,
        description: directoryData.description || ''
      }
      
      // 调用真实API创建目录
      const newDirectory = await directoryAPI.createDirectory(createData)
      
      // 转换返回的数据格式
      const transformedDirectory = directoryDataTransform.transformDirectory(newDirectory)
      transformedDirectory.children = []
      
      // 更新本地目录树
      const parent = findDirectoryById(createData.parentId)
      if (parent) {
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(transformedDirectory)
        parent.folderCount = parent.children.length
        parent.hasChildren = true
      } else if (createData.parentId === 1) {
        // 如果是根目录（ID为1），直接添加到树的根级别
        directoryTree.value.push(transformedDirectory)
      }
      
      // 刷新分页数据以显示新创建的目录
      await fetchDirectoriesPage(pagination.value.current, pagination.value.size)
      
      return transformedDirectory
    } catch (err) {
      error.value = err.message || '创建目录失败'
      console.error('创建目录失败:', err)
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const updateDirectory = async (id, updates) => {
    loading.value = true
    error.value = null
    
    try {
      // 调用真实API更新目录
      const updatedDirectory = await directoryAPI.updateDirectory(id, updates)
      
      // 转换返回的数据格式
      const transformedDirectory = directoryDataTransform.transformDirectory(updatedDirectory)
      
      // 更新本地目录树
      const directory = findDirectoryById(id)
      if (directory) {
        // 保持children数据
        transformedDirectory.children = directory.children
        Object.assign(directory, transformedDirectory)
      }
      
      // 同时更新分页数据中的对应项
      const pageItem = pageDirectories.value.find(dir => dir.id === id)
      if (pageItem) {
        Object.assign(pageItem, transformedDirectory)
      }
      
      return transformedDirectory
    } catch (err) {
      error.value = err.message || '更新目录失败'
      console.error('更新目录失败:', err)
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const deleteDirectory = async (id, force = false) => {
    loading.value = true
    error.value = null
    
    try {
      // 调用真实API删除目录
      await directoryAPI.deleteDirectory(id, force)
      
      // 从本地目录树中移除
      const removeFromTree = (tree, targetId) => {
        for (let i = 0; i < tree.length; i++) {
          if (tree[i].id === targetId) {
            tree.splice(i, 1)
            return true
          }
          if (tree[i].children && removeFromTree(tree[i].children, targetId)) {
            tree[i].folderCount = tree[i].children.length
            return true
          }
        }
        return false
      }
      
      // 从目录树中移除
      removeFromTree(directoryTree.value, id)
      
      // 从分页数据中移除
      const pageIndex = pageDirectories.value.findIndex(dir => dir.id === id)
      if (pageIndex !== -1) {
        pageDirectories.value.splice(pageIndex, 1)
        // 更新总数
        if (pagination.value.total > 0) {
          pagination.value.total -= 1
        }
      }
      
      // 如果删除的是当前目录，切换到根目录
      if (currentDirectory.value?.id === id && directoryTree.value.length > 0) {
        currentDirectory.value = directoryTree.value[0]
      }
      
      return true
    } catch (err) {
      error.value = err.message || '删除目录失败'
      console.error('删除目录失败:', err)
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const moveDirectory = async (id, newParentId) => {
    loading.value = true
    error.value = null
    
    try {
      // 调用真实API移动目录
      const movedDirectory = await directoryAPI.moveDirectory(id, { newParentId })
      
      // 转换返回的数据格式
      const transformedDirectory = directoryDataTransform.transformDirectory(movedDirectory)
      
      // 从原位置移除目录
      const directory = findDirectoryById(id)
      if (!directory) {
        throw new Error('要移动的目录不存在')
      }
      
      // 保存目录的原始数据（包括children）
      const directoryData = { ...directory }
      
      // 从原位置移除
      const removeFromTree = (tree, targetId) => {
        for (let i = 0; i < tree.length; i++) {
          if (tree[i].id === targetId) {
            const removed = tree.splice(i, 1)[0]
            return removed
          }
          if (tree[i].children && tree[i].children.length > 0) {
            const removed = removeFromTree(tree[i].children, targetId)
            if (removed) {
              // 更新父目录的folderCount
              tree[i].folderCount = tree[i].children.length
              return removed
            }
          }
        }
        return null
      }
      
      const removedDirectory = removeFromTree(directoryTree.value, id)
      if (!removedDirectory) {
        throw new Error('从目录树中移除目录失败')
      }
      
      // 更新目录信息（主要是path和parentId）
      Object.assign(removedDirectory, transformedDirectory)
      
      // 添加到新位置
      if (newParentId === null || newParentId === 0) {
        // 移动到根目录
        directoryTree.value.push(removedDirectory)
      } else {
        // 移动到指定父目录
        const newParent = findDirectoryById(newParentId)
        if (!newParent) {
          throw new Error('目标父目录不存在')
        }
        
        if (!newParent.children) {
          newParent.children = []
        }
        newParent.children.push(removedDirectory)
        newParent.folderCount = newParent.children.length
        newParent.hasChildren = true
      }
      
      // 更新分页数据中的对应项
      const pageItem = pageDirectories.value.find(dir => dir.id === id)
      if (pageItem) {
        Object.assign(pageItem, transformedDirectory)
      }
      
      return transformedDirectory
    } catch (err) {
      error.value = err.message || '移动目录失败'
      console.error('移动目录失败:', err)
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const searchDirectories = async (keyword) => {
    loading.value = true
    error.value = null
    
    try {
      if (!keyword.trim()) {
        // 如果关键词为空，重新加载分页数据
        await fetchDirectoriesPage()
        return pageDirectories.value
      }
      
      // 从所有目录数据中搜索匹配的目录
      const allDirs = []
      const flattenDirectories = (dirs) => {
        dirs.forEach(dir => {
          allDirs.push(dir)
          if (dir.children && dir.children.length > 0) {
            flattenDirectories(dir.children)
          }
        })
      }
      
      // 展平目录树获取所有目录
      flattenDirectories(directoryTree.value)
      
      // 执行前端搜索过滤
      const keywordLower = keyword.toLowerCase().trim()
      const searchResults = allDirs.filter(directory => {
        return (
          directory.name.toLowerCase().includes(keywordLower) ||
          directory.path.toLowerCase().includes(keywordLower) ||
          (directory.description && directory.description.toLowerCase().includes(keywordLower))
        )
      })
      
      // 更新分页数据为搜索结果
      pageDirectories.value = searchResults
      
      // 更新分页信息
      pagination.value = {
        current: 1,
        size: searchResults.length,
        total: searchResults.length,
        pages: 1
      }
      
      return searchResults
    } catch (err) {
      error.value = err.message || '搜索目录失败'
      console.error('搜索目录失败:', err)
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const clearError = () => {
    error.value = null
  }
  
  return {
    // 状态
    directoryTree,
    currentDirectory,
    loading,
    error,
    
    // 分页相关状态
    pageDirectories,
    pagination,
    
    // 计算属性
    currentDirectoryPath,
    currentDirectoryName,
    
    // 方法
    fetchDirectoryTree,
    fetchDirectoriesPage,
    changePage,
    changePageSize,
    setCurrentDirectory,
    findDirectoryById,
    createDirectory,
    updateDirectory,
    deleteDirectory,
    moveDirectory,
    searchDirectories,
    clearError
  }
}) 