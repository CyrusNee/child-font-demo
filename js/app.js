/**
 * 主应用逻辑
 */

let currentTaskId = null;
let pollingInterval = null;
let currentImageData = null; // 当前会话的图片 data URL（仅内存，不持久化）
let currentImageUrl = null; // 当前图片的外部 URL

// DOM 元素
const elements = {
    themeSelect: null,
    theme: null,
    title: null,
    apiKey: null,
    generateBtn: null,
    myWorksBtn: null,
    clearCacheBtn: null,
    statusSection: null,
    statusText: null,
    spinner: null,
    promptSection: null,
    promptPreview: null,
    copyPromptBtn: null,
    imageSection: null,
    resultImage: null,
    downloadBtn: null,
    newTaskBtn: null,
    placeholderSection: null,
    aspectRatio: null,
    resolution: null,
    outputFormat: null
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
    elements.myWorksBtn = document.getElementById('myWorksBtn');
    elements.clearCacheBtn = document.getElementById('clearCacheBtn');
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
    elements.placeholderSection = document.getElementById('placeholderSection');
    elements.aspectRatio = document.getElementById('aspectRatio');
    elements.resolution = document.getElementById('resolution');
    elements.outputFormat = document.getElementById('outputFormat');

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
    elements.myWorksBtn.addEventListener('click', handleMyWorks);
    elements.clearCacheBtn.addEventListener('click', handleClearCache);
    elements.apiKey.addEventListener('change', (e) => {
        saveApiKey(e.target.value);
    });
    elements.copyPromptBtn.addEventListener('click', handleCopyPrompt);
    elements.downloadBtn.addEventListener('click', handleDownload);
    elements.newTaskBtn.addEventListener('click', handleNewTask);

    // 页面离开时清理轮询
    window.addEventListener('beforeunload', () => {
        if (pollingInterval) {
            clearInterval(pollingInterval);
            pollingInterval = null;
        }
    });
}

/**
 * 填充主题下拉列表
 */
function populateThemeSelect() {
    const themes = getAvailableThemes();

    themes.forEach(theme => {
        const vocabulary = vocabularyDatabase[theme];
        const option = document.createElement('option');
        option.value = theme;
        option.textContent = `${vocabulary.icon} ${theme}`;
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

        // 获取生成选项
        const options = {
            aspectRatio: elements.aspectRatio.value,
            resolution: elements.resolution.value,
            outputFormat: elements.outputFormat.value
        };

        // 调用 API 创建任务
        showStatus('正在创建图片生成任务...');
        const result = await createTask(prompt, apiKey, options);

        // 始终使用异步模式（Kie AI 返回 taskId）
        currentTaskId = result.data;
        showStatus('图片生成中，请稍候...');
        startPolling(apiKey, theme, title, prompt);

    } catch (error) {
        showError(`😢 哎呀，出错了：${error.message}`);
        elements.generateBtn.disabled = false;
    }
}

/**
 * 显示生成的图片
 */
/**
 * 将图片 URL 转换为 data URL
 */
async function convertToDataUrl(imageUrl) {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`图片获取失败: ${response.status}`);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('FileReader 失败'));
        reader.readAsDataURL(blob);
    });
}

