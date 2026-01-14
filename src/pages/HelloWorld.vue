<template>
  <div class="parent">
    <div class="parent-container">
      <load-state
        :state="currentState"
        :type="type"
        :theme="theme"
        :icon="icon"
        @retry="handleRetryEvent"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouterUtils } from '../router';
import LoadState from '../components/LoadState.vue';

const currentState = ref('netFail'); // 可以是 'loadFail', 'netFail', 'noData'
const type = ref('full'); // 可以是 'full', 'panel'
const theme = ref('default'); // 可以是 'default', 'dark'
// const icon = ref('https://psstatic.cdn.bcebos.com/basics/2025_wiseindex/wiseindex-logo_1756889417000.png');

const handleRetryEvent = (data) => {
  console.log('接收到重试事件，执行重新加载逻辑', data);
};

defineProps({
  msg: {
    type: String,
    default: "路由功能演示"
  },
})

const count = ref(0)
const routeInfo = ref(null)
const { push, replace, getRoute, back, go, close } = useRouterUtils()

const goAbout = () => {
  push('/about')
}

const showRouteInfo = () => {
  const route = getRoute()
  routeInfo.value = {
    path: route.path,
    name: route.name,
    params: route.params,
    query: route.query,
    meta: route.meta
  }
}

const testQueryParams = () => {
  push({
    path: '/about',
    query: {
      from: 'home',
      timestamp: Date.now()
    }
  })
}

const replaceRoute = () => {
  replace({
    name: 'about',
    query: { replaced: true }
  })
}

const goBack = () => {
  back()
}

const goForward = () => {
  go(1)
}

const closePage = () => {
  close()
}
</script>

<style lang="less" scoped>
.parent {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  // position: relative;
  
}

.parent-container {
  // position: absolute;
  // bottom: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
}
</style>
