let cartArray = [];
let currency2 = "UYU";

let shippingPercentage = 0.15;
let total = 0;
let subtotal = 0;
let msgToShowHTML = document.getElementById("alertSpan");
let msgToShow = "";

/*Función para mostrar los productos del carrito. Creamos la var cost (guarda info de costo unitario y moneda convertidos -con función convert-)*/
function showCart() {
  let htmlContentToAppend = "";
  let i = 1;
  let cost = 0;

  for (let cartProduct of cartArray) {
    cost = convert(cartProduct.unitCost, cartProduct.currency);

    /*Al imput le ponemos un id dinámico (porque es un valor que va a actualizarse). Primero igualamos i=1. Luego en el for
    va cambiando a diferentes números. 
    Para el subtotal le ponemos el mismo id dinámico pero le agregamos la palabra subtotal antes (los id deben ser únicos). 
    Primero ese subtotal va a guardar el resultado de cartProduct.count * cartProduct.unitCost, y después cambia cuando se 
    aplica la función updateSubtotal.*/
    htmlContentToAppend += `
            <tr>
             <td class="w-25">
             <img src="${cartProduct.image}" class="img-fluid img-thumbnail-cart">
             </td>
              <td> ${cartProduct.name}</td>
              <td id="unitCost${i}">${currency2} ${cost}</td>
              <td>
              <input type="number" id="${i}" onchange="updateSubtotal(${i});" value="${cartProduct.count}" min="1">
              </td>
              <td id="subtotal${i}">${cartProduct.count * cost}</td>
            </tr>`

    i++;
  }

  document.getElementById("cart-container").innerHTML = htmlContentToAppend;
  showShippingAndTotalCost();
};

function addToCart(){
    let addToCart = JSON.parse(localStorage.getItem('Producto'));

    cartArray.push(addToCart);

    console.log(cartArray);
}

/*Función para actualizar los subtotales al modificar la cantidad de productos. Seteamos en la var cost el valor del costo unitario ya convertido 
y en la var count el valor de cantidad (puesto en el input).*/
function updateSubtotal(i) {
  let cost = convert(cartArray[i - 1].unitCost, cartArray[i - 1].currency);
  let count = document.getElementById(i).value;

  /*Al id=subtotal+i le pasamos el resultado de la multiplicación.*/
  document.getElementById("subtotal" + i).innerHTML = count * cost;

  /*Mostramos la suma de todos los subtotales.*/
  allSubtotals();
  /*Calculamos el costo de envío y el costo total.*/
  showShippingAndTotalCost();
}

/*Función para sumar todos los subtotales. Seteamos en la var sub todo lo contenido en el id=subtotal+i.*/
function allSubtotals() {
  htmlContentToAppend = "";
  let sub = 0;

  for (let i = 1; i <= cartArray.length; i++) {
    sub += parseFloat(document.getElementById("subtotal" + i).textContent); /*Aplicamos parseFloat para convertir a números con decimales.*/
  }
  /*Pasamos la info al id=subtotals.*/
  document.getElementById("subtotals").innerHTML = sub;
  subtotal = sub;
}

/*Función para cambiar las monedas. A la var unitCost le seteamos los valores de los costos unitarios convertidos y a la var count el valor
ingresado como cantidad.*/
function changeCurrency() {
  let unitCost = 0;

  for (let i = 1; i <= cartArray.length; i++) {
    unitCost = convert(cartArray[i - 1].unitCost, cartArray[i - 1].currency);
    let count = document.getElementById(i).value;

    /*Al id=subtotal+i le pasamos el resultado de la multiplicación y al id=unitCost+i la moneda cambiada y los costos unitarios convertidos.*/
    document.getElementById("subtotal" + i).innerHTML = unitCost * count;
    document.getElementById("unitCost" + i).innerHTML = currency2 + " " + unitCost;
  }

  /*Mostramos la suma de todos los subtotales en la moneda seleccionada.*/
  allSubtotals();
  /*Calculamos el costo de envío y el costo total en la moneda seleccionada.*/
  showShippingAndTotalCost();
}

/*Función para convertir a diferentes monedas (UYU y USD).*/
function convert(cost, currency) {
  if (currency2 == 'UYU' && currency == 'USD') {
    cost = cost * 40;
  } else if (currency2 == 'USD' && currency == 'UYU') {
    cost = cost / 40;
  }
  return cost;
}

function getCart(url) {
  return fetch(url)
    .then(response => {
      return response.json();
    });
}

/*Función para calcular costo de envío y costo total.*/
function showShippingAndTotalCost() {
  let shippingCostHTML = document.getElementById("shippingCost");
  let totalCostHTML = document.getElementById("totalCost");

  /*Guardamos las cuentas y sus resultados en variables y se los pasamos a cada elemento HTML.*/
  let shippingCostToShow = Math.round(subtotal * shippingPercentage);
  let totalCostToShow = Math.round(subtotal + (subtotal * shippingPercentage));

  shippingCostHTML.innerHTML = shippingCostToShow;
  totalCostHTML.innerHTML = totalCostToShow;
}

