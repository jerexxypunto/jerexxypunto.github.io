
if( location.pathname === '/single.html' ){
    genericContentLoader();
     loadPostsList();
}

function loadPostsList(  ){

    const container = document.querySelector('#pages-related');
    const title = document.createElement('h2');
    title.innerText = 'Artículos relacionados';
    container.appendChild(title);
    
    getPageList()
    .then( res => {
        const { posts } = res;
        posts.forEach( post => {
            createPostRelated( post, container );
        } );

    } )
    .catch( err => {
        console.error(err);
    }
    );
}

function createPostRelated( post, domElement ){

    const card = document.createElement('div');
    const link = document.createElement('a');

    link.href = `single.html?post=${post.file}`;
    link.innerText = `Ver ${post.title}`;

    card.appendChild(link);

    domElement.appendChild(card);
}

function genericContentLoader() {

    const { post } = getPostFromUrl(location.href);
    const file_path = `${post}.md`;

    getContent( file_path )
    .then( markdownContent => {

       // Convertir Markdown a HTML
            const htmlContent = marked.parse(markdownContent);
            
            // Insertar el contenido en el DOM
            const contentContainer = document.querySelector('#content-container');
            if (contentContainer) {
                contentContainer.innerHTML = htmlContent;
            } else {
                console.error('No se encontró el contenedor para el contenido');
            }
    })
    .catch( err => {
        console.error(err);
    });


}

/**
 * Obtiene el contenido de un archivo
 * @param {*} content 
 * @returns 
 */
async function getContent ( content ){
    const req =  await fetch(location.origin + '/content/files/' + content )
    const res = await req.text();
    return res;
}

async function getPageList( ){
    const req =  await fetch( location.origin + '/content/conf/list.json' )
    const res = await req.json();
    return res;
}

/**
 * Extra parametros de la URL
 * @param {*} url 
 * @returns object
 */
function getPostFromUrl( url ){

    const parsedUrl = new URL(url);
    const { searchParams } = parsedUrl;
    const params = {};
    for (const [key, value] of searchParams.entries()) {
        params[key] = value;
    }
    return params;
}

