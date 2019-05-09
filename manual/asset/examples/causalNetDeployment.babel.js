import { causalNetDeployment } from 'causal-net.deployment';

(async ()=>{
    var emitCounter = 0;
    causalNetDeployment.Emitter = async ()=>{
        
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let data = (emitCounter < 3)?{Predict: [0,1,2,3]}:null;
                emitCounter += 1;
                console.log({ emitter: data});
                resolve(data);
            }, 1000);
        });
    };
    causalNetDeployment.Listener = async (data)=>{
        console.log({listener: data});
    };
    causalNetDeployment.Inferencer = (data)=>{
        console.log({'inferencer': data});  
        return data;
    };
    console.log(await causalNetDeployment.deploy());
})().catch(console.error);