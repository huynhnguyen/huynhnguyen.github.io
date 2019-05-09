var { termLogger } = require('causal-net.log');
$.when( $.ready ).then(function() {
    $('*a:contains("Run code")').each(function() {
        $(this).addClass('pure-button');
        $(this).attr('disabled');
        $(this).on('click', function(event){
            event.preventDefault();
            let Link = $(this).attr("href");
            Link = Link.startsWith('./manual/')?Link:'./manual/'+Link;
            fetch(Link).then(res=>res.text().then(text=>{
                const transpileCode = transpiler(text);
                console.log({res: text, transpile: transpileCode});
                const Run = new Function(transpileCode);
                //auto connect here
                const demo_name = $(this).attr('Name');
                console.log({demo_name});
                termLogger.connect(demo_name);
                Run();
            }));
        });
        const Link = $(this).attr("href");
        const Name = Link.split(/[\/]+/).pop().replace(/\./g,'_');
        $(this).attr('Name', `#demo_${Name}`);
        $(this).after(`<div id="demo_${Name}" class="term-logger"></div>`);
        console.log({Name, Link, 'a':'cv'});
    });
});