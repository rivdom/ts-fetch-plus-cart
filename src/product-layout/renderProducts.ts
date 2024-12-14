import { Product } from '../interfaces/Product.interface';
const productLayout = document.querySelector('.product-layout') as HTMLElement | null;

export const  renderProducts = (products: Product[]) =>{
    if(!productLayout){
        console.error("Error: 'productLayout' no encontrado en el DOM");
        return;    }
    productLayout.innerHTML = `
        ${products.map( product => 
            `
      <article class="product-card">
        <h4>${product.title}</h4>
        <img
          src="${product.thumbnail}"
          alt="product-img"
        />
        <div class="description">
          <p>${product.description}</p>
          <p class="price"><strong>Price: </strong>${product.price}$</p>
        </div>
        <button class="add-btn" data-id="${product.id}"><i class="bi bi-plus-circle"></i>Add to cart</button>
      </article>            `
        ).join()
    }`
}
