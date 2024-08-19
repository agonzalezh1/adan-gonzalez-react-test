export interface Rating {
    rate: number,
    count: number
};

export interface Product {
    id: number,
    title: string,
    price: number,
    description?: string,
    category?: string,
    image?: string,
    rating?: Rating,
};

export interface User {
    username: string,
    password: string,
    isLogged?: boolean,
};

export type Routes = '/' | '/active' | '/completed'

export interface AppState {
    productsList: Product[],
    user: User
};
