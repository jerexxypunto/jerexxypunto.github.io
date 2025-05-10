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
		location.href = "/app/cotizar.html?msg="+$cotizacionFormTexarea.value;
	});

}

function contizacionHanlder(){

	function handdlerInput( input, contratoHandler  ){
		
		const { value, name, parentElement } = input;

		const $msg = document.createElement('p');	

		try{
			switch (name) {
				case 'nombre':
					// Handle nombre input
					contratoHandler.setClienteNombre(value);
					break;
				case 'run':
					// Handle run input
					contratoHandler.setClienteRun(value);
					
					break;
				case 'empresa':
					// Handle empresa input
					contratoHandler.setClienteEmpresa(value);
					break;
				default:
					break;
			}
		} catch (error) {
			$msg.classList.add('error');
			$msg.innerHTML = error.message;
			parentElement.appendChild($msg);
			throw error;
		}
	}

	const $cotizacion = document.querySelector('#contrato-app form');
	if( !$cotizacion ) return;

	$cotizacion.addEventListener("submit", (e) => {
		e.preventDefault();

		const $clienteNombre = $cotizacion.querySelector("input#nombre");
		const $clienteRun = $cotizacion.querySelector("input#run");
		const $clienteEmpresa = $cotizacion.querySelector("input#empresa");

		const contratoHandler = new ContratoGenerator();

		handdlerInput( $clienteNombre, contratoHandler  );
		handdlerInput( $clienteRun, contratoHandler  );
		handdlerInput( $clienteEmpresa, contratoHandler  );

		$cotizacion.classList.add("disabled");

		const contrato = contratoHandler.generateContrato();

		setTimeout(() => {
			contratoHandler.addHtmltoDom( contrato, $cotizacion );
			$cotizacion.classList.remove("disabled");
		}, 1000);

	});

}

// Load header and footer
loadHeader();
loadFooter();
sectionDynamicContent();
cotizacionFormHanlder();
contizacionHanlder();