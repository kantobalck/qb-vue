<template>
    <div class="vechicle-form">
        <el-form ref="formRef" label-width="200px" label-position="left" class="vechicle-form" status-icon>
            <!-- 车辆品牌选择 -->
            <el-form-item label="品牌搜索" v-model="formData" class="search-box" required>
                <el-input placeholder="请输入车辆品牌名称进行搜索" clearable @input="handleSearchInput" @clear="handleSearchClear"
                    class="search-input">
                    <template #prefix>
                        <el-icon>
                            <Search />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>

            <!-- 首字母选择器 -->
            <el-form-item label="首字母" required>
                <div class="letter-selector">
                    <el-select placeholder="请选择首字母" filterable style="width: 150px ; margin-right: 10px;"
                        @change="handleLetterChange">
                        <el-option v-for="item in letterOptions" :key="item.value" :label="item.label"
                            :value="item.value" :disabled="item.disabled" />

                    </el-select>
                </div>
            </el-form-item>
            <!-- 三级联选择器 -->
            <el-form-item label="车型选择" required>
                <div class="cascader-container">
                    <el-cascader :options="cascaderOptions" v-model="store.formData.selectedCar"
                        placeholder="请选择车辆品牌/车系/车型" :props="{
                            expandTrigger: 'hover',
                            value: 'value',
                            label: 'label',
                            children: 'children',
                        }" filterable clearable style="width: 400px;" @change="handleCascaderChange" />
                </div>
                <!-- 选择展示结果 -->
                <!-- <div v-if="formData.vehicleInfo.length > 0"  class="selection-display">
                     <el-step
                        v-for="(item,index) in ['品牌','车系','车型']"
                        :key="index"
                        :title="item"
                        >

                    </el-step> 
                 </div> -->
            </el-form-item>
            <!-- 图片上传    -->
            <el-form-item label="图片上传" popes="images" required>
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                    accept=".jpg,.jpeg,.png,.gif,.webp" multiple :limit="1">
                    <i class="el-icon-plus"></i>
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <div class="upload-text">
                        点击上传
                    </div>
                </el-upload>
            </el-form-item>

            <!-- 备注信息 -->
            <el-form-item label="备注信息（选填）">
                <el-input type="textarea" :rows="4" placeholder="请输入备注信息">

                </el-input>
            </el-form-item>
            <!-- 提交按钮 -->
            <el-form-item class="form-actions">
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
            </el-form-item>


        </el-form>
    </div>
</template>
<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { Search, Plus } from '@element-plus/icons-vue';
// import { ElMessage, ElMessageBox } from 'element-plus';
import { useVehicleStore, vehicleData } from '../utils/vehicleData.js';

const formRef = ref(null);
const store = useVehicleStore();
// const cardata= vehicleData();
// if(vehicleDatas) {
//     console.log('有vehicleDatas', vehicleDatas);
// }
// // 监听store中的数据变化
if (store) {
    console.log('store有数据', store);
}
// // 默认设置首字母为A
if (!store.formData.letter) {
    store.formData.letter = 'A';
}
</script>
<style lang="scss" scoped>
.vechicle-form {
    padding: 20px;

    .search-box {

        // width: 350px;
        .search-input {
            width: 250px;
        }
    }
}
</style>