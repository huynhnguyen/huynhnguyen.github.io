import { csvUtils } from 'causal-net.utils';
(async ()=>{
    let data = await csvUtils.readCSV('./credict.csv');
    console.log(data);
    let headers = Object.keys(data[0]);
    await csvUtils.writeCSV(headers, data, './output.csv');
    data = await csvUtils.readCSV('./output.csv');
    console.log(data);
    // console.log(await csvUtils.chunkCSV('./output.csv',3,'./chunk-{}.csv'));
    // const csvlink = 'https://media.githubusercontent.com/media/red-gold/causality/master/datasets/credict.csv';
    // data = await csvUtils.fetchCSV(csvlink);
    // console.log(data);
    // data = [{'a':'a','text':'"this is text\n,;"'}];
    // await csvUtils.writeCSV(['a','text'], data, './output.csv');
    // console.log(await csvUtils.readCSV('./output.csv'));
})();
