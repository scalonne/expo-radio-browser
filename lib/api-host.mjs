/**
 * get random api host
 */
'use strict'

import { isNode } from './env.mjs'
import { resolveSrv as resolveSrvNative } from './dns-nativ.mjs';
import { resolveSrv as resolveSrvHttps } from './dns-https.mjs';

const resolveSrv = isNode ? resolveSrvNative : resolveSrvHttps;

/**
 * https://api.radio-browser.info/examples/serverlist_fast.js
 */
const BASE_HOST = '_api._tcp.radio-browser.info'

export default async () => {
    try {
        let list = await resolveSrv(BASE_HOST);
        let item = list[Math.floor(Math.random() * list.length)];

        return item.name;
    } catch (e) {
        throw e;
    }
};
