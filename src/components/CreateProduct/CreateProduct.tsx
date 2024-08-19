import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/productsSlice';
import { Product } from '../../utils/dataStructure';
import './CreateProduct.scss';

type Inputs = {
    title: string,
    description: string,
    category: string,
    price: string,
    rate: string,
    count: number,
};

/**
 * Componente que crea un producto
 * Se agrega el nuevo producto al Redux con un ID siguiente al ultimo registrado
 */
const CreateProduct = () => {
    const { register, handleSubmit, setValue, trigger, formState } = useForm<Inputs>();
    const dispatch = useDispatch();

    /**
     * Se agrega el producto al Redux
     * @param {Inputs} data Datos del formulario
     */
    const onSubmit: SubmitHandler<Inputs> = data => {
        const newProduct: Product = {
            id: 0,
            price: Number(data.price),
            title: data.title,
            category: data.category,
            description: data.description,
            rating: {
                rate: Number(data.rate),
                count: data.count
            },
        };
        dispatch(addProduct(newProduct));
    };

    /**
     * Se eliminan caracteres que no sean numeros
     * Se acepta el punto decimal 
     * @param {string} value Valor del formulario (precio)
     */
    const validatePrice = (value: string) => {
        const valueFormatted = value.replace(/[^0-9.]/g, '');
        setValue('price', valueFormatted);
        trigger();
    };

    /**
     * Se eliminan caracteres que no sean numeros
     * Se acepta el punto decimal 
     * @param {string} value Valor del formulario (Calificacion)
     */
    const validateRate = (value: string) => {
        const valueFormatted = value.replace(/[^0-9.]/g, '');
        setValue('rate', valueFormatted);
        trigger();
    };

    /**
     * Se eliminan caracteres que no sean numeros
     * @param {string} value Valor del formulario (Cantidad)
     */
    const validateCount = (value: string) => {
        const valueFormatted = value.replace(/[^0-9]/g, '');
        setValue('count', Number(valueFormatted));
        trigger();
    };

    return (<div className='create-product-container'>
        <h2>Agregar un nuevo producto</h2>
        <form className='product-form-container' onSubmit={handleSubmit(onSubmit)}>
            <p>Nombre:</p><input type='text' {...register('title', { required: true })} />
            <p>Descripción:</p><input type='text' {...register('description', { required: true })} />
            <p>Categoría:</p><input type='text' {...register('category', { required: true })} />
            <p>Precio:</p>
            <input
                type='string'
                {...register('price', { required: true, pattern: /^[0-9]*\.?[0-9]{1,2}$/g, maxLength: 8 })}
                onChange={e => validatePrice(e.target.value)}
                maxLength={8}
            />
            <p>Calificación:</p>
            <input
                type='string'
                {...register('rate', { required: true, pattern: /^[0-9]*\.[0-9]{1}$/g, maxLength: 3 })}
                onChange={e => validateRate(e.target.value)}
                maxLength={3}
                placeholder='5.0'
            />
            <p>Cantidad:</p>
            <input
                type='string'
                {...register('count', { required: true, pattern: /[^0-9]{0,4}/g, maxLength: 4 })} 
                onChange={e => validateCount(e.target.value)}
                maxLength={4}
            />
            <div className='save-button'>
                <button disabled={!formState.isValid}>Guardar</button>
            </div>
        </form>
    </div>)
};

export default CreateProduct;
