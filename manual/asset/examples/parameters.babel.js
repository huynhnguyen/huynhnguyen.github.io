import { causalNetParameters } from 'causal-net.layer';
import { causalNetLayers } from 'causal-net.layer';
(async ()=>{
    const Layers = { 
                    Predict: [  causalNetLayers.dense(4, 3), 
                                 causalNetLayers.dense(3, 2)], 
                    Encode: [ causalNetLayers.dense(4, 2) ], 
                    Decode: [ causalNetLayers.dense(4, 2) ] 
            };
    const Parameters = {};
    console.log(causalNetParameters.InitParameters(Parameters)(Layers));
    console.log(await causalNetParameters.exportParameters());
    console.log(await causalNetParameters.saveParams('save0'));
    console.log(await causalNetParameters.getSavedParamList());
    console.log(await causalNetParameters.loadParams('save0'));
})();