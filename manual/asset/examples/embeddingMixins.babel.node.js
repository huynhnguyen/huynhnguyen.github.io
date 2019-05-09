import { RepresentationMixins, causalNetEmbedding } from 'causal-net.representation';
import { platform } from 'causal-net.utils';
import { Tensor } from 'causal-net.core';
const PipeLineConfigure = {
    Representation: {
        Embedding: causalNetEmbedding,
        EmbeddingConfig: '../../datasets/WordVec_EN/',
    }
}
class SimplePipeline extends platform.mixWith(Tensor, [RepresentationMixins]){
    constructor(configure){
        super();
        this.setRepresentationByConfig(configure);
    }
}
let pipeline = new SimplePipeline(PipeLineConfigure);
pipeline.connect();
console.log(pipeline.Representation);