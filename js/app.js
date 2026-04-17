/**
 * 主应用逻辑
 * 协调各模块完成完整的生成流程
 */

let currentTaskId = null;
let pollingInterval = null;

// DOM 元素
const elements = {
    themeSelect: null,
    theme: null,
    title: null,
    apiKey: null,
    generateBtn: null,
    statusSection: null,
    statusText: null,
    spinner: null,
    promptSection: null,
    promptPreview: null,
    copyPromptBtn: null,
    imageSection: null,
    resultImage: null,
    downloadBtn: null,
    newTaskBtn: null
};

/**
 * 初始化应用
 */
function init() {
    // 获取 DOM 元素
    elements.themeSelect = document.getElementById('themeSelect');
    elements.theme = document.getElementById('theme');
    elements.title = document.getElementById('title');
    elements.apiKey = document.getElementById('apiKey');
    elements.generateBtn = document.getElementById('generateBtn');
    elements.statusSection = document.getElementById('statusSection');
    elements.statusText = document.getElementById('statusText');
    elements.spinner = document.getElementById('spinner');
    elements.promptSection = document.getElementById('promptSection');
    elements.promptPreview = document.getElementById('promptPreview');
    elements.copyPromptBtn = document.getElementById('copyPromptBtn');
    elements.imageSection = document.getElementById('imageSection');
    elements.resultImage = document.getElementById('resultImage');
    elements.downloadBtn = document.getElementById('downloadBtn');
    elements.newTaskBtn = document.getElementById('newTaskBtn');

    // 填充主题下拉列表
    populateThemeSelect();

    // 加载保存的 API 密钥
    const savedApiKey = getApiKey();
    if (savedApiKey) {
        elements.apiKey.value = savedApiKey;
    }

    // 绑定事件
    elements.themeSelect.addEventListener('change', handleThemeSelect);
    elements.theme.addEventListener('input', handleThemeInput);
    elements.generateBtn.addEventListener('click', handleGenerate);
    elements.apiKey.addEventListener('change', (e) => {
        saveApiKey(e.target.value);
    });
    elements.copyPromptBtn.addEventListener('click', handleCopyPrompt);
    elements.downloadBtn.addEventListener('click', handleDownload);
    elements.newTaskBtn.addEventListener('click', handleNewTask);
}

/**
 * 填充主题下拉列表
 */
function populateThemeSelect() {
    const themes = getAvailableThemes();

    themes.forEach(theme => {
        const option = document.createElement('option');
        option.value = theme;
        option.textContent = theme;
        elements.themeSelect.appendChild(option);
    });
}

/**
 * 处理主题下拉选择
 */
function handleThemeSelect(e) {
    const selectedTheme = e.target.value;

    if (selectedTheme) {
        elements.theme.value = selectedTheme;

        // 自动填充建议标题
        const suggestedTitle = getSuggestedTitle(selectedTheme);
        elements.title.value = suggestedTitle;
    }
}

/**
 * 处理主题输入
 */
function handleThemeInput(e) {
    const theme = e.target.value.trim();

    if (theme) {
        // 自动填充建议标题
        const suggestedTitle = getSuggestedTitle(theme);
        if (!elements.title.value || elements.title.value.startsWith('《')) {
            elements.title.value = suggestedTitle;
        }
    }
}

/**
 * 处理生成按钮点击
 */
async function handleGenerate() {
    const theme = elements.theme.value.trim();
    const title = elements.title.value.trim();
    const apiKey = elements.apiKey.value.trim();

    // 验证输入 - 使用更友好的提示
    if (!theme || !title) {
        alert('😊 小朋友，请先选择主题和标题哦！');
        return;
    }

    if (!apiKey) {
        alert('🔑 小朋友，请让爸爸妈妈帮忙输入密钥哦！');
        return;
    }

    // 禁用按钮
    elements.generateBtn.disabled = true;

    try {
        // 隐藏之前的结果
        elements.imageSection.style.display = 'none';

        // 显示状态
        showStatus('正在生成提示词...');

        // 获取词汇
        const vocabulary = getVocabulary(theme);

        // 生成提示词
        const prompt = generatePrompt(theme, title, vocabulary);

        // 显示提示词
        elements.promptPreview.textContent = prompt;
        elements.promptSection.style.display = 'block';

        // 调用 API 创建任务
        showStatus('正在创建图片生成任务...');
        currentTaskId = await createTask(prompt, apiKey);

        // 开始轮询
        showStatus('图片生成中，请稍候...');
        startPolling(apiKey, theme, title, prompt);

    } catch (error) {
        showError(`😢 哎呀，出错了：${error.message}`);
        elements.generateBtn.disabled = false;
    }
}

