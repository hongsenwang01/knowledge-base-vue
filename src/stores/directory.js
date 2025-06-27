import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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
  
  // 模拟数据
  const mockDirectoryTree = [
    {
      id: 'root',
      name: '根目录',
      parentId: null,
      path: '/',
      level: 0,
      childCount: 3,
      fileCount: 0,
      createTime: '2024-01-01T00:00:00Z',
      children: [
        {
          id: 'documents',
          name: '文档',
          parentId: 'root',
          path: '/文档',
          level: 1,
          childCount: 2,
          fileCount: 5,
          createTime: '2024-01-01T00:00:00Z',
          children: [
            {
              id: 'work',
              name: '工作文档',
              parentId: 'documents',
              path: '/文档/工作文档',
              level: 2,
              childCount: 0,
              fileCount: 3,
              createTime: '2024-01-01T00:00:00Z',
              children: []
            },
            {
              id: 'personal',
              name: '个人文档',
              parentId: 'documents',
              path: '/文档/个人文档',
              level: 2,
              childCount: 0,
              fileCount: 2,
              createTime: '2024-01-01T00:00:00Z',
              children: []
            }
          ]
        },
        {
          id: 'images',
          name: '图片',
          parentId: 'root',
          path: '/图片',
          level: 1,
          childCount: 0,
          fileCount: 8,
          createTime: '2024-01-01T00:00:00Z',
          children: []
        },
        {
          id: 'videos',
          name: '视频',
          parentId: 'root',
          path: '/视频',
          level: 1,
          childCount: 0,
          fileCount: 3,
          createTime: '2024-01-01T00:00:00Z',
          children: []
        }
      ]
    }
  ]
  
  // 方法
  const fetchDirectoryTree = async () => {
    loading.value = true
    error.value = null
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500))
      directoryTree.value = mockDirectoryTree
      
      // 设置默认当前目录为根目录
      if (!currentDirectory.value) {
        currentDirectory.value = mockDirectoryTree[0]
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
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const parent = findDirectoryById(parentId)
      if (!parent) {
        throw new Error('父目录不存在')
      }
      
      const newDirectory = {
        id: `dir_${Date.now()}`,
        name,
        parentId,
        path: `${parent.path}/${name}`.replace('//', '/'),
        level: parent.level + 1,
        childCount: 0,
        fileCount: 0,
        createTime: new Date().toISOString(),
        description,
        children: []
      }
      
      parent.children.push(newDirectory)
      parent.childCount = parent.children.length
      
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