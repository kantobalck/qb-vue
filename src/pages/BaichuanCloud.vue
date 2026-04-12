<template>
    <div class="app-container">
        <div class="sidebar-layout">
            <!-- <el-aside class="el-aside">
                <el-menu 
                    router
                    default-active="/baichuan/carinfor"
                    default-openeds="['1']"
                    class="el-menu-vertical"
                    background-color="#545c64" 
                    text-color="#fff" 
                    active-text-color="red"
                >
                <el-menu-item index="/baichuan/carinfor">
                        <span>车辆管理</span>
                </el-menu-item>

                <el-menu-item index="/baichuan/home">
                        <span>车辆详情</span>
                </el-menu-item>

                <el-menu-item index="/baichuan/about">
                        <span>关于我们</span>
                </el-menu-item>

                </el-menu>
            </el-aside> -->
            <!-- 
                :default-active="route.path === '/baichuan' ? '/baichuan' : route.path" 
            -->
            <el-menu
                router
                :default-active="activeMenu"
                class="el-aside"
                background-color="#545c64"
                text-color="#fff" 
                active-text-color="#ffd04b"
            >
                <el-menu-item v-for="route in bcRoutes" :index="transRoute(route.path)" :key="route.name">
                    <span>{{ route.meta.title || '百川云' }}</span>
                </el-menu-item>
            </el-menu>

            <el-main class="main-content">
                <router-view></router-view>
            </el-main>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

/**
 * 问题列表
 * 1、 引入声明类放在一起，在最上方
 * 2、 ref放在一起，放在逻辑最上方，计算属性等同性质的代码放在一起方便阅读
 * 
 */

const router = useRouter();
const route = useRoute();

// 过滤出符合要求的路由对象
const routes = computed(() => {
    return router.options.routes.filter(route => route.meta && route.meta.title);
});

const baichuanParent = computed(() => {
    return routes.value.find(route => route.name === 'baichuan');
});

// 获取百川云下路由匹配：建议一个逻辑or处理不要拆开2个计算属性或者方法，此处简化处理
const bcRoutes = computed(() => {
    // return routes.value.find(route => route.name === 'baichuan')?.children;// 获取百度云子路由
    return baichuanParent.value?.children;// 0412
});

// 动态匹配 0412
const activeMenu = computed(() => {
    for (const child of bcRoutes.value) {
        const menuIndex = transRoute(child.path);
        console.log('child.path', child, child.path, menuIndex);
        const isActive = route.matched.some(r => r.name === child.name);
        if (isActive) {
            return menuIndex;
        }
    }
    return '/baichuan'; // 默认选中父菜单
});

const transRoute = (path) => {
    // 处理路由路径，空路径返回根路由，否则拼接前缀
    if (path === '') return '/baichuan';
    const result =  '/baichuan/'+ path;
    return result;
}
</script>

<style lang="scss" scoped>
    .app-container {
        height: 100vh;
        width: 100vw;
    }
        .sidebar-layout {
            display: flex;
            height: 100%;
            width: 100%;
          }
          .el-aside {
              background-color: #545c64;
              height: 100%;
              width: 100px;
    
          }
          /* .el-menu-vertical {
              height: 100%;
          } */
          .main-content {
              /* padding: 0; */
              --el-main-padding: 0;
          }
          /* .el-icon-location {
              height: 100vh;
              min-height: 100vh;
          } */
</style>