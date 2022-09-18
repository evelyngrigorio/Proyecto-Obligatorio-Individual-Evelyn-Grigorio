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

/*Función para mostrar comentarios.*/
function showCommentList() {
    let htmlContentToAppend = "";

    for (let i = 0; i < commentsArray.length; i++) { /*Se inicia un contador para recorrer el arreglo de comentarios commentsArray.*/
        let comment = commentsArray[i];

        /*Se agregan los valores del objeto dentro de un div en HTML.*/
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">Puntaje: `+ drawStars(comment.score) + `
                          </h4>
                            
                            <small class="text-muted">` + comment.dateTime + `</small>
                        </div>
                        <p class="mb-1">` + comment.description + `</p>
                        <p class="mb-1">Usuario: ` + comment.user + `</p>
                    </div>
                </div>
            </div>
            `
        /*Se llama al div= comments-list-container del HTML y se le agregan todos los valores contenidos en HTMLContentToAppend.*/
        document.getElementById("comments-list-container").innerHTML = htmlContentToAppend;
    }
}

/*Función para aplicar el puntaje en estrellas*/
function drawStars(stars) {
    let number = parseInt(stars);
    let htmlContentToAppend = "";

    for (let i = 1; i <= number; i++) { /*Esta variable recorre desde el 1 hasta el número del puntaje marcado.*/
        htmlContentToAppend += `<span class="fa fa-star checked"></span>` /*Estrella pintada.*/
    }
    for (let j = number + 1; j <= 5; j++) { /*Esta variable recorre desde una posición más adelante del puntaje marcado hasta el 5.*/
        htmlContentToAppend += `<span class="fa fa-star"></span>` /*Estrella sin pintar.*/
    }

    return htmlContentToAppend;
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
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) { /*Obtenemos toda la info de los comentarios (JSON) y la mostramos en HTML.*/
    if (resultObj.status === "ok") {

        commentsArray = resultObj.data;

        showCommentsList(commentsArray); /*Ejecutamos la función para mostrar comentarios.*/
    }
});
})