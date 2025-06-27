// 系统统计数据
export const systemStats = {
  totalFolders: 156,
  totalFiles: 2847,
  totalSize: '15.2 GB',
  totalSizeBytes: 16317317171,
  lastModified: '2024-01-15 14:30:25',
  systemUptime: '99.9%',
  encryption: '256位',
  serviceTime: '24/7',
  trustedUsers: '10K+',
  
  // 详细统计
  fileTypes: {
    images: { count: 856, size: '4.2 GB', percentage: 30.1 },
    documents: { count: 1024, size: '6.8 GB', percentage: 36.0 },
    videos: { count: 124, size: '3.1 GB', percentage: 4.4 },
    audio: { count: 298, size: '892 MB', percentage: 10.5 },
    archives: { count: 89, size: '1.8 GB', percentage: 3.1 },
    others: { count: 456, size: '1.4 GB', percentage: 16.0 }
  },
  
  // 存储统计
  storage: {
    total: '50 GB',
    used: '15.2 GB',
    available: '34.8 GB',
    percentage: 30.4
  },
  
  // 活动统计
  activity: {
    todayUploads: 23,
    todayDownloads: 145,
    weeklyUploads: 186,
    weeklyDownloads: 892,
    monthlyUploads: 724,
    monthlyDownloads: 3421
  },
  
  // 热门文件类型
  popularFileTypes: [
    { extension: '.pdf', count: 428, icon: 'file-text' },
    { extension: '.jpg', count: 356, icon: 'image' },
    { extension: '.docx', count: 298, icon: 'file-text' },
    { extension: '.mp4', count: 89, icon: 'video' },
    { extension: '.xlsx', count: 156, icon: 'file-spreadsheet' },
    { extension: '.png', count: 245, icon: 'image' },
    { extension: '.zip', count: 67, icon: 'archive' },
    { extension: '.mp3', count: 123, icon: 'music' }
  ]
}

// 实时统计数据（可以用于动态更新）
export const realtimeStats = {
  onlineUsers: 24,
  currentUploads: 3,
  currentDownloads: 8,
  networkSpeed: '125 MB/s',
  cpuUsage: 23.5,
  memoryUsage: 67.8,
  diskUsage: 30.4
}

// 历史趋势数据
export const trendData = {
  // 过去7天的文件操作数据
  weeklyActivity: [
    { date: '2024-01-09', uploads: 45, downloads: 128, storage: 14.8 },
    { date: '2024-01-10', uploads: 38, downloads: 156, storage: 14.9 },
    { date: '2024-01-11', uploads: 52, downloads: 134, storage: 15.0 },
    { date: '2024-01-12', uploads: 41, downloads: 167, storage: 15.1 },
    { date: '2024-01-13', uploads: 35, downloads: 142, storage: 15.1 },
    { date: '2024-01-14', uploads: 47, downloads: 189, storage: 15.2 },
    { date: '2024-01-15', uploads: 23, downloads: 145, storage: 15.2 }
  ],
  
  // 月度数据对比
  monthlyComparison: {
    currentMonth: { uploads: 724, downloads: 3421, newFolders: 28 },
    lastMonth: { uploads: 689, downloads: 3156, newFolders: 24 },
    growth: { uploads: 5.1, downloads: 8.4, newFolders: 16.7 }
  }
}

export default {
  systemStats,
  realtimeStats,
  trendData
} 