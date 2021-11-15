

const loadText = document.querySelector('.text-load');
const bigrich = document.querySelector('.bigrich');


let load = 0;

let int = setInterval(blurring, 70);

function blurring() {
    load++;

    console.log(loadText);

    if (load > 99) {
        clearInterval(int);

    }
    loadText.innerHTML = `${load}%`;
    loadText.style.opacity = scale(load, 0, 100, 1, 0);
    bigrich.style.filter = `blur(${scale(load, 0, 100, 60, 0)}px)`;
}


function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}



