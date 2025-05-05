import { loadHeader, getPageList } from './templates/header.js';
import { loadFooter } from './templates/footer.js';
import { ContratoGenerator } from './cotizacion/contrato.js';


/**
 * Obtiene el contenido de una sección
 * @param {*} content 
 * @returns 
 */
async function getSectionContent(content) {
    try {
        const req = await fetch(location.origin + '/content/sections/' + content);
        if (!req.ok) {
            throw new Error(`Error fetching content: ${req.status} ${req.statusText}`);
        }
        const res = await req.text();
        return res;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function sectionDynamicContent(){

	const nodes = Array.from(document.querySelectorAll('.section-dynamic-content'));
	nodes.forEach( node => {
		const pathContent = node.getAttribute('data-section-content');
		if( pathContent ){
			getSectionContent(pathContent)
			.then( markdownContent => {
				const htmlContent = marked.parse(markdownContent);
				node.innerHTML = htmlContent;
			})
			.catch( err => {
				console.error(err);
				node.innerHTML = `<p>Error al cargar el contenido: ${pathContent}</p>`;
			});
		}

	});
}

function cotizacionFormHanlder(){

	const $cotizacionForm = document.querySelector('#cotizacion-form');

    if( !$cotizacionForm ) return;

    const $cotizacionFormTexarea = $cotizacionForm.querySelector('#cotizacion-form-texarea');

	$cotizacionForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const msg = `Quiero una cotización para el siguiente servicio:\n\n${$cotizacionFormTexarea.value}`;
		console.log(msg);
		const url = `https://api.whatsapp.com/send?phone=5215541234567&text=${encodeURIComponent(msg)}`;
		window.open(url, '_blank');
		$cotizacionFormTexarea.value = '';
		$cotizacionFormTexarea.focus();
	});

}

function contizacionHanlder(){

	const $cotizacion = document.querySelector('#cotizacion-app');
	if( !$cotizacion ) return;

	$cotizacion.addEventListener("submit", (e) => {
		e.preventDefault();

		const $clienteNombre = $cotizacion.querySelector("input#nombre");
		const $clienteRun = $cotizacion.querySelector("input#run");
		const $clienteEmpresa = $cotizacion.querySelector("input#empresa");

		const contratoHandler = new ContratoGenerator();

		contratoHandler.setClienteNombre($clienteNombre.value);
		contratoHandler.setClienteRun($clienteRun.value);
		contratoHandler.setClienteEmpresa($clienteEmpresa.value);

		const contrato = contratoHandler.generateContrato();
		contratoHandler.addHtmltoDom( contrato, $cotizacion );

	});

}

// Load header and footer
loadHeader();
loadFooter();
sectionDynamicContent();
cotizacionFormHanlder();
contizacionHanlder();