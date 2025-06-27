import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { directoryTree as mockDirectoryTree, mockAPI } from '@/data'

export const useDirectoryStore = defineStore('directory', () => {
  // 状态
  const directoryTree = ref([])
  const currentDirectory = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
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
      // 使用模拟API获取目录树
      const tree = await mockAPI.getDirectoryTree()
      directoryTree.value = [tree] // 包装为数组格式以兼容现有代码
      
      // 设置默认当前目录为根目录
      if (!currentDirectory.value) {
        currentDirectory.value = tree
      }
    } catch (err) {
      error.value = err.message || '获取目录树失败'
    } finally {
      loading.value = false
    }
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
  
  const createDirectory = async (parentId, name, description = '') => {
    loading.value = true
    error.value = null
    
    try {
      // 使用模拟API创建目录
      const newDirectory = await mockAPI.createDirectory(name, parentId)
      
      // 更新本地目录树
      const parent = findDirectoryById(parentId)
      if (parent) {
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push({
          ...newDirectory,
          children: []
        })
        parent.folderCount = parent.children.length
      }
      
      return newDirectory
    } catch (err) {
      error.value = err.message || '创建目录失败'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const updateDirectory = async (id, updates) => {
    loading.value = true
    error.value = null
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const directory = findDirectoryById(id)
      if (!directory) {
        throw new Error('目录不存在')
      }
      
      Object.assign(directory, updates)
      
      return directory
    } catch (err) {
      error.value = err.message || '更新目录失败'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const deleteDirectory = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const removeFromTree = (tree, targetId) => {
        for (let i = 0; i < tree.length; i++) {
          if (tree[i].id === targetId) {
            tree.splice(i, 1)
            return true
          }
          if (tree[i].children && removeFromTree(tree[i].children, targetId)) {
            tree[i].childCount = tree[i].children.length
            return true
          }
        }
        return false
      }
      
      const removed = removeFromTree(directoryTree.value, id)
      if (!removed) {
        throw new Error('目录不存在')
      }
      
      // 如果删除的是当前目录，切换到根目录
      if (currentDirectory.value?.id === id) {
        currentDirectory.value = directoryTree.value[0]
      }
      
      return true
    } catch (err) {
      error.value = err.message || '删除目录失败'
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
    
    // 计算属性
    currentDirectoryPath,
    currentDirectoryName,
    
    // 方法
    fetchDirectoryTree,
    setCurrentDirectory,
    findDirectoryById,
    createDirectory,
    updateDirectory,
    deleteDirectory,
    clearError
  }
}) 