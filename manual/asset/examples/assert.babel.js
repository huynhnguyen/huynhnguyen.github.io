import { assert } from 'causal-net.utils';
assert.seemMatchSample([2,2,3], [1,2,3], 'validate sample');
assert.seemMatchSample('sample text', 'pattern text', 'validate sample');
assert.seemMatchSample( { 'text' : 'pattern text 1', 'number' : 1123 }, 
                        { 'text' : 'pattern text', 'number' : 1123 } , 'validate sample');
try{
    assert.seemMatchSample(['2',2,3], [1,2,3], 'validate sample');
}
catch(err){
    //error due to mismatch schema
    console.log(err.message);
};
class A{};
let a = new A();
assert.beInstanceOf(a, A);
try{
    assert.beInstanceOf('1', A);
}
catch(err){
    console.log(err.message);
}
