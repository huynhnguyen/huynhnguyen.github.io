import fs from 'fs';
import {LevelDBStorage} from 'causal-net.storage';
import {Fetch, PNG} from 'causal-net.utils';
import {Function} from 'causal-net.preprocessing';
import {promisify} from 'util';
const WriteFile = promisify(fs.writeFile);
(async ()=>{
    const DatasetSummary = {
        name: 'MNIST',
        description: 'handwriting dataset',
        type:'image/png',
        sampleSize: [28,28,4],
        numSamples: 65000,
        numClasses: 10,
        dataUrl: 'https://storage.googleapis.com/learnjs-data/model-builder/mnist_labels_uint8',
        labelUrl: 'https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png',
        samplePerChunk: 100
    }
    const NAME = DatasetSummary.name;
    const ChunkSize = DatasetSummary.samplePerChunk;
    const storage = new LevelDBStorage();
    const F = new Function();
    const R = F.CoreFunction;
    const LabelUrl = DatasetSummary.dataUrl;
    const ImgUrl   = DatasetSummary.labelUrl;
    console.log({LabelUrl, ImgUrl});
    let _labelBuffer = await Fetch.fetchData(LabelUrl);
    let labelBuffer = Buffer.from(_labelBuffer);
    let imageBuffer = await storage.fetchPNG(ImgUrl);
    let png = new PNG({width: 28, height: 28*65000, filterType:4});
    png.data = imageBuffer;
    png.pack().pipe(fs.createWriteStream(`./${NAME}_dataset/data.png`));
    await WriteFile(`./${NAME}_dataset/label`, labelBuffer);
    console.log({imageBuffer: imageBuffer.length, labelbuffer: labelBuffer.length});
    
    let splitedImageBuffer = F.splitBuffer(imageBuffer, ChunkSize*28*28*4);
    let splitedLabelBuffer = F.splitBuffer(labelBuffer, ChunkSize*10);
    
    console.log({splitedImageBuffer:splitedImageBuffer.length, splitedLabelBuffer: splitedLabelBuffer.length});
    let chunkList = [];
    for(let idx of R.range(0, splitedImageBuffer.length)){
        console.log({idx});
        chunkList.push(idx);
        let png = new PNG({width: 28, height: 28*ChunkSize, filterType:4});
        png.data = splitedImageBuffer[idx];
        png.pack().pipe(fs.createWriteStream(`./${NAME}_dataset/data-chunk-${idx}.png`));
        await WriteFile(`./${NAME}_dataset/label-chunk-${idx}`, splitedLabelBuffer[idx]);
    }
    DatasetSummary.chunkList = chunkList;
    await WriteFile(`./${NAME}_dataset/dataset.summary.json`, JSON.stringify(DatasetSummary));
})();
