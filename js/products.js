
const ORDER_ASC_BY_COST = "costoAsc";
const ORDER_DESC_BY_COST = "costoDesc";
const ORDER_BY_REL = "Rel";
let currentProductsArray = [];
let currentSortCriteriaProducts = undefined;
let minCost = undefined;
let maxCost = undefined;
const listaProductos = document.getElementById("prod-list-container");

/*Ordeno los productos de 3 formas diferentes, indicadas en las const de arriba*/
function sortProducts(criteria, array){
  let result = [];

/*A sort le indico con esa función anónima la forma en la que quiero ordenar*/
  if (criteria === ORDER_ASC_BY_COST)
  {
      result = array.sort(function(a, b) {

/*Si el costo de A es mayor que el costo de B, el costo de B(más barato) aparece 1ro en la lista*/
          if ( a.cost < b.cost ){ return -1; }
          if ( a.cost > b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_DESC_BY_COST){
      result = array.sort(function(a, b) {
          if ( a.cost > b.cost ){ return -1; }
          if ( a.cost < b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_BY_REL){
      result = array.sort(function(a, b) {

/*Esto es necesario para que los valores tipo texto se transformen en números*/
          let aCount = parseInt(a.soldCount);
          let bCount = parseInt(b.soldCount);

          if ( aCount > bCount ){ return -1; }
          if ( aCount < bCount ){ return 1; }
          return 0;
      });
  }

  return result;
}

function setProdID(id, name) {
    localStorage.setItem("prodID", id);
    localStorage.setItem("prodName", name);
    window.location = "product-info.html"
}

function mostrarProductos() {
  let htmlContentToAppend = "";
  for (let i = 0; i < product.products.length; i++) { //Se inicia un contador para recorrer cada producto dentro products.
    let productos = product.products[i]; // utilizo products la propiedad del json. 

    if ((minCost == undefined || (minCost != undefined && parseInt(productos.cost) >= minCost)) &&
      (maxCost == undefined || (maxCost != undefined && parseInt(productos.cost) <= maxCost))&&
      (productos.name.toLowerCase().includes(mostrarBusqueda)) || (productos.description.toLowerCase().includes(mostrarBusqueda)) )
      //El if indica si está entre el mínimo y el máximo, y si el name o la description de los productos tienen incluidos el texto que se ingresa
      //en el input de búsqueda.
    {

      //Se agregan los valores del objeto dentro de un div en HTML (imagen, descripción, etc...) 
      htmlContentToAppend += 
        `   <div onclick="setProdID(${productos.id}, '${productos.name}')" class="p-3 m-1 bg-light rounded list-group-item list-group-item-action cursor-active shadow-sm">
                <div class="row">
                    <div class="col-3">
                        <img src= "${productos.image}" alt="product image" class="img-fluid rounded"">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                                <h4>${productos.name} - ${productos.currency} : ${productos.cost}</h4> 
                                <p> ${productos.description}</p> 
                            </div>
                            <small class="text-muted">${productos.soldCount} Vendidos </small> 
                        </div>
                    </div>
                </div>    
            </div>`;
    }
  }
  listaProductos.innerHTML = htmlContentToAppend;
  // Se llama listaProductos (el div del html donde mostraremos los datos) y se le agregan todos los valores contenidos 
  // en htmlContentToAppend.
}

/*Usa las 2 func anteriores: primero ordena y luego muestra*/
function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteriaProducts = sortCriteria;

/*Si la lista de prod no está undefined, se setea en la var currentProductsArray la lista de prod*/    
  if (productsArray != undefined) {
    products = productsArray;
  }

/*Ordena la lista contenida en currentProductsArray*/  
  sortProducts(currentSortCriteriaProducts, product.products);

//Muestro los productos ordenados  
  mostrarProductos();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function() {
    getJSONData(PRODUCTS_URL).then(function (response) {

/*Si no hay error, se carga la lista ordenada (por defecto) y se muestra*/   
        if (response.status === "ok") {
            product = response.data; 
            console.log(product)
            mostrarProductos();
        }
    })

/*Después de hacer click en cada botón, se muestra la lista ordenada según el criterio puesto como parámetro*/   
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });


    document.getElementById("sortByRel").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_REL);
    });

/*Después de hacer click en el botón, se borran los rangos de precio ingresados en cada campo y se restablece la lista*/ 
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        mostrarProductos();
    });

/*Después de hacer click, si se cumple lo del if, se transforma el valor de minCost en números usando parseInt. Sino, quedan undefined*/        
    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
        minCost = parseInt(minCost);
    }

    else{
        minCost = undefined;
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
        maxCost = parseInt(maxCost);
    }

    else{
        maxCost = undefined;
    }

/*Luego de la función anterior, los valores devueltos van a ser números o undefined. Ahora se llama a esta función para mostrar la lista*/
    mostrarProductos();
    });
});


//DESAFIATE 2:
// defino el array mostrarBusqueda que contendrá los productos que coinciden con lo ingresado en el input de busqueda
let mostrarBusqueda = [];

//llamo al input de busqueda
const buscador = document.querySelector('#buscador')

// agrego el escucha al input, utilizo el evento 'input' para capturar los cambios en el valor de dicho input y poder filtrarlo a tiempo real
// utilizo toLowerCase para pasa a minúsculas el texto ingresado, y comparar contra los nombres y descripciones 
// en minúscula de los productos que filtraré.
buscador.addEventListener('input', e => {
    mostrarBusqueda = e.target.value.toLowerCase();
    mostrarProductos();
})