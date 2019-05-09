import { stream } from 'causal-net.utils';

let reader = stream.makeReadable();
    
const TranformFn = (chunkData, chunkEncoding, afterTransformFn) =>{
    chunkData.x = (chunkData.x+1.5);
    let event = null;
    afterTransformFn(event, chunkData);
};
let transformer = stream.makeTransform(TranformFn);
    
const WriteFn = (chunkData, chunkEncoding, callback) =>{
    console.log({chunkData});
    callback();
};
let writer = stream.makeWritable(WriteFn);
    
reader.pipe(transformer).pipe(writer);
//write random int for every 100 ms    
setInterval(() => {
    reader.push({ x: Math.random() });
}, 100);
