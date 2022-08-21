const url = "https://japceibal.github.io/emercado-api/cats_products/101.json"

function htmlContentToAppend(products) {
    return `
    <div class="list-group item list-group-item-action">
        <div class ="row>
            <div class="col-3">
            <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
            </div>
            <div class="col-3">

            </div>
        </div>
    </div>
    `}

var productos = ""

document.addEventListener("DOMContentLoaded", async function(){
    const listado = document.getElementById('cat-list-container')

    let respuesta = await getJSONData(url)
    console.log(respuesta)

    if (respuesta.status === "ok"){
        productos = respuesta.data
        console.log(productos.products[0])

        for(let i=0; i < productos.products.lenght; i++){
            let categoriainterna = productos.products[i]
            listado.innerHTML += htmlContentToAppend(categoriainterna);
        }
    }
})

