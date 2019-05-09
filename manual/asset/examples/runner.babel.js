import { causalNetParameters, causalNetLayers, causalNetRunner } from 'causal-net.layer';
import { causalNetCore } from 'causal-net.core';

(async ()=>{
    const T = causalNetCore.CoreTensor;

    const Net = { 
                    Parameters: { Predict: null, Encode: null, Decode: null },
                    Layers: { 
                        Predict: [  causalNetLayers.dense(4, 3), 
                                    causalNetLayers.dense(3, 2)], 
                        Encode: [ causalNetLayers.dense(4, 2) ], 
                        Decode: [ causalNetLayers.dense(4, 2) ] 
                    }
                };
    console.log(causalNetParameters.setOrInitParams(Net.Layers, Net.Parameters));
    causalNetRunner.NetLayers = Net.Layers;
    causalNetRunner.NetParameters = causalNetParameters;
    let predictLayer = causalNetRunner.run(Net.Layers.Predict, T.tensor([[1,2,3,4]]), 
                            causalNetParameters.PredictParameters);
    predictLayer.print();
    const PredictRunner = causalNetRunner.Predictor;
    console.log(PredictRunner);
    predictLayer = PredictRunner(T.tensor([[1,2,3,4]]));
    predictLayer.print();
    let encodeLayer = causalNetRunner.run(Net.Layers.Encode, T.tensor([[1,2,3,4]]), 
                            causalNetParameters.EncodeParameters);
    encodeLayer.print();
    const EncodeRunner = causalNetRunner.Encoder;
    encodeLayer = EncodeRunner( T.tensor([[1,2,3,4]]) );
    encodeLayer.print();
    let decodeLayer = causalNetRunner.run(Net.Layers.Decode, T.tensor([[1,2,3,4]]), 
                            causalNetParameters.DecodeParameters);
    decodeLayer.print();
    const DecodeRunner = causalNetRunner.Decoder;
    decodeLayer = DecodeRunner( T.tensor([[1,2,3,4]]) );
    decodeLayer.print();
})();
