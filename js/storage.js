/**
 * 本地存储模块
 * 使用 localStorage 保存和读取数据
 */

const STORAGE_KEYS = {
    API_KEY: 'nanoBananaApiKey',
    TASK_HISTORY: 'taskHistory'
};

/**
 * 保存 API 密钥
 * @param {string} apiKey - API 密钥
 */
function saveApiKey(apiKey) {
    try {
        localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
    } catch (error) {
        console.error('保存 API 密钥失败:', error);
    }
}

/**
 * 读取 API 密钥
 * @returns {string} API 密钥
 */
function getApiKey() {
    try {
        return localStorage.getItem(STORAGE_KEYS.API_KEY) || '';
    } catch (error) {
        console.error('读取 API 密钥失败:', error);
        return '';
    }
}

/**
 * 保存任务到历史记录
 * @param {object} task - 任务对象
 */
function saveTaskHistory(task) {
    try {
        const history = getTaskHistory();

        // 添加时间戳
        task.timestamp = new Date().toISOString();

        // 添加到历史记录开头
        history.unshift(task);

        // 只保留最近 10 条
        if (history.length > 10) {
            history.splice(10);
        }

        localStorage.setItem(STORAGE_KEYS.TASK_HISTORY, JSON.stringify(history));
    } catch (error) {
        console.error('保存任务历史失败:', error);
    }
}

/**
 * 读取任务历史记录
 * @returns {array} 任务历史数组
 */
function getTaskHistory() {
    try {
        const history = localStorage.getItem(STORAGE_KEYS.TASK_HISTORY);
        return history ? JSON.parse(history) : [];
    } catch (error) {
        console.error('读取任务历史失败:', error);
        return [];
    }
}

/**
 * 清除所有存储数据
 */
function clearStorage() {
    try {
        localStorage.removeItem(STORAGE_KEYS.API_KEY);
        localStorage.removeItem(STORAGE_KEYS.TASK_HISTORY);
    } catch (error) {
        console.error('清除存储失败:', error);
    }
}
