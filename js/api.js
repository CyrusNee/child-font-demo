/**
 * API 调用模块
 * 封装 Nano Banana Pro API 的调用
 */

const API_BASE_URL = 'https://api.kie.ai/api/v1/jobs';

/**
 * 创建图片生成任务
 * @param {string} prompt - AI 绘图提示词
 * @param {string} apiKey - API 密钥
 * @returns {Promise<string>} 返回 taskId
 */
async function createTask(prompt, apiKey) {
    try {
        const response = await fetch(`${API_BASE_URL}/createTask`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'nano-banana-pro',
                input: {
                    prompt: prompt,
                    image_input: [],
                    aspect_ratio: '2:3',  // 竖版适合小报
                    resolution: '4K',
                    output_format: 'png'
                }
            })
        });

        const data = await response.json();

        if (data.code !== 200) {
            throw new Error(data.msg || '创建任务失败');
        }

        return data.data.taskId;
    } catch (error) {
        console.error('创建任务错误:', error);
        throw error;
    }
}

/**
 * 查询任务状态
 * @param {string} taskId - 任务 ID
 * @param {string} apiKey - API 密钥
 * @returns {Promise<object>} 返回任务数据
 */
async function queryTask(taskId, apiKey) {
    try {
        const response = await fetch(`${API_BASE_URL}/recordInfo?taskId=${taskId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const data = await response.json();

        if (data.code !== 200) {
            throw new Error(data.msg || '查询任务失败');
        }

        return data.data;
    } catch (error) {
        console.error('查询任务错误:', error);
        throw error;
    }
}
