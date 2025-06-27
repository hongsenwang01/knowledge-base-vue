// 用户数据
export const usersData = [
  {
    id: 'admin',
    username: 'admin',
    displayName: '系统管理员',
    email: 'admin@example.com',
    avatar: '/avatars/admin.jpg',
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_system'],
    status: 'active',
    lastLogin: '2024-01-15 14:30:25',
    createdAt: '2023-01-01 10:00:00',
    updatedAt: '2024-01-15 14:30:25',
    profile: {
      department: '技术部',
      position: '系统管理员',
      phone: '+86 138-0000-0001',
      bio: '负责系统维护和管理工作'
    },
    stats: {
      totalFiles: 156,
      totalFolders: 12,
      storageUsed: '2.5 GB',
      loginCount: 1234
    }
  },
  {
    id: 'user_001',
    username: 'zhangsan',
    displayName: '张三',
    email: 'zhangsan@example.com',
    avatar: '/avatars/user_001.jpg',
    role: 'user',
    permissions: ['read', 'write'],
    status: 'active',
    lastLogin: '2024-01-15 13:45:20',
    createdAt: '2023-02-15 09:30:00',
    updatedAt: '2024-01-15 13:45:20',
    profile: {
      department: '产品部',
      position: '产品经理',
      phone: '+86 138-0000-0002',
      bio: '负责产品规划和需求管理'
    },
    stats: {
      totalFiles: 234,
      totalFolders: 18,
      storageUsed: '3.2 GB',
      loginCount: 456
    }
  },
  {
    id: 'user_002',
    username: 'lisi',
    displayName: '李四',
    email: 'lisi@example.com',
    avatar: '/avatars/user_002.jpg',
    role: 'user',
    permissions: ['read', 'write'],
    status: 'active',
    lastLogin: '2024-01-15 11:20:15',
    createdAt: '2023-03-01 14:00:00',
    updatedAt: '2024-01-15 11:20:15',
    profile: {
      department: '法务部',
      position: '法务专员',
      phone: '+86 138-0000-0003',
      bio: '负责合同审核和法务咨询'
    },
    stats: {
      totalFiles: 89,
      totalFolders: 8,
      storageUsed: '1.8 GB',
      loginCount: 123
    }
  },
  {
    id: 'user_003',
    username: 'wangwu',
    displayName: '王五',
    email: 'wangwu@example.com',
    avatar: '/avatars/user_003.jpg',
    role: 'user',
    permissions: ['read', 'write'],
    status: 'active',
    lastLogin: '2024-01-15 18:30:45',
    createdAt: '2023-04-10 16:30:00',
    updatedAt: '2024-01-15 18:30:45',
    profile: {
      department: '市场部',
      position: '市场专员',
      phone: '+86 138-0000-0004',
      bio: '负责市场推广和活动策划'
    },
    stats: {
      totalFiles: 145,
      totalFolders: 15,
      storageUsed: '2.1 GB',
      loginCount: 678
    }
  },
  {
    id: 'designer_001',
    username: 'design_lily',
    displayName: '设计师小丽',
    email: 'lily@example.com',
    avatar: '/avatars/designer_001.jpg',
    role: 'designer',
    permissions: ['read', 'write', 'design'],
    status: 'active',
    lastLogin: '2024-01-14 17:45:15',
    createdAt: '2023-05-20 10:15:00',
    updatedAt: '2024-01-14 17:45:15',
    profile: {
      department: '设计部',
      position: 'UI设计师',
      phone: '+86 138-0000-0005',
      bio: '专注于UI/UX设计和用户体验优化'
    },
    stats: {
      totalFiles: 567,
      totalFolders: 24,
      storageUsed: '8.9 GB',
      loginCount: 890
    }
  },
  {
    id: 'developer_001',
    username: 'dev_jack',
    displayName: '开发者杰克',
    email: 'jack@example.com',
    avatar: '/avatars/developer_001.jpg',
    role: 'developer',
    permissions: ['read', 'write', 'code'],
    status: 'active',
    lastLogin: '2024-01-15 13:50:40',
    createdAt: '2023-06-01 08:30:00',
    updatedAt: '2024-01-15 13:50:40',
    profile: {
      department: '技术部',
      position: '前端开发工程师',
      phone: '+86 138-0000-0006',
      bio: '专注于前端技术和用户界面开发'
    },
    stats: {
      totalFiles: 789,
      totalFolders: 42,
      storageUsed: '5.6 GB',
      loginCount: 1567
    }
  },
  {
    id: 'marketing_001',
    username: 'marketing_tom',
    displayName: '市场部汤姆',
    email: 'tom@example.com',
    avatar: '/avatars/marketing_001.jpg',
    role: 'marketing',
    permissions: ['read', 'write', 'marketing'],
    status: 'active',
    lastLogin: '2024-01-14 17:45:15',
    createdAt: '2023-07-15 12:00:00',
    updatedAt: '2024-01-14 17:45:15',
    profile: {
      department: '市场部',
      position: '营销经理',
      phone: '+86 138-0000-0007',
      bio: '负责品牌推广和市场营销策略'
    },
    stats: {
      totalFiles: 298,
      totalFolders: 16,
      storageUsed: '4.3 GB',
      loginCount: 345
    }
  },
  {
    id: 'finance_001',
    username: 'finance_mary',
    displayName: '财务部玛丽',
    email: 'mary@example.com',
    avatar: '/avatars/finance_001.jpg',
    role: 'finance',
    permissions: ['read', 'write', 'finance'],
    status: 'active',
    lastLogin: '2024-01-10 14:20:45',
    createdAt: '2023-08-01 09:45:00',
    updatedAt: '2024-01-10 14:20:45',
    profile: {
      department: '财务部',
      position: '财务分析师',
      phone: '+86 138-0000-0008',
      bio: '负责财务分析和报表制作'
    },
    stats: {
      totalFiles: 167,
      totalFolders: 9,
      storageUsed: '2.7 GB',
      loginCount: 234
    }
  },
  {
    id: 'system',
    username: 'system',
    displayName: '系统',
    email: 'system@example.com',
    avatar: '/avatars/system.jpg',
    role: 'system',
    permissions: ['read', 'write', 'delete', 'system'],
    status: 'active',
    lastLogin: '2024-01-15 14:30:25',
    createdAt: '2023-01-01 00:00:00',
    updatedAt: '2024-01-15 14:30:25',
    profile: {
      department: '系统',
      position: '系统账户',
      phone: '',
      bio: '系统自动操作账户'
    },
    stats: {
      totalFiles: 0,
      totalFolders: 0,
      storageUsed: '0 B',
      loginCount: 0
    }
  }
]

