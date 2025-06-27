// 文件数据
export const filesData = [
  // 文档类文件
  {
    id: 'file_001',
    name: '2024年度工作总结.docx',
    type: 'file',
    extension: 'docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 2457600, // 2.4MB
    formattedSize: '2.4 MB',
    path: '/documents/work/reports/2024年度工作总结.docx',
    directoryId: 'reports',
    createdAt: '2024-01-10 09:30:15',
    updatedAt: '2024-01-12 16:45:30',
    createdBy: 'admin',
    updatedBy: 'admin',
    isPublic: false,
    tags: ['工作', '总结', '2024'],
    description: '2024年度工作总结报告',
    downloadCount: 24,
    viewCount: 156,
    favorited: true,
    thumbnail: null,
    checksum: 'md5:a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'
  },
  {
    id: 'file_002',
    name: '项目需求文档.pdf',
    type: 'file',
    extension: 'pdf',
    mimeType: 'application/pdf',
    size: 5242880, // 5MB
    formattedSize: '5.0 MB',
    path: '/documents/work/projects/项目需求文档.pdf',
    directoryId: 'projects',
    createdAt: '2024-01-08 14:20:00',
    updatedAt: '2024-01-08 14:20:00',
    createdBy: 'user_001',
    updatedBy: 'user_001',
    isPublic: true,
    tags: ['需求', '项目', 'PDF'],
    description: '新项目的详细需求文档',
    downloadCount: 89,
    viewCount: 312,
    favorited: false,
    thumbnail: '/thumbnails/pdf_thumb_001.jpg',
    checksum: 'md5:b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7'
  },
  {
    id: 'file_003',
    name: '合同模板.docx',
    type: 'file',
    extension: 'docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 1048576, // 1MB
    formattedSize: '1.0 MB',
    path: '/documents/work/contracts/合同模板.docx',
    directoryId: 'contracts',
    createdAt: '2023-12-15 11:45:00',
    updatedAt: '2024-01-05 09:30:25',
    createdBy: 'admin',
    updatedBy: 'user_002',
    isPublic: false,
    tags: ['合同', '模板', '法务'],
    description: '标准合同模板文档',
    downloadCount: 45,
    viewCount: 178,
    favorited: true,
    thumbnail: null,
    checksum: 'md5:c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8'
  },
  
  // 图片类文件
  {
    id: 'file_004',
    name: '公司年会照片_001.jpg',
    type: 'file',
    extension: 'jpg',
    mimeType: 'image/jpeg',
    size: 3145728, // 3MB
    formattedSize: '3.0 MB',
    path: '/media/images/photos/公司年会照片_001.jpg',
    directoryId: 'photos',
    createdAt: '2024-01-15 18:30:45',
    updatedAt: '2024-01-15 18:30:45',
    createdBy: 'user_003',
    updatedBy: 'user_003',
    isPublic: true,
    tags: ['照片', '年会', '活动'],
    description: '2024年公司年会活动照片',
    downloadCount: 67,
    viewCount: 423,
    favorited: true,
    thumbnail: '/thumbnails/img_thumb_001.jpg',
    dimensions: '4032x3024',
    checksum: 'md5:d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9'
  },
  {
    id: 'file_005',
    name: '产品设计图.png',
    type: 'file',
    extension: 'png',
    mimeType: 'image/png',
    size: 2097152, // 2MB
    formattedSize: '2.0 MB',
    path: '/media/images/graphics/产品设计图.png',
    directoryId: 'graphics',
    createdAt: '2024-01-12 15:20:30',
    updatedAt: '2024-01-14 10:15:20',
    createdBy: 'designer_001',
    updatedBy: 'designer_001',
    isPublic: false,
    tags: ['设计', '产品', 'UI'],
    description: '新产品界面设计图',
    downloadCount: 34,
    viewCount: 189,
    favorited: false,
    thumbnail: '/thumbnails/img_thumb_002.jpg',
    dimensions: '1920x1080',
    checksum: 'md5:e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0'
  },
  {
    id: 'file_006',
    name: '屏幕截图_2024-01-15.png',
    type: 'file',
    extension: 'png',
    mimeType: 'image/png',
    size: 524288, // 512KB
    formattedSize: '512 KB',
    path: '/media/images/screenshots/屏幕截图_2024-01-15.png',
    directoryId: 'screenshots',
    createdAt: '2024-01-15 14:25:10',
    updatedAt: '2024-01-15 14:25:10',
    createdBy: 'user_001',
    updatedBy: 'user_001',
    isPublic: false,
    tags: ['截图', '屏幕'],
    description: '系统界面截图',
    downloadCount: 12,
    viewCount: 45,
    favorited: false,
    thumbnail: '/thumbnails/img_thumb_003.jpg',
    dimensions: '1366x768',
    checksum: 'md5:f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1'
  },
  
  // 视频类文件
  {
    id: 'file_007',
    name: '产品演示视频.mp4',
    type: 'file',
    extension: 'mp4',
    mimeType: 'video/mp4',
    size: 104857600, // 100MB
    formattedSize: '100 MB',
    path: '/media/videos/presentations/产品演示视频.mp4',
    directoryId: 'presentations',
    createdAt: '2024-01-10 16:45:00',
    updatedAt: '2024-01-10 16:45:00',
    createdBy: 'marketing_001',
    updatedBy: 'marketing_001',
    isPublic: true,
    tags: ['视频', '演示', '产品'],
    description: '新产品功能演示视频',
    downloadCount: 156,
    viewCount: 892,
    favorited: true,
    thumbnail: '/thumbnails/video_thumb_001.jpg',
    duration: '00:05:34',
    resolution: '1920x1080',
    checksum: 'md5:g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2'
  },
  {
    id: 'file_008',
    name: 'Vue.js入门教程.mp4',
    type: 'file',
    extension: 'mp4',
    mimeType: 'video/mp4',
    size: 209715200, // 200MB
    formattedSize: '200 MB',
    path: '/media/videos/tutorials/Vue.js入门教程.mp4',
    directoryId: 'tutorials',
    createdAt: '2024-01-05 10:30:15',
    updatedAt: '2024-01-05 10:30:15',
    createdBy: 'developer_001',
    updatedBy: 'developer_001',
    isPublic: true,
    tags: ['教程', 'Vue.js', '前端'],
    description: 'Vue.js框架入门教程视频',
    downloadCount: 234,
    viewCount: 1567,
    favorited: true,
    thumbnail: '/thumbnails/video_thumb_002.jpg',
    duration: '01:23:45',
    resolution: '1920x1080',
    checksum: 'md5:h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3'
  },
  
  // 音频类文件
  {
    id: 'file_009',
    name: '会议录音_2024-01-12.mp3',
    type: 'file',
    extension: 'mp3',
    mimeType: 'audio/mpeg',
    size: 12582912, // 12MB
    formattedSize: '12 MB',
    path: '/media/audio/会议录音_2024-01-12.mp3',
    directoryId: 'audio',
    createdAt: '2024-01-12 15:30:00',
    updatedAt: '2024-01-12 15:30:00',
    createdBy: 'admin',
    updatedBy: 'admin',
    isPublic: false,
    tags: ['音频', '会议', '录音'],
    description: '项目讨论会议录音',
    downloadCount: 18,
    viewCount: 67,
    favorited: false,
    thumbnail: null,
    duration: '01:15:30',
    bitrate: '128 kbps',
    checksum: 'md5:i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4'
  },
  
  // 压缩文件
  {
    id: 'file_010',
    name: '项目源码备份.zip',
    type: 'file',
    extension: 'zip',
    mimeType: 'application/zip',
    size: 52428800, // 50MB
    formattedSize: '50 MB',
    path: '/backup/项目源码备份.zip',
    directoryId: 'backup',
    createdAt: '2024-01-01 02:00:00',
    updatedAt: '2024-01-01 02:00:00',
    createdBy: 'system',
    updatedBy: 'system',
    isPublic: false,
    tags: ['备份', '源码', '压缩'],
    description: '项目源代码自动备份文件',
    downloadCount: 3,
    viewCount: 12,
    favorited: false,
    thumbnail: null,
    compressionRatio: '65%',
    filesCount: 1245,
    checksum: 'md5:j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5'
  },
  
  // Excel文件
  {
    id: 'file_011',
    name: '财务报表_Q4.xlsx',
    type: 'file',
    extension: 'xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 3145728, // 3MB
    formattedSize: '3.0 MB',
    path: '/documents/personal/finance/财务报表_Q4.xlsx',
    directoryId: 'finance',
    createdAt: '2024-01-08 09:15:30',
    updatedAt: '2024-01-10 14:20:45',
    createdBy: 'finance_001',
    updatedBy: 'finance_001',
    isPublic: false,
    tags: ['财务', '报表', 'Excel'],
    description: '第四季度财务报表',
    downloadCount: 15,
    viewCount: 58,
    favorited: true,
    thumbnail: '/thumbnails/excel_thumb_001.jpg',
    sheets: ['收入', '支出', '汇总'],
    checksum: 'md5:k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6'
  },
  
  // PowerPoint文件
  {
    id: 'file_012',
    name: '产品发布会演示.pptx',
    type: 'file',
    extension: 'pptx',
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    size: 15728640, // 15MB
    formattedSize: '15 MB',
    path: '/documents/work/projects/产品发布会演示.pptx',
    directoryId: 'projects',
    createdAt: '2024-01-14 11:30:00',
    updatedAt: '2024-01-14 17:45:15',
    createdBy: 'marketing_001',
    updatedBy: 'marketing_001',
    isPublic: true,
    tags: ['演示', 'PPT', '发布会'],
    description: '新产品发布会演示文稿',
    downloadCount: 78,
    viewCount: 245,
    favorited: true,
    thumbnail: '/thumbnails/ppt_thumb_001.jpg',
    slides: 45,
    checksum: 'md5:l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7'
  },
  
  // 代码文件
  {
    id: 'file_013',
    name: 'main.js',
    type: 'file',
    extension: 'js',
    mimeType: 'text/javascript',
    size: 8192, // 8KB
    formattedSize: '8.0 KB',
    path: '/projects/web-development/main.js',
    directoryId: 'web-development',
    createdAt: '2024-01-15 13:45:20',
    updatedAt: '2024-01-15 13:50:40',
    createdBy: 'developer_001',
    updatedBy: 'developer_001',
    isPublic: true,
    tags: ['代码', 'JavaScript', '前端'],
    description: '项目主入口文件',
    downloadCount: 45,
    viewCount: 123,
    favorited: true,
    thumbnail: null,
    language: 'javascript',
    lines: 234,
    checksum: 'md5:m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8'
  },
  
  // 文本文件
  {
    id: 'file_014',
    name: 'README.md',
    type: 'file',
    extension: 'md',
    mimeType: 'text/markdown',
    size: 4096, // 4KB
    formattedSize: '4.0 KB',
    path: '/projects/web-development/README.md',
    directoryId: 'web-development',
    createdAt: '2024-01-15 10:00:00',
    updatedAt: '2024-01-15 12:30:15',
    createdBy: 'developer_001',
    updatedBy: 'developer_001',
    isPublic: true,
    tags: ['文档', 'Markdown', '说明'],
    description: '项目说明文档',
    downloadCount: 67,
    viewCount: 189,
    favorited: false,
    thumbnail: null,
    language: 'markdown',
    lines: 156,
    checksum: 'md5:n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9'
  },
  
  // 临时文件
  {
    id: 'file_015',
    name: 'temp_upload_001.tmp',
    type: 'file',
    extension: 'tmp',
    mimeType: 'application/octet-stream',
    size: 1048576, // 1MB
    formattedSize: '1.0 MB',
    path: '/temp/temp_upload_001.tmp',
    directoryId: 'temp',
    createdAt: '2024-01-15 14:30:25',
    updatedAt: '2024-01-15 14:30:25',
    createdBy: 'system',
    updatedBy: 'system',
    isPublic: false,
    tags: ['临时', '上传'],
    description: '临时上传文件',
    downloadCount: 0,
    viewCount: 1,
    favorited: false,
    thumbnail: null,
    isTemporary: true,
    expiresAt: '2024-01-16 14:30:25',
    checksum: 'md5:o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0'
  }
]

