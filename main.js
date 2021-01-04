window.onload = function(){
    /*window.open('data:text/html;charset=utf-8,' +
    encodeURIComponent( // Escape for URL formatting
        '<!DOCTYPE html>'+
        '<html lang="en">'+
        '<head><title>Embedded Window</title></head>'+
        '<body><h1>42</h1></body>'+
        '</html>'
    )
    );*/

    let css = 'body{ background:red}'

    let website = '<!DOCTYPE html>'+
    '<html lang="en">'+
    '<head><title>website</title> <style>'+ css +'</style> </head>'+
    '<body><h1>hello</h1> <p>testing some text to see if ita worka lika me wanta</p></body>'+
    '</html>';

    let viewer = document.getElementById("viewer");
    viewer.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(website);

}