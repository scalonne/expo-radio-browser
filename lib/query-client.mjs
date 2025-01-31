import axios from 'axios';

export default async (options, body = '') => {
    try {
        const config = {
            method: options.method || 'GET',
            url: `${options.protocol}//${options.hostname}${options.port ? `:${options.port}` : ''}${options.path || ''}`,
            headers: options.headers || {},
            data: body ? JSON.parse(body) : undefined,
            validateStatus: (status) => status >= 200 && status < 300,
        };

        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? `Request Failed. Status Code: ${error.response.status}` : error.message);
    }
};