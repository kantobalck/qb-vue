<template>
    <div class="search-box">
        <el-input
            v-model="searchText"
            placeholder="请输入搜索关键词"
            clearable
        />
        <el-button
            class="search-btn"
            type="primary"
            @click="search"
        >
            搜索
        </el-button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['handle-search']);

const searchText = ref('');
/**
 * 1、 setup相当于vue2的created、data等集合，setup中定义的变量和函数都可以直接在模板中使用
 * 2、 ref是vue3中定义响应式数据的函数，ref返回一个
 * 3、 相同类型代码放在一起，ref - computed - 直接被调用的函数 - methods(支持箭头函数和普通函数) - onBeforeMounted - onMounted 最后按照生命周期顺序来
 */

const search = () => {
    emit('handle-search', searchText.value);
};
</script>

<style lang="scss" scoped src="./index.scss"></style>