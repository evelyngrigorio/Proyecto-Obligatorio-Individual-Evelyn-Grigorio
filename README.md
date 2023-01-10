# E-mercado
"E-Mercado" es un sitio web ficticio de un e-commerce que desea ofrecer sus servicios de ventas de diversos productos a sus clientes. En este repositorio haremos seguimiento de las distintas implementaciones solicitadas en el transcurso del proyecto final de Fase 2 de Jóvenes a Programar.

### Proyecto de e-commerce para el programa de *Desarrollo Web* de [**Jóvenes a Programar**](https://jovenesaprogramar.edu.uy/).  

### **Tecnologías utilizadas:**
- JavaScript
- HTML
- CSS
- Bootstrap

## Requisitos por entregas
 Los requisitos por entregas son funcionalidades mínimas que debe ralizar el código cumpliendo en tiempo y forma con la fecha límite estipulada.
 #### Entrega 1: 
 - 1) Realizar una petición web a una URL donde se encuentra una colección de productos en formato JSON (pertenecientes a una categoría), con la información (precio, nombre, descripción, cantidad vendidos e imagen) respectiva a cada producto, y mostrar el listado en products.html. En principio haremos uso únicamente de la categoría 101 (Autos), pero en entregas posteriores nos encargaremos de mostrarle al usuario los productos de la categoría seleccionada.
 
 - 2) Realizar una pantalla de autenticación, de forma tal que la misma sea el inicio del sitio (en vez de la portada). Aquí podrás encontrar algún ejemplo.Deberás agregar las validaciones correspondientes a usuario y contraseña (campos no vacíos) y redireccionar al sitio de portada cuando presione el botón de Ingresar. La autenticación será ficticia, es decir que los datos ingresados por el usuario se tomarán siempre cómo válidos, el único criterio de validación de datos será que haya ingresado valores en ambos campos.
 
#### Entrega 2:
- 1) En la barra de navegación superior, agregar en la esquina derecha el nombre del usuario ingresado en la pantalla de inicio de sesión. Para ello deberás hacer uso del almacenamiento local.

- 2) Cuando el usuario selecciona una categoría de productos, su identificador es guardado en el almacenamiento local antes de redirigir a productos.html. Modifica la solicitud realizada en la carga del listado de productos (que hicimos en la entrega anterior) para que utilice ese identificador, en lugar de 101.

- 3) Con el listado de productos desplegado:
 - Aplicar filtros a partir de rango de precio definido.
 - Agregar las funcionalidades de orden ascendente y descendente en función del precio y descendente en  	función de la relevancia (tomaremos para ello la cantidad de artículos vendidos)

#### Entrega 3: 

- 1) Modifica products.html para que cada vez que el usuario seleccione un producto, su identificador se guarde en el almacenamiento local y se redirija a product-info.html.
- 2) Haciendo uso del identificador guardado en el punto anterior, realiza la solicitud adecuada para obtener la información de dicho producto y preséntala en product-info.html.
- 3) Haz la solicitud necesaria para obtener la lista de comentarios de cada producto y muéstralos debajo de lo realizado en el punto anterior (con su puntuación, usuario y fecha).
- 4) Agrega los controles gráficos necesarios para poder realizar un nuevo comentario con su puntuación (no se implementará el envío al servidor).


#### Entrega 4: 
- 1) En la misma página realizada en la entrega anterior con respecto a la información de un producto, muestra también los productos relacionados al mismo, incluyendo su nombre e imagen. Al pulsar sobre uno de los productos relacionados, se debe actualizar la página, mostrando ahora la información de dicho producto.
- 2) Convierte el nombre del usuario en un menú desplegable (manteniendo el nombre de usuario cómo botón) y agrega allí las opciones:
   - Mi carrito y que al seleccionarla redirija a esa pantalla (trabajaremos sobre esta página en una futura entrega).
   
 - Mi perfil y que al seleccionarla redirija a esa pantalla (trabajaremos sobre esta página en una futura entrega)

 - Cerrar sesión, que deberá redirigir a la pantalla de inicio de sesión, borrando el usuario autenticado.

#### Entrega 5:
- 1) Haciendo uso del id de usuario 25801, realizar la petición web a la URL donde se encuentra un carrito de compras ,ya con un producto precargado, y mostrar en HTML la información del mismo: nombre, costo, cantidad (como valor de un input), moneda, imagen y subtotal (costo por cantidad).
- 2) Incluir los controles gráficos necesarios para seleccionar tipo de envío y dirección (calle, número y esquina). La funcionalidad a dichos controles la trabajaremos en una entrega posterior.
- 3) Modificar el subtotal de la compra del artículo, en tiempo real, si se modifica la cantidad. Recuerda que el subtotal se calcula como el precio unitario del producto multiplicado por la cantidad.

#### Entrega 6: 

