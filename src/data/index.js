// 数据索引文件 - 汇总所有模拟数据
import { systemStats, realtimeStats, trendData } from './statistics.js'
import { directoryTree, flatDirectories } from './directories.js'
import { 
  filesData, 
  filesByDirectory, 
  recentFiles, 
  popularFiles, 
  favoriteFiles, 
  filesByType 
} from './files.js'
import { 
  usersData, 
  roles, 
  permissions, 
  currentUser, 
  onlineUsers, 
  userActivityLogs,
  getUserById,
  getUserPermissions,
  hasPermission
} from './users.js'

// 导出统计数据
export {
  systemStats,
  realtimeStats,
  trendData
}

// 导出目录数据
export {
  directoryTree,
  flatDirectories
}

// 导出文件数据
export {
  filesData,
  filesByDirectory,
  recentFiles,
  popularFiles,
  favoriteFiles,
  filesByType
}

// 导出用户数据
export {
  usersData,
  roles,
  permissions,
  currentUser,
  onlineUsers,
  userActivityLogs,
  getUserById,
  getUserPermissions,
  hasPermission
}

// 数据API模拟器
export const mockAPI = {
  // 统计数据API
  getSystemStats: () => Promise.resolve(systemStats),
  getRealtimeStats: () => Promise.resolve(realtimeStats),
  getTrendData: () => Promise.resolve(trendData),
  
  // 目录数据API
  getDirectoryTree: () => Promise.resolve(directoryTree),
  getFlatDirectories: () => Promise.resolve(flatDirectories),
  getDirectoryById: (id) => {
    const findDirectory = (dir) => {
      if (dir.id === id) return dir
      if (dir.children) {
        for (const child of dir.children) {
          const found = findDirectory(child)
          if (found) return found
        }
      }
      return null
    }
    return Promise.resolve(findDirectory(directoryTree))
  },
  
  // 文件数据API
  getAllFiles: () => Promise.resolve(filesData),
  getFilesByDirectory: (directoryId) => Promise.resolve(filesByDirectory[directoryId] || []),
  getRecentFiles: (limit = 10) => Promise.resolve(recentFiles.slice(0, limit)),
  getPopularFiles: (limit = 10) => Promise.resolve(popularFiles.slice(0, limit)),
  getFavoriteFiles: () => Promise.resolve(favoriteFiles),
  getFilesByType: (type) => Promise.resolve(filesByType[type] || []),
  getFileById: (id) => Promise.resolve(filesData.find(file => file.id === id)),
  
  // 搜索API
  searchFiles: (query) => {
    const results = filesData.filter(file => 
      file.name.toLowerCase().includes(query.toLowerCase()) ||
      file.description?.toLowerCase().includes(query.toLowerCase()) ||
      file.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )
    return Promise.resolve(results)
  },
  
  // 用户数据API
  getAllUsers: () => Promise.resolve(usersData),
  getUserById: (id) => Promise.resolve(getUserById(id)),
  getCurrentUser: () => Promise.resolve(currentUser),
  getOnlineUsers: () => Promise.resolve(onlineUsers),
  getUserActivityLogs: (userId) => {
    const logs = userId 
      ? userActivityLogs.filter(log => log.userId === userId)
      : userActivityLogs
    return Promise.resolve(logs)
  },
  
  // 权限API
  getUserPermissions: (userId) => Promise.resolve(getUserPermissions(userId)),
  hasPermission: (userId, permission) => Promise.resolve(hasPermission(userId, permission)),
  
  // 模拟文件操作API
  uploadFile: (file) => {
    // 模拟文件上传
    return new Promise((resolve) => {
      setTimeout(() => {
        const newFile = {
          id: `file_${Date.now()}`,
          name: file.name,
          size: file.size,
          type: 'file',
          extension: file.name.split('.').pop(),
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
          updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
          downloadCount: 0,
          viewCount: 0,
          favorited: false
        }
        resolve(newFile)
      }, 1000)
    })
  },
  
  downloadFile: (fileId) => {
    // 模拟文件下载
    return new Promise((resolve) => {
      setTimeout(() => {
        const file = filesData.find(f => f.id === fileId)
        if (file) {
          file.downloadCount += 1
          resolve({ success: true, file })
        } else {
          resolve({ success: false, error: '文件不存在' })
        }
      }, 500)
    })
  },
  
  deleteFile: (fileId) => {
    // 模拟文件删除
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = filesData.findIndex(f => f.id === fileId)
        if (index !== -1) {
          filesData.splice(index, 1)
          resolve({ success: true })
        } else {
          resolve({ success: false, error: '文件不存在' })
        }
      }, 300)
    })
  },
  
  createDirectory: (name, parentId) => {
    // 模拟创建目录
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDir = {
          id: `dir_${Date.now()}`,
          name,
          type: 'folder',
          parentId,
          path: `${parentId === 'root' ? '' : parentId}/${name}`,
          size: 0,
          fileCount: 0,
          folderCount: 0,
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
          updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
        }
        resolve(newDir)
      }, 500)
    })
  },
  
  renameFile: (fileId, newName) => {
    // 模拟文件重命名
    return new Promise((resolve) => {
      setTimeout(() => {
        const file = filesData.find(f => f.id === fileId)
        if (file) {
          file.name = newName
          file.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 19)
          resolve({ success: true, file })
        } else {
          resolve({ success: false, error: '文件不存在' })
        }
      }, 300)
    })
  },
  
  moveFile: (fileId, targetDirectoryId) => {
    // 模拟文件移动
    return new Promise((resolve) => {
      setTimeout(() => {
        const file = filesData.find(f => f.id === fileId)
        if (file) {
          file.directoryId = targetDirectoryId
          file.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 19)
          resolve({ success: true, file })
        } else {
          resolve({ success: false, error: '文件不存在' })
        }
      }, 500)
    })
  },
  
  toggleFavorite: (fileId) => {
    // 模拟收藏/取消收藏
    return new Promise((resolve) => {
      setTimeout(() => {
        const file = filesData.find(f => f.id === fileId)
        if (file) {
          file.favorited = !file.favorited
          file.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 19)
          resolve({ success: true, file, favorited: file.favorited })
        } else {
          resolve({ success: false, error: '文件不存在' })
        }
      }, 200)
    })
  }
}

// 默认导出
export default {
  // 统计数据
  systemStats,
  realtimeStats,
  trendData,
  
  // 目录数据
  directoryTree,
  flatDirectories,
  
  // 文件数据
  filesData,
  filesByDirectory,
  recentFiles,
  popularFiles,
  favoriteFiles,
  filesByType,
  
  // 用户数据
  usersData,
  roles,
  permissions,
  currentUser,
  onlineUsers,
  userActivityLogs,
  
  // 工具函数
  getUserById,
  getUserPermissions,
  hasPermission,
  
  // API模拟器
  mockAPI
} 