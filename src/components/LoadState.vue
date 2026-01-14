<template>
    <div :class="['load-state', `${type}`, `${theme}`]">
        <!-- 根容器，动态绑定类名：面板类型和主题 -->
        <div class="top-box">
            <!-- <img :src="icon"> -->
            <!-- :style="{'background-image': `url(${icon})` }" -->
            <div
                :class="['icon', `${state}`]"
                
            ></div>
            <!-- 加载失败文案 -->
            <div class="text">
                {{ stateText }}
            </div>
        </div>

        <!-- 重试按钮 -->
        <div v-if="state !== 'noData'" class="retry-button" @click="handleRetry">点击重试</div>
    </div>

</template>
<script setup>
import { defineProps, defineEmits, computed } from 'vue';
// 定义 emits
const emit = defineEmits(['retry']);
// 定义 props
const props = defineProps({
    // 加载状态类型：loadFail、netFail、noData
    state: {
        type: String,
        default: 'loadFail',
        validator: (value) => ['loadFail', 'netFail', 'noData'].includes(value),

    },
    // 面板类型：full、panel
    type: {
        type: String,
        default: 'panel',//
        validator: (value) => ['full', 'panel'].includes(value),
    },
    // 主题：default、dark
    theme: {
        type: String,
        default: 'default',
        validator: (value) => ['default', 'dark'].includes(value),
    },
    icon: {
        type: String,
        default: 'https://now.bdstatic.com/store/v2/f14cbf5/frontend/2aa16ea//_next/static/media/BaiduComateLogo-D.c25de611.png',
    }
});


// 处理重试按钮点击事件
const handleRetry = () => {
    emit('retry', {
        state: props.state
    });
};
// 根据状态返回对应的文案
const stateText = computed(() => {
    console.log('当前', props.state);
    switch (props.state) {
        case 'loadFail':
            return '加载失败';
        case 'netFail':
            return '网络连接失败';
        default:
            return '暂无结果';
    }
});

const currentIcon = computed(() => {
    switch (props.state) {
        case 'loadFail':
            return require('../../../public/load-fail.png');
        case 'netFail':
            return require('../../../public/net-fail.png');
        default:
            return require('../../../public/no-data.png');
    }
});
</script>
<style lang="less" scoped>
.load-state {
    // 全页面、无数据状态下，日间模式下的样式   
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 208px;
    background-color: #ffffff;

    .top-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .text {
            font-size: 28px;
            color: #5C6373;
            margin-top: 28px;
            line-height: 28px;
        }
        .icon {
            width: 410px;
            height: 280px;
            background-image: url(../../src/static/images/load-fail.png);
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        
            &.loadFail {
                background-image: url(../../src/static/images/load-fail.png);
            }
        
            &.netFail {
                background-image: url(../../src/static/images/net-fail.png);
            }
        
            &.noData {
                background-image: url(../../src/static/images/no-data.png);
            }
        }
    }
    .retry-button {
        width: 188px;
        height: 72px;
        border: 1px solid #D0D3D9;
        border-radius: 36px;
        font-size: 28px;
        line-height: 72px;
        color: #242933;
        text-align: center;
        margin-bottom: 220px;
    }

    &.panel {
        padding-top: 88px;
        justify-content: flex-start;

        .top-box {
            .text {
                margin-top: 24px;
            }
        }
        .retry-button{
            margin-top: 32px;
        }
    }

    &.dark {
        background-color: #333;

        .top-box {
            .text {
                color: #8D9199;
            }
        }

        .retry-button {
            border: 1px solid #555659;
            color: #D3D9E6;
            font-size: 26px;
            margin-bottom: 220px;
        }

    }


}
</style>