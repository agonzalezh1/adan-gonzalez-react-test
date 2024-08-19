import { useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { validateUser } from '../../utils/functions';
import { SessionContext } from '../../hooks/context';
import './Login.scss';

type Inputs = {
    username: string,
    password: string,
};

/**
 * Componente que autentica a un usuario por su correo
 */
const Login = () => {

    const { register, handleSubmit, formState } = useForm<Inputs>();
    const navigate = useNavigate();
    const { setIsLogged } = useContext(SessionContext);
    const [errorMessage, setErrorMessage] = useState<string>('');

    /**
     * Valida que el usuario este registrado en el portal
     * Si no esta registrado, muestra una leyenda de error
     * @param {Inputs} data Objeto con las credenciales del usuario
     */
    const onSubmit: SubmitHandler<Inputs> = data => {
        if(validateUser(data)) {
            navigate ('/product');
            setIsLogged(true);
        } else {
            setErrorMessage('Credenciales inválidas');
        }
    };

    return(<div className='login-container'>
        <h2>Sistema e-Commerce</h2>
        <form className='login-form-container' onSubmit={handleSubmit(onSubmit)}>
            <input
                type='text'
                placeholder='Usuario'
                {...register('username', { required: true, pattern: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i })}
            />
            <input
                type='password'
                placeholder='Contraseña'
                {...register('password', { required: true })}/>
            <button disabled={!formState.isValid}>Login</button>
        </form>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </div>);
};

export default Login;