/**
 * 开始轮询任务状态
 */
function startPolling(apiKey, theme, title, prompt) {
    // 清除之前的轮询
    if (pollingInterval) {
        clearInterval(pollingInterval);
    }

    let pollCount = 0;
    const maxPolls = 200; // 最多轮询 200 次（10 分钟）

    // 每 3 秒查询一次
    pollingInterval = setInterval(async () => {
        pollCount++;

        try {
            const taskData = await queryTask(currentTaskId, apiKey);

            if (taskData.state === 'success') {
                // 任务成功
                clearInterval(pollingInterval);

                const result = JSON.parse(taskData.resultJson);
                const imageUrl = result.resultUrls[0];

                // 显示图片
                elements.resultImage.src = imageUrl;
                elements.imageSection.style.display = 'block';

                // 隐藏状态
                elements.statusSection.style.display = 'none';

                // 保存到历史
                saveTaskHistory({
                    theme: theme,
                    title: title,
                    prompt: prompt,
                    imageUrl: imageUrl,
                    taskId: currentTaskId
                });

                // 启用按钮
                elements.generateBtn.disabled = false;

            } else if (taskData.state === 'fail') {
                // 任务失败
                clearInterval(pollingInterval);
                showError(`😢 哎呀，生成失败了：${taskData.failMsg || '未知错误'}`);
                elements.generateBtn.disabled = false;

            } else if (pollCount >= maxPolls) {
                // 超时
                clearInterval(pollingInterval);
                showError('⏰ 等太久了，请稍后再试试吧');
                elements.generateBtn.disabled = false;
            }

        } catch (error) {
            clearInterval(pollingInterval);
            showError(`😢 查询失败：${error.message}`);
            elements.generateBtn.disabled = false;
        }
    }, 3000);
}

/**
 * 显示状态
 */
function showStatus(message) {
    // 让状态消息更友好
    const friendlyMessages = {
        '正在生成提示词...': '🎨 正在想要画什么...',
        '正在创建图片生成任务...': '🚀 正在告诉 AI 画画...',
        '图片生成中，请稍候...': '⏰ AI 正在努力画画，请耐心等待哦...'
    };

    const displayMessage = friendlyMessages[message] || message;
    elements.statusText.textContent = displayMessage;
    elements.statusSection.style.display = 'block';
    elements.spinner.style.display = 'block';
}

/**
 * 显示错误
 */
function showError(message) {
    elements.statusText.textContent = message;
    elements.statusSection.style.display = 'block';
    elements.spinner.style.display = 'none';
}

/**
 * 复制提示词
 */
function handleCopyPrompt() {
    const prompt = elements.promptPreview.textContent;

    navigator.clipboard.writeText(prompt).then(() => {
        alert('✅ 复制成功啦！');
    }).catch(err => {
        console.error('复制失败:', err);
        alert('😢 复制失败了，请手动复制');
    });
}

/**
 * 下载图片
 */
function handleDownload() {
    const imageUrl = elements.resultImage.src;
    const theme = elements.theme.value.trim();

    // 创建下载链接
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `识字小报_${theme}_${Date.now()}.png`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * 生成新小报
 */
function handleNewTask() {
    // 清除当前任务
    if (pollingInterval) {
        clearInterval(pollingInterval);
    }
    currentTaskId = null;

    // 隐藏结果区域
    elements.promptSection.style.display = 'none';
    elements.imageSection.style.display = 'none';
    elements.statusSection.style.display = 'none';

    // 清空输入
    elements.theme.value = '';
    elements.title.value = '';

    // 启用按钮
    elements.generateBtn.disabled = false;

    // 聚焦到主题输入框
    elements.theme.focus();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
