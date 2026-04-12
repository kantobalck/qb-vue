<template>
    <div class="ai-typing-container">
        <h2>🤖 AI 打字机效果演示</h2>

        <!-- 当前打印内容区域 -->
        <div class="typing-content" ref="contentRef">
            <!-- 已打印的文本 -->
            <span class="printed-text">{{ displayedText }}</span>
            <!-- 光标：仅在播放中且未完成时显示 -->
            <span v-if="isPlaying && !isComplete" class="cursor" :class="{ 'cursor-blink': showCursor }">|</span>
        </div>

        <!-- 控制面板 -->
        <div class="controls">
            <button @click="startTyping" :disabled="isPlaying">
                ▶ 开始打字
            </button>
            <button @click="resetTyping" :disabled="isPlaying">
                ↺ 重置
            </button>
            <span class="status">
                {{ statusMessage }}
            </span>
        </div>

        <!-- 预设数据展示（mock 数据源） -->
        <div class="mock-data-panel">
            <p class="mock-title">📋 当前 Mock 数据源：</p>
            <pre>{{ JSON.stringify(mockDataList, null, 2) }}</pre>
            <p class="mock-note">每次点击“开始打字”将随机选取一条进行演示。</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'

// --- 1. 使用 ref 定义自己的 mock 数据 (AI 回复示例) ---
const mockDataList = ref([
    "当然可以！Vue 3 的组合式 API 让逻辑复用变得更加简单和直观。",
    "人工智能正在改变世界，而 Vue 3 可以帮助你构建智能的交互界面。",
    "打字机效果的核心是定时器逐字追加，记得在组件卸载时清理定时器哦。",
    "今天的天气真好，适合写代码。你打算用 Vue 3 实现什么有趣的功能？",
    "TypeScript 与 Vue 3 的结合提供了出色的类型推断和开发体验。",
])

// --- 2. 当前选中的数据和显示状态 ---
const currentText = ref('')           // 当前正在打印的完整文本
const displayedText = ref('')         // 当前已打印的文本
let currentIndex = 0                  // 当前已打印到的字符索引 (不用于模板，仅逻辑使用)
let typingTimer = null                // 定时器句柄

// 控制状态
const isPlaying = ref(false)           // 是否正在播放
const showCursor = ref(true)           // 光标闪烁状态
let cursorTimer = null                 // 光标闪烁定时器

// 计算属性：是否已完成打印
const isComplete = computed(() => {
    return currentText.value.length > 0 && displayedText.value.length === currentText.value.length
})

// 计算属性：状态信息
const statusMessage = computed(() => {
    if (!currentText.value) return '⏸️ 未开始'
    if (isComplete.value) return '✅ 打印完成'
    if (isPlaying.value) return '⏳ 打印中...'
    return '⏸️ 暂停'  // 本演示没有暂停，仅为状态占位
})

// --- 3. 核心打字机函数 ---
const typeNextChar = () => {
    // 如果当前文本为空或者已经打印完成，停止定时器
    if (!currentText.value || currentIndex >= currentText.value.length) {
        stopTypingTimer()
        isPlaying.value = false
        // 完成时关闭光标闪烁
        stopCursorBlink()
        showCursor.value = false
        return
    }

    // 追加下一个字符
    const nextChar = currentText.value[currentIndex]
    displayedText.value += nextChar
    currentIndex++
}

// 启动打字机（从当前进度继续，但本演示每次开始都从头，故配合reset逻辑）
const startTyping = () => {
    if (isPlaying.value) return  // 已经在播放

    // 如果没有选择文本或者文本为空，则随机选取一条
    if (!currentText.value) {
        selectRandomMockData()
    }

    // 如果已经完成，重新开始会重置 (这里简单处理：如果已完成，点击开始等价于重置并开始)
    if (isComplete.value) {
        resetTyping()
        // 注意 resetTyping 会把 isPlaying 设为 false，我们需要在 reset 后开始
        // 但由于 reset 是同步，我们可以直接继续 startTyping 逻辑
        // 但为了避免递归，我们使用 nextTick 或简单直接再次调用自身？这里直接重新执行逻辑。
        // 简便方法：调用 selectRandomMockData 重新开始。
        // 但更清晰：重置后手动选一条并开始。
        selectRandomMockData()
        displayedText.value = ''
        currentIndex = 0
    }

    // 如果当前 displayedText 长度等于全文，说明已经完成，不应该开始
    if (displayedText.value.length === currentText.value.length && currentText.value.length > 0) {
        // 已经完成，不操作
        return
    }

    // 启动主定时器
    isPlaying.value = true
    startCursorBlink()

    if (typingTimer) clearInterval(typingTimer)
    typingTimer = setInterval(() => {
        typeNextChar()
    }, 150) // 每150ms打印一个字符，模拟打字机速度
}

// 停止打字机定时器
const stopTypingTimer = () => {
    if (typingTimer) {
        clearInterval(typingTimer)
        typingTimer = null
    }
}

