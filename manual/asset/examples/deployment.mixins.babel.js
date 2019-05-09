import { causalNetSGDOptimizer, TrainerMixins, EvaluatorMixins } from 'causal-net.optimizers';
import { causalNetModels, ModelMixins } from 'causal-net.models';
import { causalNetParameters, causalNetLayers, causalNetRunner, LayerRunnerMixins } from 'causal-net.layer';
import { causalNetCore, Functor, Tensor } from 'causal-net.core';
import { platform } from 'causal-net.utils';
import { causalNetDeployment, DeploymentMixins } from 'causal-net.deployment';
import { termLogger, LoggerMixins } from 'causal-net.log';

class SimplePipeline extends platform.mixWith(Tensor, [ 
        LayerRunnerMixins, 
        ModelMixins, 
        EvaluatorMixins,
        TrainerMixins, 
        LoggerMixins,
        DeploymentMixins ]){
    constructor( netRunner, functor, logger, deployment){
        super();
        this.F = functor;
        this.LayerRunner = netRunner;
        this.Logger = logger;
        this.Deployment = deployment;
    }
}
const T = causalNetCore.CoreTensor;
const F = new Functor();
const DummyData = (batchSize)=>{
    let samples = [ [0,1,2,3], 
                    [0,1,2,3], 
                    [0,1,2,3] ];
    let labels  = [ [1,0], 
                    [1,0], 
                    [1,0] ];
    return [{samples, labels}];
}
console.log(F.range(10));
console.log(F.enumerate([0,1,2,3,4]));
console.log(DummyData(1));
(async ()=>{
    let emitCounter = 0;
    const PipeLineConfigure = {
        Dataset: {
            TrainDataGenerator: DummyData,
            TestDataGenerator: DummyData
        },
        Net: { 
                Parameters: causalNetParameters.InitParameters(),
                Layers: { 
                    Predict: [  causalNetLayers.dense(4, 3), 
                                causalNetLayers.dense(3, 2)]
                },
                Model: causalNetModels.classification(2),
                Optimizer: causalNetSGDOptimizer.adam({learningRate: 0.01})
        },
        Deployment: {
            Emitter: async ()=>{
                return new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        let data = (emitCounter < 3)?{Predict: [0,1,2,3]}:null;
                        emitCounter += 1;
                        console.log({ emitter: data});
                        resolve(data);
                    }, 1000);
                });
            },
            Listener: async (infer)=>{
                console.log({ Listener: infer});
            }
        }
    };

    let pipeline = new SimplePipeline( causalNetRunner, F, termLogger, causalNetDeployment);
    pipeline.setByConfig(PipeLineConfigure);
    let predictInfer = pipeline.PredictModel( T.tensor([[1,2,3,4]]) );
    predictInfer.print();
    pipeline.deploy().then(res=>console.log(res));
    console.log(await pipeline.train(100, 1));
})().catch(err=>{
    console.error({err});
});