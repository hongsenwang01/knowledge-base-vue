import { createRouter, createWebHistory } from 'vue-router'

// 懒加载页面组件
const Home = () => import('@/views/Home.vue')
const FileManagement = () => import('@/views/FileManagement.vue')
const DirectoryManagement = () => import('@/views/DirectoryManagement.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '文件管理器',
      icon: 'folder'
    }
  },
  {
    path: '/files',
    name: 'FileManagement',
    component: FileManagement,
    meta: {
      title: '文件管理',
      icon: 'file-text'
    }
  },
  {
    path: '/directories',
    name: 'DirectoryManagement',
    component: DirectoryManagement,
    meta: {
      title: '目录管理',
      icon: 'folder-plus'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta?.title) {
    document.title = `${to.meta.title} - 文件管理系统`
  }
  
  next()
})

export default router 