// 重置所有状态
const resetTyping = () => {
    stopTypingTimer()
    stopCursorBlink()
    isPlaying.value = false
    displayedText.value = ''
    currentIndex = 0
    // 不清空 currentText，但为了视觉效果可以选择重新选一条，或者保留当前文本但重置显示。
    // 这里保留当前文本，但显示清空。用户点击开始会从头打印同一句。
    // 为了更符合预期，重置时可以清空显示，但保留文本。
    // 如果需要重置后自动选新数据，可调用 selectRandomMockData，但为了演示灵活，我们让重置仅清空进度。
    // 为了让用户明确看到重置，我们可以把光标也关掉。
    showCursor.value = false
}

// 随机选取一条 mock 数据作为当前文本
const selectRandomMockData = () => {
    const list = mockDataList.value
    if (list.length > 0) {
        const randomIndex = Math.floor(Math.random() * list.length)
        currentText.value = list[randomIndex]
    } else {
        currentText.value = '暂无数据'
    }
    // 重置显示和索引，但不自动开始
    displayedText.value = ''
    currentIndex = 0
    isPlaying.value = false
    stopCursorBlink()
    showCursor.value = false
}

// --- 4. 光标闪烁控制 ---
const startCursorBlink = () => {
    stopCursorBlink() // 先清除之前的
    showCursor.value = true
    cursorTimer = setInterval(() => {
        // 如果已经完成，停止闪烁并隐藏光标
        if (isComplete.value) {
            stopCursorBlink()
            showCursor.value = false
            return
        }
        showCursor.value = !showCursor.value
    }, 400) // 光标闪烁间隔
}

const stopCursorBlink = () => {
    if (cursorTimer) {
        clearInterval(cursorTimer)
        cursorTimer = null
    }
}

// --- 5. 组件挂载时初始化一条数据 ---
selectRandomMockData()

// --- 6. 清理定时器，防止内存泄漏 ---
onUnmounted(() => {
    stopTypingTimer()
    stopCursorBlink()
})

// --- 7. 监听是否完成，如果完成则停止光标和播放状态 (typeNextChar 已处理，但额外保障) ---
watch(isComplete, (newVal) => {
    if (newVal) {
        isPlaying.value = false
        stopTypingTimer()
        stopCursorBlink()
        showCursor.value = false
    }
})

// 为了在重置时如果正在播放强制停止，resetTyping 已包含停止逻辑。
</script>

<style scoped>
.ai-typing-container {
    max-width: 800px;
    margin: 40px auto;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #f5f7fa 0%, #e9ecf2 100%);
    font-family: 'Segoe UI', system-ui, sans-serif;
}

h2 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 24px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid #d0d9e8;
    padding-bottom: 12px;
}

.typing-content {
    background-color: #1e2a3a;
    color: #e4f0ff;
    padding: 24px;
    border-radius: 12px;
    min-height: 100px;
    font-size: 1.2rem;
    line-height: 1.6;
    font-family: 'Courier New', monospace;
    white-space: pre-wrap;
    word-break: break-word;
    box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.3);
    margin-bottom: 24px;
    border: 1px solid #3a4a5a;
}

.printed-text {
    color: #a0d8ff;
}

.cursor {
    font-weight: bold;
    color: #ffaa00;
    font-size: 1.3rem;
    margin-left: 2px;
    opacity: 1;
    transition: opacity 0.1s;
}

.cursor-blink {
    animation: none;
    /* 我们通过js控制显隐，所以不需要css动画 */
}

.controls {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
}

button {
    background-color: #4a6fa5;
    border: none;
    color: white;
    padding: 10px 24px;
    border-radius: 40px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #3a5a8c;
}

button:hover:not(:disabled) {
    background-color: #5e8ace;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

button:disabled {
    background-color: #b0c4de;
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
    transform: none;
}

.status {
    background-color: #2d3e5f;
    color: #e0eafc;
    padding: 6px 16px;
    border-radius: 30px;
    font-size: 0.9rem;
    font-weight: 500;
    margin-left: auto;
}

.mock-data-panel {
    background-color: #f0f4fc;
    border-radius: 12px;
    padding: 16px 20px;
    border-left: 5px solid #4a6fa5;
    font-size: 0.95rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.mock-title {
    font-weight: 600;
    color: #1e3c5c;
    margin: 0 0 8px 0;
}

.mock-data-panel pre {
    background-color: #ffffffcc;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #b8c9e0;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    color: #1e2f4a;
    margin: 8px 0;
}

.mock-note {
    font-style: italic;
    color: #5f7a9a;
    margin: 8px 0 0 0;
    font-size: 0.9rem;
}

/* 响应式调整 */
@media (max-width: 600px) {
    .ai-typing-container {
        margin: 20px;
        padding: 16px;
    }

    .controls {
        flex-direction: column;
        align-items: stretch;
    }

    .status {
        margin-left: 0;
        text-align: center;
    }
}
</style>