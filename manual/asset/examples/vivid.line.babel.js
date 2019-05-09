import { vivid } from 'causal-net.log';
(async ()=>{
    let plotData = {
        type: 'line',
        data: {
            'X': [1,2,4,6],
            'y': [3,4,5,6]
        }, 
        'xRange': [-2,2],
        'yRange': [-2,2],
        'xLabel': 'x unit',
        'yLabel': 'y unit',
        'title': 'test3', 
        style: { "body": {"font": "11px"} } };
    let plotId = vivid.line(plotData);
    await vivid.show({plotId});
    termLogger.groupEnd('this is log');
})();