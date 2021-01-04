let currentNode;
let difX = 0;
let difY = 0;
let setup = false;

window.onload = function(){
    currentNode  = "-1";

    let css = 'body{ background:lightgray}'

    let website = '<!DOCTYPE html>'+
    '<html lang="en">'+
    '<head><title>website</title> <style>'+ css +'</style> </head>'+
    '<body><h1>hello</h1> <p>testing some text to see if ita worka lika me wanta</p></body>'+
    '</html>';

    let viewer = document.getElementById("viewer");
    viewer.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(website);

}


function mouseDown(e){
    currentNode = e.id;
    setup = true;
    console.log(e.id);
}

function mouseUp(e){
    currentNode = "-1";
}

document.onmousemove = function(e){
    if(currentNode == "-1"){
        return;
    }
    
    let x = e.pageX;
    let y = e.pageY;
    let node = document.getElementById(currentNode);

    let nodeX = node.style.left.replace("px", "");
    let nodeY = node.style.top.replace("px", "");

    if(setup){
        console.log(nodeX + " *** " + x);
        difX = nodeX - x;
        difY = nodeY - y;
        setup = false;
    }

    console.log(difX);

    node.style.left = (x + difX) + "px";
    node.style.top = (y + difY) + "px";
}