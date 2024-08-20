import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { store } from '../../redux/store';
import Login from '../Login/Login';
import Products from '../Products/Products';
import ProductDetails from '../ProductDetails/ProductDetails';
import CreateProduct from '../CreateProduct/CreateProduct';
import Users from '../Users/Users';
import NotFound from '../NotFound/NotFound';
import { Provider } from 'react-redux';
import PrivateRoutes from './PrivateRoutes';
import { SessionContext } from '../../hooks/context';
import './App.scss';

const App = () => {

    const [isLogged, setIsLogged] = useState<boolean>(false);

    return (
        <div className="App">
            <Provider store={store}>
                <SessionContext.Provider value={{ isLogged, setIsLogged }}>
                    <HashRouter>
                        <Routes>
                            <Route path='/login' Component={Login} />
                            <Route element={<PrivateRoutes />}>
                                <Route path='/product' Component={Products} />
                                <Route path='/product/:id' Component={ProductDetails} />
                                <Route path='/product/create' Component={CreateProduct} />
                                <Route path='/users' Component={Users} />
                            </Route>
                            <Route path='*' Component={NotFound} />
                        </Routes>
                    </HashRouter>
                </SessionContext.Provider>
            </Provider>
        </div>
    );
}

export default App;
