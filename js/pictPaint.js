var stage = new createjs.Stage('canvas1');
var shape = new createjs.Shape();
var penColor;
var bgColor = "snow";
var penWidth;
var mouseX;
var mouseY;

window.addEventListener('load',function(){

    window.addEventListener('resize',handleResize);

    var imageFile = this.document.getElementById("imageFile");
    imageFile.addEventListener('change', handleImageChange);

    var penColorElem = document.getElementById("penColor");
    penColor = penColorElem.value;
    penColorElem.addEventListener('change',handlePenColorChange);

    var penWidthElem = document.getElementById("penWidth");
    penWidth = penWidthElem.value;
    penWidthElem.addEventListener('change',handlePenWidthChange);

    if(createjs.Touch.isSupported() == true){
        createjs.Touch.enable(stage,true,true);
    }

    stage.addEventListener("stagemousedown",handleStageMouseDown);
    
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", function() {
      stage.update();
    });

    setCanvasSize();
    clearCanvas();
    stage.addChild(shape);
    stage.update();
});

function handleStageMouseDown(ev){
    
    shape.graphics
        .setStrokeStyle(parseInt(penWidth))
        .beginStroke(penColor)
        .moveTo(ev.stageX,ev.stageY);

    stage.addEventListener("stagemousemove",handleStageMouseMove);
    stage.addEventListener("stagemouseup",handleStageMouseUp);
    
}

function handleStageMouseMove(ev){
    shape.graphics.lineTo(ev.stageX,ev.stageY);
}

function handleStageMouseUp(ev){
    shape.graphics.lineTo(ev.stageX,ev.stageY);
    
    shape.graphics.endStroke();
    
    stage.removeEventListener("stagemousemove",handleStageMouseMove);
    stage.removeEventListener("stagemouseup",handleStageMouseUp);
    
}

function handleResize(){
    setCanvasSize();
    stage.update();
}

function handlePenColorChange(ev){
    penColor = ev.target.value;
}

function handlePenWidthChange(ev){
    penWidth = ev.target.value;
}

function handleImageChange(ev){
    var file = ev.target.files[0];
    var reader = new FileReader();
    reader.onload = function(){
        var img = new Image();
        img.onload = function(){
            setCanvasSize();
            clearCanvas();
            var bmp = new createjs.Bitmap(img);
            if(img.width > img.height)
            {
                bmp.scale = stage.canvas.width/img.width;
                stage.canvas.height = img.height*bmp.scale;
            }else{
                bmp.scale = stage.canvas.height/img.height;
                stage.canvas.width = img.width*bmp.scale;
            }
                
            stage.addChild(bmp);
            stage.addChild(shape);
            stage.update();
        };
        img.src=reader.result;
    };
    reader.onerror = function(e){
        alert("file load error.(" + e.error.code);
    };
    reader.readAsDataURL(file);

}

function clearCanvas(){
    stage.removeAllChildren();
    shape.graphics.clear();
            
    var bg = new createjs.Shape();
    bg.graphics.beginFill(bgColor);
    bg.graphics.drawRect(0,0,stage.canvas.width,stage.canvas.height);
    bg.graphics.endFill();
    stage.addChild(bg);
}

function setCanvasSize(){
    var menu = document.getElementById("menu");
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight - menu.clientHeight;
}

