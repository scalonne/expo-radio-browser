'use strict';

import apiHost from './api-host.mjs';
import queryClient from './query-client.mjs';

const DEFAULT_OPTIONS = {
    host: null,           // default is null to get a random API host
    protocol: 'https:',
    path: '/',           // base path, will be extended on request
    method: 'POST',      // default is POST because GET requests don't work as expected on the RadioBrowser API
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-requested-with': 'expo-radio-browser'
    }
};

let request_options = { ...DEFAULT_OPTIONS };

const setUserAgent = (userAgent) => {
    request_options.headers['User-Agent'] = userAgent;
};

/**
 * Sets service options from a URL
 * @param {string} service_url - The full service URL
 */
const setServiceFromUrl = (service_url) => {
    try {
        const match = service_url.match(/^(https?):\/\/([^\/]+)(\/.*)?$/);
        if (!match) throw new Error('Invalid URL format');

        const [, protocol, host, path] = match;

        request_options = {
            ...DEFAULT_OPTIONS,
            protocol,
            host,
            path: path ? (path.endsWith('/') ? path : path + '/') : '/'
        };
    } catch (error) {
        console.error('Error setting up service:', error);
    }
};

/**
 * Makes a request to the RadioBrowser service
 * @param {string} route - The request path
 * @param {object} param - Parameters to include in the request
 * @param {object} option - Additional request options
 * @returns {Promise<any>}
 */
const requestService = (route, param = {}, option = {}) => {
    let options = { ...request_options, ...option };
    let query = new URLSearchParams(param).toString();

    options.path += `json/${route}`;
    if (query) {
        options.path += `?${query}`;
    }

    return queryClient(options);
};

const ApiClient = {
    get service_url() {
        return request_options.host
            ? `${request_options.protocol}//${request_options.host}${request_options.path}`
            : null;
    },

    set service_url(service_url) {
        setServiceFromUrl(service_url);
    },

    setUserAgent,

    getRandomHost: apiHost,

    /**
     * Makes a request to the RadioBrowser API
     * @param {string} route
     * @param {object} param
     * @param {object} option
     * @returns {Promise<any>}
     */
    request: async (route, param = {}, option = {}) => {
        if (!request_options.host) {
            try {
                const host = await apiHost();
                ApiClient.service_url = `https://${host}/`;
            } catch (error) {
                console.error('Failed to get a random host:', error);
                throw error;
            }
        }
        return requestService(route, param, option);
    }
};

export default ApiClient;
