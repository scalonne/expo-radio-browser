/**
 * resolve dns over https
 * using cloudflare dns
 * 
 */

import qs from 'qs';
import queryClient from './query-client.mjs'

const OPTIONS = {
    method: 'GET',
    host: 'cloudflare-dns.com',
    path: '/dns-query?',
    protocol: 'https:',
    headers: {
        accept: 'application/dns-json'
    }
}

/**
 * 
 * @param {object} params 
 */
const requestService = (params) => {
    let options = Object.assign({}, OPTIONS)
    options.path += qs.stringify(params)
    return queryClient(options)
}

export async function resolve4(name) {
    const data = await requestService({ name, type: 'A' });
    return data.Answer.map(item => item.data);
}
export async function reverse(ip) {
    const name = ip.split('.').reverse().join('.') + '.in-addr.arpa'
    const data = await requestService({ name, type: 'PTR' });
    return data.Answer.map(item => item.data.slice(0, -1));
}
export async function resolveSrv(name) {
    const data = await requestService({ name, type: 'SRV' });
    return data.Answer.map(item => {
        let a = item.data.split(' ');
        return {
            priority: a[0],
            weight: a[1],
            port: a[2],
            name: a[3]
        };
    });
}
