<template>
    <div class="edit-car-container">
        <FromInfo 
            ref="ruleFormRef"
            :pageType="pageType"
            :vehicleData="vehicleData"
            :letterOptions="letterOptions"
            :formData="form"
            :originData="originData"
            @handle-submit="handleSubmit"
        />
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCarStore } from '../store/store';
import { Plus, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import {
    letterOptions,
    vehicleData,
    getVehicleInfoByPath,
} from '../utils/vehicleData.js';


const showUpload = ref(true);
const pageType = ref('edit');
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
    remarks: '',
    selectedLetter: '',
});
const originData = ref(null);

const route = useRoute();
const router = useRouter();
const carStore = useCarStore();

const handleSubmit = vehicleDataToSave => {
    console.log('表单校验成功了-更新数据-push数据', vehicleDataToSave);
    // 添加store
    carStore.addCarList(vehicleDataToSave);
    console.log('提交的车辆数据：', vehicleDataToSave);
    
    // 触发自定义事件
    form.value.submitted = true;

    router.push({ name: 'baichuan' }).then(() => {
        // 然后强制刷新页面
        router.go(0);
    });
    }

watch(()=> form.value.submitted, (newVal) => {
    if (newVal){
        ElMessage({
            message: '修改成功',
            type: 'success',
        });
        form.value.submitted = false; // 重置提交状态，以便可以再次触发事件
    
    }
});


// 初始化表单数据
onMounted(() => {
    if (route.params.carId) {
        const carId = route.params.carId;
        const car = carStore.carList.find(item => item.carId == carId);
        if (car) {
            form.value = {
                carId: car.carId,
                selectedLetter: car.firstLetter,
                brand: car.brand,
                sevies: car.sevies,
                vehicleInput: car.vehicle,
                carName: car.carName,
                price: car.price,
                images: car.imgUrl,
                remarks: car.remarks || '',
                selectedCar: [car.brand, car.sevies, car.vehicle]
            };
            originData.value = { ...form.value }; // 保存原始数据用于重置
            if (car.imgUrl) {
                showUpload.value = false;
            }
            console.log('当条数据', form.value)
        }
    }
});

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