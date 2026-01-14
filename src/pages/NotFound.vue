<template>
  <div class="not-found">
    <h1>404 - 页面未找到</h1>
    <p>抱歉，您访问的页面不存在。</p>
    <button @click="goHome">返回首页</button>
    <button @click="goBack">返回</button>
  </div>
</template>

<script setup>
import { useRouterUtils } from '../router'

const { push, back } = useRouterUtils()

const goHome = () => {
  push('/')
}

const goBack = () => {
  back()
}
</script>

<style scoped>
.not-found {
  padding: 20px;
  text-align: center;
}

button {
  margin: 10px;
  padding: 10px 20px;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #535bf2;
}
</style>