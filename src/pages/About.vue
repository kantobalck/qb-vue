<template>
  <h3>按钮</h3>
    <el-button type="primary">按钮</el-button>

  <div class="about">
    <!-- 蓝色按钮 -日间-->
    <div class="content-top">
      <div class="top-left">
        <CustomButton :size="size" :color="color" :disabled="disabled" :theme="theme" :text="text" :plain="plain"
          @click="handleClick" />
        <CustomButton :size="size" :color="color" :disabled="disabled" :theme="theme" :text="text" :plain="'true'"
          @click="handleClick" />
      </div>
      <div class="top-right">
        <CustomButton :size="'small'" :color="color" :disabled="'true'" :theme="theme" :text="text" :plain="plain"
          @click="handleClick" />
        <CustomButton :size="'tiny'" :color="''" :disabled="disabled" :theme="''" :text="text" :plain="''"
          @click="handleClick" />  
      </div>
    </div>
    <!-- 红色按钮-日间 -->
    <div class="content-top">
      <div class="top-left">
        <CustomButton :size="size" :color="'red'" :disabled="disabled" :theme="theme" :text="text" :plain="plain"
          @click="handleClick" />
        <CustomButton :size="size" :color="'red'" :disabled="disabled" :theme="theme" :text="text" :plain="'true'"
          @click="handleClick" />
      </div>
      <div class="top-right">
        <CustomButton :size="size" :color="'red'" :disabled="'true'" :theme="theme" :text="text" :plain="plain"
          @click="handleClick" />
        <CustomButton :size="size" :color="''" :disabled="disabled" :theme="''" :text="text" :plain="''"
          @click="handleClick" />
      </div>
    </div>
    <!-- 绿色按钮-日间 -->
    <div class="content-top">
      <div class="top-left">
        <CustomButton :size="size" :color="'green'" :disabled="disabled" :theme="theme" :text="text" :plain="plain"
          @click="handleClick" />
        <CustomButton :size="size" :color="'green'" :disabled="disabled" :theme="theme" :text="text" :plain="'true'"
          @click="handleClick" />
      </div>
      <div class="top-right">
        <CustomButton :size="size" :color="'green'" :disabled="'true'" :theme="theme" :text="text" :plain="plain"
          @click="handleClick" />
        <CustomButton :size="size" :color="''" :disabled="disabled" :theme="''" :text="text" :plain="''"
          @click="handleClick" />
      </div>
    </div>
    <!-- 蓝色按钮 -夜间 -->
    <div class="content-buttom">
      <div class="top-left">
        <CustomButton :size="size" :color="'blue'" :disabled="disabled" :theme="'dark'" :text="text" :plain="plain"
          @click="handleClick" />
        <CustomButton :size="size" :color="'blue'" :disabled="disabled" :theme="'dark'" :text="text" :plain="'true'"
          @click="handleClick" />
      </div>
      <div class="top-right">
        <CustomButton :size="size" :color="'blue'" :disabled="'true'" :theme="'dark'" :text="text" :plain="plain"
          @click="handleClick" />
        <CustomButton :size="size" :color="''" :disabled="disabled" :theme="'dark'" :text="text" :plain="''"
          @click="handleClick" />
      </div>
    </div>
    <!-- 红色按钮-夜间 -->
    <div class="content-buttom">
      <div class="top-left">
        <CustomButton :size="size" :color="'red'" :disabled="disabled" :theme="'dark'" :text="text" :plain="plain"
          @click="handleClick" />
        <CustomButton :size="size" :color="'red'" :disabled="disabled" :theme="'dark'" :text="text" :plain="'true'"
          @click="handleClick" />
      </div>
      <div class="top-right">
        <CustomButton :size="size" :color="'red'" :disabled="'true'" :theme="'dark'" :text="text" :plain="plain"
          @click="handleClick" />
        <CustomButton :size="size" :color="''" :disabled="disabled" :theme="'dark'" :text="text" :plain="''"
          @click="handleClick" />
      </div>
    </div>
    <!-- 绿色按钮-夜间 -->
    <div class="content-buttom">
      <div class="top-left">
        <CustomButton :size="size" :color="'green'" :disabled="disabled" :theme="'dark'" :text="text" :plain="plain"
          @click="handleClick" />
        <CustomButton :size="size" :color="'green'" :disabled="disabled" :theme="'dark'" :text="text" :plain="'true'"
          @click="handleClick" />
      </div>
      <div class="top-right">
        <CustomButton :size="size" :color="'green'" :disabled="'true'" :theme="'dark'" :text="text" :plain="plain"
          @click="handleClick" />
        <CustomButton :size="size" :color="''" :disabled="disabled" :theme="'dark'" :text="text" :plain="''"
          @click="handleClick" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomButton from '../components/CustomButton.vue'
import { useRouterUtils } from '../router'
import { ref } from 'vue';
const size = ref('large');// 'large', 'medium', 'small', 'tiny'
const color = ref('blue');// 'blue', 'red', 'green'
const theme = ref('default');      // 'default' or 'dark'
const plain = ref(false);        // true or false
const disabled = ref(false);    // true or false
const text = ref('按钮');

const { back, close, getRoute } = useRouterUtils()

const handleBack = () => {
  back()
}

const handleClose = () => {
  close('/')
}

const showRouteInfo = () => {
  const route = getRoute()
  console.log('当前路由信息:', route)
  alert(`当前路由路径: ${route.path}\n路由名称: ${route.name}`)
}

const handleClick = (data) => {
  console.log('按钮点击事件：', data)
}
</script>

<style scoped>
  h3{
    text-align: center;
  }
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}
.content-top,.content-buttom {
  width: 100vw;
  /* height: 700px; */
  background-color: #F7F8FA;
  /* background-color: black; */
  border-radius: 25px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  /* flex-direction: column; */
  gap: 30px;
}
.top-left{
  padding-left: 20px;
}
.top-right{
  padding-right: 20px;
}
.top-left,.top-right{
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
}
.content-buttom{
  background-color: black;
}
</style>