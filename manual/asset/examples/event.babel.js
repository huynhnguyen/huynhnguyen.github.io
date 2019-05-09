import { Event } from 'causal-net.core';

(async ()=>{
    let eventA = new Event();
    let eventB = new Event();    
    eventA.on('data', (data)=>{
        console.log({'event handler': data});
        return 'this is done';
    })
    console.log(await eventA.emit('data', [1,2,3]));
    console.log('send event');
    eventB.pipe(eventA);
    console.log(await eventB.emit('data', ['1,2,3']));
})();
