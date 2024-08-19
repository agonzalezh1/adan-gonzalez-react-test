import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { store } from '../../redux/store';
import { updateCredentials } from '../../redux/usersSlice';
import { User } from '../../utils/dataStructure';
import './Users.scss';

type Inputs = {
    newUser: string,
    newPassword: string,
    confirmNewPassword: string,
};

const Users = () => {
    const { register, getValues, setValue, handleSubmit, formState } = useForm<Inputs>();
    const dispatch = useDispatch();

    /**
     * Función que modifica las credenciales de un usuario
     * @param {Inputs} data Usuario y contraseña del usuario
     */
    const onSubmit: SubmitHandler<Inputs> = data => {
        const newCredentials: User = {
            username: data.newUser,
            password: data.newPassword,
        };
        dispatch(updateCredentials(newCredentials));
    };

    /**
     * Efecto para recuperar el usuario de Redux
     */
    useEffect(() => {
        setValue('newUser', store.getState().user.username);
    }, []);

    return(<div className='users-container'>
        <h2>Administracion de usuario</h2>
        <p>Para cambiar de contraseña debes de cumplir con las siguientes reglas</p>
        <ol>
            <li>Mínimo 6 caracteres</li>
            <li>Máximo 12 caracteres</li>
            <li>Al menos una letra mayúscula</li>
            <li>Al menos una letra minúscula</li>
            <li>Al menos un carácter especial</li>
            <li>Al menos un número</li>
        </ol>
        <form className='user-form-container' onSubmit={handleSubmit(onSubmit)}>
            <p>Cambiar usuario: </p>
            <input
                type='text'
                {...register('newUser', { required: true, pattern: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i })}
            />
            <p>Nueva contraseña: </p>
            <input
                type='password'
                {...register('newPassword', { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/i, minLength:6, maxLength:12 })}
                maxLength={12}
                minLength={6}
            />
            <p>Connfirmar contraseña: </p>
            <input
                type='password'
                {...register('confirmNewPassword', { required: true, validate: value => value === getValues('newPassword'), minLength:6, maxLength:12 })}
                maxLength={12}
                minLength={6}
            />
            <button disabled={!formState.isValid}>Modificar</button>
        </form>
    </div>);
};

export default Users;