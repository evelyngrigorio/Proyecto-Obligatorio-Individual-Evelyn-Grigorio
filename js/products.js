
const url = PRODUCTS_URL;
const ORDER_ASC_BY_COST = "12";
const ORDER_DESC_BY_COST = "21";
const ORDER_BY_PROD_SOLD = "Sold";
let currentProductsArray =[];
let currentSortCriteriaProducts = undefined;
let minCost = undefined;
let maxCost = undefined;
const listaProductos = document.getElementById("prod-list-container");

function sortProducts(criteria, array){
  let result = [];
  if (criteria === ORDER_ASC_BY_COST)
  {
      result = array.sort(function(a, b) {
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
  }else if (criteria === ORDER_BY_PROD_SOLD){
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

function setProdID(id, name) {
    localStorage.setItem("prodID", id);
    localStorage.setItem("prodName", name);
    window.location = "products-info.html"
}

function mostrarProductos() {
  let htmlContentToAppend = "";
  for (let i = 0; i < product.products.length; i++) {
    let productos = product.products[i]; 

    if ((minCost == undefined || (minCost != undefined && parseInt(productos.cost) >= minCost)) &&
      (maxCost == undefined || (maxCost != undefined && parseInt(productos.cost) <= maxCost)))
    {
      htmlContentToAppend += `<div class="list-group" id="cat-list-container">   
                <div onclick="setProdID(${productos.id}, '${productos.name}')" class="shadow-none p-3 mb-5 bg-light rounded list-group-item list-group-item-action">
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
                    </div>  
                   `;
    }
  }
  listaProductos.innerHTML = htmlContentToAppend;
}

function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteriaProducts = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(currentSortCriteriaProducts, currentProductsArray);

  mostrarProductos();
}


document.addEventListener("DOMContentLoaded", async function() {
    getJSONData(url).then(function (response) {
        if (response.status === "ok") {
            product = response.data; 
            console.log(product)
            mostrarProductos();
        }
    })
    
    document.getElementById("sortAscProd").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });


    document.getElementById("sortDescProd").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });


    document.getElementById("sortByCountProd").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        mostrarProductos();
    });

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
    console.log(maxCost)
    mostrarProductos();
    });

});
