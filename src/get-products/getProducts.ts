import { Product } from "../interfaces/Product.interface";

//Convert data from API in just data we wanna render
const cartProduct = (product: any) : Product =>({
    id: product.id,
    title:product.title,
    price: product.price,
    description: product.description,
    thumbnail: product.thumbnail
})

export const getData = async (url: string ): Promise<Product[]> =>{
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(response.statusText);            
        }

        const data = await response.json();
        return data.products.map(cartProduct);
    } catch (error) {
        throw new Error("Error getting products");
        
    }
}