let currentNode;
let difX = 0;
let difY = 0;
let setup = false;

window.onload = function(){
    currentNode  = null;

    nodes = new NodeTree();
    nodes.addNode(new NodeDiv(0, 0));
    nodes.addNode(new NodeP(90, 40));

    /*node = new NodeDiv(0, 0);
    node = new NodeP(90, 40);*/

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
    currentNode = e;
    setup = true;
    console.log(e);
}

function mouseUp(e){
    currentNode = null;
}

document.onmousemove = function(e){
    if(currentNode == null){
        return;
    }
    let x = e.pageX;
    let y = e.pageY;

    //removes the px to get the location of the node
    let nodeX = currentNode.style.left.replace("px", "");
    let nodeY = currentNode.style.top.replace("px", "");

    if(setup){
        difX = nodeX - x;
        difY = nodeY - y;
        setup = false;
    }

    currentNode.style.left = (x + difX) + "px";
    currentNode.style.top = (y + difY) + "px";
}

class HtmlNode{
    constructor(x, y, id, type){
        this.createElement(x, y, id, type);
    }

    createElement(x, y, id, type){
        let node = document.createElement("div");
        node.id = id;
        node.style.left = x + "px";
        node.style.top = y + "px";
        node.classList.add("node");
        node.onmousedown = function(e){mouseDown(this)}
        node.onmouseup = function(e){mouseUp(this)}

        let header = document.createElement("div");
        header.classList.add("header");

        let headerText = document.createElement("p");
        headerText.innerHTML = type;
        header.append(headerText);

        let input = document.createElement("div");
        input.classList.add("input");

        node.append(header);
        node.append(this.createContent());
        node.append(input);

        document.getElementById("editor").append(node);
    }

    createContent(){
        let content = document.createElement("div");
        return content;
    }

}
class NodeDiv extends HtmlNode{
    constructor(x, y, id){
        super(x, y, id, "div");
    }
}

class NodeP extends HtmlNode{
    constructor(x, y, id){
        super(x, y, id, "div");
    }

    createContent(){
        let content = document.createElement("div");
        content.classList.add("content");

        let text = document.createElement("textarea");

        content.append(text);

        return content;
    }
}

class NodeTree{
    constructor(){
        this.nodes = [];
    }

    addNode(node){
        this.nodes.push(node);
    }
}