- 1) En esta entrega continuaremos con el carrito de compras para terminar de implementar las funcionalidades del mismo:
 - Agrega un espacio donde se visualicen:
 - El subtotal general: la suma de los subtotales (costo por cantidad) de todos los artículos
 - El costo de envío: calculado a partir del envío seleccionado por el usuario (5%, 7% o 15%) y siendo un porcentaje del valor anterior (el subtotal).
 - El total a pagar: la suma de los dos valores anteriores.
  - Los 3 valores deberán actualizarse en tiempo real cuando se modifique el tipo de envío o los artículos en el carrito.
 - Todos los valores deberán ser mostrados en dólares.
 
- 2) Añadir un modal que permita establecer una forma de pago e introducir los datos de la misma
 - Las mismas deberán ser tarjeta de crédito o transferencia bancaria, y deberán desactivarse los campos de la opción no seleccionada.

- 3) Añade también un botón para confirmar la compra
 - Al presionarlo deberán ejecutarse las siguientes validaciones (dando el feedback correspondiente al usuario):
   - Los campos calle, número y esquina, no podrán estar vacíos.
   - Deberá estar seleccionada la forma de envío.
   - La cantidad para cada artículo deberá estar definida y ser mayor a 0
   - Deberá haberse seleccionado una forma de pago
   - Los campos, para la forma de pago seleccionada, no podrán estar vacíos
   - Por último, se deberá avisar al usuario cuando la compra se haya realizado exitosamente.

#### Entrega 7: 
- 1) Llegó la hora de trabajar en el perfil del usuario
 - Se deberán mostrar campos para:
   - Nombre*
   - Segundo nombre
   - Apellido*
   - Segundo apellido
   - E-mail*
   - Teléfono de contacto

 - Solamente se podrá ingresar al perfil si el usuario se encuentra logueado. Además, al momento de ingresar por primera vez, todos los campos se deben encontrar vacíos, excepto E-mail, que debe contener el ingresado por el usuario al momento del login.
- 2) Al presionar el botón para guardar los datos, se debe validar que los campos obligatorios (*) se encuentren con valor, y de ser así, guardar en el almacenamiento local.
- 3) Las siguientes veces que se ingrese al perfil, ya se deben encontrar los datos cargados en los input, listos para ser modificados por el usuario.

<!--
# Secciones del sitio

## Inicio de sesión y portada
Página de inicio de sesión con posibilidad de inicio con cuenta de Google.

![login](https://i.postimg.cc/0jP0j0YY/shot-2022-12-30-21-46-27.png)
![portada](https://i.postimg.cc/2y0h6R8Y/shot-2022-12-30-21-48-04.png)
<br><br>

## Categorías y productos
Navegá entre las distintas categorías y productos que ofrece el e-commerce, y si alguno te interesa lo podés agregar al carrito de compras.

![categorias](https://i.postimg.cc/fLwV02PR/shot-2022-12-30-21-51-05.png)
![productos](https://i.postimg.cc/fRcWj7mt/shot-2022-12-30-21-52-42.png)
![producto](https://i.postimg.cc/vDRM5Dmt/shot-2022-12-30-21-53-25.png)
<br><br>

## Venta de productos
Agregá el producto que quieras a la lista de productos actual (funcionalidad no desarrollada).

![venta](https://i.postimg.cc/2SDLDSxW/shot-2022-12-30-21-54-13.png)
<br><br>

## Carrito de compras
Agregá productos al carrito de compras y configurá tus datos de envío.

![carrito](https://i.postimg.cc/25H1hFNd/shot-2022-12-30-21-55-34.png)
<br><br>

## Perfil de usuario
Guardá tus datos de usuario vinculados al correo electrónico que utilizaste para ingresar al sitio.

![perfil](https://i.postimg.cc/X7wXQ00Y/shot-2022-12-30-21-59-32.png)
<br><br>

# Funcionalidades

## Opiniones de producto
Dentro de la información de cada producto, tendrás la posibilidad de dejar una reseña del mismo si ya has iniciado sesión en el sitio.

![comentarios](https://i.postimg.cc/0jv1NFXV/shot-2022-12-30-22-01-13.png)
<br><br>

## Métodos de pago
A la hora de finalizar la compra, tendrás que otorgar tus detalles de envío, y tu método de pago, el cual podrá ser elegido entre transferencia bancaria o tarjeta de crédito/débito.

![pago](https://i.postimg.cc/ZYHM3WWb/shot-2022-12-30-22-02-06.png)
<br><br>

## Adaptabilidad a pantallas pequeñas
También podrás ingresar al sitio desde tu celular y utilizar la página cómodamente.

![portadaPhone](https://i.postimg.cc/ZR76YzqS/shot-2022-12-30-22-04-02.png)
![productoPhone](https://i.postimg.cc/T1nmVL9R/shot-2022-12-30-22-04-57.png)
![carritoPhone](https://i.postimg.cc/gkP3Yszr/shot-2022-12-30-22-05-41.png)
![perfilPhone](https://i.postimg.cc/nhF7mLQJ/shot-2022-12-30-22-06-40.png)
<br><br>

-->

## Api utilizada para este proyecto  
https://japceibal.github.io/emercado-api/

### Api endpoints
- Categorías: cats/cat.json

- Productos: cats_products/[id_de_categoria].json

- Información de producto: products/[id_de_producto].json

- Comentarios de producto: products_comments/[id_de_producto].json