// 按目录分组的文件数据
export const filesByDirectory = filesData.reduce((acc, file) => {
  if (!acc[file.directoryId]) {
    acc[file.directoryId] = []
  }
  acc[file.directoryId].push(file)
  return acc
}, {})

// 最近文件（按更新时间排序）
export const recentFiles = [...filesData]
  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  .slice(0, 10)

// 热门文件（按查看次数排序）
export const popularFiles = [...filesData]
  .sort((a, b) => b.viewCount - a.viewCount)
  .slice(0, 10)

// 收藏文件
export const favoriteFiles = filesData.filter(file => file.favorited)

// 按文件类型分组
export const filesByType = filesData.reduce((acc, file) => {
  const type = getFileCategory(file.extension)
  if (!acc[type]) {
    acc[type] = []
  }
  acc[type].push(file)
  return acc
}, {})

// 获取文件类别的辅助函数
function getFileCategory(extension) {
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp']
  const videoExts = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm']
  const audioExts = ['mp3', 'wav', 'flac', 'aac', 'ogg']
  const documentExts = ['pdf', 'doc', 'docx', 'txt', 'rtf']
  const spreadsheetExts = ['xls', 'xlsx', 'csv']
  const presentationExts = ['ppt', 'pptx']
  const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz']
  const codeExts = ['js', 'ts', 'html', 'css', 'vue', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'php']
  
  if (imageExts.includes(extension.toLowerCase())) return 'images'
  if (videoExts.includes(extension.toLowerCase())) return 'videos'
  if (audioExts.includes(extension.toLowerCase())) return 'audio'
  if (documentExts.includes(extension.toLowerCase())) return 'documents'
  if (spreadsheetExts.includes(extension.toLowerCase())) return 'spreadsheets'
  if (presentationExts.includes(extension.toLowerCase())) return 'presentations'
  if (archiveExts.includes(extension.toLowerCase())) return 'archives'
  if (codeExts.includes(extension.toLowerCase())) return 'code'
  
  return 'others'
}

export default {
  filesData,
  filesByDirectory,
  recentFiles,
  popularFiles,
  favoriteFiles,
  filesByType
} 