const grid = new Muuri('.galeria__grid', {
    layout: {
        rounding: true
    }
});

// Detectar items
const items = document.querySelectorAll(".galeria__grid .item");
const modal_close = document.querySelector("#modal .modal-cabezera p");

const modal_img = document.querySelector("#modal .modal-img picture img");

let src_modal;
items.forEach(item => {
    item.addEventListener('click',()=>{
        src_modal = item.children[0].children[0].getAttribute("src");
        modal_img.setAttribute('src', src_modal);
        document.querySelector("#modal").setAttribute('open', true);
    });
});

// cerrar modal
modal_close.addEventListener('click',()=>{
    document.querySelector("#modal").removeAttribute('open');
});

window.addEventListener('load', ()=>{
    grid.refreshItems().layout;
    document.querySelector(".galeria__grid").classList.add('imagenes-cargadas');

    // agregar listener para enlaces
    const enalces = document.querySelectorAll('#enlaces a');

    enalces.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            enalces.forEach((enlace)=> enlace.classList.remove('active'));
            event.target.classList.add('active');


            const categoria = event.target.innerText.toLowerCase();
            /* 
            -- condicional ternario --
            si se cumple muuri filtra los elementos html con el atributo [data-categoria],
            si no se cumple muuri solo filtrara los elementos con [data-categoria="la categoria pinchada"]
            */
            categoria === 'todo' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
        });
    });

    // Agrega listener para barra de busqueda
    document.querySelector("#barra-de-busqueda").addEventListener('input', (e)=>{
        const busqueda = e.target.value;
        grid.filter((item)=> item.getElement().dataset.etiquetas.includes(busqueda));
    });
});