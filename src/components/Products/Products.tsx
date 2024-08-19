import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useProducts } from '../../hooks/useProducts';
import { Product } from '../../utils/dataStructure';
import { deleteProduct } from '../../redux/productsSlice';
import { useNavigate } from 'react-router-dom';
import './Products.scss';

/**
 * Componente que muestra la lista de productos que esta en el api https://fakestoreapi.com/products
 * Los productos son consultados y guardados en Redux
 * El manejo de productos se hace mediante el hook useProducts
 */
const Products = () => {

    // Lista general de productos
    const { products } = useProducts();
    // Lista temporal de productos,. se usa solo para el manejo del componente
    const [list, setList] = useState<Product[]>(products);
    // Tipo de ordenamiento de los productos
    const [ascending, setAscending] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * Redirecciona a la pantalla de Editar el usuario
     */
    const redirectUserEdit = () => navigate('/users');

    /**
     * Redirecciona a la pantalla de Crear un producto
     */
    const redirectAddProduct = () => navigate('/product/create');

    /**
     * Crea un row para la tabla de productos con la información básica del mismo
     * @param {Product} product Objeto con la información basica del producto
     * @returns Filas de una tabla con la información de un producto
     */
    const createRow = (product: Product): JSX.Element=> {
        return (
            <tr key={product.id}>
                <td>{product.id}</td>
                <td className='link' onClick={() => navigate(`/product/${product.id}`)}>{product.title}</td>
                <td>$ {product.price}</td>
                <td className='link' onClick={() => dispatch(deleteProduct(product.id))}>Eliminar</td>
            </tr>
        );
    };

    /**
     * Ordena los productos de manera ascendete/descendente
     * Utiliza la lista "temporal" para realizar el ordenamiento
     */
    const sortProducts = () => {
        if (ascending) {
            list.sort((a, b) => a.price - b.price);
        } else {
            list.sort((a, b) => b.price - a.price);
        }
        setList(list);
        setAscending(!ascending);
    };

    /**
     * Realiza la busqueda de un producto por coincidencia en palabras
     * Filtra la lista "temporal" para realizar la busqueda
     * @param {string} value  Cadena capturada por el usuario
     */
    const searchProduct = (value: string) => {
        const listFiltered = products.filter(product => product.title.toUpperCase().includes(value.toUpperCase()));
        setList(listFiltered);
    };

    /**
     * Si el hook de productos llega a cambiar, se actualiza la lista "temporal"
     */
    useEffect(() => {
        setList(products);
    },[products]);

    return (<div className='products-container'>
        <h2>Lista de productos</h2>
        <div className='actions'>
            <input placeholder='Buscar producto por nombre' onChange={e => searchProduct(e.target.value)}/>
            <p className='link' onClick={() => redirectAddProduct()}>Agregar un producto</p>
            <p className='link' onClick={() => redirectUserEdit()}>Editar usuario</p>
        </div>
        <br/>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th className='link' onClick={() => sortProducts()}>Precio</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {list.map((product: Product) => createRow(product))}
            </tbody>
        </table>
        
    </div>);
};

export default Products;