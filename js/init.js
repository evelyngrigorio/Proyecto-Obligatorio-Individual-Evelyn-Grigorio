const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


/* Función para agregar la visualización del user guardado en el localStorage, en la navbar */
document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelector(".navbar-nav li:nth-child(4)").innerHTML = `
  <a class="nav-link dropdown-toggle active" href="my-profile.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           ${localStorage.getItem("user")}
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="my-profile.html"><i class="fa-solid fa-user"></i> Mi perfil </a></li>
            <li><a class="dropdown-item" href="cart.html"><i class="fa-solid fa-cart-shopping"></i> Carrito </a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="index.html" id="logout"><i class="fa-solid fa-right-from-bracket"> </i> Cerrar sesión</a></li>
          </ul>`
})