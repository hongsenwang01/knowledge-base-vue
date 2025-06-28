// 目录管理相关API接口
import apiClient from './index.js'

/**
 * 目录API接口
 */
export const directoryAPI = {
  /**
   * 获取所有目录列表
   * @returns {Promise<Array>} 目录列表
   */
  async getDirectories() {
    const response = await apiClient.get('/api/v1/directories')
    return response.data || []
  },

  /**
   * 分页获取目录列表
   * @param {Object} params 分页参数
   * @param {number} [params.current=1] 当前页码
   * @param {number} [params.size=10] 每页数量
   * @returns {Promise<Object>} 分页数据
   */
  async getDirectoriesPage(params = {}) {
    const { current = 1, size = 10 } = params
    const response = await apiClient.get('/api/v1/directories/page', {
      params: { current, size }
    })
    return response.data
  },

  /**
   * 获取目录详情
   * @param {string|number} directoryId 目录ID
   * @returns {Promise<Object>} 目录详情
   */
  async getDirectoryById(directoryId) {
    const response = await apiClient.get(`/api/v1/directories/${directoryId}`)
    return response.data
  },

  /**
   * 创建新目录
   * @param {Object} directoryData 目录数据
   * @param {string} directoryData.name 目录名称
   * @param {string|number} directoryData.parentId 父目录ID
   * @param {string} [directoryData.description] 目录描述
   * @returns {Promise<Object>} 创建的目录信息
   */
  async createDirectory(directoryData) {
    const response = await apiClient.post('/api/v1/directories', directoryData)
    return response.data
  },

  /**
   * 更新目录信息
   * @param {string|number} directoryId 目录ID
   * @param {Object} updates 更新数据
   * @param {string} [updates.name] 目录名称
   * @param {string} [updates.description] 目录描述
   * @returns {Promise<Object>} 更新后的目录信息
   */
  async updateDirectory(directoryId, updates) {
    const response = await apiClient.put(`/api/v1/directories/${directoryId}`, updates)
    return response.data
  },

  /**
   * 删除目录
   * @param {string|number} directoryId 目录ID
   * @param {boolean} [force=false] 是否强制删除（包含子目录和文件）
   * @returns {Promise<boolean>} 删除结果
   */
  async deleteDirectory(directoryId, force = false) {
    const params = force ? { force: true } : {}
    await apiClient.delete(`/api/v1/directories/${directoryId}`, { params })
    return true
  },

  /**
   * 移动目录
   * @param {string|number} directoryId 目录ID
   * @param {Object} moveData 移动数据
   * @param {string|number|null} moveData.newParentId 新的父目录ID，null或0表示移动到根目录
   * @returns {Promise<Object>} 移动后的目录信息
   */
  async moveDirectory(directoryId, moveData) {
    const response = await apiClient.patch(`/api/v1/directories/${directoryId}/move`, moveData)
    return response.data
  }
}

/**
 * 数据转换工具函数
 * 将后端返回的目录数据转换为前端需要的格式
 */
export const directoryDataTransform = {
  /**
   * 将后端目录列表转换为树形结构
   * @param {Array} directories 后端返回的目录列表
   * @returns {Array} 树形结构的目录数据
   */
  transformToTree(directories) {
    if (!Array.isArray(directories) || directories.length === 0) {
      return []
    }

    // 创建目录映射
    const directoryMap = new Map()
    const rootDirectories = []

    // 转换数据格式并创建映射
    directories.forEach(dir => {
      const transformedDir = this.transformDirectory(dir)
      transformedDir.children = []
      directoryMap.set(transformedDir.id, transformedDir)
    })

    // 构建树形结构
    directories.forEach(dir => {
      const transformedDir = directoryMap.get(dir.id)
      
      if (dir.parentId === 0 || dir.parentId === null || dir.parentId === 'root') {
        // 根目录
        rootDirectories.push(transformedDir)
      } else {
        // 子目录
        const parent = directoryMap.get(dir.parentId)
        if (parent) {
          parent.children.push(transformedDir)
          parent.folderCount = parent.children.length
        }
      }
    })

    return rootDirectories
  },

  /**
   * 转换单个目录数据格式
   * @param {Object} dir 后端目录数据
   * @returns {Object} 前端目录数据格式
   */
  transformDirectory(dir) {
    return {
      id: dir.id,
      name: dir.name,
      type: 'folder',
      path: dir.path,
      parentId: dir.parentId === 0 ? null : dir.parentId,
      description: dir.description || '',
      level: this.calculateLevel(dir.path),
      size: 0, // 后端暂无此数据，设为0
      fileCount: 0, // 后端暂无此数据，设为0
      folderCount: 0, // 将通过children.length计算
      createdAt: dir.createdAt,
      updatedAt: dir.updatedAt,
      createTime: dir.createdAt,
      updateTime: dir.updatedAt,
      hasChildren: dir.hasChildren || false,
      children: [] // 初始化为空数组
    }
  },

  /**
   * 根据路径计算目录层级
   * @param {string} path 目录路径
   * @returns {number} 层级深度
   */
  calculateLevel(path) {
    if (!path || path === '/') return 0
    return (path.match(/\//g) || []).length - 1
  },

  /**
   * 将前端目录数据转换为后端格式（用于创建/更新）
   * @param {Object} dir 前端目录数据
   * @returns {Object} 后端目录数据格式
   */
  transformToBackend(dir) {
    return {
      name: dir.name,
      parentId: dir.parentId === null ? 0 : dir.parentId,
      description: dir.description || ''
    }
  }
}

export default directoryAPI 