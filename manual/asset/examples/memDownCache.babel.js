import {memDownCache} from 'causal-net.memcache';
import {termLogger} from 'causal-net.log';

(async ()=>{
    await memDownCache.setItem(123, '1223adfa');
    termLogger.log({getItem: await memDownCache.getItem(123)});
})();
