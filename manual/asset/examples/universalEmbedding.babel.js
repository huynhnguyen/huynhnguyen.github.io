import { universalEmbedding } from 'causal-net.representation';
import { termLogger } from 'causal-net.log';
import { tokenizer } from 'causal-net.preprocessing';
(async ()=>{
    const BaseModelServer = 'http://0.0.0.0:8080/models/';
    termLogger.groupBegin('load model');
    await tokenizer.connect(BaseModelServer + 'use/vocab.json');
    await universalEmbedding.connect(BaseModelServer + '/use/tensorflowjs_model.json');
    termLogger.log('load finish');
    const asEncode = true;
    let tokens = [tokenizer.tokenize('dog', asEncode),
                  tokenizer.tokenize('cat', asEncode)]; 
    termLogger.log({tokens});
    let sentVec = await universalEmbedding.sentenceEncode(tokens);
    sentVec.print();
    let score = await universalEmbedding.encodeMatching(tokens[0], tokens[1]);
    score.print();
    termLogger.groupEnd();
})().catch(console.err);        