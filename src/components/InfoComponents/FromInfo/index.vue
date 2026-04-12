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
                    v-if="showUpload"
                    class="avatar-uploader" 
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false" 
                    list-type="picture-card"
                    accept=".jpg,.jpeg,.png,.gif,.webp"
                    :on-success="handleAvatarSuccess" 
                    :before-upload="beforeAvatarUpload"
                    :on-change="handleUploadChage"
                >

                    <el-icon class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                    <div class="upload-text">
                        点击上传
                    </div>
                </el-upload>
                <div v-if="form.images" class="image-preview" @click="resetUpload">
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
                :rightText="rightText"
                :is-Show-Reset="isShowReset"
                :is-show-confirm="isShowConfirm"
                @submit-From="handleButtonSubmit"
                @reset-Form="handleButtonReset"
            />
        </el-form>
    </div>
</template>
<script setup>
import { ref, computed, watch, onMounted ,onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {  Plus, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import BtnGroup from '../BtnGroup/index.vue';
import { useCarStore } from '../../../store/store';

import {
    getVehicleInfoByPath, 
    letterOptions,
    vehicleData,
} from '../../../utils/vehicleData.js';
import { fa } from 'element-plus/es/locales.mjs';

const props = defineProps({
    vehicleData: {
        type: Array,
        default: () => [],
    },
    letterOptions: {
        type: Array,
        default: () => [],
    },
    formData: {
        type: Object,
        default: () => ({
            vehicleInput: '',
            price: '',
            selectedLetter: '',
            selectedCar: [],
            images: '',
            remarks: '',
            carId: null,
            firstLetter: '',
            brand: '',
            sevies: '',
            vehicle: '',
            carName: '',
            price: '',
        }),
    },
    beforeAvatarUpload: {
        type: Function,
        default: () => () => true,
    },
    pageType: {
        type: String,
        default: 'add',
    },
    originData: {
        type: Object,
        default: null,
    }
});

const ruleFormRef = ref(null);
const showUpload = ref(true);
const route = useRoute();
const router = useRouter();
const emit = defineEmits(['handle-submit']);
const carStore = useCarStore();

const rightText = ref('清空修改');

const form = computed(() => props.formData); 
const isShowConfirm = computed(() => {
    const { vehicleInput, price, selectedLetter, selectedCar } = form.value;
    return vehicleInput?.length > 0 && price?.length > 0 && selectedLetter?.length > 0 && selectedCar.length > 0;
});
//置灰重置表单按钮
// 方案 1   有一个有内容就显示重置按钮   取消则直接返回上一页
// const isShowReset = computed(() => {
//     const { vehicleInput, price, selectedLetter, selectedCar } = form.value;
//     return !(vehicleInput?.length > 0 || price?.length > 0 || selectedLetter?.length > 0 || selectedCar.length > 0);
// });
// 方案2   添加有一个则显示重置按钮       取消则判断是否有内容 有内容清空  无内容则直接返回上一页
const isShowReset = computed(() => {
    const { vehicleInput, price, selectedLetter, selectedCar } = form.value;
    if (props.pageType === 'add') {
        return !(vehicleInput?.length > 0 || price?.length > 0 || selectedLetter?.length > 0 || selectedCar.length > 0);
    }else if (props.pageType ==='edit')
    {
        return vehicleInput === '' && price === '' && selectedLetter === '' && selectedCar.length === 0;
    }
});

// const isShowReset = computed(() => {
//     const { vehicleInput, price, selectedLetter, selectedCar } = form.value;
//     if (props.pageType === 'add') {
//         return !(vehicleInput?.length > 0 || price?.length > 0 || selectedLetter?.length > 0 || selectedCar.length > 0);
//         console.log('重置按钮的显示状态', isShowReset.value);
//     } else if (props.pageType === 'edit' && form.value !== null) {
//         return vehicleInput=== '' && price === '' && selectedLetter === '' && selectedCar.length === 0;
//     }else if ( props.pageType === 'edit' && form.value === null) {
//         return route.back();
//     }
    
// });

const filteredVehicleData = computed(() => {
    if(!form.value.selectedLetter) {
        return props.vehicleData;  // 未选择首字母时返回全部数据
    }
    const res = props.vehicleData.filter(item => item.letter === form.value.selectedLetter)   // 筛选符合首字母的数据
    return res;
});
// const filteredVehicleData = computed(() => {
//     if (!form.value.firstLetter) return vehicleData.value;
//     return vehicleData.value.filter(item => item.letter === form.value.firstLetter); // 根据首字母筛选数据
// });

// 表单验证规则
const rules = {
    price: [
        { required: true, message: '请输入车辆价格', trigger: 'blur' },
        { pattern: /^\d+(\.\d{1,2})?万?$/, message: '请输入有效的价格，最多两位小数，可加"万"字', trigger: 'blur' }
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
};
const handleAvatarSuccess = (response, uploadfile) => {
    const imageUrl = URL.createObjectURL(uploadfile.raw);
    form.value.images = imageUrl;
    console.log('图片上传成功，服务器响应：', response, uploadfile, imageUrl);
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
// 处理车型变化
const handleCarChange = (value) => {
    console.log('选择的车型路径：', value);
    // 会影响车辆输入框的自动填充
    // if(value && value.length === 3) {
    //     const info = getVehicleInfoByPath(value);
    //     if(info && info.fullName) {
    //         form.value.vehicleInput = info.fullName;
    //     }
    // }
    // 自动设置首字母
    if (!form.value.selectedLetter && value && value[0]) {
        const brand = props.vehicleData.find(item => item.value === value[0]);
        if (brand) {
            form.value.selectedLetter = brand.letter;
        }
    }
};


// 表单验证方法（供父组件调用）
const validateForm = () => {
    return ruleFormRef.value.validate();
};

// 重置表单方法（供父组件调用）
const resetForm = (showToast = true) => {
    if (ruleFormRef.value) {
        ruleFormRef.value.resetFields();
    }   
    props.formData.selectedCar = [];
    props.formData.images = '';
    props.formData.remarks = '';
    showUpload.value = true;
    if (showToast) {
        ElMessage.success('表单已重置');
    }
};
// 处理按钮组件的提交事件
const handleButtonSubmit = async() => {
    // 根据 pageType 触发不同的事件
    console.log('按钮点击了-执行表单校验submitForm', form.value)
    
    if (!ruleFormRef.value) return;
    // submitting.value = true;  // 设置提交状态为true
    try {
        // 验证表单
        await ruleFormRef.value.validate(); // 验证表单，如果通过则继续执行后续操作
        const vehicleInfo = getVehicleInfoByPath(form.value.selectedCar); // 获取整车辆信息

        const vehicleDataToSave = {
            vehicleInput: form.value.vehicleInput,
            selectedLetter: form.value.selectedLetter,
            images: form.value.images,
            remarks: form.value.remarks,
            vehicleInfo: vehicleInfo,

            // 新增的字段
            // firstLetter: form.selectedLetter,
            // carId: Date.now(),
            // brand: form.selectedCar[0] || '车牌',
            // sevies: form.selectedCar[1] || '车系',
            // vehicle: form.selectedCar[2] || '车型',
            // carName: vehicleInfo?.fullName || '宝贵的车辆全称',
            // price: form.price + 'W'|| '价格',
            // imgUrl: form.images
            firstLetter: form.value.selectedLetter,
            carId: Date.now(),
            selectedCar: [...form.value.selectedCar],
            brand: form.value.selectedCar[0] || '车牌',
            sevies: form.value.selectedCar[1] || '车系',
            vehicle: form.value.selectedCar[2] || '车型',
            carName: vehicleInfo?.fullName || '宝贵的车辆全称',
            price: form.value.price + 'W' || '价格',
            imgUrl: form.value.images
        };
        console.log('提交的车辆数据：', vehicleDataToSave);
        emit('handle-submit', vehicleDataToSave);
    }
    catch (error) {
        console.log('表单验证失败：', error);
        ElMessage.error('表单验证失败，请检查输入项！');
    }
};
// 方案2   添加有一个则显示重置按钮   取消则判断是否有内容 有内容清空  无内容则直接返回上一页
const handleButtonReset = () => {
    if (props.pageType === 'edit') {
        // 表单内容是否为空
        let isNone = true;
        for (const key in form.value) {
            if (form.value[key]?.length > 0) {
                isNone = false;
            }
        }
        if (isNone) {
            // 返回上一页
            router.back();
            return;
        }
        else {
            if (Object.keys(props.originData)?.length > 0) {
                for (const key in form.value) {
                    form.value[key] = '';
                }
            }
            rightText.value = '返回上一页';
        }
        
        // if (form.value.vehicleInput || form.value.price || form.value.selectedLetter || form.value.selectedCar.length > 0) {
        //     resetForm(false); // 不显示重置成功的提示信息
        // } else {
        //     router.back();
        // }
    } else if (props.pageType === 'add') {
        resetForm();
    }
};

// 处理按钮组件的重置事件
// const handleButtonReset = () => {
    
//     if (props.pageType === 'edit') {
//         router.back(); // 编辑页面重置后返回上一页
//     } else {
//         resetForm();
//     }
// };

//暴露方法给父组件
defineExpose({
    validateForm,
    resetForm
});

onMounted(() => {
    
});

watch(() => form, (newVal) => {
    console.log('表单数据变化了', newVal.value, form.value.selectedLetter);
    if (newVal.value.images?.length > 0) {
        showUpload.value = false;
    } else {
        showUpload.value = true;
    }
}, { deep: true });


onUnmounted(() => {
    if (form.value.images && form.value.images.startsWith('blob:')) {
        // 释放blob URL占用的内存
        URL.revokeObjectURL(form.value.images);
    }
});
</script>
<style scoped src="./index.scss"></style>