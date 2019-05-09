import { indexDBStorage } from 'causal-net.storage';
(async ()=>{
    await indexDBStorage.writeFile('/temp','12345');
    let content  = await indexDBStorage.readFile('/temp');
    console.log({content});
    
    //get file list
    let listFiles = await indexDBStorage.getFileList('/');
    console.log({listFiles});
    
    //fetch png image and save pixel data into file
    const url = 'https://avatars3.githubusercontent.com/u/43268620?s=200&v=4';
    await indexDBStorage.fetchPNGFile(url, 'icon');
    const pixelArray = await indexDBStorage.readPNGFile('icon');
    console.log({ pixelArray });

    let ops = [
        { type: 'put', key: 'temp', value: '123445' },
        { type: 'del', key: 'temp' }];
    //batch does not support 'get' type
    let batchResult = await indexDBStorage.batch(ops);
    console.log({batchResult});
})().catch(err=>{
    console.error(err);
});
