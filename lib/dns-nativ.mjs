/**
 * get random api host
 * 
 * thanks to segler-alex <https://github.com/segler-alex>
 * issue: https://github.com/nepodev/radio-browser/issues/1
 */
'use strict'

import { resolve4 as _resolve4, reverse as _reverse, resolveSrv as _resolveSrv } from 'dns'
import { promisify } from 'util'
const resolve4 = promisify(_resolve4);
const reverse = promisify(_reverse);
const resolveSrv = promisify(_resolveSrv);

// Exports nommés
export { resolve4, reverse, resolveSrv };