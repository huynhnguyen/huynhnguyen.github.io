import { Tensor, causalNetCore } from 'causal-net.core';
let tensor = new Tensor();
let T = causalNetCore.CoreTensor;
let ta = T.tensor([1, 2]);
console.log(tensor.isTensor(ta));
console.log(tensor.isTensor([1,2,3]));