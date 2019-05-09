import { causalNetSGDOptimizer, TrainerMixins, EvaluatorMixins } from 'causal-net.optimizers';
import { causalNetModels, ModelMixins } from 'causal-net.models';
import { causalNetParameters, causalNetLayers, causalNetRunner, LayerRunnerMixins } from 'causal-net.layer';
import { causalNetCore, Functor } from 'causal-net.core';
import { platform } from 'causal-net.utils';
import { Tensor } from 'causal-net.core';
import { termLogger, LoggerMixins } from 'causal-net.log';

class SimplePipeline extends platform.mixWith(Tensor, [ 
        LayerRunnerMixins, 
        ModelMixins, 
        EvaluatorMixins,
        LoggerMixins,
        TrainerMixins]){
    constructor( netRunner, functor, logger){
        super();
        this.F = functor;
        this.LayerRunner = netRunner;
        this.Log = logger;
    }
}
const T = causalNetCore.CoreTensor;
const R = causalNetCore.CoreFunctor;
const F = new Functor();
const DummyData = (batchSize)=>{
    let samples = [ [0,1,2,3], 
                    [0,1,2,3], 
                    [0,1,2,3] ];
    let labels  = [ [0,1], 
                    [0,1], 
                    [0,1] ];
    return [{samples, labels}];
}
console.log(F.range(10));
console.log(F.enumerate([0,1,2,3,4]));
console.log(DummyData(1));
(async ()=>{
    const PipeLineConfigure = {
        Dataset: {
            TrainDataGenerator: DummyData,
            TestDataGenerator: DummyData,
        },
        Net: { 
                Parameters: causalNetParameters.InitParameters(),
                Layers: { 
                    Predict: [  causalNetLayers.dense(4, 3), 
                                causalNetLayers.dense(3, 2)], 
                    Encode: [ causalNetLayers.dense(4, 2) ], 
                    Decode: [ causalNetLayers.dense(4, 2) ] 
                },
                Model: causalNetModels.classification(2),
                Optimizer: causalNetSGDOptimizer.adam({learningRate: 0.01})
        }
    };

    let pipeline = new SimplePipeline( causalNetRunner, F, termLogger);
    pipeline.setByConfig(PipeLineConfigure);
    const { Predictor } = pipeline.LayerRunner;
    let predictInfer = Predictor(T.tensor([[1,2,3,4]]));
    predictInfer.print();
    predictInfer = pipeline.PredictModel(T.tensor([[1,2,3,4]]));
    predictInfer.print();
    
    let modelOneHotPredict = pipeline.OneHotPredictModel(T.tensor([[1,2,3,4]]).asType('float32'));
    modelOneHotPredict.print();
    let fit = pipeline.FitModel(T.tensor([[1,2,3,4]]).asType('float32'));
    fit.print();
    let modelLoss = pipeline.LossModel(T.tensor([[1,2,3,4]]).asType('float32'), 
                             T.tensor([[0, 1]]).asType('float32'));
    modelLoss.print();
    let trainLoss = pipeline.Trainer(T.tensor([[1,2,3,4]]).asType('float32'), 
        T.tensor([[0, 1]]).asType('float32'));
    trainLoss.print();
    trainLoss = pipeline.Trainer(T.tensor([[1,2,3,4]]).asType('float32'), 
        T.tensor([[0, 1]]).asType('float32'));
    trainLoss.print();
    console.log(await pipeline.train(10, 1));
    console.log(await pipeline.test());
})().catch(err=>{
    console.error({err});
});