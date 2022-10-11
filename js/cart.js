let cartArray = [];

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
    let cost = cartArray[i - 1].unitCost;
    let count = document.getElementById(i).value;

     /*Al id=subtotal+i le pasamos el resultado de la multiplicación.*/
     document.getElementById("subtotal" + i).innerHTML = count * cost;
}

document.addEventListener("DOMContentLoaded", async function() {
    getJSONData(CART_INFO_URL).then(function (response) {

/*Si no hay error, se carga la lista ordenada (por defecto) y se muestra*/   
        if (response.status === "ok") {
            cart = response.data; 
            console.log(cart)
            cartArray = response.data.articles;
            showCart();
        }
    })
});