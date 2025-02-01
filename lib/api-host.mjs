/**
 * get random api host
 */
'use strict'

import { resolveSrv } from './dns-https.mjs';

/**
 * https://api.radio-browser.info/examples/serverlist_fast.js
 */
const BASE_HOST = '_api._tcp.radio-browser.info'

export default async () => {
    try {
        let list = await resolveSrv(BASE_HOST);

        if (!list || list.length === 0) {
            throw new Error('No DNS records found');
        }

        let item = list[Math.floor(Math.random() * list.length)];

        return item.name;
    } catch (e) {
        throw e;
    }
};
