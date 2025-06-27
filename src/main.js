import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

// 导入全局样式
import './assets/styles/index.css'

const app = createApp(App)

// 使用路由和状态管理
app.use(router)
app.use(pinia)

// 全局配置
app.config.globalProperties.$APP_NAME = '文件管理系统'
app.config.globalProperties.$VERSION = '1.0.0'

app.mount('#app')
