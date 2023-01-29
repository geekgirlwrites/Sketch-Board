const grid = document.getElementById("grid");
const buttons = document.querySelectorAll(".btn");
const clear = document.querySelector("#clear-btn");
let slider = document.getElementById("sizeSlider");
let sizevalue = document.getElementById("sizeValue");
let currentSize = 16;

reloadGrid();

let mouseDown = false;
grid.onmousedown = () => (mouseDown = true);
grid.onmouseup = () => (mouseDown = false);

slider.addEventListener("mousemove", function(event){
    currentSize = event.target.value;
    sizevalue.innerHTML = `${event.target.value} x ${event.target.value}`;
});

slider.onchange = (e)=>{
    currentSize = e.target.value;
    reloadGrid();
}

clear.onclick = ()=> reloadGrid();

function reloadGrid(){
    grid.innerHTML = '';
    makerows(currentSize);
}

buttons.forEach(item => {
    item.addEventListener("click", function(){
        key = this.textContent;
    });
});

function makerows(size){

    grid.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;
    
    for(let c=0; c<size*size; c++){
        let cell = document.createElement("div");
        cell.addEventListener('mouseover', changeColor);
        cell.addEventListener('mousedown', changeColor);
        cell.classList.add("grid-item");
        grid.appendChild(cell);
    };
};

function changeColor(e){
    if(e.type === 'mouseover' && mouseDown === false)
    return;
    if(key === "Eraser"){
        e.target.style.backgroundColor ="white";
    }
    
    if(key === "Rainbow"){
        e.target.style.backgroundColor ='#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    }
    
    if(key === "Black"){
        e.target.style.backgroundColor = "black";
    }
}
