const categoria__home = document.querySelectorAll(".home__categorias section");
const categoria__home_contenido = document.querySelectorAll(".home__categorias--contenido section");

let pos = 0;

categoria__home[0].addEventListener('click', () => pos = 1);
categoria__home[1].addEventListener('click', () => pos = 2);
categoria__home[2].addEventListener('click', () => pos = 3);

categoria__home.forEach((item)=>{
    item.addEventListener('click',(evento) => {
        categoria__home.forEach((e)=> {
            e.classList.remove("activo")
            
        });
        evento.currentTarget.classList.toggle("activo");
        categoria__home_contenido.forEach((i)=>{
            i.classList.remove("activo");
        });
        categoria__home_contenido[pos - 1].classList.add("activo");
    });
});

