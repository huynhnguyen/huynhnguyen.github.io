import { causalNetSGDOptimizer } from 'causal-net.optimizers';
import { causalNetModels } from 'causal-net.models';
import { causalNetParameters, causalNetLayers } from 'causal-net.layer';
import { causalNet } from 'causal-net';
import { termLogger } from 'causal-net.log';


(async ()=>{
    const DummyData = (batchSize)=>{
        let samples = [ [0,1,2,3], 
                        [0,1,2,3], 
                        [0,1,2,3] ];
        let labels  = [ [1,0], 
                        [1,0], 
                        [1,0] ];
        return [{samples, labels}];
    };
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
                        let data = (emitCounter < 3)
                                        ?{Predict: [0,1,2,3], EnsemblePredict: [0,1,2,3]}
                                        :null;
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
    causalNet.setByConfig(PipeLineConfigure);
    
    console.log(causalNet.Parameters);
    let models = ['Model1', 'Model2', 'Model3'];
    let losses = {};
    for(let model of models){
        let result = await causalNet.ensembleTrain(2, 1, model);
        losses = {...losses, ...{[model]: result[model]['losses']}};
    }
    console.log({losses});
    let plotId = termLogger.plot({ 
                      type:'line', data: losses, 
                      width: 200, height: 200, 
                      xLabel: '# of iter', 
                      yLabel: 'loss'});
    await termLogger.show({plotId});
    console.log(await causalNet.test(10));
    causalNet.EnsembleModels = models;
    causalNet.deploy().then(res=>console.log(res));
})().catch(err=>{
    console.error({err});
});