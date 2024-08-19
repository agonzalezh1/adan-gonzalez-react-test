import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { productsList as list, setAllProducts } from '../redux/productsSlice';
import type { Product } from '../utils/dataStructure';

export const useProducts = () => {
    const { productsList } = useSelector(list);
    const dispatch = useDispatch();
    // Se guarda solo el detalle necesario para mostrar la lista de productos
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        if (productsList.length === 0) {
            fetch('https://fakestoreapi.com/products')
                .then(resp => resp.json())
                .then(products => {
                    dispatch(setAllProducts(products));
                });
        } 
    }, [dispatch, productsList.length]);

    useEffect(() => {
        const productsListFiltered = productsList.map(product => {
            return {
                id: product.id,
                title: product.title,
                price: product.price,
            }
        })
        setProducts(productsListFiltered);
    }, [productsList]);

    const getProductById = (id:number): Product | undefined => {
        if (productsList.length === 0) {
            return undefined;
        }
        
        return productsList.find(product => product.id === id);
    };

    return { products, getProductById };
}