// 角色定义
export const roles = {
  admin: {
    name: '管理员',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_system'],
    description: '系统管理员，拥有所有权限'
  },
  user: {
    name: '普通用户',
    permissions: ['read', 'write'],
    description: '普通用户，可以查看和编辑文件'
  },
  designer: {
    name: '设计师',
    permissions: ['read', 'write', 'design'],
    description: '设计师，可以管理设计相关文件'
  },
  developer: {
    name: '开发者',
    permissions: ['read', 'write', 'code'],
    description: '开发者，可以管理代码文件'
  },
  marketing: {
    name: '市场人员',
    permissions: ['read', 'write', 'marketing'],
    description: '市场人员，可以管理营销相关文件'
  },
  finance: {
    name: '财务人员',
    permissions: ['read', 'write', 'finance'],
    description: '财务人员，可以管理财务相关文件'
  },
  system: {
    name: '系统',
    permissions: ['read', 'write', 'delete', 'system'],
    description: '系统账户，用于自动化操作'
  }
}

// 权限定义
export const permissions = {
  read: {
    name: '查看',
    description: '可以查看文件和目录'
  },
  write: {
    name: '编辑',
    description: '可以上传、编辑文件和创建目录'
  },
  delete: {
    name: '删除',
    description: '可以删除文件和目录'
  },
  manage_users: {
    name: '用户管理',
    description: '可以管理用户账户'
  },
  manage_system: {
    name: '系统管理',
    description: '可以管理系统设置'
  },
  design: {
    name: '设计管理',
    description: '可以管理设计相关资源'
  },
  code: {
    name: '代码管理',
    description: '可以管理代码相关资源'
  },
  marketing: {
    name: '营销管理',
    description: '可以管理营销相关资源'
  },
  finance: {
    name: '财务管理',
    description: '可以管理财务相关资源'
  },
  system: {
    name: '系统操作',
    description: '系统级别操作权限'
  }
}

// 当前登录用户（可以切换）
export const currentUser = usersData[0] // 默认为管理员

// 在线用户
export const onlineUsers = [
  { ...usersData[0], isOnline: true, lastActivity: '2024-01-15 14:30:25' },
  { ...usersData[1], isOnline: true, lastActivity: '2024-01-15 14:28:10' },
  { ...usersData[5], isOnline: true, lastActivity: '2024-01-15 14:25:45' },
  { ...usersData[3], isOnline: true, lastActivity: '2024-01-15 14:20:30' }
]

// 用户操作日志
export const userActivityLogs = [
  {
    id: 'log_001',
    userId: 'admin',
    action: 'login',
    description: '用户登录系统',
    timestamp: '2024-01-15 14:30:25',
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  {
    id: 'log_002',
    userId: 'user_001',
    action: 'upload',
    description: '上传文件：项目需求文档.pdf',
    timestamp: '2024-01-15 14:25:10',
    ip: '192.168.1.101',
    fileId: 'file_002'
  },
  {
    id: 'log_003',
    userId: 'developer_001',
    action: 'edit',
    description: '编辑文件：main.js',
    timestamp: '2024-01-15 13:50:40',
    ip: '192.168.1.102',
    fileId: 'file_013'
  },
  {
    id: 'log_004',
    userId: 'user_003',
    action: 'download',
    description: '下载文件：公司年会照片_001.jpg',
    timestamp: '2024-01-15 13:45:20',
    ip: '192.168.1.103',
    fileId: 'file_004'
  },
  {
    id: 'log_005',
    userId: 'marketing_001',
    action: 'create_folder',
    description: '创建文件夹：新产品资料',
    timestamp: '2024-01-15 13:30:15',
    ip: '192.168.1.104',
    folderId: 'new_product_materials'
  }
]

// 获取用户信息的辅助函数
export const getUserById = (userId) => {
  return usersData.find(user => user.id === userId)
}

// 获取用户权限的辅助函数
export const getUserPermissions = (userId) => {
  const user = getUserById(userId)
  return user ? user.permissions : []
}

// 检查用户权限的辅助函数
export const hasPermission = (userId, permission) => {
  const userPermissions = getUserPermissions(userId)
  return userPermissions.includes(permission)
}

export default {
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