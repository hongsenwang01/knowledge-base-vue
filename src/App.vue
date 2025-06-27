<script>
export default {
  name: 'App'
}
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
/* 全局样式已在 main.js 中导入 */
#app {
  min-height: 100vh;
  font-family: var(--font-family-base);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
}

/* 确保路由视图占满整个容器 */
.router-view {
  min-height: 100vh;
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius-sm);
}

::-webkit-scrollbar-thumb {
  background: var(--color-border-medium);
  border-radius: var(--border-radius-sm);
  transition: background var(--transition-fast);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-border-dark);
}

/* 选择文本样式 */
::selection {
  background: var(--color-primary-100);
  color: var(--color-primary-800);
}

/* 焦点样式 */
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
</style>
