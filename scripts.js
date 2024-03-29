var pageWidth=Math.trunc($(window).width()/22);
var pageHeight=Math.trunc($(window).height()/22);
var actualColour='red';
var mouseXPosition;
var mouseYPosition;

$(document).ready(function(){
    var pixelIndex=0;
    for(var x=1;x<=pageHeight;x++){
        $('#body').append('<div id="'+x+'" style="height:22px;width:100%;user-drag: none;-moz-user-select: none;"></div>');
        for(var i=1;i<=pageWidth;i++){
            $('#'+x+'').append('<span class="pixel '+pixelIndex+'" style="display:inline-block;width:20px;height:20px;border:1px solid black;margin:0"></span>');
            pixelIndex++;
        }
    }    
})

$(document).on('mousemove',function(event){
    mouseXPosition=Math.trunc((event.pageX)/22);
    mouseYPosition=Math.trunc((event.pageY)/22);
})

function paintPixel(){
    var pixelNumber=getPixelNumber();
    $('.'+pixelNumber).css('background-color',actualColour);
}

function cleanPixel(){
    var pixelNumber=getPixelNumber();
    $('.'+pixelNumber).css('background-color','white');
}

function getPixelNumber(){
    if(mouseYPosition==0){
        return mouseXPosition;
    }
    return mouseXPosition+mouseYPosition*pageWidth; //Debo truncar porque si no me devuelve con coma (los for fu)
}

$('body').on('mouseup','.pixel',function(event){
    var screenPixels;
    switch(event.which){
        case 1:
            var screenPixels=document.getElementsByClassName('pixel');
            for(var i=0;i<screenPixels.length;i++){
                screenPixels[i].removeEventListener('mousemove',paintPixel);
            }  
            break;
        case 3:
            var screenPixels=document.getElementsByClassName('pixel');
            for(var i=0;i<screenPixels.length;i++){
                screenPixels[i].removeEventListener('mousemove',cleanPixel);
            }  
            break;
    }    
})

$('body').on('mousedown','.pixel',function(event){
    var screenPixels;
    switch(event.which){
        case 1:
            paintPixel();
            screenPixels=document.getElementsByClassName('pixel');
            for(var i=0;i<screenPixels.length;i++){
                screenPixels[i].addEventListener('mousemove',paintPixel);
            }  
            break;
        case 3:
            cleanPixel();
            screenPixels=document.getElementsByClassName('pixel');
            for(var i=0;i<screenPixels.length;i++){
                screenPixels[i].addEventListener('mousemove',cleanPixel);
            }  
            break;
    }       
})