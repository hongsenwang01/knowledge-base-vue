import { createApp } from 'vue'
import Toast from '@/components/Toast.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

class ToastService {
  constructor() {
    this.toasts = []
  }

  show(message, type = 'success', duration = 2000) {
    // 创建容器
    const container = document.createElement('div')
    document.body.appendChild(container)

    // 创建 Vue 应用实例
    const app = createApp(Toast, {
      message,
      type,
      duration,
      onClose: () => {
        // 销毁应用实例并移除容器
        app.unmount()
        if (container.parentNode) {
          container.parentNode.removeChild(container)
        }
        // 从数组中移除
        const index = this.toasts.indexOf(app)
        if (index > -1) {
          this.toasts.splice(index, 1)
        }
      }
    })

    // 使用 Element Plus
    app.use(ElementPlus)
    
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }

    // 挂载到容器
    app.mount(container)

    // 添加到数组中管理
    this.toasts.push(app)

    return app
  }

  success(message, duration = 2000) {
    return this.show(message, 'success', duration)
  }

  error(message, duration = 3000) {
    return this.show(message, 'error', duration)
  }

  warning(message, duration = 2500) {
    return this.show(message, 'warning', duration)
  }

  info(message, duration = 2000) {
    return this.show(message, 'info', duration)
  }

  // 清除所有提示
  clear() {
    this.toasts.forEach(app => {
      app.unmount()
    })
    this.toasts = []
  }
}

// 创建单例实例
const toast = new ToastService()

export default toast