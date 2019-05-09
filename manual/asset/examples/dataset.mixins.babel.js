import { causalNetDataSource, DataSourceMixins } from 'causal-net.datasets';
import { PreprocessingMixins,
    causalNetPreprocessingStream } from 'causal-net.preprocessing';
import { causalNetCore, Functor as BaseFunctor } from 'causal-net.core';
import { termLogger, LoggerMixins } from 'causal-net.log';
import { platform } from 'causal-net.utils';

const R = causalNetCore.CoreFunctor;
const sampleTransformer = (chunkSamples) => { 
    console.log({chunkSamples: chunkSamples.length});
    return chunkSamples;
};
const labelTransformer = (chunkLabels) => {
    console.log({chunkLabel: chunkLabels.length});
    return chunkLabels;
}

const PipeLineConfigure = {
    Dataset: {
        Source: causalNetDataSource,
        Preprocessing: {
            SampleTransformer: sampleTransformer,
            LabelTransformer: labelTransformer
        }
    }
};


class SimpleDataset extends platform.mixWith(BaseFunctor, 
    [   PreprocessingMixins,
        DataSourceMixins,
        LoggerMixins ]){
    constructor( preprocessing, logger ){
        super();
        this.Preprocessing = preprocessing;
        this.Logger = logger;
    }
}
(async ()=>{
    await causalNetDataSource.connect('../../datasets/MNIST_dataset_NoSplit/');
    let dataset = new SimpleDataset( causalNetPreprocessingStream, termLogger );
    dataset.setByConfig(PipeLineConfigure);
    dataset.DataSourceReader.chunkSelect(1);
    console.log( await dataset.read() );
})().catch(console.error);


