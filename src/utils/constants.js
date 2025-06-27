/**
 * 应用常量定义
 */

// 文件相关常量
export const FILE_CONSTANTS = {
  // 文件大小限制（字节）
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  MAX_BATCH_UPLOAD: 20, // 批量上传最大文件数
  
  // 支持的文件类型
  SUPPORTED_IMAGE_TYPES: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'],
  SUPPORTED_DOCUMENT_TYPES: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'],
  SUPPORTED_VIDEO_TYPES: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'],
  SUPPORTED_AUDIO_TYPES: ['mp3', 'wav', 'ogg', 'aac', 'flac'],
  SUPPORTED_ARCHIVE_TYPES: ['zip', 'rar', '7z', 'tar', 'gz'],
  
  // 文件状态
  STATUS: {
    PENDING: 'pending',
    UPLOADING: 'uploading',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled'
  },
  
  // 文件类型分类
  TYPES: {
    IMAGE: 'image',
    DOCUMENT: 'document',
    VIDEO: 'video',
    AUDIO: 'audio',
    ARCHIVE: 'archive',
    CODE: 'code',
    OTHER: 'other'
  }
}

// 目录相关常量
export const DIRECTORY_CONSTANTS = {
  // 目录名长度限制
  MAX_NAME_LENGTH: 100,
  MIN_NAME_LENGTH: 1,
  
  // 目录层级限制
  MAX_DEPTH: 10,
  
  // 根目录ID
  ROOT_ID: 'root'
}

// UI相关常量
export const UI_CONSTANTS = {
  // 视图模式
  VIEW_MODES: {
    GRID: 'grid',
    LIST: 'list'
  },
  
  // 排序字段
  SORT_FIELDS: {
    NAME: 'name',
    SIZE: 'size',
    CREATE_TIME: 'createTime',
    UPDATE_TIME: 'updateTime'
  },
  
  // 排序方向
  SORT_ORDERS: {
    ASC: 'asc',
    DESC: 'desc'
  },
  
  // 分页配置
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
  },
  
  // 缩略图尺寸
  THUMBNAIL_SIZES: {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large'
  }
}

// API相关常量
export const API_CONSTANTS = {
  // 基础URL
  BASE_URL: '/api',
  
  // 请求超时时间（毫秒）
  TIMEOUT: 30000,
  
  // 重试次数
  RETRY_COUNT: 3,
  
  // HTTP状态码
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
  },
  
  // 错误码
  ERROR_CODES: {
    DIRECTORY_NOT_FOUND: 'DIRECTORY_NOT_FOUND',
    DIRECTORY_NOT_EMPTY: 'DIRECTORY_NOT_EMPTY',
    DIRECTORY_NAME_EXISTS: 'DIRECTORY_NAME_EXISTS',
    FILE_NOT_FOUND: 'FILE_NOT_FOUND',
    FILE_TOO_LARGE: 'FILE_TOO_LARGE',
    INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
    STORAGE_FULL: 'STORAGE_FULL',
    UPLOAD_FAILED: 'UPLOAD_FAILED',
    PERMISSION_DENIED: 'PERMISSION_DENIED',
    INVALID_PARAMETER: 'INVALID_PARAMETER'
  }
}

// 路由相关常量
export const ROUTE_CONSTANTS = {
  // 路由名称
  NAMES: {
    HOME: 'Home',
    FILE_MANAGEMENT: 'FileManagement',
    DIRECTORY_MANAGEMENT: 'DirectoryManagement'
  },
  
  // 路由路径
  PATHS: {
    HOME: '/',
    FILE_MANAGEMENT: '/file-management',
    DIRECTORY_MANAGEMENT: '/directory-management'
  }
}

// 存储相关常量
export const STORAGE_CONSTANTS = {
  // LocalStorage键名
  KEYS: {
    USER_PREFERENCES: 'fileManager_userPreferences',
    VIEW_MODE: 'fileManager_viewMode',
    SORT_CONFIG: 'fileManager_sortConfig',
    SIDEBAR_COLLAPSED: 'fileManager_sidebarCollapsed'
  }
}

