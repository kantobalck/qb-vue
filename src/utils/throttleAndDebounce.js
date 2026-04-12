/**
 * utils.js
 * 通用工具函数集合
 */

/**
 * 防抖函数
 * 原理：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
 * 适用场景：输入搜索、按钮提交、窗口resize等需要避免频繁操作的场景
 * 
 * @param {Function} fn 要执行的函数
 * @param {number} delay 延迟时间（毫秒），默认300ms
 * @param {Object} options 配置选项
 * @param {boolean} options.immediate 是否立即执行一次，默认false
 * @returns {Function} 返回防抖处理后的函数，附带cancel方法用于取消防抖
 */
export const debounce = (fn, delay = 300, options = {}) => {
    const { immediate = false } = options;
    
    let timer = null;
    let isInvoked = false; // 记录是否已经立即执行过
    
    // 创建防抖函数
    const debounced = function(...args) {
        const context = this;
        
        // 如果存在定时器，清除它
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        
        // 如果需要立即执行
        if (immediate && !isInvoked) {
            fn.apply(context, args);
            isInvoked = true;
            // 设置定时器，在延迟时间后重置isInvoked
            timer = setTimeout(() => {
                isInvoked = false;
                timer = null;
            }, delay);
        } else {
            // 非立即执行模式
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
                isInvoked = false; // 重置立即执行标志
            }, delay);
        }
    };
    
    // 添加取消防抖的方法
    debounced.cancel = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
            isInvoked = false;
        }
    };
    
    // 添加立即执行的方法
    debounced.flush = (...args) => {
        debounced.cancel();
        fn.apply(this, args);
    };
    
    return debounced;
};

/**
 * 节流函数
 * 原理：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效
 * 适用场景：滚动加载、鼠标移动、按钮点击等需要限制执行频率的场景
 * 
 * @param {Function} fn 要执行的函数
 * @param {number} delay 间隔时间（毫秒），默认300ms
 * @param {Object} options 配置选项
 * @param {boolean} options.leading 是否在开始时立即执行，默认true
 * @param {boolean} options.trailing 是否在结束后执行一次，默认true
 * @returns {Function} 返回节流处理后的函数，附带cancel方法用于取消节流
 */
export const throttle = (fn, delay = 300, options = {}) => {
    const { leading = true, trailing = true } = options;
    
    let timer = null;
    let lastExecTime = 0; // 上次执行时间
    let pendingArgs = null; // 待执行的参数
    
    // 执行函数
    const execute = (context, args) => {
        lastExecTime = Date.now();
        fn.apply(context, args);
        pendingArgs = null;
    };
    
    // 创建节流函数
    const throttled = function(...args) {
        const context = this;
        const now = Date.now();
        
        // 计算距离下次执行还需要等待的时间
        const remaining = lastExecTime ? Math.max(0, delay - (now - lastExecTime)) : 0;
        
        // 如果是第一次执行且leading为false，只记录时间不执行
        if (!lastExecTime && leading === false) {
            lastExecTime = now;
        }
        
        // 如果等待时间<=0，说明可以执行了
        if (remaining <= 0 || remaining > delay) {
            // 如果存在定时器，清除它
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            execute(context, args);
        } 
        // 如果不能立即执行且trailing为true，设置定时器在剩余时间后执行
        else if (!timer && trailing !== false) {
            pendingArgs = args;
            timer = setTimeout(() => {
                timer = null;
                lastExecTime = leading === false ? 0 : Date.now();
                if (pendingArgs) {
                    execute(context, pendingArgs);
                }
            }, remaining);
        }
    };
    
    // 添加取消节流的方法
    throttled.cancel = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        lastExecTime = 0;
        pendingArgs = null;
    };
    
    // 添加立即执行的方法
    throttled.flush = (...args) => {
        throttled.cancel();
        fn.apply(this, args);
        lastExecTime = Date.now();
    };
    
    return throttled;
};

/**
 * 异步防抖函数
 * 专门用于处理异步操作的防抖
 * 
 * @param {Function} asyncFn 异步函数
 * @param {number} delay 延迟时间
 * @param {Object} options 配置选项
 * @returns {Function} 返回防抖处理后的异步函数
 */
export const debounceAsync = (asyncFn, delay = 300, options = {}) => {
    const debounced = debounce(async (resolve, reject, ...args) => {
        try {
            const result = await asyncFn.apply(this, args);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }, delay, options);
    
    return function(...args) {
        return new Promise((resolve, reject) => {
            debounced.call(this, resolve, reject, ...args);
        });
    };
};

/**
 * 异步节流函数
 * 专门用于处理异步操作的节流
 * 
 * @param {Function} asyncFn 异步函数
 * @param {number} delay 延迟时间
 * @param {Object} options 配置选项
 * @returns {Function} 返回节流处理后的异步函数
 */
export const throttleAsync = (asyncFn, delay = 300, options = {}) => {
    let lastPromise = null;
    let lastResult = null;
    
    const throttled = throttle(async () => {
        lastPromise = asyncFn();
        lastResult = await lastPromise;
        return lastResult;
    }, delay, options);
    
    return function(...args) {
        return throttled.call(this, ...args);
    };
};

/**
 * 使用示例：
 * 
 * // 基本用法
 * const debouncedFn = debounce(() => {
 *   console.log('执行防抖函数');
 * }, 500);
 * 
 * // 立即执行模式
 * const debouncedImmediate = debounce(() => {
 *   console.log('立即执行');
 * }, 500, { immediate: true });
 * 
 * // 节流：开始时执行
 * const throttledLeading = throttle(() => {
 *   console.log('节流执行');
 * }, 1000, { leading: true, trailing: false });
 * 
 * // 节流：结束时执行
 * const throttledTrailing = throttle(() => {
 *   console.log('节流执行');
 * }, 1000, { leading: false, trailing: true });
 * 
 * // 取消防抖/节流
 * const debounced = debounce(() => {}, 500);
 * debounced.cancel(); // 取消防抖
 * 
 * // 异步防抖
 * const asyncDebounced = debounceAsync(async () => {
 *   const res = await fetch('api/data');
 *   return res.json();
 * }, 500);
 * 
 * const result = await asyncDebounced(); // 返回Promise
 * 
 * 
// 创建防抖版本的confirm（防抖：多次点击只执行最后一次）
const debounceConfirm = debounce(confirm, 500, { immediate: false });

// 创建节流版本的cancel（节流：固定时间间隔内只执行一次）
const throttleCancel = throttle(cancel, 500, { 
    leading: true,  // 第一次点击立即执行
    trailing: false // 结束后不再执行
});

// 组件卸载时清理
onBeforeUnmount(() => {
    debounceConfirm.cancel?.();
    throttleCancel.cancel?.();
});

 */