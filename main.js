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


    output = new NodeOutput(600, 40);

    nodes.push(output);
    /*nodes.push(new NodeDiv(300, 20));
    nodes.push(new NodeText(40, 40));*/

    for(let i = 0; i < 6; i++){
        nodes.push(new NodeDiv(20, 20));
    }

    for(let i = 0; i < 6; i++){
        nodes.push(new NodeText(20, 120));
    }

    output.getHtml();


    /*setInterval(function(){
        output.getHtml();
    }, 100);*/
    

    let css = 'body{ background:lightgray }'

    canvas = document.getElementById("canvas");
    g = canvas.getContext("2d");

    
    drawLines();
}

function drawLines(){
    g.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < nodes.length; i++){
        nodes[i].drawLines();
    }
}



document.onkeyup = function(e){
    output.getHtml();
}


//if mouse is down on node. 
function mouseDown(e){
    if(currentNodeInputIndex != "-1"){

        return;
    }
    currentNode = e;
    setup = true;
}

function mouseUp(e){
    currentNodeInputIndex = "-1";
    currentNode = null;
}

document.onmousemove = function(e){
    if(currentNodeInputIndex != "-1"){
        let input = document.getElementsByClassName("input" + currentNodeId)[currentNodeInputIndex];

        lineX = input.getBoundingClientRect().x;
        lineY = input.getBoundingClientRect().y;
        
        drawLines();
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

    drawLines();

}


function inputMouseDown(e, nodeId, inputIndex){
    currentNodeId = nodeId;
    currentNodeInputIndex = inputIndex;
    console.log(inputIndex);
}

/*function inputMouseUp(e, nodeId, inputIndex){
    console.log(nodeId);
}*/


//adds child node to parent
function outputMouseUp(e, nodeId){
    console.log(e);
    let parent = null;
    for(let i = 0; i < nodes.length; i++){
        if(nodes[i].id == currentNodeId){
            parent = nodes[i];
            break;
        }
        else{
            parent = nodes[i].findNode(currentNodeId);
            console.log("parent " + parent);
            if(parent != null){
                break;
            }
        }
        console.log(i);
    }
    console.log(nodes.length);
    if(parent == null){
        return;
    }

    for(let i = 0; i < nodes.length; i++){
        if(nodes[i].id == nodeId){
            parent.addNode(nodes[i]);
            nodes.splice(i, 1);

            let input = parent.createInput(parent.nodes.length);
            document.getElementById("node" + currentNodeId).append(input);

            break;
        }
        
    }

    console.log(output);
    drawLines();
}




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

    drawLines(){
        for(let i = 0; i < this.nodes.length; i++){
            let node = document.getElementsByClassName("input" + this.id)[i];
            //console.log(node.getBoundingClientRect());

            let startX = node.getBoundingClientRect().x - 4;
            let startY = node.getBoundingClientRect().y + node.getBoundingClientRect().height / 2 - 4;

            let childNode = document.getElementById("node" + this.nodes[i].id);
            //console.log(childNode.getBoundingClientRect());
            let endX = childNode.getBoundingClientRect().x + childNode.getBoundingClientRect().width - 4;
            let endY = childNode.getBoundingClientRect().y + 16;


            g.strokeStyle = "gray";
            g.beginPath();
            g.moveTo(startX, startY);
            g.lineTo(endX, endY);
            g.stroke();

            this.nodes[i].drawLines();
        }
    
    
    }

    findNode(nodeId){
        for(let i = 0; i < this.nodes.length; i++){
            if(this.nodes[i].id == nodeId){
                return this.nodes[i];
            }
            else{
                let foundNode = this.nodes[i].findNode(nodeId);
                if(foundNode != null){
                    return foundNode;
                }
            }
            
        }
        return null;
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



        /*let input = document.createElement("div");
        input.classList.add("input");
        input.classList.add("input" + this.id);

        let dot = document.createElement("div");
        dot.classList.add("dot");
        input.append(dot);

        let nodeId = this.id;
        dot.onmousedown = function(e){inputMouseDown(this, nodeId, 0)}*/

        //fix this later
        //dot.onmouseup = function(e){inputMouseUp(this, nodeId, 0)}


        let output = document.createElement("div");
        output.classList.add("output");
        let nodeId = this.id;
        output.onmouseup = function(e){outputMouseUp(this, nodeId)}

        node.append(header);
        node.append(this.createContent());
        node.append(this.createInput(0));
        node.append(output);

        document.getElementById("editor").append(node);
    }

    createContent(){
        let content = document.createElement("div");
        return content;
    }

    createInput(index){
        let input = document.createElement("div");
        input.classList.add("input");
        input.classList.add("input" + this.id);
    
        let dot = document.createElement("div");
        dot.classList.add("dot");
        input.append(dot);

        let nodeId = this.id;
        dot.onmousedown = function(e){inputMouseDown(this, nodeId, index)}

        return input;
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

