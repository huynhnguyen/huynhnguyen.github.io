import { pngUtils } from 'causal-net.utils';
(async ()=>{
    const link = 'https://avatars3.githubusercontent.com/u/43268620?s=200&v=4';
    let fetchedData = await pngUtils.fetchPNG(link);
    console.log(fetchedData.length);
})();