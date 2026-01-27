import { defineStore } from "pinia";
import { ref,computed } from "vue";
export  const  test = [
    {value:'A',label:'A'},
    {value:'B',label:'B'},
    {value:'C',label:'C'},
    {value:'D',label:'D'},
    {value:'E',label:'E'},
    {value:'F',label:'F'},
    {value:'G',label:'G'},
    {value:'H',label:'H'},
    {value:'I',label:'I'},
    {value:'J',label:'J'},
    {value:'K',label:'K'},
    {value:'L',label:'L'},
    {value:'M',label:'M'},
    {value:'N',label:'N'},
    {value:'O',label:'O'},
    {value:'P',label:'P'},
    {value:'Q',label:'Q'},
    {value:'R',label:'R'},
    {value:'S',label:'S'},
    {value:'T',label:'T'},
    {value:'U',label:'U'},
    {value:'V',label:'V'},
    {value:'W',label:'W'},
    {value:'X',label:'X'},
    {value:'Y',label:'Y'},
    {value:'Z',label:'Z'},
]

// export const vehicleData = {
//     '奥迪': {
//         letter: 'A',
//         series: {
//             'A6':[
//                 { value: '2023款 40 TFSI 时尚动感型', label: '2023款 40 TFSI 时尚动感型' },
//                 { value: '2023款 45 TFSI 臻选动感型', label: '2023款 45 TFSI 臻选动感型' },
//                 { value: '2023款 50 TFSI quattro 至尊动感型', label: '2023款 50 TFSI quattro 至尊动感型' },
//             ],
//             'A8':[
//                 { value: '2023款 55 TFSI quattro 臻选动感型', label: '2023款 55 TFSI quattro 臻选动感型' },
//                 { value: '2023款 60 TFSI quattro 尊享动感型', label: '2023款 60 TFSI quattro 尊享动感型' },
//                 { value: '2023款 65 TFSI quattro 至尊动感型', label: '2023款 65 TFSI quattro 至尊动感型' },
//             ],
//             'A4':[
//                 { value: '2023款 40 TFSI 时尚动感型', label: '2023款 40 TFSI 时尚动感型' },
//                 { value: '2023款 45 TFSI 臻选动感型', label: '2023款 45 TFSI 臻选动感型' },
//                 { value: '2023款 50 TFSI quattro 至尊动感型', label: '2023款 50 TFSI quattro 至尊动感型' }, 
//             ],
//             'Q5':[
//                 { value: '2023款 45 TFSI 臻选动感型', label: '2023款 45 TFSI 臻选动感型' },
//                 { value: '2023款 50 TFSI quattro 尊享动感型', label: '2023款 50 TFSI quattro 尊享动感型' },
//                 { value: '2023款 55 TFSI quattro 至尊动感型', label: '2023款 55 TFSI quattro 至尊动感型' }, 
//             ]
//         }
//     }
//     ,
//     '宝马': {
//         letter: 'B',
//         series: {
//             'A4L':[
//                 { value: '2023款 40 TFSI 时尚动感型', label: '2023款 40 TFSI 时尚动感型' },
//                 { value: '2023款 45 TFSI 臻选动感型', label: '2023款 45 TFSI 臻选动感型' },
//                 { value: '2023款 50 TFSI quattro 至尊动感型', label: '2023款 50 TFSI quattro 至尊动感型' },
//             ],
//             'X5':[
//                 { value: '2023款 45 TFSI 臻选动感型', label: '2023款 45 TFSI 臻选动感型' },
//                 { value: '2023款 50 TFSI quattro 尊享动感型', label: '2023款 50 TFSI quattro 尊享动感型' },
//                 { value: '2023款 55 TFSI quattro 至尊动感型', label: '2023款 55 TFSI quattro 至尊动感型' }, 
//             ]
//         }
//     },
//     '奔驰': {
//         letter: 'B',
//         series: {
//             'C级':[
//                 { value: '2023款 C 200 L 时尚型', label: '2023款 C 200 L 时尚型' },
//                 { value: '2023款 C 260 L 豪华型', label: '2023款 C 260 L 豪华型' },
//                 { value: '2023款 C 300 L 运动型', label: '2023款 C 300 L 运动型' },
//             ],
//             'E级':[
//                 { value: '2023款 E 200 L 时尚型', label: '2023款 E 200 L 时尚型' },
//                 { value: '2023款 E 300 L 豪华型', label: '2023款 E 300 L 豪华型' },
//                 { value: '2023款 E 350 L 运动型', label: '2023款 E 350 L 运动型' }, 
//             ]
//         }
//     },
//     '凯迪拉克': {
//         letter: 'K',
//         series: {
//             'CT5':[
//                 { value: '2023款 2.0T 豪华型', label: '2023款 2.0T 豪华型' },
//                 { value: '2023款 2.0T 尊贵型', label: '2023款 2.0T 尊贵型' },
//                 { value: '2023款 2.0T 运动型', label: '2023款 2.0T 运动型' },   
//             ],
//             'XT5':[
//                 { value: '2023款 28T 豪华型', label: '2023款 28T 豪华型' },
//                 { value: '2023款 28T 尊贵型', label: '2023款 28T 尊贵型' },
//                 { value: '2023款 28T 运动型', label: '2023款 28T 运动型' }, 
//             ]
//         }
//     }
//     ,
//     '雷克萨斯': {
//         letter: 'L',
//         series: {
//             'ES':[
//                 { value: '2023款 2.5L 豪华版', label: '2023款 2.5L 豪华版' },
//                 { value: '2023款 2.5L 尊贵版', label: '2023款 2.5L 尊贵版' },
//                 { value: '2023款 2.5L 运动版', label: '2023款 2.5L 运动版' },   
//             ],
//             'RX':[
//                 { value: '2023款 300 豪华版', label: '2023款 300 豪华版' },
//                 { value: '2023款 300 尊贵版', label: '2023款 300 尊贵版' },
//                 { value: '2023款 300 运动版', label: '2023款 300 运动版' }, 
//             ]
//         }
//     }           
//     ,
//     '沃尔沃': {
//         letter: 'W',
//         series: {
//             'S60':[
//                 { value: '2023款 T4 智逸豪华版', label: '2023款 T4 智逸豪华版' },
//                 { value: '2023款 T5 智雅运动版', label: '2023款 T5 智雅运动版' },
//                 { value: '2023款 T5 智尊旗舰版', label: '2023款 T5 智尊旗舰版' },   
//             ],
//             'XC60':[
//                 { value: '2023款 T5 智逸豪华版', label: '2023款 T5 智逸豪华版' },
//                 { value: '2023款 T5 智雅运动版', label: '2023款 T5 智雅运动版' },
//                 { value: '2023款 T5 智尊旗舰版', label: '2023款 T5 智尊旗舰版' }, 
//             ]
//         }
//     }
//     ,
//     '捷豹': {
//         letter: 'J',
//         series: {
//             'F-TYPE':[
//                 { value: '2023款 450PS 豪华版', label: '2023款 450PS 豪华版' },
//                 { value: '2023款 575PS 尊贵版', label: '2023款 575PS 尊贵版' },
//                 { value: '2023款 600PS 旗舰版', label: '2023款 600PS 旗舰版' },   
//             ],
//             'XFL':[
//                 { value: '2023款 2.0T 豪华版', label: '2023款 2.0T 豪华版' },
//                 { value: '2023款 2.0T 尊贵版', label: '2023款 2.0T 尊贵版' },
//                 { value: '2023款 3.0T 旗舰版', label: '2023款 3.0T 旗舰版' }, 
//             ]
//         }
//     }   
//     ,
//     '林肯': {
//         letter: 'L',
//         series: {
//             '航海家':[
//                 { value: '2023款 2.0T 两驱尊雅版', label: '2023款 2.0T 两驱尊雅版' },
//                 { value: '2023款 2.0T 四驱尊耀版', label: '2023款 2.0T 四驱尊耀版' },
//                 { value: '2023款 2.7T 四驱总统版', label: '2023款 2.7T 四驱总统版' },   
//             ],
//             '冒险家':[
//                 { value: '2023款 2.0T 两驱尊享版', label: '2023款 2.0T 两驱尊享版' },
//                 { value: '2023款 2.0T 四驱尊雅版', label: '2023款 2.0T 四驱尊雅版' },
//                 { value: '2023款 2.7T 四驱总统版', label: '2023款 2.7T 四驱总统版' }, 
//             ]
//         }
//     }
//     ,
//     '保时捷': {
//         letter: 'B',
//         series: {
//             'Macan':[
//                 { value: '2023款 3.0T 两驱豪华版', label: '2023款 3.0T 两驱豪华版' },
//                 { value: '2023款 3.0T 四驱尊贵版', label: '2023款 3.0T 四驱尊贵版' },
//                 { value: '2023款 4.0T 四驱Turbo版', label: '2023款 4.0T 四驱Turbo版' },
//             ],      
//             'Cayenne':[
//                 { value: '2023款 3.0T 两驱豪华版', label: '2023款 3.0T 两驱豪华版' },
//                 { value: '2023款 3.0T 四驱尊贵版', label: '2023款 3.0T 四驱尊贵版' },
//                 { value: '2023款 4.0T 四驱Turbo版', label: '2023款 4.0T 四驱Turbo版' },
//             ]        
//         }
//     }   
//     ,
//     '路虎': {
//         letter: 'L',
//         series: {
//             '揽胜运动版':[
//                 { value: '2023款 5.0T 两驱V8 SVR特别版', label: '2023款 5.0T 两驱V8 SVR特别版' },
//                 { value: '2023款 5.0T 四驱V8 SVR特别版', label: '2023款 5.0T 四驱V8 SVR特别 版' },
//                 { value: '2023款 3.0T 四驱V6 HSE豪华版', label: '2023款 3.0T 四驱V6 HSE豪华版' },   
//             ],
//             '发现运动版':[
//                 { value: '2023款 2.0T 两驱S版', label: '2023款 2.0T 两驱S版' }, 
//                 { value: '2023款 2.0T 四驱SE版', label: '2023款 2.0T 四驱SE版' },
//                 { value: '2023款 3.0T 四驱HSE版', label: '2023款 3.0T 四驱HSE版' }, 
//             ]
//         }
//     }
//     ,
//     '雷克萨斯': {
//         letter: 'L',
//         series: {
//             'ES':[
//                 { value: '2023款 2.5L 两驱豪华版', label: '2023款 2.5L 两驱豪华版' },
//                 { value: '2023款 2.5L 四驱尊贵版', label: '2023款 2.5L 四驱尊贵版' },
//                 { value: '2023款 3.5L 四驱旗舰版', label: '2023款 3.5L 四驱旗舰版' },   
//             ],
//             'RX':[
//                 { value: '2023款 2.5L 两驱豪华版', label: '2023款 2.5L 两驱豪华版' },
//                 { value: '2023款 2.5L 四驱尊贵版', label: '2023款 2.5L 四驱尊贵版' },
//                 { value: '2023款 3.5L 四驱旗舰版', label: '2023款 3.5L 四驱旗舰版' }, 
//             ]
//         }
//     }
//     ,
//     '沃尔沃': {
//         letter: 'W',
//         series: {
//             'S60':[
//                 { value: '2023款 T4 两驱智逸豪华版', label: '2023款 T4 两驱智逸豪华版' },
//                 { value: '2023款 T5 四驱智远运动版', label: '2023款 T5 四驱智远运动版' },
//                 { value: '2023款 T5 四驱智尊旗舰版', label: '2023款 T5 四驱智尊旗舰版' },   
//             ],
//             'XC60':[
//                 { value: '2023款 T5 两驱智逸豪华版', label: '2023款 T5 两驱智逸豪华版' },
//                 { value: '2023款 T5 四驱智远运动版', label: '2023款 T5 四驱智远运动版' },
//                 { value: '2023款 T5 四驱智尊旗舰版', label: '2023款 T5 四驱智尊旗舰版' }, 
//             ]
//         }
//     }
//     ,
//     '捷豹': {
//         letter: 'J',
//         series: {
//             'F-PACE':[
//                 { value: '2023款 2.0T 两驱R-Dynamic版', label: '2023款 2.0T 两驱R-Dynamic版' },
//                 { value: '2023款 2.0T 四驱R-Dynamic版', label: '2023款 2.0T 四驱R-Dynamic版' },
//                 { value: '2023款 3.0T 四驱R-Dynamic S版', label: '2023款 3.0T 四驱R-Dynamic S版' },   
//             ],
//             'XFL':[
//                 { value: '2023款 2.0T 豪华版', label: '2023款 2.0T 豪华版' },
//                 { value: '2023款 2.0T 尊贵版', label: '2023款 2.0T 尊贵版' },
//                 { value: '2023款 3.0T 旗舰版', label: '2023款 3.0T 旗舰版' }, 
//             ]
//         }
//     }
//     ,
//     '林肯': {
//         letter: 'L',
//         series: {
//             '飞行家':[
//                 { value: '2023款 2.0T 两驱尊雅版', label: '2023款 2.0T 两驱尊雅版' },
//                 { value: '2023款 2.0T 四驱尊耀版', label: '2023款 2.0T 四驱尊耀版' },
//                 { value: '2023款 2.7T 四驱总统版', label: '2023款 2.7T 四驱总统版' },   
//             ],
//             '航海家':[
//                 { value: '2023款 2.0T 两驱尊享版', label: '2023款 2.0T 两驱尊享版' },
//                 { value: '2023款 2.0T 四驱尊雅版', label: '2023款 2.0T 四驱尊雅版' },
//                 { value: '2023款 2.7T 四驱总统版', label: '2023款 2.7T 四驱总统版' }, 
//             ]
//         }
//     },
//     '讴歌': {
//         letter: 'A',
//         series: {
//             'CDX':[
//                 { value: '2023款 2.0T 两驱豪华版', label: '2023款 2.0T 两驱豪华版' },
//                 { value: '2023款 2.0T 四驱尊贵版', label: '2023款 2.0T 四驱尊贵版' },
//                 { value: '2023款 2.0T 四驱旗舰版', label: '2023款 2.0T 四驱旗舰版' },   
//             ],
//             'RDX':[                { value: '2023款 2.0T 两驱豪华版', label: '2023款 2.0T 两驱豪华版' },    
//                 { value: '2023款 2.0T 四驱尊贵版', label: '2023款 2.0T 四驱尊贵版' },
//                 { value: '2023款 2.0T 四驱旗舰版', label: '2023款 2.0T 四驱旗舰版' }, 
//             ]
//         }
//     }
//     ,
//     '英菲尼迪': {
//         letter: 'Y',
//         series: {
//             'Q50L':[
//                 { value: '2023款 2.0T 两驱豪华版', label: '2023款 2.0T 两驱豪华版' },
//                 { value: '2023款 2.0T 四驱尊贵版', label: '2023款 2.0T 四驱尊贵版' },
//                 { value: '2023款 3.0T 四驱旗舰版', label: '2023款 3.0T 四驱旗舰版' },   
//             ],
//             'QX50':[
//                 { value: '2023款 2.0T 两驱豪华版', label: '2023款 2.0T 两驱豪华版' },
//                 { value: '2023款 2.0T 四驱尊贵版', label: '2023款 2.0T 四驱尊贵版' },
//                 { value: '2023款 3.0T 四驱旗舰版', label: '2023款 3.0T 四驱旗舰版' }, 
//             ]
//         }
//     },
//     '雷克萨斯': {
//         letter: 'L',
//         series: {
//             'ES':[
//                 { value: '2023款 2.5L 两驱豪华版', label: '2023款 2.5L 两驱豪华版' },
//                 { value: '2023款 2.5L 四驱尊贵版', label: '2023款 2.5L 四驱尊贵版' },
//                 { value: '2023款 3.5L 四驱旗舰版', label: '2023款 3.5L 四驱旗舰版' },   
//             ],
//             'RX':[
//                 { value: '2023款 2.5L 两驱豪华版', label: '2023款 2.5L 两驱豪华版' },
//                 { value: '2023款 2.5L 四驱尊贵版', label: '2023款 2.5L 四驱尊贵版' },
//                 { value: '2023款 3.5L 四驱旗舰版', label: '2023款 3.5L 四驱旗舰版' }, 
//             ]
//         }
//     }
// };
export const useVehicleStore = defineStore("vehicle", () => {
    const formData = ref({
        searchName: '', // 搜索名称
        selectedBrand: '', // 选择的品牌
        letter: 'A', // 首字母
        vehicleInfo: [], // 级联选择器值 // 车型信息
        images: [], // 上传图片
        remark: '',     // 备注
    });
    const history = ref([]); // 历史记录
    console.log('useVehicleStore', useVehicleStore);
    return {
        formData,
    };
});
// 字母选择器  65是A的ASCII码 65+i 就是A-Z的ASCII码 
// 生成A-Z的字母选项 检查是否有品牌以该字母开头有的话启用选项否则禁用选项
export const letterOptions = computed(() => {  // 生成字母选项
    // console.log('这是字母格式', letterOptions)
    return Array.from({ length: 26 }, (_, i) => {   // A-Z 26个字母
        const letter = String.fromCharCode(65 + i)   // 获取字母
        const hasBrand = Object.values(vehicleData).some(item => item.letter === letter)  // 检查是否有品牌以该字母开头
        return {// 返回选项对象
            value: letter,  //
            label: letter,
            disabled: !hasBrand
        }
    })

});

