<template>
    <div class="car-box">
        <div class="car-active">
            <div class="car-left">
                <!-- 字母选择器 -->
                <Letter
                    :zimuList="zimuList"
                    @chooseLetter="chooseLetter"
                />
                <!-- 搜索框 -->
                <SearchBox
                    @handle-search="handleSearch"
                />
                <span>长度: {{carList.length}}</span>
            </div>
            <div class="car-right">
                <dic class="content">
                    <div
                        v-if="pageData && pageData.length > 0"
                        class="car-box-box"
                    >
                        <div class="car-list" :data ="pageData" v-for="(item, index) in pageData" :key="index">
                            <div>
                                <Cards 
                                    :item="item"
                                    @handle-edit="handleEdit"
                                />
                            </div>
                        </div>
                    </div>
                    <NoData
                        v-else
                        class="no-car-box"
                    />
                
                    <!-- 分页 -->
                    <div class="pagination-container">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="currentPage" :page-size="pageSize" layout="total prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </dic>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeMount, watch} from 'vue'
import { useRoute } from 'vue-router'
import { zimuList } from '../utils/car.js';
import {useCarStore} from '../store/store.js';
import router from '../router/index.js';

import SearchBox from './InfoComponents/SearchBox/index.vue';
import Letter from './InfoComponents/Letter/index.vue';
import Cards from './InfoComponents/Cards/index.vue';
import NoData from './InfoComponents/NoData/index.vue';

const carStore = useCarStore();
// 监听搜索文本的变化，实时更新车辆列表
const route = useRoute();

const carList = computed(() => carStore.$state.carList || []);
// 分页数据 自然的分页，实际上筛选后应该用的是筛选后的数据，这里用的是原始数据
const pageData = computed(() => {   // 计算当前页的数据
    const start = (currentPage.value - 1) * pageSize;  // 计算当前页的起始索引
    const end = start + pageSize;       // 计算当前页的结束索引
    return filteredCarList.value.slice(start, end);  // 返回当前页的数据
});

const pageSize = 10;       // 每页显示条数
const filteredCarList = ref([...carList.value]); // 过滤后的车辆列表
const letterName = ref(''); // 当前选中的字母名称
const activeLetterIndex = ref(-1); // 当前选中的字母索引
const currentPage = ref(1); // 当前页码
const total = ref(carList.value.length); // 总数据量

// 初始化获取字母列表每项的count数量
carList.value.forEach(car => {
    const firstLetter = car.firstLetter.toUpperCase();
    const letterName = zimuList.find(item => item.firstLetter === firstLetter);
    if (letterName) {
        letterName.count += 1;
    }
});

watch(carList, (newList) => {
    // 每当carList变化时，重新计算字母列表的count数量
    console.log('carList变化了', newList);
}, { deep: true });

const handleEdit = item  => {
    router.push({
        name: 'changecar',
        params: {
            carId: item.carId
        }
    })
}

// 搜索方法：子组件传事件，父组件处理
const handleSearch = text => {
    // 搜索文本为空时，显示所有数据
    if (text.trim() === '') {
        filteredCarList.value = [...carList.value]; // 清空搜索时显示所有数据
    }
    else {
        const query = text.toLowerCase();// 转换为小写以便进行不区分大小写的匹配
        // 根据搜索文本过滤车辆列表
        filteredCarList.value = carList.value.filter(item =>
            item.brand.toLowerCase().includes(query) ||
            item.sevies.toLowerCase().includes(query) ||
            item.vehicle.toLowerCase().includes(query)
        );
    }

    total.value = filteredCarList.value.length;
    currentPage.value = 1; // 重置页码
};
// 选择字母的回调
// 处理字母选择事件
const chooseLetter = data => {
    const { item, index } = data;
    // 若字母数量为0，则直接返回
    if (item.count <= 0) {
        return;
    }
    // 设置当前选中的字母名称
    letterName.value = item.firstLetter;
    // 设置当前激活的字母索引
    activeLetterIndex.value = index;
    // 根据选中的字母过滤车辆列表
    handleFilter();
};

const handleFilter = () =>{
    if(!letterName.value){
        filteredCarList.value = [...carList.value];// 如果没有选中字母，则显示所有车辆列表
    }else{
        filteredCarList.value = carList.value.filter(item => item.firstLetter === letterName.value);// 过滤车辆列表
    }
    total.value = filteredCarList.value.length;
    console.log('筛选结果2:', total);

    currentPage.value = 1;
    console.log('筛选结果:', letterName.value, filteredCarList.value);
};

