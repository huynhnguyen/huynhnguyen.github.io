import { causalNetSampling } from 'causal-net.sampling';
import {termLogger as Logger} from 'causal-net.log';
let numSamples = 4;
let idSize = 10;//id list: [0,1,2,3,4,5,6,7,8,9]
Logger.log(causalNetSampling.subSampling(numSamples, idSize));

numSamples = 4;
let positiveSampleId = [0, 1];
//ids: [0, 1, 2, 3];
let probIds = [0.9, 0.9, 0.3, 0.7];
let samples = causalNetSampling.negSampling(numSamples, positiveSampleId, probIds);
termLogger.log({ samples });