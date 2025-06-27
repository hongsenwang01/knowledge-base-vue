/**
 * 文件相关工具函数
 */

/**
 * 格式化文件大小
 * @param {number} bytes 文件大小（字节）
 * @returns {string} 格式化后的文件大小
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 根据文件扩展名获取文件类型
 * @param {string} filename 文件名
 * @returns {string} 文件类型
 */
export function getFileType(filename) {
  const ext = getFileExtension(filename).toLowerCase()
  
  const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico']
  const documentTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf']
  const videoTypes = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm']
  const audioTypes = ['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a']
  const archiveTypes = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2']
  const codeTypes = ['js', 'html', 'css', 'vue', 'json', 'xml', 'md', 'py', 'java', 'cpp', 'c']
  
  if (imageTypes.includes(ext)) return 'image'
  if (documentTypes.includes(ext)) return 'document'
  if (videoTypes.includes(ext)) return 'video'
  if (audioTypes.includes(ext)) return 'audio'
  if (archiveTypes.includes(ext)) return 'archive'
  if (codeTypes.includes(ext)) return 'code'
  
  return 'other'
}

/**
 * 获取文件扩展名
 * @param {string} filename 文件名
 * @returns {string} 文件扩展名
 */
export function getFileExtension(filename) {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

/**
 * 根据文件类型获取图标
 * @param {string} filename 文件名或扩展名
 * @returns {string} 图标字符
 */
export function getFileIcon(filename) {
  const type = getFileType(filename)
  const ext = getFileExtension(filename).toLowerCase()
  
  const iconMap = {
    // 图片类型
    image: '🖼️',
    
    // 文档类型
    pdf: '📄',
    doc: '📝',
    docx: '📝',
    xls: '📊',
    xlsx: '📊',
    ppt: '📋',
    pptx: '📋',
    txt: '📄',
    
    // 媒体类型
    video: '🎬',
    audio: '🎵',
    
    // 压缩包
    archive: '📦',
    
    // 代码文件
    code: '💻',
    
    // 其他
    other: '📁'
  }
  
  return iconMap[ext] || iconMap[type] || iconMap.other
}

/**
 * 验证文件类型是否被允许
 * @param {File} file 文件对象
 * @param {string[]} allowedTypes 允许的文件类型数组
 * @returns {boolean} 是否允许
 */
export function isFileTypeAllowed(file, allowedTypes = []) {
  if (!allowedTypes.length) return true
  
  const fileType = getFileType(file.name)
  const extension = getFileExtension(file.name).toLowerCase()
  
  return allowedTypes.includes(fileType) || allowedTypes.includes(extension)
}

/**
 * 验证文件大小是否在限制内
 * @param {File} file 文件对象
 * @param {number} maxSize 最大文件大小（字节）
 * @returns {boolean} 是否在限制内
 */
export function isFileSizeValid(file, maxSize) {
  return file.size <= maxSize
}

/**
 * 生成文件的唯一标识
 * @param {File} file 文件对象
 * @returns {string} 文件唯一标识
 */
export function generateFileId(file) {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 9)
  const name = file.name.replace(/[^a-zA-Z0-9]/g, '')
  return `${timestamp}_${random}_${name.slice(0, 10)}`
}

/**
 * 读取文件内容
 * @param {File} file 文件对象
 * @param {string} type 读取类型 'text' | 'dataURL' | 'arrayBuffer'
 * @returns {Promise<string|ArrayBuffer>} 文件内容
 */
export function readFile(file, type = 'text') {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('文件读取失败'))
    
    switch (type) {
      case 'text':
        reader.readAsText(file)
        break
      case 'dataURL':
        reader.readAsDataURL(file)
        break
      case 'arrayBuffer':
        reader.readAsArrayBuffer(file)
        break
      default:
        reader.readAsText(file)
    }
  })
}

/**
 * 下载文件
 * @param {string} url 文件URL
 * @param {string} filename 文件名
 */
export function downloadFile(url, filename) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * 创建文件下载链接
 * @param {Blob} blob 文件Blob对象
 * @param {string} filename 文件名
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  downloadFile(url, filename)
  URL.revokeObjectURL(url)
}

/**
 * 检查是否为图片文件
 * @param {string} filename 文件名
 * @returns {boolean} 是否为图片
 */
export function isImage(filename) {
  return getFileType(filename) === 'image'
}

/**
 * 检查是否为文档文件
 * @param {string} filename 文件名
 * @returns {boolean} 是否为文档
 */
export function isDocument(filename) {
  return getFileType(filename) === 'document'
}

/**
 * 检查是否为视频文件
 * @param {string} filename 文件名
 * @returns {boolean} 是否为视频
 */
export function isVideo(filename) {
  return getFileType(filename) === 'video'
}

/**
 * 检查是否为音频文件
 * @param {string} filename 文件名
 * @returns {boolean} 是否为音频
 */
export function isAudio(filename) {
  return getFileType(filename) === 'audio'
}

/**
 * 检查文件是否可以预览
 * @param {string} filename 文件名
 * @returns {boolean} 是否可以预览
 */
export function canPreview(filename) {
  const type = getFileType(filename)
  const ext = getFileExtension(filename).toLowerCase()
  
  // 可预览的文件类型
  const previewableTypes = ['image', 'document', 'video', 'audio']
  const previewableExts = ['pdf', 'txt', 'md', 'json', 'xml', 'html', 'css', 'js']
  
  return previewableTypes.includes(type) || previewableExts.includes(ext)
} 