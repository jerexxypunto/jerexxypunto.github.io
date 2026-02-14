
import { getContent, getPageList } from './templates/header.js';

if( location.pathname === '/single.html' ){
    loadWpPostLoader();
    //genericContentLoader();
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
    const loader  = document.querySelector('#loader');
    loader.classList.add('hidden');

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

async function wordpressGetBlogPosts(){

    // Traemos lista de post desde la api de GSC Diseños.
    const domain = 'https://gscdisenos.net';
    const url = `${domain}/wp-json/wp/v2/posts`;
    const req = await fetch(url);
    const res = await req.json();

    // Extraemos los datos de los posts.
    const posts = res.map( post => {
        return {
            id: post.id,
            title: post.title.rendered,
            content: post.content.rendered,
            date: post.date,
            excerpt: post.excerpt.rendered,
        }
    });

    return posts;
}

function blogItemsBuilder( posts ){

    let ul_wp_post = `<ul class="blogpost-list" >`;
    posts.forEach( item => {
        const { title, date, excerpt } = item;
        const html = `<li> <div class="box" > <h4> ${title} </h4> <p>${excerpt}</p> </div> </li>`;
        ul_wp_post = ul_wp_post + html;
    } );

    ul_wp_post = ul_wp_post + "</ul>";

    const htmlContent = `
    <h2>ABC Digital Blog</h2>
    <main>${ul_wp_post}</main>`;

    return htmlContent;
}

async function loadWpPostLoader(){

   
    // Traemos la lista de WP
    const posts = await wordpressGetBlogPosts()

    
    // creamos una lista de posts en el DOM.
    let ul_wp_post = blogItemsBuilder( posts );

    // Insertamos en el DOM
    injectMdContent(ul_wp_post);

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
        setTimeout( () => {
            // Insertar el contenido en el DOM
            injectMdContent(htmlContent);
        }, 1000 );
        
        
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
