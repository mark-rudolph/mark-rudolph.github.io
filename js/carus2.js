// JavaScript Document
function prepareSlideshow() {
    // Make sure the browser understands the DOM methods
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    
    // Make sure the elements exist
    if (!document.getElementById("linklist2")) return false;
    
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow2");
    
    var preview = document.createElement("img");
    preview.setAttribute("src","img/thum/caru2.jpg");
    preview.setAttribute("alt","building blocks of web design");
    preview.setAttribute("id","preview2");
    slideshow.appendChild(preview);
    
    var list = document.getElementById("linklist2");
    insertAfter(slideshow,list);
    
    // Get all the links in the list
    var links = list.getElementsByTagName("a");
    
    // Attach the animation behavior to the mouseover event
    links[0].onmouseover = function() {
        moveElement("preview2",000,0,10);
    }
    
    links[1].onmouseover = function() {
        moveElement("preview2",-275,0,10);
    }
    
    links[2].onmouseover = function() {
        moveElement("preview2",-550,0,10);
    }
	
	links[3].onmouseover = function() {
        moveElement("preview2",-825,0,10);
    }
	
	links[4].onmouseover = function() {
        moveElement("preview2",-1100,0,10);
    }
	
	links[5].onmouseover = function() {
        moveElement("preview2",-1375,0,10);
    }
	
	links[6].onmouseover = function() {
        moveElement("preview2",-1650,0,10);
    }
	
	links[7].onmouseover = function() {
        moveElement("preview2",-1925,0,10);
    }
	
	links[8].onmouseover = function() {
        moveElement("preview2",-2200,0,10);
    }
	
	links[9].onmouseover = function() {
        moveElement("preview2",-2475,0,10);
    }
}

function moveElement(elementID,final_x,final_y,interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    
    var elem = document.getElementById(elementID);
    
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    
    if (xpos < final_x) {
        var dist = Math.ceil((final_x - xpos)/10);
        xpos = xpos + dist;
    }
    
    if (xpos > final_x) {
        var dist = Math.ceil((xpos - final_x)/10);
        xpos = xpos - dist;
    }
    
    if (ypos < final_y) {
        var dist = Math.ceil((final_y - ypos)/10);
        ypos = ypos + dist;
    }
    
    if (ypos > final_y) {
        var dist = Math.ceil((ypos - final_y)/10);
        ypos = ypos - dist;
    }
    
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(repeat,interval);
}

function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
        } else {
        window.onload = function() {
          oldonload();
          func();
        }
    }
}

addLoadEvent(prepareSlideshow);