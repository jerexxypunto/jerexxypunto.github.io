
import { getContent, getPageList } from './templates/header.js';

if( location.pathname === '/single.html' ){

    loadWpPostLoader().then( post => {
        genericContentLoader(post);
    } ).catch( e => {
        console.log(e);
    });
    
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

async function wordpressGetBlogPosts( post_id = false ){

    // Traemos lista de post desde la api de GSC Diseños.
    const domain = 'https://gscdisenos.net';
    let url = `${domain}/wp-json/wp/v2/posts`;

    if( post_id != false ){
        url = `${url}/${post_id}`;
    }

    const req = await fetch(url);
    const res = await req.json();

    if( post_id != false ){
        return {
            id: res.id,
            title: res.title.rendered,
            content: res.content.rendered,
            date: res.date,
            excerpt: res.excerpt.rendered,
        }
    }

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
        const { title, date, excerpt, id } = item;
        const html = `<li> <div class="box" > <h4> ${title} </h4> <p>${excerpt}</p> <a class="button"  href="?post_id=${id}" > Ver más </a> </div> </li>`;
        ul_wp_post = ul_wp_post + html;
    } );

    ul_wp_post = ul_wp_post + "</ul>";

    const htmlContent = `
    <h2>ABC Digital Blog</h2>
    <main>${ul_wp_post}</main>`;

    return htmlContent;
}

async function loadWpPostLoader(){

    const { search } = location;
    if( search.includes("post_id") ){
        return false;
    }

   
    // Traemos la lista de WP
    const posts = await wordpressGetBlogPosts()

    
    // creamos una lista de posts en el DOM.
    let ul_wp_post = blogItemsBuilder( posts );

    // Insertamos en el DOM
    injectMdContent(ul_wp_post);

    return posts

}

async function genericContentLoader(post) {

    const { origin, search, href } = location;

    console.log("Entro");

    // Si post_id esta en la URL
    if (search.includes("post_id")) {
        // Extrae de la url el parametro post_id
        // Puede estar en la hash o en el search
        // Ejemplo: #?post_id=1
        let post_id = null;
        // Buscamos en location.hash
        const hashParamsMatch = search.match(/post_id=([^&]+)/);
        if (hashParamsMatch && hashParamsMatch[1]) {
            post_id = hashParamsMatch[1];
        } else {
            // Si no está en el hash, intentamos en el search
            const searchParams = new URLSearchParams(location.search);
            post_id = searchParams.get('post_id');
        }

        if (post_id) {

            // Solicitamos a WP todo el POST
            const selectedPost = await wordpressGetBlogPosts(post_id);



            if (selectedPost) {
                // Renderizar el post
                const html = `
                    <article class="blog-post" >
                        <h2>${selectedPost.title}</h2>
                        <div class="post-meta">${selectedPost.date ? new Date(selectedPost.date).toLocaleDateString() : ''}</div>
                        <div class="post-content">${selectedPost.content}</div>
                    </article>
                `;
                injectMdContent(html);
            } else {
                injectMdContent('<p>No se encontró el post solicitado.</p>');
            }
        } else {
            injectMdContent('<p>post_id no especificado en la URL.</p>');
        }
    }
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