// 页码变化时的回调
const handleCurrentChange = (page) => {
    currentPage.value = page;
};

onBeforeMount(() => {
    document.title = route.meta?.title || '车辆列表页面'
});
onMounted(() => {
    total.value = carList.value.length;
    // 监听路由查询参数变化，当有 refresh 参数时重新加载数据
    if (route.query.refresh) {
        filteredCarList.value = [...carList.value];
        total.value = filteredCarList.value.length;
        currentPage.value = 1;
    }
});
// 远程分页（结合接口）‌：
// const fetchData = async (page) => {
//     const res = await axios.get(`/api/data?page=${page}&size=${pageSize.value}`);
//     tableData.value = res.data.list;
//     total.value = res.data.total;
// };
</script>
<style lang="scss" scoped>
.car-box {
    height: 100%;
    width: 100%;
    overflow: hidden;

    .car-active {
        flex: 1;
        height: 100%;
        display: flex;
        // background-color: red;
        overflow: hidden;

        .car-left {
            width: 130px;
            display: flex;
            flex-direction: column;
            margin-right: 10px;
            padding: 0 10px;
            // background-color: aqua;// 左边框颜色


            .car-letter {
                width: 132px;
                margin: 0 auto;
                border: 1px solid #999;

                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-items: center;
                box-sizing: border-box;

                .letter-index {
                    width: 20px;
                    height: 20px;
                    line-height: 22px;
                    text-align: center;
                    font-family: 微软雅黑;
                    font-weight: 900;
                    display: inline-block;
                    background-color: #e6e7e9;
                    border: 1px solid #f3f3f3;
                    cursor: pointer;

                    &:hover {
                        background-color: #757e85;
                        color: #fff;
                    }
                }
                .disabled{
                    background-color: #999;
                    
                }
            }

            .search-box {
                position: relative;
                align-items: center; // 垂直居中
                text-align: center;
                margin-top: 50px;

                .el-input {
                    width: 100%;
                    font-size: 12px;
                    color: blue;
                }

                .el-button {
                    margin-top: 10px;
                    position: absolute;
                    right: 0;
                    top: 30px;
                }
            }
        }

        .car-right {
            flex: 1;
            // height: calc(100vh - 60px); // 减去顶部导航栏的高度
            overflow: hidden;
            display: flex;
            flex-direction: column;

            .content {
                flex: 1;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                overflow-y: hidden;

                .car-box-box {
                    // flex: 1;
                    width: 100%;
                    overflow-y: scroll;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    box-sizing: border-box;
                    /* overflow-x: hidden; */
                    padding-right: 1%;
                    box-sizing: border-box;

                    .car-list {
                        width: 24%;
                        height: 160px;
                        background-color: #efeeeb;
                        border-radius: 6px;
                        box-sizing: border-box;
                        // border: 1px solid #099cf1;   
                        /* margin-top: 20px; */
                        margin-bottom: 24px;
                        margin-right: 1%;
                        overflow: hidden;

                        .filter-model {
                            width: 100px;
                            height: 100px;
                            background-size: 100% 100%;
                            margin: 0 auto;
                        }

                        .box-name {
                            display: block;
                            text-align: left;
                            width: 100%;
                            height: 14px;
                            line-height: 14px;
                            font-size: 12px;
                            color: #434343;
                            font-weight: 300;
                            background-color: #EEEDEA;
                            /* padding-left: 10px; */
                            box-sizing: border-box;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }
                .pagination-container {
                    height: 80px;
                    display: flex;
                    justify-content: right;

                                    .el-pagination {
                                            font-size: 12px !important;
                                            padding: 4px 0 !important;
                                    
                                            .btn-prev,
                                            .btn-next,
                                            .el-pager li {
                                                margin: 0 2px !important;
                                                min-width: 24px !important;
                                                height: 24px !important;
                                                line-height: 24px !important;
                                            }
                                    
                                            .el-pagination__jump {
                                                margin-left: 6px !important;
                                    
                                                .el-input__inner {
                                                    height: 24px !important;
                                                    width: 40px !important;
                                                }
                                            }
                                        }
                                }
            }
            
        }
    }
}
</style>