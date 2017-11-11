var img;
var bolinhas = [];
var mouseXant;
var mouseYant;
var minX;
var minY;
var maxX;
var maxY;
var minXimg;
var minYimg;
var maxXimg;
var maxYimg;
var zise = 500;

function setup(){
    img = loadImage('Estoni19.jpg');
    createCanvas(innerWidth,innerHeight);
    noStroke();
    
    minX = width/2 - zise/2;
    maxX = width/2 + zise/2;
    minY = height/2 - zise/2;
    maxY = height/2 + zise/2;
    
    minXimg = 0;
    maxXimg = img.width;
    minYimg = 0;
    maxXimg = img.height;   
    
    bolinha={
        x:width/2,
        y:height/2,
        w:zise,
        h:zise,
        min:2,
        cor:color(185,76,225),
       
        getColor:function(){
            x =map(this.x, minX, maxX, minXimg,maxXimg);
            y =map(this.y, minY, maxY, minYimg,maxYimg);
            this.cor = color(img.get(x,y));
        },
        
        split: function(){
            w = this.w/2;
            h = this.h/2;
            
            if(w<this.min){
                return [this];
            }

            
            quatro = [];
            for( let i=0;i<4;i++){
                quatro.push(Object.create(bolinha));
                quatro[i].w = w;
                quatro[i].h = h;
            }

            quatro[0].x=this.x-w/2;
            quatro[0].y=this.y-h/2;
            quatro[1].x=this.x+w/2;
            quatro[1].y=this.y-h/2;
            quatro[2].x=this.x-w/2;
            quatro[2].y=this.y+h/2;
            quatro[3].x=this.x+w/2;
            quatro[3].y=this.y+h/2; 
            quatro[0].getColor();
            quatro[1].getColor();
            quatro[2].getColor();
            quatro[3].getColor();
       
            return quatro;

        }
        
    }
    
    bolinhas.push(bolinha);
  
}
function draw(){
    background(255)
    for(let i=bolinhas.length-1;i>=0;i--){
        b=bolinhas[i];  
        fill(b.cor);
        ellipse(b.x,b.y,b.w,b.h);
        
         if(dist(mouseXant,mouseY,b.x,b.y) > b.w/2){
            if(dist(mouseX,mouseY,b.x,b.y) < b.w/2){
                novas = b.split();
                bolinhas.splice(i,1);
                Array.prototype.push.apply(bolinhas,novas);
                mouseXant = mouseX;
                mouseYant = mouseY;
            }
            
        }
            
    }
    mouseXant = mouseX;
    mouseYant = mouseY;
}

function dist(ax,ay,bx,by){
    dist = Math.sqrt((ax-bx)^2 + (ay-by)^2);
    return dist;
    
    
}