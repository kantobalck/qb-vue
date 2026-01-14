<template>
    <button
        class="custom-btn"
        :style = "btnStyle"
        @click="handleClick"
        >
        {{text || '点击'}}
    </button>
    
</template>
<script setup>
import {defineEmits,defineProps,computed } from 'vue';
const aaa= defineEmits(["click"]);
const props = defineProps({
    size: {
        type: String,
        default: 'large' ,// small, medium, large,tiny
        validator: (value) => ['small', 'medium', 'large','tiny'].includes(value),
    },
    color: {
        type: String,
        default: 'blue',    // blue, red, green,
        validator: (value) => ['blue', 'red', 'green'].includes(value),
    },
    theme: {
        type: String,
        default: 'default', // default, dark,
        validator: (value) => ['default', 'dark'].includes(value),  
    },
    text: {
        type: String,
        default: '按钮',// 按钮, 提交, 取消
    },
    plain: {
        type: Boolean,
        default: false,      // true, false
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});
const btnStyle = computed(() =>{
    const res = {
        border: '1px solid #999',
        color: '#11141A',//11141A    
        fontWeight: '500',
        borderRadius: '25px',
        fontSize: '14px',
        background: 'transparent',
    };
    // 处理大小  
    switch (props.size) {
        case 'large':
            console.log('large');
            res.width = '165px';
            res.height = '38px';
            res.fontSize = '14px';
        break;
        case 'medium':
            console.log('medium');
            res.width = '120px';
            res.height = '28px';
            res.fontSize = '12px';
            break;
        case 'small':
        console.log('small');
            res.width = '100px';
            res.height = '26px';
            res.fontSize = '12px';
            break;
        case 'tiny':
        console.log('tiny');
            res.width = '70px';
            res.height = '24px';
            res.fontSize = '12px';
            break;
        default:
            console.log('default', props, res);
            res.width = '120px';
            res.height = '28px';
            res.fontSize = '14px';
            res.color = props?.plain ? '#11141a' : '#FFFFFF';
            break;
    }

    // 处理颜色和日夜间
    switch (props.color) {
        case 'blue':
            if (props.plain) {
                res.background = 'transparent';
                res.border = props.theme === 'dark' ? '1px solid #B0CCFF' : '1px solid #B0CCFF';
                res.color = props.theme === 'dark' ? '#3973E6' : '#3377FF';
            } else {
                res.border = 'none';
                res.background = props.theme === 'dark' ? 'linear-gradient(to right, rgba(46, 138, 230, 0.8), rgba(18, 104, 179, 0.7))' : 'linear-gradient(to right, rgba(51, 199, 255, 0.8), rgba(78, 169, 255, 0.7))';
                res.color = '#FFFFFF';
            };
            break;
        case 'red':
            if (props.plain) {
                res.background = 'transparent';
                res.border = props.theme === 'dark' ? '1px solid #EB4A3B' : '1px solid #FF9C98';
                res.color = props.theme === 'dark' ? '#FF5040' : '#EB4A3B';
            }else{
                res.border = 'none';
                res.color = '#FFFFFF';
                res.background = props.theme === 'dark' ? 'linear-gradient(to bottom, rgba(244, 150, 136, 1), rgba(230, 93, 80, 1))' : 'linear-gradient(135deg, rgba(255, 115, 102, 1), rgba(255, 92, 77, 1))';
            };
            break;
        case 'green':
            if (props.plain) {
                res.background = 'transparent';
                res.border = props.theme === 'dark' ? '1px solid #149976' : '1px solid #0EB387';
                res.color = props.theme === 'dark' ? '#149976' : '#0EB387';
            } else {
                res.color = '#ffffff';
                res.border = 'none';
                res.background = props.theme === 'dark' ? 'linear-gradient(135deg, rgba(20, 153, 120, 1), rgba(56, 140, 120, 1))' : 'linear-gradient(45deg, rgba(18, 181, 140, 0.8)50%, rgba(87, 217, 184, 0.7)100%)';
            }
            break;
        default:
            if(props.plain)
            {
                res.background = 'transparent';
                res.border = props.theme === 'dark' ? '1px solid #999' : '1px solid #999999';
                res.color = props.theme === 'dark' ? '#FFFFFF' : '#11141A';
            }
        
    }
    if (props.disabled) {
        res.cursor = 'not-allowed';
        res.opacity = 0.6;
    }
    return res;
});
const handleClick = (event) => {
    if (props.disabled) { // 如果按钮被禁用，则不执行点击事件
        return;
    }
    console.log("按钮被点击了", props);
    // 触发点击事件
    aaa("click", {
        ...props
    }); // 触发自定义事件
};
</script>
<style  scoped>
    .custom-btn {
        border-radius: 25px;
        /* font-weight: 500;
        display: inline-flex;
        // justify-content: center;
        // align-items: center; */
    }
        .custom-btn:hover {
            cursor: not-allowed;
            opacity: 0.6;
        }
    
        .custom-btn:active {
            cursor: not-allowed;
            opacity: 1;
        }
</style>