async function displayImage(imageUrl, theme, title, prompt) {
    elements.placeholderSection.style.display = 'none';
    elements.resultImage.src = imageUrl;
    elements.imageSection.style.display = 'block';
    elements.statusSection.style.display = 'none';

    currentImageUrl = imageUrl;

    // 先保存历史记录（不依赖图片转换结果）
    saveTaskHistory({
        theme: theme,
        title: title,
        prompt: prompt,
        imageUrl: imageUrl,
        taskId: currentTaskId
    });

    // 尝试转为 data URL 用于当前会话下载（可能因 CORS 失败，不影响主流程）
    try {
        currentImageData = await convertToDataUrl(imageUrl);
    } catch (e) {
        currentImageData = null;
    }

    elements.generateBtn.disabled = false;
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

            // 检查是否成功
            if (taskData.state === 'success') {
                const imageUrl = extractImageUrl(taskData);
                if (imageUrl) {
                    clearInterval(pollingInterval);
                    displayImage(imageUrl, theme, title, prompt);
                    return;
                }
            }

            // 检查是否失败
            if (taskData.state === 'fail') {
                clearInterval(pollingInterval);
                showError(`😢 哎呀，生成失败了：${taskData.failMsg || '未知错误'}`);
                elements.generateBtn.disabled = false;
                return;
            }

            // 超时检查
            if (pollCount >= maxPolls) {
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
 * 下载图片（强制弹出保存对话框）
 */
async function handleDownload() {
    const theme = elements.theme.value.trim();
    const format = elements.outputFormat.value; // 尊重用户选择的格式
    const ext = format === 'jpg' ? 'jpg' : 'png';
    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';

    if (!currentImageUrl && !currentImageData) {
        alert('图片数据不存在，请重新生成');
        return;
    }

    const fileName = `识字小报_${theme}_${Date.now()}.${ext}`;

    // 获取图片 Blob：优先用 data URL，否则从外部 URL 获取
    async function getBlob() {
        if (currentImageData) {
            const res = await fetch(currentImageData);
            return res.blob();
        }
        // 从外部 URL 获取（可能因 CORS 失败）
        const res = await fetch(currentImageUrl);
        return res.blob();
    }

    // 优先使用 showSaveFilePicker 强制弹出保存对话框
    if (window.showSaveFilePicker) {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: fileName,
                types: [{
                    description: ext.toUpperCase() + ' 图片',
                    accept: { [mimeType]: [`.${ext}`] }
                }]
            });

            const blob = await getBlob();
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            return;
        } catch (e) {
            // 用户取消了对话框，直接返回
            if (e.name === 'AbortError') return;
            // 其他错误走 fallback
        }
    }

    // Fallback：传统下载方式
    const link = document.createElement('a');
    link.href = currentImageData || currentImageUrl;
    link.download = fileName;
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

    // 显示占位符
    elements.placeholderSection.style.display = 'flex';

    // 清空输入
    elements.theme.value = '';
    elements.title.value = '';
    elements.themeSelect.value = '';

    // 启用按钮
    elements.generateBtn.disabled = false;

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 查看我的作品（页面内 modal，避免弹窗被拦截）
 */
function handleMyWorks() {
    const history = getTaskHistory();

    if (history.length === 0) {
        alert('😊 还没有作品哦，快去创作一个吧！');
        return;
    }

    // 移除已有 modal
    const existing = document.getElementById('worksModal');
    if (existing) existing.remove();

    // 构建作品列表
    let itemsHtml = '';
    history.forEach((item, index) => {
        const time = new Date(item.timestamp).toLocaleString('zh-CN');
        itemsHtml += `
            <div style="margin-bottom:20px;padding:15px;background:#FFF9E6;border-radius:10px;border:2px solid #FFD93D;">
                <p style="font-weight:bold;color:#FF6B9D;margin-bottom:10px;">
                    ${index + 1}. ${item.title} - ${item.theme}
                </p>
                <p style="font-size:0.9em;color:#666;margin-bottom:10px;">
                    创作时间: ${time}
                </p>
                <img src="${item.imageUrl}" style="max-width:100%;border-radius:8px;border:2px solid #FFD93D;">
            </div>
        `;
    });

    // 创建 modal
    const modal = document.createElement('div');
    modal.id = 'worksModal';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;';
    modal.innerHTML = `
        <div style="background:white;border-radius:20px;max-width:600px;width:90%;max-height:80vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
            <div style="padding:20px;background:linear-gradient(135deg,#FF6B9D,#FEC163);display:flex;justify-content:space-between;align-items:center;">
                <h3 style="color:white;margin:0;">🎨 我的作品集</h3>
                <button id="closeWorksModal" style="background:white;border:none;border-radius:50%;width:36px;height:36px;font-size:1.2em;cursor:pointer;">✕</button>
            </div>
            <div style="padding:20px;overflow-y:auto;flex:1;">
                ${itemsHtml}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 点击关闭
    document.getElementById('closeWorksModal').addEventListener('click', () => modal.remove());
    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

/**
 * 清除缓存
 */
function handleClearCache() {
    if (confirm('🤔 确定要清除所有数据吗？\n这会删除保存的密钥和作品历史哦！')) {
        // 停止正在进行的轮询
        if (pollingInterval) {
            clearInterval(pollingInterval);
            pollingInterval = null;
        }
        clearStorage();
        elements.apiKey.value = '';
        alert('✅ 清除成功！');
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
