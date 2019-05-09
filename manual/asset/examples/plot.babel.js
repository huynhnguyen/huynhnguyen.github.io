import { termLogger, vivid } from 'causal-net.log';
(async ()=>{
    termLogger.connect();
    termLogger.groupBegin('this is log');
    termLogger.log('this is log');
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
    let plotId = termLogger.plot(plotData);
    await termLogger.show({plotId});
    const makeImageData = (offset, width=28, height=28)=>{
        let imageData = [];
        for (var x=0; x<width; x++) {
            for (var y=0; y<height; y++) {
                var pixelindex = (y * width + x) * 4;
                // Generate a xor pattern with some random noise
                var red = ((x+offset) % 256) ^ ((y+offset) % 256);
                var green = ((2*x+offset) % 256) ^ ((2*y+offset) % 256);
                var blue = 50 + Math.floor(Math.random()*100);
                // Rotate the colors
                blue = (blue + offset) % 256;
                // Set the pixel data
                imageData[pixelindex] = red;     // Red
                imageData[pixelindex+1] = green; // Green
                imageData[pixelindex+2] = blue;  // Blue
                imageData[pixelindex+3] = 255;   // Alpha
            }
        }
        return imageData;
    };
    let data = makeImageData(0);
    plotId = termLogger.plot({type: 'png', data, width:28, height:28, title:'test2'});
    await termLogger.show({plotId});
    
    plotData = {
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
    plotId = termLogger.plot(plotData);
    await termLogger.show({plotId});
    termLogger.groupEnd('this is log');
})();