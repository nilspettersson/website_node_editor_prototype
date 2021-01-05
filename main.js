let currentNode;
let difX = 0;
let difY = 0;
let setup = false;
let id = 1;

//let nodeActive = false;
let currentNodeInputIndex;
let currentNodeId;

let lineX = 0;
let lineY = 0;


let output;

let canvas;
let g;

window.onload = function(){
    currentNode = null;

    currentNodeInputIndex = "-1";
    currentNodeId = "-1";

    
    nodes = [];

    /*let div = new NodeDiv(0, 0);
    div.addNode(new NodeText(400, 0));*/

    output = new NodeOutput(400, 40);
    //output.addNode(div);

    nodes.push(output);
    nodes.push(new NodeText(40, 40));
    //nodes.push(output);

    output.getHtml();


    /*setInterval(function(){
        output.getHtml();
    }, 100);*/
    

    let css = 'body{ background:lightgray }'

    /*let website = '<!DOCTYPE html>'+
    '<html lang="en">'+
    '<head><title>website</title> <style>'+ css +'</style> </head>'+
    '<body><h1>hello</h1> <p>testing some text to see if ita worka lika me wanta</p></body>'+
    '</html>';

    let viewer = document.getElementById("viewer");
    viewer.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(website);*/

    canvas = document.getElementById("canvas");
    g = canvas.getContext("2d");

    /*g.clearRect(0, 0, canvas.width, canvas.height);
    g.strokeStyle = "gray";
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(400, 100);
    g.stroke();*/
    

}

document.onkeyup = function(e){
    output.getHtml();
}


//if mouse is down on node. 
function mouseDown(e){
    if(currentNodeInputIndex != "-1"){
        console.log(e);

        return;
    }
    currentNode = e;
    setup = true;
    console.log(e);
}

function mouseUp(e){
    currentNodeInputIndex = "-1";
    currentNode = null;
}

document.onmousemove = function(e){
    if(currentNodeInputIndex != "-1"){
        let input = document.getElementsByClassName("input" + currentNodeId)[currentNodeInputIndex];
        console.log(input.getBoundingClientRect());

        lineX = input.getBoundingClientRect().x;
        lineY = input.getBoundingClientRect().y;
        
        g.clearRect(0, 0, canvas.width, canvas.height);
        g.strokeStyle = "gray";
        g.beginPath();
        g.moveTo(lineX - 4, lineY + input.getBoundingClientRect().height / 2 - 4);
        g.lineTo(e.x, e.y);
        g.stroke();
        
    }


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


function inputMouseDown(e, nodeId, inputIndex){
    currentNodeId = nodeId;
    currentNodeInputIndex = inputIndex;
    console.log(inputIndex);
}

/*function inputMouseUp(e, nodeId, inputIndex){
    console.log(nodeId);
}*/


document.onmouseup = function(e){
    if(currentNodeInputIndex != "-1"){
        currentNodeInputIndex = "-1";
    }
    
}


class HtmlNode{
    constructor(x, y, type){
        this.id = id;
        this.createElement(x, y, type);
        this.nodes = [];

        id++;
    }

    addNode(node){
        this.nodes.push(node);
    }


    createElement(x, y, type){
        let node = document.createElement("div");
        node.id = "node" + this.id;
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
        input.classList.add("input" + this.id);

        let dot = document.createElement("div");
        dot.classList.add("dot");
        input.append(dot);

        let nodeId = this.id;
        dot.onmousedown = function(e){inputMouseDown(this, nodeId, 0)}

        //fix this later
        //dot.onmouseup = function(e){inputMouseUp(this, nodeId, 0)}


        let output = document.createElement("div");
        output.classList.add("output");

        node.append(header);
        node.append(this.createContent());
        node.append(input);
        node.append(output);

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

class NodeText extends HtmlNode{
    constructor(x, y){
        super(x, y, "text");
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
