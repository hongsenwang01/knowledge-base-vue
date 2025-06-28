// 目录结构数据
export const directoryTree = {
  id: 'root',
  name: '根目录',
  type: 'folder',
  path: '/',
  size: 0,
  fileCount: 2847,
  folderCount: 156,
  createdAt: '2023-01-01 10:00:00',
  updatedAt: '2024-01-15 14:30:25',
  children: [
    {
      id: 'documents',
      name: '文档',
      type: 'folder',
      path: '/documents',
      size: 7303014400, // 6.8GB
      fileCount: 1024,
      folderCount: 12,
      createdAt: '2023-01-15 09:30:00',
      updatedAt: '2024-01-15 11:20:15',
      children: [
        {
          id: 'work',
          name: '工作文档',
          type: 'folder',
          path: '/documents/work',
          size: 3221225472, // 3GB
          fileCount: 456,
          folderCount: 8,
          createdAt: '2023-02-01 14:00:00',
          updatedAt: '2024-01-15 09:45:30',
          children: [
            {
              id: 'projects',
              name: '项目文档',
              type: 'folder',
              path: '/documents/work/projects',
              size: 1610612736, // 1.5GB
              fileCount: 234,
              folderCount: 5,
              createdAt: '2023-03-01 16:20:00',
              updatedAt: '2024-01-14 17:30:45'
            },
            {
              id: 'reports',
              name: '报告',
              type: 'folder',
              path: '/documents/work/reports',
              size: 805306368, // 768MB
              fileCount: 124,
              folderCount: 2,
              createdAt: '2023-03-15 11:45:00',
              updatedAt: '2024-01-12 13:20:10'
            },
            {
              id: 'contracts',
              name: '合同',
              type: 'folder',
              path: '/documents/work/contracts',
              size: 536870912, // 512MB
              fileCount: 98,
              folderCount: 1,
              createdAt: '2023-04-01 08:30:00',
              updatedAt: '2024-01-10 16:15:25'
            }
          ]
        },
        {
          id: 'personal',
          name: '个人文档',
          type: 'folder',
          path: '/documents/personal',
          size: 2147483648, // 2GB
          fileCount: 298,
          folderCount: 3,
          createdAt: '2023-02-15 10:15:00',
          updatedAt: '2024-01-13 20:30:45',
          children: [
            {
              id: 'finance',
              name: '财务',
              type: 'folder',
              path: '/documents/personal/finance',
              size: 268435456, // 256MB
              fileCount: 89,
              folderCount: 0,
              createdAt: '2023-05-01 12:00:00',
              updatedAt: '2024-01-08 19:45:30'
            },
            {
              id: 'health',
              name: '健康',
              type: 'folder',
              path: '/documents/personal/health',
              size: 134217728, // 128MB
              fileCount: 45,
              folderCount: 0,
              createdAt: '2023-06-01 15:30:00',
              updatedAt: '2024-01-05 14:20:15'
            }
          ]
        },
        {
          id: 'archive',
          name: '归档文档',
          type: 'folder',
          path: '/documents/archive',
          size: 1610612736, // 1.5GB
          fileCount: 270,
          folderCount: 1,
          createdAt: '2023-01-20 13:45:00',
          updatedAt: '2023-12-15 10:30:20'
        }
      ]
    },
    {
      id: 'media',
      name: '媒体文件',
      type: 'folder',
      path: '/media',
      size: 8589934592, // 8GB
      fileCount: 1278,
      folderCount: 18,
      createdAt: '2023-01-20 16:00:00',
      updatedAt: '2024-01-15 12:45:30',
      children: [
        {
          id: 'images',
          name: '图片',
          type: 'folder',
          path: '/media/images',
          size: 4509715456, // 4.2GB
          fileCount: 856,
          folderCount: 12,
          createdAt: '2023-02-01 09:00:00',
          updatedAt: '2024-01-15 08:30:15',
          children: [
            {
              id: 'photos',
              name: '照片',
              type: 'folder',
              path: '/media/images/photos',
              size: 3221225472, // 3GB
              fileCount: 624,
              folderCount: 8,
              createdAt: '2023-02-10 14:20:00',
              updatedAt: '2024-01-14 19:15:45'
            },
            {
              id: 'screenshots',
              name: '截图',
              type: 'folder',
              path: '/media/images/screenshots',
              size: 805306368, // 768MB
              fileCount: 156,
              folderCount: 2,
              createdAt: '2023-03-01 11:30:00',
              updatedAt: '2024-01-13 16:20:30'
            },
            {
              id: 'graphics',
              name: '设计图',
              type: 'folder',
              path: '/media/images/graphics',
              size: 483183820, // 461MB
              fileCount: 76,
              folderCount: 2,
              createdAt: '2023-04-15 13:45:00',
              updatedAt: '2024-01-11 15:10:20'
            }
          ]
        },
        {
          id: 'videos',
          name: '视频',
          type: 'folder',
          path: '/media/videos',
          size: 3328155648, // 3.1GB
          fileCount: 124,
          folderCount: 4,
          createdAt: '2023-02-20 10:30:00',
          updatedAt: '2024-01-12 21:45:10',
          children: [
            {
              id: 'tutorials',
              name: '教程',
              type: 'folder',
              path: '/media/videos/tutorials',
              size: 1610612736, // 1.5GB
              fileCount: 45,
              folderCount: 2,
              createdAt: '2023-05-01 16:00:00',
              updatedAt: '2024-01-10 14:30:25'
            },
            {
              id: 'presentations',
              name: '演示',
              type: 'folder',
              path: '/media/videos/presentations',
              size: 1073741824, // 1GB
              fileCount: 34,
              folderCount: 1,
              createdAt: '2023-06-15 12:15:00',
              updatedAt: '2024-01-08 18:20:45'
            }
          ]
        },
        {
          id: 'audio',
          name: '音频',
          type: 'folder',
          path: '/media/audio',
          size: 935329792, // 892MB
          fileCount: 298,
          folderCount: 2,
          createdAt: '2023-03-01 15:45:00',
          updatedAt: '2024-01-09 20:15:30'
        }
      ]
    },
    {
      id: 'projects',
      name: '项目',
      type: 'folder',
      path: '/projects',
      size: 2684354560, // 2.5GB
      fileCount: 456,
      folderCount: 24,
      createdAt: '2023-01-25 11:20:00',
      updatedAt: '2024-01-15 13:50:40',
      children: [
        {
          id: 'web-development',
          name: 'Web开发',
          type: 'folder',
          path: '/projects/web-development',
          size: 1610612736, // 1.5GB
          fileCount: 289,
          folderCount: 15,
          createdAt: '2023-02-01 09:30:00',
          updatedAt: '2024-01-15 13:50:40'
        },
        {
          id: 'mobile-apps',
          name: '移动应用',
          type: 'folder',
          path: '/projects/mobile-apps',
          size: 805306368, // 768MB
          fileCount: 134,
          folderCount: 6,
          createdAt: '2023-03-15 14:00:00',
          updatedAt: '2024-01-12 16:25:15'
        },
        {
          id: 'data-analysis',
          name: '数据分析',
          type: 'folder',
          path: '/projects/data-analysis',
          size: 268435456, // 256MB
          fileCount: 33,
          folderCount: 3,
          createdAt: '2023-07-01 10:45:00',
          updatedAt: '2024-01-05 12:30:20'
        }
      ]
    },
    {
      id: 'backup',
      name: '备份',
      type: 'folder',
      path: '/backup',
      size: 1932735283, // 1.8GB
      fileCount: 89,
      folderCount: 3,
      createdAt: '2023-01-10 08:00:00',
      updatedAt: '2024-01-01 02:30:00'
    },
    {
      id: 'temp',
      name: '临时文件',
      type: 'folder',
      path: '/temp',
      size: 536870912, // 512MB
      fileCount: 156,
      folderCount: 2,
      createdAt: '2024-01-01 00:00:00',
      updatedAt: '2024-01-15 14:30:25'
    }
  ]
}

