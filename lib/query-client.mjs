import axios from 'axios';

export default async (options, body = '') => {
    try {
        if (!options.protocol || !options.host || !options.path) {
            throw new Error(`Invalid URL parameters: protocol=${options.protocol}, host=${options.host}, path=${options.path}`);
        }

        const protocol = options.protocol.endsWith(':') ? options.protocol : `${options.protocol}:`;
        const url = `${protocol}//${options.host}${options.port ? `:${options.port}` : ''}${options.path || ''}`;
        const config = {
            method: options.method || 'GET',
            url,
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