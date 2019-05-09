import { causalNetModels, ModelMixins } from 'causal-net.models';
import { causalNetParameters, causalNetLayers, causalNetRunner, LayerRunnerMixins } from 'causal-net.layer';
import { causalNetCore } from 'causal-net.core';
import { platform } from 'causal-net.utils';
import { Tensor } from 'causal-net.core';
import { termLogger } from 'causal-net.log';

class SimplePipeline extends platform.mixWith(Tensor, [LayerRunnerMixins, ModelMixins]){
    constructor(netRunner, logger){
        super();
        this.logger = logger;
        this.LayerRunner = netRunner;
    }
}
const T = causalNetCore.CoreTensor;
(async ()=>{
    const PipeLineConfigure = {
        Net: { 
                Parameters: causalNetParameters.InitParameters(),
                Layers: { 
                    Predict: [  causalNetLayers.dense(4, 3), 
                                causalNetLayers.dense(3, 2)], 
                    Encode: [ causalNetLayers.dense(4, 2) ], 
                    Decode: [ causalNetLayers.dense(4, 2) ] 
                },
                Model: causalNetModels.classification(2)
        }
    };

    let pipeline = new SimplePipeline( causalNetRunner, termLogger);
    pipeline.setByConfig(PipeLineConfigure);
    const { Predictor } = pipeline.LayerRunner;
    let predictInfer = Predictor(T.tensor([[1,2,3,4]]));
    predictInfer.print();
    predictInfer = pipeline.PredictModel(T.tensor([[1,2,3,4]]));
    predictInfer.print();
    let inputTensor = T.tensor([[1,2,3,4]]).asType('float32');
    let modelOneHotPredict = pipeline.OneHotPredictModel(inputTensor);
    modelOneHotPredict.print();
    let fit = pipeline.FitModel(inputTensor);
    fit.print();
    let modelLoss = pipeline.LossModel(inputTensor, 
                             T.tensor([[0, 1]]).asType('float32'));
    modelLoss.print();
})().catch(err=>{
    console.error({err});
});