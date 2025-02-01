import axios from 'axios';

export default async (options, body = '') => {
    try {
        const config = {
            method: options.method || 'GET',
            url: `${options.protocol}//${options.host}${options.port ? `:${options.port}` : ''}${options.path || ''}`,
            headers: options.headers || {},
            data: body ? JSON.parse(body) : undefined,
            validateStatus: (status) => status >= 200 && status < 300,
        };

        const response = await axios(config);
        return response.data;
    } catch (error) {
        const status = error.response?.status;
        const url = error.config?.url;        
        throw new Error(`Request Failed (${status ?? 'Unknown Status'}) → ${url ?? 'Unknown URL'}: ${error.message}`);
    }
};