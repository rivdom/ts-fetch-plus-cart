import { getData } from "./get-products/getProducts";
import { Product } from "./interfaces/Product.interface";
import { renderProducts } from "./product-layout/renderProducts";

//variables
const url = "https://dummyjson.com/products";
let products: Product[] = [];
let cartProducts: Product[] = [];

// Data from API
products = await getData(url);

//Render Products
renderProducts(products);
//Add products to Cart
const addToCart = (products: Product[], e: Event) => {
  const target = e.target as HTMLElement;

  if (target.tagName === "BUTTON" && target.hasAttribute("data-id")) {
    const productId = Number(target.getAttribute("data-id"));
    const productToAdd = products.find((product) => product.id === productId);

    if (productToAdd) {
      cartProducts.push(productToAdd);
      alert('product added')
      console.log(cartProducts)
      renderCartProducts(cartProducts);
    }
  }
};

const addBtns = document.querySelectorAll('.add-btn');

addBtns.forEach((btn) => {
    btn.addEventListener('click', (e)=> addToCart(products, e));
})

//Render cart products
const cart = document.querySelector('#cart') as HTMLElement;
const renderCartProducts = (cartProducts: Product[]) => {
    cart.innerHTML = `
    ${cartProducts.map(product => `
                      <article class="cart-product">
            <img
              src="${product.thumbnail}"
              alt=""
            />
            <span>${product.title}</span>
            <span class="price">$${product.price}</span>
            <button class="remove-btn" data-id="${product.id}">X</button>
          </article>
        `).join('')}
    `
}

renderCartProducts(cartProducts);


//Remove products from cart
const deleteProduct = (cartProducts : Product[], e: Event) => {
    const target =e.target as HTMLElement;
  console.log(target)
    if(target.tagName === 'BUTTON' && target.hasAttribute('data-id')){
        const cartProductId = Number(target.getAttribute('data-id'));
        const productToDelete = cartProducts.find((product) => product.id === cartProductId);
        console.log(productToDelete)
        if(productToDelete){
            cartProducts = cartProducts.filter((product) => product.id !== cartProductId);
            renderCartProducts(cartProducts);
            console.log(cartProducts)
        }
    }
    
}


//Se asigna al contenedor de los botones de eliminación de productos del carrito
//Event delegation
const cartContainer = document.querySelector('#cart') as HTMLElement;

cartContainer.addEventListener('click', (e)=> deleteProduct(cartProducts, e));
