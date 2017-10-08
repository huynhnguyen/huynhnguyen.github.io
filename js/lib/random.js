// random.js
function normal(mu, sigma, nsamples){
    if(!nsamples) nsamples = 6
    if(!sigma) sigma = 1
    if(!mu) mu=0

    var run_total = 0
    for(var i=0 ; i<nsamples ; i++){
       run_total += Math.random()
    }

    return sigma*(run_total - nsamples/2)/(nsamples/2) + mu
}