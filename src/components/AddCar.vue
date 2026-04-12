<template>
    <div class="vechicle-form">
        <FromInfo 
            ref="ruleFormRef"
            :pageType="pageType"
            :vehicleData="vehicleData"
            :letterOptions="letterOptions"
            :formData="form"
            :beforeAvatarUpload="beforeAvatarUpload"
            @handle-submit="handleSubmit"
        />
    </div>
</template>
<script setup>

import { ref,reactive, computed, onMounted ,watch} from 'vue';
import { ElMessage } from 'element-plus';
import FromInfo from './InfoComponents/FromInfo/index.vue';

import {  
    letterOptions,// 首字母选项
    vehicleData,  // 车辆数据
    getVehicleInfoByPath,          // 根据路径获取车辆信息
    submittedVehicles,              // 已提交的车辆列表
    saveVehicleToStorage,            // 保存车辆到本地存储
    } from '../utils/vehicleData.js';

import {useCarStore} from '../store/store.js';

const carStore = useCarStore();
const ruleFormRef = ref();          // 表单引用
const pageType = ref('add');          // 页面类型，默认为添加页面 edit页面会传入'edit'
const submitSuccessMessage = ref('车辆新增成功');  // 提交成功消息
const submitSuccess = ref(false);  // 提交成功状态
// 表单数据结构
const form = reactive({
    vehicleInput: '',
    selectedLetter: '',
    selectedCar: [],
    images: '',
    remarks: '',
    price: '',
});
const beforeAvatarUpload = (File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(File.type)) {
        ElMessage.error('上传图片格式不正确，请上传 JPG、PNG、GIF 或 WEBP 格式的图片');
        return false;
    }
    else if (File.size / 1024 / 1024 > 5) {
        ElMessage.error('上传图片大小不能超过5MB');
        return false;
    }
    return true;
}
// 3.9新增  
//监听表单提交事件（从按钮组件传来）
const handleSubmit = vehicleDataToSave => {
    console.log('表单校验成功了-更新数据-push数据', vehicleDataToSave);
    // 添加store
    carStore.addCarList(vehicleDataToSave);
    console.log('提交的车辆数据：', vehicleDataToSave);
    submittedVehicles.value.push(vehicleDataToSave);  // 将提交的车辆数据添加到已提交列表
        // 保存到本地存储
    saveVehicleToStorage(vehicleDataToSave);
        // 模拟异步提交操作
    
    submitSuccess.value = true; // 设置提交成功状态


    if (ruleFormRef.value) {  // 确保表单引用存在时才调用 resetForm 方法
        ruleFormRef.value.resetForm(false); // 提交成功后重置表单
    }
};
watch(submitSuccess, (newVal) => {
    if (newVal) {
        ElMessage({
            message: submitSuccessMessage.value,
            type: 'success',
        });
        submitSuccess.value = false; // 重置提交成功状态，以便可以再次触发事件
    }
})
console.log('selectedCar', form.selectedCar);
</script>
<style lang="scss" scoped>
.vechicle-form {
    padding: 10px;
    .search-box {
        // width: 350px;
        .search-input {
            width: 250px;
        }
    }
        .avatar-uploader .avatar {
            width: 150px;
            height: 150px;
            display: block;
            overflow: hidden;
        }
}
</style>