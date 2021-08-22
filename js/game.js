var canvas, ctx, obstacles, target, player;
const FPS = 1000 / 60;

window.onload = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    
    player = {x:60, y:540, color:"#64ad25", radius: 40};
    target = {x:540, y:60, color:"#e24141", radius: 40};
    obstacles = [
        {x:60, y:60, color:"#3e3e3e", radius: 60},
        {x:180, y:60, color:"#3e3e3e", radius: 60},
        {x:300, y:60, color:"#3e3e3e", radius: 60},
        {x:420, y:60, color:"#3e3e3e", radius: 60},
        {x:60, y:180, color:"#3e3e3e", radius: 60},
        {x:180, y:180, color:"#3e3e3e", radius: 60},
        {x:300, y:180, color:"#3e3e3e", radius: 60},
        {x:420, y:180, color:"#3e3e3e", radius: 60},
        {x:180, y:540, color:"#3e3e3e", radius: 60},
        {x:300, y:540, color:"#3e3e3e", radius: 60},
        {x:420, y:540, color:"#3e3e3e", radius: 60},
        {x:540, y:540, color:"#3e3e3e", radius: 60},
    ];
    
    setInterval(gameloop, FPS);
    addEventListener("mousemove", onmousemove);
}

function onmousemove(){
    player.x = event.clientX - canvas.offsetLeft;
    player.y = event.clientY - canvas.offsetTop;
}

function gameloop(){
    update();
    draw();
}

function update(){
    if(checkCollision(player,target)) window.location = "win.html";
    for(var i=0; i<obstacles.length; i++){
        if(checkCollision(player, obstacles[i])){
            window.location = "gameover.html";
            break;
        }
    }
}

function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for(var i=0; i<obstacles.length; i++){
        drawCircle(obstacles[i]);
    }
    drawCircle(target);
    drawCircle(player);
}

function drawCircle(c){
    ctx.beginPath();
    ctx.fillStyle = c.color;
    ctx.arc(c.x, c.y, c.radius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

function checkCollision(c1,c2){
    var distance = Math.sqrt( Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2) );
    return (distance <= c1.radius + c2.radius);
}