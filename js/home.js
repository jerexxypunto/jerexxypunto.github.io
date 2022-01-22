const categoria__home = [...document.querySelectorAll(".home__categorias section")];
const categoria__home_contenido = [...document.querySelectorAll(".home__categorias--contenido section")];

const altura = 500;



const cambiarAltura = (cuanto)=> {
    let alturaFinal;
    if (cuanto > 1){
        alturaFinal = (altura * (cuanto - 1)) * -1;
        return alturaFinal + "px"
    }else{
        alturaFinal=0;
        return alturaFinal + "px"
    }
}

const modificator = (data)=>{
    categoria__home_contenido.forEach((item)=>{
        item.style.top=  data;
    });
}

categoria__home.forEach((item)=>{
    item.addEventListener('click',(evento) => {
        categoria__home.forEach(i => i.classList.remove("activo"));
        evento.target.classList.add("activo");
        switch (evento.target.getAttribute("data-id")) {
            case "1":
                console.log(evento.target.getAttribute("data-id"));
                modificator(cambiarAltura(1));
                break;
            case "2":
                console.log(evento.target.getAttribute("data-id"));
                modificator(cambiarAltura(2));
                break;
        
            default:
                console.log(evento.target.getAttribute("data-id"));
                modificator(cambiarAltura(3));
                break;
            }
        
    });
});

