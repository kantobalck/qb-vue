<template>
    <div class="car-letter">
        <span v-for="(item, index) in zimuList" :key="index" @click="chooseLetter(item, index)"
            class="letter-index"
            :class="[activeLetterIndex === index ? 'letter-active' : '', item.count <= 0 ? 'disabled' : '']"
            :disabled="item.count <= 0">
                {{ item.firstLetter }}
        </span>
    </div>
</template>
<script setup>

import { ref } from 'vue';


const props = defineProps({
    zimuList: {
        type: Array,
        default: () => [],
    }
});
const emit = defineEmits(['chooseLetter']);

const activeLetterIndex = ref(-1);

function chooseLetter(item, index) {
    if (item.count <= 0) {
        return;
    }
    activeLetterIndex.value = index;
    emit('chooseLetter', {
        item,
        index
    });
    console.log('子组件传值', item);
}
</script>
<style lang="scss" scoped src="./index.scss"></style>
