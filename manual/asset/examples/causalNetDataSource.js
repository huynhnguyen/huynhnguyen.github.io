import { causalNetDataSource } from 'causal-net.datasets';

(async ()=>{
    let description = await causalNetDataSource.connect('../../datasets/MNIST_dataset_NoSplit/');
    console.log( description );
    console.log( causalNetDataSource.SampleSize );
    console.log( causalNetDataSource.chunkSelect(1) );
    const SampleReader = causalNetDataSource.SampleReader;
    const LabelReader = causalNetDataSource.LabelReader;
    for(let { Sample, Label, ChunkName } of causalNetDataSource.chunkSelect(1) ){
        let sampleData = await SampleReader(Sample);
        let labelData = await LabelReader(Label);
        console.log({ ChunkName, 
                      [Sample]: sampleData.length, 
                      [Label]: labelData.length });
    }
    let readreport = await causalNetDataSource.read();
    console.log({ readreport });
})().catch(console.error);