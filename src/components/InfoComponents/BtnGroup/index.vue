<template>
    <div>
        <el-form-item class="form-actions" >
                <el-button 
                    type="primary" 
                    class="submit-button"
                    :disabled="!isShowConfirm"
                    @click="debounceConfirm"
                >
                    {{pageType === 'add' ? '确认添加': '保存修改'}}
                </el-button>
                <el-button
                    class="reset-button"
                    @click="throttleConfirm"
                    :disabled="isShowReset && pageType === 'add'"
                >
                    {{pageType === 'add' ? '重置表单': `${ rightText }` }} 
                </el-button>
            </el-form-item>
    </div>
</template>
<script setup>
import { ref , onBeforeUnmount } from 'vue';
const submitting = ref(false);

const emit = defineEmits(['submit-From', 'reset-Form']);
const props = defineProps({
    pageType: {
        type: String,
        default: 'add', // add | edit
    },
    isShowConfirm: {
        type: Boolean,
        default: true,
    },
    isShowReset: {
        type: Boolean,
        default: true,
    },
    rightText: {
        type: String,
        default: ''
    }
});
//防抖函数 
const debounce = (fn , delay = 500) => {
    let timer = null;
    return function(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay);
    };
};
//节流控制
const throttle = (fn, delay = 500) => {
    let canRun = true;
    let timer = null;
    return function(...args) {
        if (!canRun) return;
        canRun = false;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
            canRun = true;
            timer = null;
        }, delay);
    };
};


// 提交表单
const confirm = () => {
    console.log('提交表单')
    // emit('submit-From');
};
// 重置表单
const cancel = () => {
    emit('reset-Form');
};
// 防抖提交表单
const debounceConfirm = debounce(confirm, 500);
// 节流提交表单
const throttleConfirm = throttle(cancel, 500);
// 在组件卸载前清除防抖和节流的定时器
onBeforeUnmount(() => {
    console.log('BtnGroup组件props', props);
    if (debounceConfirm.timer) {
        clearTimeout(debounceConfirm.timer);
    }
    if (throttleConfirm.timer) {
        clearTimeout(throttleConfirm.timer);
    }
});

</script>
<style lang="scss" scoped src="./index.scss"></style>
    
