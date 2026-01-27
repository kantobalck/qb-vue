<template>
    <div class="vechicle-form">
        <el-form ref="ruleFormRef" :v-model="form" label-width="200px" label-position="left" class="vechicle-form" status-icon>
            <!-- 车辆品牌选择 -->
            <el-form-item label="车辆输入：" required>
                <el-input v-model="form.vehicleInput" style="width: 350px;" placeholder="请输入车辆信息">
                </el-input>
            </el-form-item>
            <!-- 首字母选择器 -->
            <el-form-item label="首字母选择：" required>
                <div class="letter-selector">
                    <el-select v-model="form.selectedLetter" placeholder="请选择首字母" style="width: 350px;">
                        <el-option
                            v-for="item in test"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>
            <!-- 三级联选择器 -->
            <el-form-item label="车型选择" required>
                <div class="cascader-container">
                    <el-cascader 
                        v-model="form.selectedCar"
                        :options="form.selectedCar"
                        placeholder="请选择车牌-车系-车型"
                        :props="props"
                        style="width: 350px;"
                        @change="handleCarChange"
                    />
                </div>
            </el-form-item>
            <!-- 图片上传    -->
            <el-form-item label="图片上传"  required>
                <el-upload 
                    class="avatar-uploader" 
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false" 
                    list-type="picture-card"
                    accept=".jpg,.jpeg,.png,.gif,.webp"
                    :on-success="handleAvatarSuccess" 
                    :before-upload="beforeAvatarUpload"
                    v-if ="showUpload"
                    v-model="form.images"
                    >

                    <el-icon class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                    <div class="upload-text">
                        点击上传
                    </div>
                </el-upload>
                <div @click="reseUplond">
                    <img v-if="form.images" :src="form.images" class="avatar" />
                </div>
                
            </el-form-item>

            <!-- 备注信息 -->
            <el-form-item label="备注信息（选填）">
                <el-input type="textarea" :rows="4" v-model="form.remarks" placeholder="请输入备注信息" clearable>

                </el-input>
            </el-form-item>
            <!-- 提交按钮 -->
             <el-form-item class="form-actions" >
                <el-button 
                    type="primary" 
                    class="submit-button"
                    @click="submitFrom(ruleFormRef)"
                    >
                    确认添加
                </el-button>
                <el-button
                    class="reset-button"
                    @click="resetForm"    
                >
                    重置表单
                </el-button>
            </el-form-item>
            <!-- <el-form-item class="form-actions">
                <el-button type="primary" @click="handleSubmit" :loading="submitting" :disabled="!isFormValid"
                    size="large" class="submit-button">
                    <el-icon>
                        <Check />
                    </el-icon>
                    确认提交
                </el-button>
                <el-button @click="handleReset" :disabled="submitting" size="large" class="reset-button">
                    <el-icon>
                        <Refresh />
                    </el-icon>
                    重置表单
                </el-button>
            </el-form-item> -->


        </el-form>
    </div>
</template>
<script setup>

import { ref,reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import { Search, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { test, letterOptions } from '../utils/vehicleData.js';
const showUpload = ref(true);
const ruleFormRef = ref();

const props = {
    expandTrigger: 'hover' // 悬停展开子菜单
};
// 图片上传相关
const imageUrl = ref('');
const   handleAvatarSuccess = (response, uploadfile) => {
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

const form = reactive({
    vehicleInput: '',
    selectedLetter: '',
    selectedCar: [{
        value: 'guide',
        label: 'Guide',
        children: [
            {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                    {
                        value: 'consistency',
                        label: 'Consistency',
                    },
                    
                ],
            },
        ],
    }],
    images: '',
    remarks: '',
})

//确认提交
const submitFrom = async (formEl) => {
    if (!formEl) return;
    try {
        await formEl.validate();
        console.log('提交的表单数据：', form);
        ElMessage.success('表单提交成功！');
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
    form.images = '';
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