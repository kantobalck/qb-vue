<template>
    <div>
    <div class="filter-model" :style="{ 'background-image': 'url(' + item.imgUrl + ')' }">

    </div>
        <span class="box-name"><span>车辆名称：</span>{{ item.brand }}</span>
        <span class="box-name"><span>车辆系别：</span>{{ item.sevies }}</span>
        <span class="box-name"><span>款式：</span>{{ item.vehicle }}</span>
        <button @click="handleEdit(item)" class="edit-button">修改</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['handle-edit']);
const props = defineProps({
    item : {
        type: Object,
        default: () => ({}),
    }
});

const handleEdit = (item) => {
    emit('handle-edit', item);
};

</script>
<style lang="scss" scoped src="./index.scss"></style>
