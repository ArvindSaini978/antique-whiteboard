const canvas = document.getElementById('draw');
const clear = document.getElementById('clear');
const clearImg = document.querySelector('#clear img');
const linewidth = document.getElementById('linewidth');
const linecolor = document.getElementById('linecolor');
const linewidthLabel = document.getElementById('linewidthLabel');
const brush = document.querySelector('.openBox');
const brushImg = document.querySelector('.openBox img');
const tools = document.querySelector('.opened');
const ctx = canvas.getContext('2d');
// variables
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let lineH = linewidth.value;
let lineClr = linecolor.value;
// canvas properties
ctx.width = window.innerWidth;
ctx.height = window.innerHeight;
ctx.strokeStyle = lineClr;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = lineH;

const updateProgressBar = (val) => {
    let target = linewidth;
    const min = target.min;
    const max = target.max;
    target.style.backgroundSize = (val - min) * 100 / (max - min) + "% 100%"
}
updateProgressBar(4)

// change line width
linewidth.addEventListener('input', (e)=>{
    linewidthLabel.innerText = `Line Thickness: ${e.target.value}`
    lineH = e.target.value;
    ctx.lineWidth = lineH;
    updateProgressBar(e.target.value)
});
// change line color
linecolor.addEventListener('input', (e)=>{
    lineClr = e.target.value;
    ctx.strokeStyle = lineClr;
})
// draw on canvas
const draw = (e) => {


    if (!isDrawing) {
        return //stop the function when not drawing
    }
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => { isDrawing = false });
canvas.addEventListener('mouseout', () => { isDrawing = false });


//clear canvas
clear.addEventListener('click', ()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})
clear.addEventListener('mouseenter', ()=>{
    clearImg.src = './static/erase_white.png'
})
clear.addEventListener('mouseleave', ()=>{
    clearImg.src = './static/erase_red.png'
})
brush.addEventListener('mouseenter', ()=>{
    brushImg.src = './static/brush_white.png'
})
brush.addEventListener('mouseleave', ()=>{
    brushImg.src = './static/brush_red.png'
})
tools.addEventListener('mouseenter', ()=>{
    brushImg.src = './static/brush_white.png'
    brush.classList.add('active');
})
tools.addEventListener('mouseleave', ()=>{
    brushImg.src = './static/brush_red.png'
    brush.classList.remove('active');
})
brush.addEventListener('click', ()=>{
    tools.classList.toggle('active')
})
document.addEventListener('mousedown', (e)=>{
    if ((e.target.id!=='openBox') && (e.target.id!=='opened') && (e.target.id!=='color') && (e.target.id!=='linecolorLabel') && (e.target.id!=='linecolor') && (e.target.id!=='divider') && (e.target.id!=='width') && (e.target.id!=='linewidthLabel') && (e.target.id!=='linewidth') && (e.target.id!=='openBoxImg')) {
        tools.classList.remove('active');
    }
})