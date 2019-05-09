import { causalNetEmbedding } from 'causal-net.representation';
import { termLogger } from 'causal-net.log';
(async ()=>{
    const configLink = '../../datasets/WordVec_EN/';
    await causalNetEmbedding.connect(configLink, true);
    //first time transform will find on storage cache
    let vecs = await causalNetEmbedding.transform(['this', 'is', 'test']);
    for(let vec of vecs){
        termLogger.log({ vec });
    }
    //second time transform will find on memory cache
    vecs = await causalNetEmbedding.transform(['this', 'is', 'test']);
    for(let vec of vecs){
        termLogger.log({ vec });
    }
    //return the tensor representing sentence
    let sentVec = await causalNetEmbedding.sentenceEncode([ ['this', 'is', 'test'] ]);
    sentVec.print();
})().catch(err=>{
    console.error(err);
});