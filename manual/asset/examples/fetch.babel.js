import {fetch, Stream, PNGUtils} from 'causal-net.utils';
(async ()=>{
    let link = 'https://avatars3.githubusercontent.com/u/43268620?s=200&v=4';
    let content = await fetch.fetchData(link);
    console.log({'content length': content.length});
});

