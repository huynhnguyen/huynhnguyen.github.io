import { StorageMixins, indexDBStorage } from 'causal-net.storage';
import { platform } from 'causal-net.utils';
import { Tensor, Store } from 'causal-net.core';

class SimplePipeline extends platform.mixWith(Tensor, [StorageMixins]){
    constructor(storage){
        super();
        this.Storage = storage;
    }
}
let pipeline = new SimplePipeline(indexDBStorage);
console.log(pipeline.Storage instanceof Store);