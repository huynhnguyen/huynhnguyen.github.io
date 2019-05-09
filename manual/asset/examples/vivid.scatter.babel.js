import { vivid } from 'causal-net.log';
(async ()=>{
    let plotData = {
                type: 'scatter',
                data: {
                    'X': [[0,0],[1,0],[0,1]],
                    'Y': [[-1,-1],[-1,0],[0,-1]],
                }, 
                'xRange': [-2,2],
                'yRange': [-2,2],
                'xLabel': 'may be x',
                'yLabel': 'y unit',
                'title': 'test', 
                style: { "body": {"font": "11px"} } };
    let plotId = vivid.scatter(plotData);
    await vivid.show({plotId});
})();