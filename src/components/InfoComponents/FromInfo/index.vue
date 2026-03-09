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

            <Btns
                :pageType="props.pageType"
            />
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
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue';
import {  Plus, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

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
const form = computed(() => props.formData);
const filteredVehicleData = computed(() => {
    if(!form.value.selectedLetter) {
        return props.vehicleData;  // 未选择首字母时返回全部数据
    }
    const res = props.vehicleData.filter(item => item.letter === form.value.selectedLetter)   // 筛选符合首字母的数据
    return res;
});

watch(() => form, (newVal) => {
    console.log('表单数据变化了', newVal.value, form.value.selectedLetter);
}, { deep: true });

</script>
<style scoped src="./index.scss"></style>