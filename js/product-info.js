var product = [];
var commentsArray = [];
var productsArray = [];
var relProductsArray = [];
var imagesArray = [];

/*Función para mostrar imágenes.*/
function showProdImages() {
    let htmlContentToAppend = "";

    for(let i = 1; i < imagesArray.length; i++) { /*Se recorre el arreglo imagesArray a partir de la posición 1.*/
        let image = imagesArray[i];
        

        /*Imágenes: se agregan los valores de las siguientes.*/
        htmlContentToAppend += `
        <img class="d-block w-200 img-thumbnail" src="` + image + `" alt="">`;
    }

    document.getElementById("prodImages").innerHTML = htmlContentToAppend;
}


/*Info del producto: agrego la info contenida en las var en los div correspondientes del HTML.*/
let prodName = document.getElementById("prodName");
let prodCategory = document.getElementById("prodCategory");
let prodDescription = document.getElementById("prodDescription");
let prodCurrency =  document.getElementById("prodCurrency");
let prodCost = document.getElementById("prodCost");
let prodSoldCount = document.getElementById("prodSoldCount");



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e){
    getJSONData(PRODUCT_INFO_URL).then(function(response){
        if(response.status === "ok"){
            product = response.data;

            // imprimo en el html cada uno de los datos del producto seleccionado
            prodName.innerHTML = product.name;
            prodCategory.innerHTML = product.category;
            prodDescription.innerHTML = product.description;
            prodCurrency.innerHTML = product.currency + " " + product.cost;
            prodSoldCount.innerHTML = product.soldCount;
            imagesArray = product.images;
            
            console.log(product);

            showProdImages(imagesArray); /*Ejecutamos la función para mostrar imágenes.*/
        }
    });
    
})