import { pngUtils } from 'causal-net.utils';
(async ()=>{
    let data = await pngUtils.readPNG('../../datasets/icon.png');
    console.log(data.length);
    pngUtils.writePNG(data, [200, 200, 4], './out.png');
})();
