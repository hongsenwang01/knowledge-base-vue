import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia

// 导出所有store
export { useDirectoryStore } from './directory'
export { useFileStore } from './file'
export { useUploadStore } from './upload' 