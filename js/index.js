'use strict'

const grid = new Muuri('.grid', {
    layout: {
        rounding: false
      }
});

/* Evento para refrescar los elementos de la grid al recargar */
window.addEventListener('load', () =>{
    /* Refrescar la imagen al cargar y reacomodar los elementos */
    grid.refreshItems().layout();

    /* colocando la transicion de fade */
    document.querySelector('#grid').classList.add('imagenes-cargadas')
    
    //guardar todos los enlaces
    const enlaces = document.querySelectorAll('#categorias a');
    
    

    enlaces.forEach((element) => {

        /* Al momento de darle click a una categoria filtramos*/
        element.addEventListener('click', (evento) =>{
            evento.preventDefault();
            
            /* Eliminar la clase activo (negritas) de la categoria anterior */
            enlaces.forEach(enlace => enlace.classList.remove('activo'));
            

            /* Agregarle la clase activo a esa nueva categoria que se le hizo click */
            evento.target.classList.add('activo');



            /* Filtrado de categoria a travez de la barra de navegacion */

            /* traemos el nombre de la clase */
            const categoria = evento.target.innerHTML.toLowerCase();
            console.log(categoria);
            

            /* filtramos las categorias con grid.filter*/
            if (categoria === 'todos' ) {
                grid.filter(`[data-categoria]`);
            }else{
                grid.filter(`[data-categoria = ${categoria}]`);
            }
            
        })
        
    })

    //Filtrando a travez de la barra de busqueda
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) =>{

        /* agarramos el valor de lo que se esta escribiendo en la barra de busqueda al momento de ingresar un valor */
        const busqueda = evento.target.value.toLowerCase();

        /* Filtramos el elemento que cumpla las caracteristicas de la barra de busqueda */
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));

    });
    

    /* Agregar n evento a las imagenes */

    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento) =>{
        
        
        
        /* mostrando la imagen en pantalla al darle click a una imagen */
        elemento.addEventListener('click',() => {

            /* accediendo a la ruta e la imgaen */
            const ruta = elemento.getAttribute('src');
                    
            /* accediendo a la descripcion del elemento en dataset */
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

            /* cambiando el display del overlay */
            overlay.classList.add('activo');

            /* colocamos su ruta de imagen correspondiente */
            document.querySelector('#overlay img').src = ruta;

            /* colocamos la descripcion que queramos */
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        })
        
        
    })


    /* Event listener del boton de cerrar */

    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    })

    /* evetn listener del overlay */

    overlay.addEventListener('click', (evento) => {
        /* overlay.classList.remove('activo'); */

        evento.target.id === 'overlay' ? overlay.classList.remove('activo'): '';

    })
})