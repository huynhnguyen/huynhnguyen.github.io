import { Log, Models, CausalNet } from '../../src/index';
const { causalNetModels } = Models;
const { termLogger } = Log;
let inputs = [[0.52, 1.12,  0.77],
              [0.88, -1.08, 0.15],
              [0.52, 0.06, -1.30],
              [0.74, -2.49, 1.39]];
let targets = [[0, 1], [0, 1], [0, 1], [0, 1]];
const _NetConfig = {
    HyperParameters: {SampleSize: 4},
    NumClasses: 2,
    Net:{Predict: [ {   Name:'dense', Type: 'Tensor', 
                        Parameters: { Weight: [3, 2], Bias: [2]  },
                        Flow: [ { Op: 'dot', Parameter: 'Weight', Args: [] },
                                { Op: 'add', Parameter: 'Bias',  Args: [] } ] 
                               },
                    {   Name:'PipeOutput', Type: 'Tensor', 
                        Flow: [ { Op: 'reshape', Args: [['$SampleSize', -1]] } ] 
                    } ] },
    Model:  causalNetModels.classification() };

console.log({NetConfig: _NetConfig});
let parameters = {};

let causalNet = new CausalNet(_NetConfig, parameters);

(async ()=>{
    const DoBatchTrainSampleGenerator = (epochIdx)=>([{idx:0, batchSize:4, data: [inputs, targets]}]);
    let logTrain = await causalNet.train(DoBatchTrainSampleGenerator, 20);
    termLogger.log(logTrain);
    const DoBatchTestSampleGenerator = ()=>([{idx:0, batchSize:4, data: [inputs, targets]}]);
    let testResult = await causalNet.accuracyTest(DoBatchTestSampleGenerator);
    termLogger.log({testResult});
    await causalNet.saveParams('save_model.model');
    await causalNet.loadParams('save_model.model');
    testResult = await causalNet.accuracyTest(DoBatchTestSampleGenerator);
    termLogger.log({testResult});
    testResult = await causalNet.ensembleAccuracyTest(DoBatchTestSampleGenerator, ['save_model.model']);
    termLogger.log({testResult});
    testResult = await causalNet.accuracyTest(DoBatchTestSampleGenerator, ['save_model.model']);
    termLogger.log({testResult});
})().catch(err=>{
    console.error({err});
});