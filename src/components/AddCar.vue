<template>
    <div class="vechicle-form">
        <el-form
            ref="formRef"
            label-width="200px"
            label-position="right"
            class ="vechicle-form"
            status-icon
            >
            <!-- 车辆品牌选择 -->
            <el-form-item label="品牌搜索" v-model="formData"  class="search-box">
                <el-input
                    placeholder="请输入车辆品牌名称进行搜索"
                    clearable
                    @input="handleSearchInput"
                    @clear="handleSearchClear"
                    class="search-input"
                    >
                    <template #prefix>
                        <el-icon><Search /></el-icon>
                    </template>
                </el-input>
            </el-form-item>

            <!-- 首字母选择器 -->
             <!-- <el-form-item label="首字母"  >
                <div class="letter-selector">
                    <el-select v-model="formDate.letter"
                        placeholder="请选择首字母"
                        filterable
                        style="width: 150px ; margin-right: 10px;"
                        @change="handleLetterChange"
                        :disable = "!!formDate.searchBrand"
                    >
                        <el-option
                            v-for="item in letterOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled"
                        />

                    </el-select>
                </div>
            </el-form-item> -->

        </el-form>
    </div>
</template>
<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';  
import { Search } from '@element-plus/icons-vue';
// import { ElMessage, ElMessageBox } from 'element-plus';
import { useVehicleStore , vehicleData } from '../utils/vehicleData.js';

const formRef = ref(null);
const store = useVehicleStore();
// const cardata= vehicleData();
// if(vehicleDatas) {
//     console.log('有vehicleDatas', vehicleDatas);
// }
// // 监听store中的数据变化
if(store) {
    console.log('store有数据', store);
}
// // 默认设置首字母为A
if(!store.formData.letter) {
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