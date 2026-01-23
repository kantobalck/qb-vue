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
            <el-menu router :default-active="$route.path" class="el-aside" background-color="#545c64"
                text-color="#fff" active-text-color="#ffd04b">
                    <!-- 一级菜单 -->
                <el-menu-item
                    v-for="route in bcRoutes"
                    :index="transRoute(route.path) || route.path"
                >
                    <span>{{ route.meta.title || '路由页面'}}</span>
                </el-menu-item>
                <!-- </div> -->
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

const router = useRouter();
const route = useRoute();
const routes = computed(() => {
    return router.options.routes.filter(route => route.meta && route.meta.title);// 过滤出有标题的路由
});
const bcRoutes = computed(() => {
    return routes.value.find(route => route.name === 'baichuan')?.children;// 获取百度云子路由
});
console.log('路由', router.options, route.path);
console.log('bcRoutes', bcRoutes.value);

const transRoute = (path) => {
    // 处理路由路径，空路径返回根路由，否则拼接前缀
    if (path === '') return '/baichuan';
    return '/baichuan/'+ path;
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