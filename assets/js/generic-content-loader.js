
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

function injectMdContent( htmlContent ){

    const contentContainer = document.querySelector('#content-container');
    if (contentContainer) {
        contentContainer.innerHTML = htmlContent;
    } else {
        console.error('No se encontró el contenedor para el contenido');
    }

}

function ShowErrorMD( msg ){

    let md_fallback = "# Error 404\n";
    console.error(msg);
    md_fallback += msg;
    const htmlContent = marked.parse(md_fallback);
    injectMdContent(htmlContent);
}

function genericContentLoader() {

    const getData = getPostFromUrl(location.href);
    if( !getData ){
        ShowErrorMD("No se han encontrado parámetros en la URL");
        return;
    }

    const { post } = getData;
    const file_path = `${post}.md`;

    getContent( file_path )
    .then( markdownContent => {

        // Convertir Markdown a HTML
        const htmlContent = marked.parse(markdownContent);
            
        // Insertar el contenido en el DOM
        injectMdContent(htmlContent);
    })
    .catch( err => {
        let fileSearch = `Contenido **${post}** no encontrado. <br>`;
        fileSearch += "Verifique que el archivo existe en la carpeta **/posts/**";
        ShowErrorMD(fileSearch);
    });


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
    return Object.keys(params).length > 0 ? params : false;
}
