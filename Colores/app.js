const boton = document.querySelector('button');
const color = document.getElementById('color');


let colorGuardado = "#FFFFFF"; 

function colorAleatorioH() {
    let digitos = '0123456789ABCDEF';
    let colorA = '#';

    for(let i = 0; i < 6; i++){
        let indiceAl = Math.floor(Math.random() * 16);
        colorA +=  digitos[indiceAl];
    }
    return colorA;
}

boton.addEventListener('click', function(){

    let nuevoColor = colorAleatorioH();  

  
    color.textContent = `${nuevoColor}`;


    document.body.style.background =
        `linear-gradient(to bottom, ${colorGuardado} 50%, ${nuevoColor} 50%)`;

    colorGuardado = nuevoColor;
});
