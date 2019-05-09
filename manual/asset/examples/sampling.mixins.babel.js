import { SamplingMixins, causalNetSampling } from 'causal-net.sampling';
import { Platform } from 'causal-net.utils';
import { Tensor, Function } from 'causal-net.core';
console.log(causalNetSampling instanceof Function);
class SimplePipeline extends Platform.mixWith(Tensor, [SamplingMixins]){
    constructor(){
        super();
        this.Sampling = causalNetSampling;
    }
}
let pipeline = new SimplePipeline();
console.log(pipeline.Sampling);