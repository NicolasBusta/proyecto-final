//verificacion de edad:
Swal.fire({
  title: '<strong>¿Eres mayor de edad?</strong>',
  confirmButtonColor: '#FFC900',
  cancelButtonColor: 'black',
  icon: 'question',
  showCloseButton: true,
  showCancelButton: true,
  focusConfirm: false,
  reverseButtons: true,
  focusCancel: true,
  cancelButtonText:`SI`,
  confirmButtonText: '<a href="http://servicios.infoleg.gob.ar/infolegInternet/anexos/40000-44999/42480/norma.htm">NO</a>'
}).then((result) => {
  if (result.value) {
    window.location.href = ``
  }
}); 
//recomendacion:
function RandomSugerencia(array) {
  return array[Math.floor(Math.random() * array.length)];
}

  let opcionRubia ="RUBIA PAPA!";
  let opcionRoja ="ROJA PAPA!";
  let opcionNegra ="NEGRA PAPA!";
  let array1 = [opcionRubia, opcionRoja,opcionNegra];
  let ValorFinal1 = RandomSugerencia(array1);

function cambiar() {
  document.getElementById("recomendacionParrafo").innerHTML= ValorFinal1;
}
  

  document.getElementById("recomendacionBottom").onclick = function(){
      cambiar();
  }

//carrito
const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked);
  
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
  Swal.fire({
    position: 'top-end',
    width: 400,
    icon: 'success',
    title: 'Se agrego al carrito',
    background: 'black',
    color: 'white',
    showConfirmButton: false,
    timer: 1000
  });
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;
  const itemId = item.querySelector('.item-button').getAttribute('data-id');
  
  addItemToShoppingCart(itemTitle, itemPrice, itemImage,itemId);
  
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage,itemId) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
  this.guardarProductosLocalStorage(itemId);
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}`;
  
}

function removeShoppingCartItem(event) {
  Swal.fire({
    position: 'top-end',
    width: 400,
    icon: 'warning',
    title: 'Se retiro del carrito al carrito',
    background: 'black',
    color: 'white',
    showConfirmButton: false,
    timer: 1000
  });
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();

 // vaciarLocalStorage();
 eliminarProductoLocalStorage(itemId);
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}

//fetch
fetch("cervezas.json")
.then((Response)=>{
    return Response.json();
}).then((cervezas)=>{
    console.log(cervezas);
});

//localstorage:

//Almacenar en el LS
function guardarProductosLocalStorage(itemId){
  let productos;
  //Toma valor de un arreglo con datos del LS
  productos = this.obtenerProductosLocalStorage();
  //Agregar el producto al carrito
  productos.push(itemId);
  
  //Agregamos al LS
  localStorage.setItem('productos', JSON.stringify(productos));
}

//Comprobar que hay elementos en el LS
function obtenerProductosLocalStorage(){
  let productoLS;

  //Comprobar si hay algo en LS
  if(localStorage.getItem('productos') === null){
      productoLS = [];
  }
  else {
      productoLS = JSON.parse(localStorage.getItem('productos'));
  }
  return productoLS;
};

 //Eliminar producto por ID del LS
 function eliminarProductoLocalStorage(itemId){
  let productosLS;
  //Obtenemos el arreglo de productos
  productosLS = this.obtenerProductosLocalStorage();
  //Comparar el id del producto borrado con LS
  productosLS.forEach(function(productoLS, index){
      if(productoLS.id === itemId){
          productosLS.splice(index, 1);
      }
  });

  //Añadimos el arreglo actual al LS
  localStorage.setItem('productos', JSON.stringify(productosLS));
}
/*function vaciarLocalStorage(){
  localStorage.clear();
}*/
