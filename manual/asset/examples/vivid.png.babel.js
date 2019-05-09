import { vivid } from 'causal-net.log';
(async ()=>{
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
    let plotId = vivid.png({type: 'png', data, width:28, height:28, title:'test2'});
    await vivid.show({plotId});
})();