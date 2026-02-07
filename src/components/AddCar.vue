<template>
    <div class="vechicle-form">
        <el-form 
            ref="ruleFormRef" 
            :model="form" 
            label-width="200px" 
            label-position="left"
            class="vechicle-form" 
            :rules="rules" 
            status-icon>
            <!-- 车辆品牌选择 -->
            <el-form-item label="车辆输入:" prop="vehicleInput" required>
                <el-input v-model="form.vehicleInput" style="width: 350px;" placeholder="请输入车辆信息">
                </el-input>
            </el-form-item>
            <!-- 报价 -->
            <el-form-item label="车辆报价:" prop="price" required>
                <el-input v-model="form.price" style="width: 350px;" placeholder="请输入车辆价格">
                </el-input>
            </el-form-item>
            <!-- 首字母选择器 -->
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
            <!-- 三级联选择器 -->
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
            <!-- 图片上传    -->
            <el-form-item label="图片上传" prop="images" required>
                <el-upload 
                    class="avatar-uploader" 
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false" 
                    list-type="picture-card"
                    accept=".jpg,.jpeg,.png,.gif,.webp"
                    :on-success="handleAvatarSuccess" 
                    :before-upload="beforeAvatarUpload"
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

            <!-- 备注信息 -->
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
            <!-- 提交按钮 -->
             <el-form-item class="form-actions" >
                <el-button 
                    type="primary" 
                    class="submit-button"
                    @click="submitFrom"
                    :loading="submitting"
                    >
                    确认添加
                </el-button>
                <el-button
                    class="reset-button"
                    @click="resetForm"    
                    :disabled="submitting"
                >
                    重置表单
                </el-button>
                <span>length: {{filteredVehicleData.length}}</span>
            </el-form-item>

        </el-form>
    </div>
</template>
<script setup>

import { ref,reactive, computed, onMounted } from 'vue';
import {  Plus, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

import {  
    letterOptions,// 首字母选项
    vehicleData,  // 车辆数据
    getVehicleInfoByPath,          // 根据路径获取车辆信息
    submittedVehicles,              // 已提交的车辆列表
    saveVehicleToStorage,            // 保存车辆到本地存储
    } from '../utils/vehicleData.js';

import {useCarStore} from '../store/store.js';

const carStore = useCarStore();

const showUpload = ref(true);           // 控制图片上传显示
const ruleFormRef = ref();          // 表单引用
const submitting = ref(false);     // 提交状态

// 表单数据结构
const form = reactive({
    vehicleInput: '',
    selectedLetter: '',
    selectedCar: [],
    images: '',
    remarks: '',
    price: '',
})

//表单验证规则
const rules = {
    price: [
        { required: true, message: '请输入车辆价格', trigger: 'blur' },
        { pattern: /^\d+(\.\d{1,2})?$/, message: '请输入有效的价格，最多两位小数', trigger: 'blur' }
    ], // 价格验证规则可以根据需要添加
    vehicleInput: [
        {required: true, message: '请输入车辆信息', trigger: 'blur'},
        {min: 2, message: '车辆信息至少2个字符', trigger: 'blur'}
    ],
    selectedLetter: [
        {required: true, message: '请选择首字母', trigger: 'change'}
    ],
    selectedCar: [
        { required: true ,message: '请选择车型', trigger: 'change' }
    ],
    images: [
        { required: true ,message: '请上传图片', trigger: 'change' }
    ]
};
//根据首字母筛选数据
const filteredVehicleData = computed(() => {
    if(!form.selectedLetter) return vehicleData.value;  // 未选择首字母时返回全部数据
    const res = vehicleData.value.filter(item => item.letter === form.selectedLetter)   // 筛选符合首字母的数据
    return res;
});

//  首字母变化处理
// const handleLetterChange = (letter) => {
//     //如果切换了首字母，清空已选择的车型
//     if(letter && form.selectedCar.length > 0) {
//         const currentBrand = vehicleData.find(item => item.value === form.selectedCar[0]);// 当前选择的品牌
//         // 如果当前选择的品牌不属于新的首字母，清空选择
//         if(currentBrand && currentBrand.letter !== letter) {
//             form.selectedCar = [];
//         }
//     }
// };

//  车型选择变化处理  
const handleCarChange = (value) => {
    console.log('选择的车型路径：', value);
    if(value && value.length === 3) {
        const info = getVehicleInfoByPath(value);
        console.log('选择的车型信息：', info);
        // if(info) {
        //     form.vehicleInput = info.fullName;   // 设置车辆输入框的值
        // }
    }
    //自动设置首字母
    if (!form.selectedLetter) {
        const brand = vehicleData.find(item => item.value === value[0]);// 根据选择的品牌值查找品牌信息
        if (brand) {
            form.selectedLetter = brand.letter;  // 设置首字母
        }
    }
};

const props = {
    expandTrigger: 'hover' // 悬停展开子菜单
};
// 图片上传相关
const imageUrl = ref('');
const handleAvatarSuccess = (response, uploadfile) => {
    form.images = URL.createObjectURL(uploadfile.raw);
    showUpload.value = false;
    ElMessage.success('图片上传成功');
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
}
// 图片上传重置
const reseUplond = () => {
    form.images = '';
    showUpload.value = true;
}

// 表单提交处理函数
const submitFrom = async () => {
    if (!ruleFormRef.value) return;
    submitting.value = true;  // 设置提交状态为true
    try {
        // 验证表单
        await ruleFormRef.value.validate();
        const vehicleInfo = getVehicleInfoByPath(form.selectedCar); // 获取zan整车辆信息

        const vehicleDataToSave = {
            vehicleInput: form.vehicleInput,
            selectedLetter: form.selectedLetter,
            selectedCar: [...form.selectedCar],
            images: form.images,
            remarks: form.remarks,
            vehicleInfo: vehicleInfo,

            // 新增的字段
            firstLetter: form.selectedLetter,
            carId: Date.now(),
            brand: form.selectedCar[0] || '车牌',
            sevies: form.selectedCar[1] || '车系',
            vehicle: form.selectedCar[2] || '车型',
            carName: vehicleInfo?.fullName || '宝贵的车辆全称',
            price: form.price + 'W'|| '价格',
            imgUrl: form.images
        };
        console.log('提交的车辆数据：', vehicleDataToSave);
        carStore.addCarList(vehicleDataToSave);

        // vehicleDataToSave对标carList进行存入
       // store.commit('addVehicleData', vehicleDataToSave);
        submittedVehicles.value.push(vehicleDataToSave);  // 将提交的车辆数据添加到已提交列表
        // 保存到本地存储
        saveVehicleToStorage(vehicleDataToSave);
        // 模拟异步提交操作
        ElMessage.success('表单提交成功！');
        resetForm(); // 提交成功后重置表单
    } catch (error) {
        console.log('表单验证失败：', error);
        ElMessage.error('表单验证失败，请检查输入项！');
    }
};

//重置表单
const resetForm = () => {
    if (ruleFormRef.value) {
        ruleFormRef.value.resetFields();
    }
    form.selectedCar = [];
    form.images = '';
    form.remarks = '';
    showUpload.value = true;
    ElMessage.success('表单已重置');
};
// const props = {
//     expandTrigger: 'hover' // 鼠标悬停展开子菜单
// }
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