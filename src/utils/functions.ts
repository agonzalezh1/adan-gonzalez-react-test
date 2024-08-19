import { store } from '../redux/store';
import { User } from "./dataStructure"

export const validateUser = ({username, password}: User): boolean => {
    const user = store.getState().user;
    
    if( user.username === username && user.password === password) {
        return true;
    } else {
        return false;
    }
};
