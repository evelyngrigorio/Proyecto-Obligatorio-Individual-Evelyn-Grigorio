const url = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;

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
    `}

var productos =""

document.addEventListener("DOMContentLoaded", async function(){
    const Lista = document.getElementById('prod-list-container')

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