// 事件相关常量
export const EVENT_CONSTANTS = {
  // 文件操作事件
  FILE_EVENTS: {
    UPLOAD_START: 'file:upload:start',
    UPLOAD_PROGRESS: 'file:upload:progress',
    UPLOAD_COMPLETE: 'file:upload:complete',
    UPLOAD_ERROR: 'file:upload:error',
    DELETE: 'file:delete',
    RENAME: 'file:rename',
    MOVE: 'file:move',
    DOWNLOAD: 'file:download'
  },
  
  // 目录操作事件
  DIRECTORY_EVENTS: {
    CREATE: 'directory:create',
    UPDATE: 'directory:update',
    DELETE: 'directory:delete',
    SELECT: 'directory:select'
  }
}

// 主题相关常量
export const THEME_CONSTANTS = {
  // 主题模式
  MODES: {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto'
  },
  
  // 主色调
  PRIMARY_COLORS: {
    BLUE: '#409eff',
    GREEN: '#67c23a',
    ORANGE: '#e6a23c',
    RED: '#f56c6c',
    PURPLE: '#9c27b0'
  }
}

// 消息相关常量
export const MESSAGE_CONSTANTS = {
  // 消息类型
  TYPES: {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    INFO: 'info'
  },
  
  // 显示时长（毫秒）
  DURATION: {
    SHORT: 2000,
    MEDIUM: 3000,
    LONG: 5000
  }
}

// 快捷键常量
export const KEYBOARD_CONSTANTS = {
  // 功能键
  KEYS: {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    DELETE: 'Delete',
    BACKSPACE: 'Backspace',
    TAB: 'Tab',
    SPACE: ' '
  },
  
  // 组合键
  COMBINATIONS: {
    CTRL_A: 'ctrl+a',      // 全选
    CTRL_C: 'ctrl+c',      // 复制
    CTRL_V: 'ctrl+v',      // 粘贴
    CTRL_X: 'ctrl+x',      // 剪切
    CTRL_Z: 'ctrl+z',      // 撤销
    CTRL_S: 'ctrl+s',      // 保存
    F2: 'F2',              // 重命名
    F5: 'F5'               // 刷新
  }
}

// 图标常量
export const ICON_CONSTANTS = {
  // 文件类型图标
  FILE_ICONS: {
    folder: '📁',
    'folder-open': '📂',
    image: '🖼️',
    pdf: '📄',
    doc: '📝',
    docx: '📝',
    xls: '📊',
    xlsx: '📊',
    ppt: '📋',
    pptx: '📋',
    txt: '📄',
    video: '🎬',
    audio: '🎵',
    zip: '📦',
    code: '💻',
    default: '📄'
  },
  
  // 操作图标
  ACTION_ICONS: {
    upload: '⬆️',
    download: '⬇️',
    delete: '🗑️',
    edit: '✏️',
    search: '🔍',
    filter: '🔽',
    sort: '↕️',
    refresh: '🔄',
    settings: '⚙️',
    close: '❌'
  }
}

// 动画常量
export const ANIMATION_CONSTANTS = {
  // 动画时长
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500
  },
  
  // 缓动函数
  EASING: {
    EASE: 'ease',
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out'
  }
}

// 默认配置
export const DEFAULT_CONFIG = {
  // 用户偏好设置
  USER_PREFERENCES: {
    viewMode: UI_CONSTANTS.VIEW_MODES.GRID,
    sortBy: UI_CONSTANTS.SORT_FIELDS.NAME,
    sortOrder: UI_CONSTANTS.SORT_ORDERS.ASC,
    pageSize: UI_CONSTANTS.PAGINATION.DEFAULT_PAGE_SIZE,
    sidebarCollapsed: false,
    theme: THEME_CONSTANTS.MODES.LIGHT
  },
  
  // 上传配置
  UPLOAD_CONFIG: {
    maxFileSize: FILE_CONSTANTS.MAX_FILE_SIZE,
    maxBatchUpload: FILE_CONSTANTS.MAX_BATCH_UPLOAD,
    allowedTypes: [],
    autoUpload: true,
    showProgress: true
  },
  
  // 搜索配置
  SEARCH_CONFIG: {
    debounceDelay: 300,
    minQueryLength: 2,
    maxResults: 50
  }
} 