let currentNode;
let difX = 0;
let difY = 0;
let setup = false;

id = 1;

let output;

window.onload = function(){
    currentNode  = null;

    nodes = [];
    //nodes.push(new NodeDiv(0, 0));
    let div = new NodeDiv(0, 0);
    div.addNode(new NodeP(400, 0));

    output = new NodeOutput(90, 40);
    output.addNode(div);

    nodes.push(output);

    output.getHtml();


    /*setInterval(function(){
        output.getHtml();
    }, 100);*/
    

    let css = 'body{ background:lightgray}'

    /*let website = '<!DOCTYPE html>'+
    '<html lang="en">'+
    '<head><title>website</title> <style>'+ css +'</style> </head>'+
    '<body><h1>hello</h1> <p>testing some text to see if ita worka lika me wanta</p></body>'+
    '</html>';

    let viewer = document.getElementById("viewer");
    viewer.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(website);*/

}

document.onkeyup = function(e){
    output.getHtml();
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
    constructor(x, y, type){
        this.id = id;
        this.createElement(x, y, type);
        this.nodes = [];
    }

    addNode(node){
        this.nodes.push(node);
    }

    createElement(x, y, type){
        let node = document.createElement("div");
        node.id = "node" + id++;
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
    constructor(x, y){
        super(x, y, "div");
    }

    getHtml(){
        let html = '';
        for(let i = 0; i < this.nodes.length; i++){
            /*console.log(this.nodes[i].getHtml());*/
            html += this.nodes[i].getHtml();
        }

        return '<div>' + html + '</div>'
    }
}

class NodeP extends HtmlNode{
    constructor(x, y){
        super(x, y, "div");
    }

    createContent(){
        let content = document.createElement("div");
        content.classList.add("content");

        let text = document.createElement("textarea");
        text.id = "textarea" + this.id;

        content.append(text);

        return content;
    }

    getHtml(){
        
        return '<p>' + document.getElementById("textarea" + this.id).value + '</p>';
    }
}


class NodeOutput extends HtmlNode{
    constructor(x, y){
        super(x, y, "output");
    }

    getHtml(){
        let html = '';
        for(let i = 0; i < this.nodes.length; i++){
            /*console.log(this.nodes[i].getHtml());*/
            html += this.nodes[i].getHtml();
        }

        let website = '<!DOCTYPE html>'+
        '<html lang="en">'+
        '<head><title>website</title> <style></style> </head>'+
        '<body>' + html + '</body>'+
        '</html>';
    
        let viewer = document.getElementById("viewer");
        viewer.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(website);
    }
}

