import { LoggerMixins, termLogger, BaseLogger } from 'causal-net.log';
import { platform } from 'causal-net.utils';
import { Tensor } from 'causal-net.core';

class SimplePipeline extends platform.mixWith(Tensor, [LoggerMixins]){
    constructor(){
        super();
        this.Logger = termLogger;
    }
}
let pipeline = new SimplePipeline();
console.log(pipeline.Logger instanceof BaseLogger);