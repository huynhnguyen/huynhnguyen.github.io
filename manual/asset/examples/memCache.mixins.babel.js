import {memDownCache, MemCacheMixins} from 'causal-net.memcache';
import {termLogger} from 'causal-net.log';

import { platform } from 'causal-net.utils';
import { Tensor, Store } from 'causal-net.core';

class SimplePipeline extends platform.mixWith(Tensor, [MemCacheMixins]){
    constructor(){
        super();
        this.MemCache = memDownCache;
    }
}
let pipeline = new SimplePipeline();
termLogger.log(pipeline.MemCache instanceof Store);