document.addEventListener("DOMContentLoaded", async function() {
    getJSONData(CART_INFO_URL).then(function (response) {

/*Si no hay error, se carga la lista ordenada (por defecto) y se muestra*/   
        if (response.status === "ok") {
            cart = response.data; 
            console.log(cart);
            cartArray = response.data.articles;
            currency2 = 'UYU';

      /*Muestro carrito y todos los subtotales.*/
      addToCart();
      showCart();
      allSubtotals();
      showShippingAndTotalCost();

      document.getElementById("uruguayanPesos").addEventListener("click", function (e) {
        currency2 = 'UYU'; /*La moneda seleccionada pasa a ser UYU.*/

        changeCurrency(); /*Transformo los valores a la moneda seleccionada.*/
      });

      document.getElementById("dollars").addEventListener("click", function (e) {
        currency2 = 'USD'; /*La moneda seleccionada pasa a ser USD.*/

        changeCurrency(); /*Transformo los valores a la moneda seleccionada.*/
      });
    }});

  /*Después de clickear cada radio button, cambiamos el valor del porcentaje que corresponda y ejecutamos la función.*/
  document.getElementById("premiumradio").addEventListener("click", function (e) {
    shippingPercentage = 0.15;
    showShippingAndTotalCost();
  });

  document.getElementById("expressradio").addEventListener("click", function (e) {
    shippingPercentage = 0.07;
    showShippingAndTotalCost();
  });

  document.getElementById("standardradio").addEventListener("click", function (e) {
    shippingPercentage = 0.05;
    showShippingAndTotalCost();
  });

  /*Validaciones*/
  let buyForm = document.getElementById("buy-form");
  let creditCardForm = document.getElementById("credit-card-form");
  let wireTransferForm = document.getElementById("wire-transfer-form");

  /*Se validan los campos calle, número y esquina después de clickear el botón submit.*/
  buyForm.addEventListener("submit", function (e) {
    let streetInput = document.getElementById("street");
    let numberInput = document.getElementById("number");
    let cornerInput = document.getElementById("corner");

    /*Usamos esta variable booleana para indicar que hay campos incompletos*/
    let infoMissing = false;

    streetInput.classList.remove('is-invalid');
    numberInput.classList.remove('is-invalid');
    cornerInput.classList.remove('is-invalid');

    /*Si los campos están vacíos, se le agrega a cada input la clase invalid (se muestra: Campo obligatorio) y le pasamos el valor true 
    a infoMissing.*/
    if (streetInput.value === "") {
      streetInput.classList.add('is-invalid');
      infoMissing = true;
    }

    if (numberInput.value === "") {
      numberInput.classList.add('is-invalid');
      infoMissing = true;
    }

    if (cornerInput.value === "") {
      cornerInput.classList.add('is-invalid');
      infoMissing = true;
    }

    /*Si no hay campos vacíos, al elemento HTML del alert le agregamos la clase alert-success (verde), mostramos el mensaje y borramos
    los valores de los inputs.*/
    if (!infoMissing) {
      msgToShow = "¡Su compra se ha realizado con éxito!";
      document.getElementById("alertMessage").classList.add('alert-success');
      document.getElementById("street").value = "";
      document.getElementById("number").value = "";
      document.getElementById("corner").value = "";

      /*Si falta completar alguno, al elemento HTML del alert le agregamos la clase alert-danger (rojo) y mostramos el mensaje.*/
    } else if (infoMissing) {
      msgToShow = "Debe completar campos vacíos";
      document.getElementById('alertMessage').classList.add('alert-danger');
    }

    msgToShowHTML.innerHTML = msgToShow;
    /*Al elemento HTML del alert le agregamos la clase show para que se muestre.*/
    document.getElementById("alertMessage").classList.add('show');

    if (e.preventDefault) e.preventDefault();
    return false;
  });


document.getElementById("finish").addEventListener("click", (e)=>{
  e.preventDefault;
})

// Validaciones para el pago y los datos requeridos en ambos casos
const payment = document.getElementsByName('paymentoption');
const card_number = document.getElementById('card_number');
const card_exp = document.getElementById('card_exp');
const card_cvv = document.getElementById('card_cvv');
const bank_bank = document.getElementById('bank_bank');
const bank_num = document.getElementById('bank_num');
const metodoPago = document.getElementById('metodoPago');
const pay_link = document.getElementById('change_payment');

// Para habilitar o inhabilitar opciones de pago entre tarjeta o transferencia bancaria
payment.forEach(pay_opt => {
    pay_opt.addEventListener('change', ()=>{
        if(payment[0].checked){
            card_number.disabled = false;
            card_exp.disabled = false;
            card_cvv.disabled = false;
            bank_bank.disabled = true;
            bank_num.disabled = true;
            metodoPago.innerText = 'Tarjeta de crédito';
        }
        else if(payment[1].checked){
            card_number.disabled = true;
            card_exp.disabled = true;
            card_cvv.disabled = true;
            bank_bank.disabled = false;
            bank_num.disabled = false;
            metodoPago.innerText = 'Transferencia bancaria';
        }
    })
});

// Validación para el modal de medios de pago
const close_modal = document.getElementById('close_modal');
const alert_card = document.getElementById('alert_card');
const alert_bank = document.getElementById('alert_bank');
const alertaPago = document.getElementById('alertaPago');

close_modal.addEventListener('click', ()=>{
    if(payment[0].checked){
        alert_bank.innerText = '';
        if(card_number.value == '' || card_exp.value == '' || card_cvv.value == ''){
            alert_card.innerText = 'Ingrese todos los datos de su tarjeta';
            alertaPago.innerText = 'Complete el formulario de pago';
            pay_link.classList.add('text-danger');
        }
        else{
            alert_card.innerText = '';
            alertaPago.innerText = '';
            pay_link.classList.remove('text-danger');
        }
    }
    if(payment[1].checked){
        alert_card.innerText = '';
        if(bank_bank.value == '' || bank_num.value == ''){
            alert_bank.innerText = 'Ingrese todos los datos de su cuenta bancaria';
            alertaPago.innerText = 'Complete el formulario de pago';
            pay_link.classList.add('text-danger');
        }
        else{
            alert_bank.innerText = '';
            alertaPago.innerText = '';
            pay_link.classList.remove('text-danger');
        }
    }
})
});