<template>
    <div>
        <el-form 
            ref="ruleFormRef" 
            :model="form" 
            label-width="200px" 
            label-position="left"
            class="vechicle-form" 
            :rules="rules" 
            status-icon>
            <el-form-item label="车辆输入:" prop="vehicleInput" required>
                <el-input v-model="form.vehicleInput" style="width: 350px;" placeholder="请输入车辆信息"></el-input>
            </el-form-item>


            <el-form-item label="车辆报价:" prop="price" required>
                <el-input v-model="form.price" style="width: 350px;" placeholder="请输入车辆价格">
                </el-input>
            </el-form-item>


            <el-form-item label="首字母选择：" prop="selectedLetter" required>
                <div class="letter-selector">
                    <el-select 
                        v-model="form.selectedLetter" 
                        placeholder="请选择首字母" 
                        style="width: 350px;"
                        @change="handleLetterChange"
                        clearable
                        >
                        <el-option
                            v-for="item in letterOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled"
                            >
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>


            <el-form-item label="车型选择" prop="selectedCar" clearable required>
                <div class="cascader-container">
                    <el-cascader 
                        v-model="form.selectedCar"
                        :options="filteredVehicleData"
                        placeholder="请选择车牌-车系-车型"
                        :props="{expandTrigger: 'hover'}"
                        style="width: 350px;"
                        @change="handleCarChange"
                    />
                </div>
            </el-form-item>

            <el-form-item label="图片上传" prop="images">
                <el-upload 
                    class="avatar-uploader" 
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false" 
                    list-type="picture-card"
                    accept=".jpg,.jpeg,.png,.gif,.webp"
                    :on-success="handleAvatarSuccess" 
                    :before-upload="props.beforeAvatarUpload"
                    :on-change="handleUploadChage"
                    v-if ="showUpload"
                    >

                    <el-icon class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                    <div class="upload-text">
                        点击上传
                    </div>
                </el-upload>
                <div v-if="form.images" class="image-preview" @click="reseUplond">
                    <img :src="form.images" class="avatar" />
                    <div class="image-overlay">
                        <el-icon><Delete /></el-icon>
                        <span>点击删除</span>
                    </div>
                </div>
                
            </el-form-item>


            <el-form-item label="备注信息（选填）">
                <el-input 
                    type="textarea" 
                    :rows="4" 
                    v-model="form.remarks" 
                    placeholder="请输入备注信息" 
                    clearable
                    show-word-limit
                    style="width: 350px;"
                    >
                </el-input>
            </el-form-item>

            <BtnGroup
                :pageType="pageType"
                @submit-From="handleButtonSubmit"
                @reset-Form="handleButtonReset"
            />
            
        </el-form>
    </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue';
import {  Plus, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import BtnGroup from '../BtnGroup/index.vue';


const props = defineProps({
    vehicleData: {
        type: Array,
        default: () => [],
    },
    letterOptions: {
        type: Array,
        default: () => [],
    },
    showUpload: {
        type: Boolean,
        default: true,
    },
    formData: {
        type: Object,
        default: () => ({
            vehicleInput: '',
            price: '',
            selectedLetter: '',
            selectedCar: [],
            images: '',
            remarks: ''
        }),
    },
    beforeAvatarUpload: {
        type: Function,
        default: () => () => true,
    },
    pageType: {
        type: String,
        default: 'add',
    }
    // filteredVehicleData: {
    //     type: Array,
    //     default: () => [],
    // }

});

const ruleFormRef = ref(null);
const showUpload = ref(props.showUpload);

const emit = defineEmits(['handle-submit']);

const form = computed(() => props.formData);

const filteredVehicleData = computed(() => {
    if(!form.value.selectedLetter) {
        return props.vehicleData;  // 未选择首字母时返回全部数据
    }
    const res = props.vehicleData.filter(item => item.letter === form.value.selectedLetter)   // 筛选符合首字母的数据
    return res;
});
// 表单验证规则
const rules = {
    price: [
        { required: true, message: '请输入车辆价格', trigger: 'blur' },
        { pattern: /^\d+(\.\d{1,2})?$/, message: '请输入有效的价格，最多两位小数', trigger: 'blur' }
    ],
    vehicleInput: [
        { required: true, message: '请输入车辆信息', trigger: 'blur' },
        { min: 2, message: '车辆信息至少2个字符', trigger: 'blur' }
    ],
    selectedLetter: [
        { required: true, message: '请选择首字母', trigger: 'change' }
    ],
    selectedCar: [
        { required: true, message: '请选择车型', trigger: 'change' }
    ],
    // images: [
    //     { required: true, message: '请上传图片', trigger: 'change' }
    // ]
};

const handleAvatarSuccess = (response, uploadfile) => {
    form.images = URL.createObjectURL(uploadfile.raw);
    showUpload.value = false;
    ElMessage.success('图片上传成功');
};
// 重置图片上传
const resetUpload = () => {
    props.formData.images = '';
    showUpload.value = true;
};
//处理首字母变化
const handleLetterChange = (letter) => {
    if (letter && props.formData.selectedCar.length > 0) {
        const currentBrand = props.vehicleData.find(item => item.value === props.formData.selectedCar[0]);
        if (currentBrand && currentBrand.letter !== letter) {
            props.formData.selectedCar = [];
        }
    }
};
// 表单验证方法（供父组件调用）
const validateForm = () => {
    return ruleFormRef.value.validate();
};
// 重置表单方法（供父组件调用）
const resetForm = () => {
    if (ruleFormRef.value) {
        ruleFormRef.value.resetFields();
    }
        props.formData.selectedCar = [];
        props.formData.images = '';
        props.formData.remarks = '';
        showUpload.value = true;
        ElMessage.success('表单已重置');
};
// 处理按钮组件的提交事件
const handleButtonSubmit = () => {
    // 根据 pageType 触发不同的事件
    console.log('按钮点击了-执行表单校验submitForm', form.value)
    emit('handle-submit', form.value);
};

// 处理按钮组件的重置事件
const handleButtonReset = () => {
    resetForm();
};

// 暴露方法给父组件
defineExpose({
    validateForm,
    resetForm
});




watch(() => form, (newVal) => {
    console.log('表单数据变化了', newVal.value, form.value.selectedLetter);
}, { deep: true });


</script>
<style scoped src="./index.scss"></style>