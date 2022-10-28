let cartArray = [];
let envioPremium = document.getElementById("premiumradio");
let envioStandard = document.getElementById("standardradio");
let envioExpress = document.getElementById("expressradio");
let subtotalVal = document.getElementById("subtotalValue");

function addToCart(){
    let addToCart = JSON.parse(localStorage.getItem('Producto'));

    cartArray.push(addToCart);

    console.log(cartArray);
}

function showCart(){

    let htmlContentToAppend = "";
    let i = 1;

    for (let cartProduct of cartArray){

        htmlContentToAppend += `
        <tr>
            <td class="w-25">
            <img src="${cartProduct.image}" class="img-fluid img-thumbnail">
            </td>
            <td> ${cartProduct.name}</td>
            <td id="unitCost${i}">${cartProduct.currency} ${cartProduct.unitCost}</td>
            <td>
            <input type="number" id="${i}" onchange="subtotal(${i});" value="${cartProduct.count}" min="1">
            </td>
            <td id="subtotal${i}" class="fw-bold">${cartProduct.currency} ${cartProduct.count * cartProduct.unitCost}</td>
       </tr>`

       i++;
    }
    document.getElementById("cart-container").innerHTML = htmlContentToAppend;
};

function subtotal(i){
    let currency = cartArray[i - 1].currency;
    let cost = cartArray[i - 1].unitCost;
    let count = document.getElementById(i).value;

     /*Al id=subtotal+i le pasamos el resultado de la multiplicación.*/
    document.getElementById("subtotal" + i).innerHTML = currency + " " + count * cost ;
    subtotalVal.innerHTML = currency + " " + count * cost  ;
}

function priceShipping(){
    switch (envioExpress) {
        case 'premium':
            if(premium === "checked"){
                let resultado = subtotalVal.value * 0.15
                document.getElementById("envioValue").innerHTML = resultado;
            }
            break;
    
        default:
            break;
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    getJSONData(CART_INFO_URL).then(function (response) {

/*Si no hay error, se carga la lista ordenada (por defecto) y se muestra*/   
        if (response.status === "ok") {
            cart = response.data; 
            console.log(cart)
            cartArray = response.data.articles;
            addToCart();
            showCart();
            priceShipping();
        }
    })
});