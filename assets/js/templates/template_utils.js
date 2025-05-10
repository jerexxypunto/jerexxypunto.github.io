function render_stop_by( paths ){

    let passed = false;

    for ( let path of paths ){
        console.log("path", path);
        if ( location.pathname.includes(path) ) {
            passed = true;
            break;
        }
    }

    return passed;

}

export { render_stop_by };