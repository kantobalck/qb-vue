<template>
    <div>
        <el-form-item class="form-actions" >
                <el-button 
                    type="primary" 
                    class="submit-button"
                    @click="confirm"
                >
                    {{pageType === 'add' ? '确认添加': '保存修改'}} 
                </el-button>
                <el-button
                    class="reset-button"
                    @click="cancel"
                >
                    {{pageType === 'add' ? '重置表单': '取消修改'}} 
                </el-button>
            </el-form-item>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const submitting = ref(false);

const emit = defineEmits(['submit-From', 'reset-Form']);
const props = defineProps({
    pageType: {
        type: String,
        default: 'add', // add | edit
    },
});
// 提交表单
const confirm = () => {
    emit('submit-From');
};
// 重置表单
const cancel = () => {
    emit('reset-Form');
};

</script>
<style lang="scss" scoped src="./index.scss"></style>
    
