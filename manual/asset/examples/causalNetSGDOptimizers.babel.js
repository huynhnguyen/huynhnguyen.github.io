import { causalNetCore } from "causal-net.core";
import { causalNetSGDOptimizer } from 'causal-net.optimizers';

var adam = causalNetSGDOptimizer.adam({learningRate: 0.01});

const T = causalNetCore.CoreTensor;
var a = T.variable(T.tensor([1,2,3,4]).reshape([2,2])); 
var b = T.tensor([2,3,4,5]).reshape([2,2]);
const FitFn = ()=>{
    return a.mul(b).mean();
};
console.log( adam.fit(FitFn) );
a.print();
b.print();