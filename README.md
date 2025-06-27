# 文件管理系统 (File Management System)

基于 Vue.js 3 开发的现代化文件管理 Web 应用，提供完整的文件和目录管理功能。

## 项目简介

这是一个功能完整的文件管理系统前端应用，支持文件上传、下载、预览、搜索以及目录管理等核心功能。采用现代化的前端技术栈，提供流畅的用户体验和响应式设计。

## 主要功能

### 🗂️ 核心功能
- **目录管理**: 支持创建、编辑、删除文件夹，以及文件夹间的拖拽移动
- **文件上传**: 支持多文件批量上传，拖拽上传，上传进度显示
- **文件下载**: 一键下载文件，支持批量下载
- **文件搜索**: 实时搜索文件名、文件类型，快速定位目标文件
- **文件预览**: 支持图片、文档、视频等多种格式的在线预览

### 🎨 界面特色
- **双栏布局**: 左侧目录树，右侧文件列表，操作直观便捷
- **响应式设计**: 适配桌面端和移动端，提供最佳用户体验
- **现代化UI**: 简洁美观的界面设计，符合现代Web应用标准
- **快捷操作**: 右键菜单、工具栏快捷按钮，提高操作效率

### 🔧 管理功能
- **目录管理页面**: 专门的目录管理界面，支持目录结构的完整管理
- **文件移动**: 支持文件在不同目录间的移动和复制
- **批量操作**: 支持多选文件进行批量操作（删除、移动、下载）
- **权限控制**: 基于角色的访问控制（需要后端支持）

## 技术栈

### 前端技术
- **框架**: Vue.js 3.4.29 (Composition API)
- **构建工具**: Vite 5.3.1
- **状态管理**: Pinia
- **路由管理**: Vue Router 4
- **样式方案**: CSS3 + CSS Variables
- **HTTP客户端**: Axios
- **工具库**: 各种实用工具函数

### 开发工具
- **开发环境**: Node.js + npm
- **代码规范**: ESLint + Prettier
- **版本控制**: Git
- **部署**: Nginx + Docker

## 项目结构

```
src/
├── api/                    # API接口管理
├── assets/                 # 静态资源
├── components/             # 可复用组件
│   ├── common/             # 通用基础组件
│   ├── business/           # 业务组件
│   └── layout/             # 布局组件
├── composables/            # Vue 3 组合式函数
├── router/                 # 路由配置
├── stores/                 # 状态管理
├── utils/                  # 工具函数
├── views/                  # 页面组件
├── App.vue                 # 根组件
└── main.js                 # 入口文件
```

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
# 或者使用项目提供的启动脚本
bash entrypoint.sh
```

应用将在 http://localhost:3000 启动，支持热重载。

### 生产构建
```bash
npm run build
# 或者使用生产模式启动脚本
bash entrypoint.sh production
```

### 预览生产构建
```bash
npm run preview
```

## 部署说明

### Nginx 部署
1. 构建生产版本：`npm run build`
2. 将 `dist` 目录内容复制到 Nginx 静态文件目录
3. 配置 Nginx 支持 SPA 路由（参考下方配置）

### Nginx 配置示例
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    # SPA路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API代理（如果需要）
    location /api/ {
        proxy_pass http://your-backend-server;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Docker 部署
项目已集成 Docker 支持，可以通过 `entrypoint.sh production` 命令启动生产环境。

## 开发指南

### 开发规范
请参考 `docs/前端开发规范.md` 了解详细的开发规范，包括：
- 目录结构规范
- 代码编写规范
- 组件开发规范
- 样式编写规范
- 提交规范

### API 接口
后端接口文档请参考 `docs/后端接口文档.md`，包含所有需要的API接口定义。

### 数据模拟
在后端接口完成前，项目使用模拟数据进行开发和测试，模拟数据位于各个组件的 composables 中。

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 贡献指南

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -am 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证，详情请参考 LICENSE 文件。

## 联系我们

如有问题或建议，请通过以下方式联系：
- 提交 Issue
- 发送邮件到项目维护者

---

**DevBox**: Code. Build. Deploy. We've Got the Rest.

借助 DevBox，您可以专注于编写优秀的代码，而我们负责处理基础设施、扩展和部署。从开始到生产的无缝开发体验。 