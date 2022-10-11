


document.addEventListener("DOMContentLoaded", async function() {
    getJSONData(CART_INFO_URL).then(function (response) {

        if (response.status === "ok") {
            cart = response.data; 
            console.log(cart)
        }
    })
});