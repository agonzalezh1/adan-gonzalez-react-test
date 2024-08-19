import { ChangeEventHandler, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useProducts } from '../../hooks/useProducts';
import { Product } from '../../utils/dataStructure';
import { useDispatch } from 'react-redux';
import { modifyProduct } from '../../redux/productsSlice';
import NotFound from '../NotFound/NotFound';
import './ProductDetails.scss';

type Inputs = {
    description: string,
    category: string,
    price: number,
};

/**
 * Muestra el detalle de un producto
 * El identificador del producto lo toma de un path parameter
 */
const ProductDetails = () => {

    // Utiliza la funcion getProductById dentro del hook de productos. Obtiene un producto ya consultado
    const { getProductById } = useProducts();
    // Identificador del producto obtenido de un path parameter
    const { id } = useParams();
    // Estado para mostrar la pantalla de Recurso no existente en caso de que el producto no exista
    const [notFound, setNotFound] = useState<boolean>(false);
    // Estado para guardar los detalles de un producto
    const [details, setDetails] = useState<Product>({id: 0, title: '', price: 0, description: '', category: '', image: '', rating: { rate: 0, count: 0},});

    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, formState } = useForm<Inputs>();

    /**
     * Función que se ejecuta cuando se guardan los cambios de un producto. Actualiza Redux
     * @param {Product} data Detalles del producto
     */
    const onSubmit: SubmitHandler<Inputs> = data => {
        const newDetails: Product = {
            id: details.id,
            price: data.price,
            title: details.title,
            category: data.category,
            description: data.description,
            image: details.image,
            rating: details.rating,
        };
        dispatch(modifyProduct(newDetails));
    };

    /**
     * Funcion que se ejecuta cuando hay un cambio en los detalles de un producto
     * Dependiendo del campo que se este modificando será el atributo que actualizará
     * @param {object} event Objeto con el detalle del evento onChange
     */
    const onChange: ChangeEventHandler<HTMLInputElement> = event => {
        const elementId = event.target.id;
        const value = event.target.value;
        if(elementId === 'description') {
            setValue('description', value);
        } else if(elementId === 'category') {
            setValue('category', value);
        } else {
            setValue('price', Number(value));
        }
    };

    /**
     * Se obtienen los valores iniciales del producto a partir del identificador
     * Si el producto no existe carga el componente NotFound
     */
    useEffect(() => {
        const product = getProductById(Number(id));
        if (product) {
            setNotFound(false);
            setValue('description', product.description ? product.description : '');
            setValue('category', product.category ? product.category : '');
            setValue('price', product.price);
            setDetails(product);
        } else {
            setNotFound(true);
        }
    }, []);

    return (<div className='product-details-container'>
        {notFound && <NotFound />}
        {!notFound && <>
            <h2>{details?.title}</h2>
            <form className='details-form-container' onSubmit={handleSubmit(onSubmit)}>
                <div className='description'>
                    <p>Descripción: </p><input type='text' id='description' {...register('description', { required: true })} onChange={e => onChange(e)}/>
                    <p>Categoria: </p><input type='text' id='category' {...register('category', { required: true })} onChange={e => onChange(e)}/>
                    <p>Calificación: {details?.rating?.rate}</p>
                    <p>Cantidad: {details?.rating?.count}</p>
                    <div className='save-button'>
                        <button disabled={!formState.isValid}>Guardar</button>    
                    </div>
                </div>
                <div className='image'>
                    <img src={details?.image} alt='product' width='250' height='300'/>
                    <div className='price'>
                        <p>Precio: </p><input type='text' id='price' {...register('price', { required: true })} onChange={e => onChange(e)}/>
                    </div>
                </div>
            </form>            
        </>}
    </div>);
};

export default ProductDetails;