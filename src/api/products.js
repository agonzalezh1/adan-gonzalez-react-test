
export const getProducts = () => {
    fetch('https://fakestoreapi.com/products')
        .then(resp => resp.json())  
	    .then(products => console.log(products));
};