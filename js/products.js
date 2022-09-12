
const url = PRODUCTS_URL;
const ORDER_ASC_BY_COST = "12";
const ORDER_DESC_BY_COST = "21";
const ORDER_BY_SOLD_COUNT = "Sold";
let products = [];
let currentSortCriteriaProducts = undefined;
let minSold = undefined;
let maxSold = undefined;
const Lista = document.getElementById('prod-list-container')

function sortProducts(criteria, array){
    let result = [];
    if (critera === ORDER_ASC_BY_COST){
        result = array.sort(function(a,b){
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){
    let htmlContentToAppend = "";

    for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minSold)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxSold))){

            htmlContentToAppend += 
            `<div class="list-group-item list-group-item-action">
                <div class ="row">
                    <div class="col">
                        <div class="col-3">
                            <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="mb-1">
                                <h4>`+ products.name +` - `+ products.currency +` `+ products.cost +`</h4>
                                <p> `+ products.description +` </p>
                            </div>
                            <small class="text-muted"> ` + products.soldCount +` vendidos.</small>
                        </div>
                    </div>
                </div>
            </div>` 
        }
        Lista.innerHTML = htmlContentToAppend;
    }
};

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentproductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data
            showProductsList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minSold = undefined;
        maxSold = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minSold = document.getElementById("rangeFilterCostMin").value;
        maxSold = document.getElementById("rangeFilterCostMax").value;

        if ((minSold != undefined) && (minSold != "") && (parseInt(minSold)) >= 0){
            minSold = parseInt(minSold);
        }
        else{
            minSold = undefined;
        }

        if ((maxSold != undefined) && (maxSold != "") && (parseInt(maxSold)) >= 0){
            maxSold = parseInt(maxSold);
        }
        else{
            maxSold = undefined;
        }

        showProductsList();
    });
});

/*
function htmlContentToAppend(products) {
    //Se agregan los valores del objeto dentro de un div en HTML (imagen, descripción, etc...) 
    return `
        <div class="list-group-item list-group-item-action">
            <div class ="row">
                <div class="col">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="mb-1">
                            <h4>`+ products.name +` - `+ products.currency +` `+ products.cost +`</h4>
                            <p> `+ products.description +` </p>
                        </div>
                        <small class="text-muted"> ` + products.soldCount +` vendidos.</small>
                    </div>
                </div>
            </div>
        </div>
    `};

var productos =""

document.addEventListener("DOMContentLoaded", async function(){

    let respuesta = await getJSONData(url)
    console.log(respuesta)

    if (respuesta.status === "ok"){
        productos = respuesta.data
        console.log(productos.products[0])

        for(let i=0; i < productos.products.length; i++){
            let categoriainterna = productos.products[i]
            Lista.innerHTML += htmlContentToAppend(categoriainterna);
        }
    }
})
*/