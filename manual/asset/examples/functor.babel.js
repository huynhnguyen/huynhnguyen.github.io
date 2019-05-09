import { Functor } from 'causal-net.core';

(async ()=>{
    let functor = new Functor();
    console.log(functor.range(10));
    console.log(functor.zeros(10));
    console.log(functor.ones(10));
})();