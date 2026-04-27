/**
 * API 调用模块 - Kie AI Nano Banana Pro
 * 文档: api-nano-bana-pro.md
 */

const API_BASE = 'https://api.kie.ai/api/v1';

/**
 * 创建图片生成任务
 * @param {string} prompt - 提示词
 * @param {string} apiKey - API 密钥
 * @param {object} options - 生成选项
 * @param {string} options.aspectRatio - 图片比例
 * @param {string} options.resolution - 分辨率
 * @param {string} options.outputFormat - 输出格式
 * @returns {Promise<{type: 'url', data: string} | {type: 'taskId', data: string}>}
 */
async function createTask(prompt, apiKey, options = {}) {
    const {
        aspectRatio = '2:3',
        resolution = '2K',
        outputFormat = 'png'
    } = options;

    const response = await fetch(`${API_BASE}/jobs/createTask`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey.trim()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'nano-banana-pro',
            input: {
                prompt: prompt,
                aspect_ratio: aspectRatio,
                resolution: resolution,
                output_format: outputFormat
            }
        })
    });

    if (!response.ok) {
        throw new Error(`请求失败 (${response.status}): ${response.statusText}`);
    }

    const data = await response.json();

    if (data.code !== 200) {
        throw new Error(data.msg || `API错误: ${data.code}`);
    }

    return { type: 'taskId', data: data.data.taskId };
}

/**
 * 查询任务状态
 * @returns {Promise<object>} 任务状态数据
 */
async function queryTask(taskId, apiKey) {
    const response = await fetch(`${API_BASE}/jobs/recordInfo?taskId=${taskId}`, {
        headers: {
            'Authorization': `Bearer ${apiKey.trim()}`
        }
    });

    if (!response.ok) {
        throw new Error(`请求失败 (${response.status}): ${response.statusText}`);
    }

    const data = await response.json();

    if (data.code !== 200) {
        throw new Error(data.msg || `API错误: ${data.code}`);
    }

    return data.data;
}

/**
 * 从任务结果中提取图片 URL
 */
function extractImageUrl(taskData) {
    if (taskData.state === 'success' && taskData.resultJson) {
        const result = JSON.parse(taskData.resultJson);
        if (result.resultUrls && result.resultUrls[0]) {
            return result.resultUrls[0];
        }
    }
    return null;
}