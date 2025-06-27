import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

// 导入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 导入全局样式
import './assets/styles/index.css'

const app = createApp(App)

// 使用Element Plus
app.use(ElementPlus)

// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 使用路由和状态管理
app.use(router)
app.use(pinia)

// 全局配置
app.config.globalProperties.$APP_NAME = '文件管理系统'
app.config.globalProperties.$VERSION = '1.0.0'

app.mount('#app')