// 将树形结构扁平化，并添加 parentId
const flattenDirectoryTree = (node, parentId = null, level = 0) => {
  const { children, ...rest } = node
  
  const currentNode = {
    ...rest,
    parentId,
    level,
    // 确保 id 和 name 存在，以符合后端扁平列表的格式
    id: node.id || 'unknown',
    name: node.name || 'Unnamed'
  }
  
  // 移除原始 children 属性，因为它不属于扁平结构
  delete currentNode.children
  
  let result = [currentNode]
  
  if (children && children.length > 0) {
    children.forEach(child => {
      result = result.concat(flattenDirectoryTree(child, node.id, level + 1))
    })
  }
  
  return result
}

// 扁平化的目录列表（用于快速查找）
// export const flatDirectories = [
//   { id: 'root', name: '根目录', path: '/', parentId: null, level: 0 },
//   { id: 'documents', name: '文档', path: '/documents', parentId: 'root', level: 1 },
//   { id: 'work', name: '工作文档', path: '/documents/work', parentId: 'documents', level: 2 },
//   { id: 'projects', name: '项目文档', path: '/documents/work/projects', parentId: 'work', level: 3 },
//   { id: 'reports', name: '报告', path: '/documents/work/reports', parentId: 'work', level: 3 },
//   { id: 'contracts', name: '合同', path: '/documents/work/contracts', parentId: 'work', level: 3 },
//   { id: 'personal', name: '个人文档', path: '/documents/personal', parentId: 'documents', level: 2 },
//   { id: 'finance', name: '财务', path: '/documents/personal/finance', parentId: 'personal', level: 3 },
//   { id: 'health', name: '健康', path: '/documents/personal/health', parentId: 'personal', level: 3 },
//   { id: 'archive', name: '归档文档', path: '/documents/archive', parentId: 'documents', level: 2 },
//   { id: 'media', name: '媒体文件', path: '/media', parentId: 'root', level: 1 },
//   { id: 'images', name: '图片', path: '/media/images', parentId: 'media', level: 2 },
//   { id: 'photos', name: '照片', path: '/media/images/photos', parentId: 'images', level: 3 },
//   { id: 'screenshots', name: '截图', path: '/media/images/screenshots', parentId: 'images', level: 3 },
//   { id: 'graphics', name: '设计图', path: '/media/images/graphics', parentId: 'images', level: 3 },
//   { id: 'videos', name: '视频', path: '/media/videos', parentId: 'media', level: 2 },
//   { id: 'tutorials', name: '教程', path: '/media/videos/tutorials', parentId: 'videos', level: 3 },
//   { id: 'presentations', name: '演示', path: '/media/videos/presentations', parentId: 'videos', level: 3 },
//   { id: 'audio', name: '音频', path: '/media/audio', parentId: 'media', level: 2 },
//   { id: 'web-development', name: 'Web开发', path: '/projects/web-development', parentId: 'projects', level: 2 },
//   { id: 'mobile-apps', name: '移动应用', path: '/projects/mobile-apps', parentId: 'projects', level: 2 },
//   { id: 'data-analysis', name: '数据分析', path: '/projects/data-analysis', parentId: 'projects', level: 2 },
//   { id: 'backup', name: '备份', path: '/backup', parentId: 'root', level: 1 },
//   { id: 'temp', name: '临时文件', path: '/temp', parentId: 'root', level: 1 }
// ]

// 通过遍历 `directoryTree` 动态生成扁平化列表
// 注意：根节点的 parentId 为 null，这与 transformToTree 逻辑一致
export const flatDirectories = flattenDirectoryTree(directoryTree)

export default {
  directoryTree,
  flatDirectories
} 