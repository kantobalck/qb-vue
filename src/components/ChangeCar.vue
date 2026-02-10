<template>
    <div class="edit-car-container">
        <el-form ref="editFormRef" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="车辆输入:" prop="vehicleInput" >
                <el-input v-model="form.brand" style="width: 350px;" placeholder="请输入车辆信息">
                </el-input>
            </el-form-item>
            <el-form-item label="车辆报价:" prop="price" >
                <el-input v-model="form.price" style="width: 350px;" placeholder="请输入车辆价格">
                </el-input>
            </el-form-item>
            <el-form-item label="首字母选择：" prop="selectedLetter" >
                <div class="letter-selector">
                    <el-select v-model="form.firstLetter" placeholder="请选择首字母" style="width: 350px;" clearable>
                        <el-option v-for="item in letterOptions" :key="item.value" :label="item.label"
                            :value="item.value" :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item label="车型选择" prop="selectedCar" clearable >
                <div class="cascader-container">
                    <el-cascader v-model="form.selectedCar" :options="filteredVehicleData" placeholder="请选择车牌-车系-车型"
                        :props="{ expandTrigger: 'hover' }" style="width: 350px;" @change="handleCarChange" />
                </div>
            </el-form-item>

            <el-form-item label="图片上传" prop="images" >
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false" list-type="picture-card" accept=".jpg,.jpeg,.png,.gif,.webp"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-change="handleUploadChage"
                    v-if="showUpload">
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
                        <el-icon>
                            <Delete />
                        </el-icon>
                        <span>点击删除</span>
                    </div>
                </div>
            </el-form-item>

            <el-form-item label="备注信息（选填）">
                <el-input type="textarea" :rows="4" v-model="form.remarks" placeholder="请输入备注信息" clearable
                    show-word-limit style="width: 350px;">
                </el-input>
            </el-form-item>

            <!-- 使用按钮触发保存 -->
            <button type="button" @click="saveChanges" class="save-button">保存修改</button>
    </el-form>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCarStore } from '../store/store';
import { Plus, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import {
    letterOptions,
    vehicleData,
    getVehicleInfoByPath,
} from '../utils/vehicleData.js';

const route = useRoute();
const router = useRouter();
const carStore = useCarStore();
const showUpload = ref(true);

const form = ref({
    carId: null,
    firstLetter: '',
    brand: '',
    selectedCar: [],
    sevies: '',
    vehicle: '',
    carName: '',
    price: '',
    images: '',
    remarks: ''
});
// 表单验证
// const rules = {
//     brand: [
//         { required: true, message: '请输入车辆品牌', trigger: 'blur' },
//         { min: 2, message: '车辆品牌至少2个字符', trigger: 'blur' }
//     ],
//     price: [
//         { required: true, message: '请输入车辆价格', trigger: 'blur' },
//         { pattern: /^\d+(\.\d{1,2})?$/, message: '请输入有效的价格，最多两位小数', trigger: 'blur' }
//     ],
//     firstLetter: [
//         { required: true, message: '请选择首字母', trigger: 'change' }
//     ]
// };


// 计算属性：根据首字母筛选数据
const filteredVehicleData = computed(() => {
    if (!form.value.firstLetter) return vehicleData.value;
    return vehicleData.value.filter(item => item.letter === form.value.firstLetter); // 根据首字母筛选数据
});

// 图片上传成功
const handleAvatarSuccess = (response, uploadfile) => {
    form.value.images = URL.createObjectURL(uploadfile.raw);
    showUpload.value = false;
    ElMessage.success('图片上传成功');
};

// 上传前验证
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

// 重置图片上传
const resetUpload = () => {
    form.value.images = '';
    showUpload.value = true;
};

// 文件上传变化处理（如果存在）
const handleUploadChage = (file, fileList) => {
    // 如果需要处理上传变化，可以在这里实现
};

// 车型选择变化
const handleCarChange = (value) => {
    if (value && value.length === 3) {
        const info = getVehicleInfoByPath(value);   // 根据路径获取车辆信息
        if (info) {
            form.value.brand = info.brand;  // 更新品牌信息等字段
            form.value.sevies = info.series;        // 更新车系信息等字段
            form.value.vehicle = info.model;        // 更新车型信息等字段
            form.value.carName = info.fullName;         // 更新车型全名等字段
        }
        
    }
};

// 初始化表单数据
onMounted(() => {
    if (route.params.carId) {
        const carId = route.params.carId;
        const car = carStore.carList.find(item => item.carId == carId);
        if (car) {
            form.value = {
                carId: car.carId,
                firstLetter: car.firstLetter,
                brand: car.brand,
                sevies: car.sevies,
                vehicle: car.vehicle,
                carName: car.carName,
                price: car.price,
                images: car.imgUrl,
                remarks: car.remarks || '',
                selectedCar: [car.brand, car.sevies, car.vehicle]
            };
            if (car.imgUrl) {
                showUpload.value = false;
            }
        }

    }
});

// 保存修改 - 改名为 saveChanges 避免冲突
const saveChanges = () => {
    // 验证必填字段
    if (!form.value.brand || !form.value.price || !form.value.firstLetter) {  
        ElMessage.error('请填写必填字段');
        return;
    }

    // 构建更新数据
    const updatedCar = {
        carId: form.value.carId,
        firstLetter: form.value.firstLetter,
        brand: form.value.brand,
        sevies: form.value.sevies,
        vehicle: form.value.vehicle,
        carName: form.value.carName,
        price: form.value.price,
        imgUrl: form.value.images,
        remarks: form.value.remarks
    };

    // 更新store中的数据
    carStore.updateCar(updatedCar);
    console.log('车辆信息更新:', updatedCar);
    ElMessage.success('车辆信息更新成功');

    // 使用 replace 而不是 push，并添加时间戳强制刷新
    router.replace({ 
        name: 'baichuan',
        query: { refresh: Date.now() } // 添加时间戳参数强制刷新组件
    });
    // router.push({ name: 'baichuan' }).then(() => {
    //     // 然后强制刷新页面
    //     router.go(0);
    // });
};
</script>

<style scoped>
.edit-car-container {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
}

.save-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    margin-top: 20px;
}

.save-button:hover {
    background-color: #0056b3;
}

.image-preview {
    position: relative;
    width: 150px;
    height: 150px;
    margin-top: 10px;
}

.image-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    opacity: 0;
    transition: opacity 0.3s;
    cursor: pointer;
}

.image-preview:hover .image-overlay {
    opacity: 1;
}
</style>