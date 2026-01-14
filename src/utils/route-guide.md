# Vue Router 增强功能使用指南

## 核心功能

### 1. 基础导航方法

```javascript
import { useRouterUtils } from '../router'

const { push, replace, back, go, close } = useRouterUtils()

// 跳转页面
push('/about')
push({ name: 'about' })
push({ path: '/about', query: { id: 1 } })

// 替换当前页面（不产生历史记录）
replace('/about')

// 后退
back()

// 前进/后退指定步数
go(-1) // 后退1步
go(1)  // 前进1步

// 关闭页面（有历史记录则后退，否则跳转到指定页面）
close('/fallback')
```

### 2. 路由信息获取

```javascript
import { useRouterUtils } from '../router'

const { getRoute, getQuery, getParams } = useRouterUtils()

// 获取完整路由信息
const route = getRoute()
console.log(route.path, route.name, route.meta)

// 获取查询参数
const query = getQuery()
console.log(query.id, query.name)

// 获取路径参数
const params = getParams()
console.log(params.id)
```

### 3. 路由守卫

配置在 `router/index.js` 中的路由守卫：
- `beforeEach`: 路由跳转前的权限校验
- `afterEach`: 路由跳转后的处理（如埋点统计）

### 4. 路由元信息

```javascript
{
  path: '/protected',
  name: 'protected',
  component: ProtectedPage,
  meta: {
    title: '受保护页面',
    requiresAuth: true,    // 需要登录
    keepAlive: true,       // 缓存页面
    role: 'admin'          // 角色权限
  }
}
```

## 使用示例

### 页面跳转示例
```vue
<template>
  <button @click="navigateToAbout">前往关于页面</button>
</template>

<script setup>
import { useRouterUtils } from '../router'

const { push } = useRouterUtils()

const navigateToAbout = () => {
  push({
    name: 'about',
    query: { from: 'home', timestamp: Date.now() }
  })
}
</script>
```

### 权限控制示例
```vue
<script setup>
import { onMounted } from 'vue'
import { useRouterUtils } from '../router'

const { getRoute, push } = useRouterUtils()

onMounted(() => {
  const route = getRoute()
  if (route.meta.requiresAuth && !localStorage.getItem('token')) {
    push('/login')
  }
})
</script>
```

### 页面关闭逻辑
```vue
<script setup>
import { useRouterUtils } from '../router'

const { close } = useRouterUtils()

// 在用户点击关闭或完成操作后
const handleComplete = () => {
  close('/home') // 如果有历史记录则后退，否则跳转到首页
}
</script>
```

## 最佳实践

1. **路径别名**: 使用 `@` 指向 `src` 目录
2. **懒加载**: 使用 `() => import()` 实现路由懒加载
3. **错误处理**: 统一处理 404 页面
4. **类型安全**: 为路由参数和查询参数添加类型定义
5. **导航守卫**: 在全局守卫中处理权限和页面标题