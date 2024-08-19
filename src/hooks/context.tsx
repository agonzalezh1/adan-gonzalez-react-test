import { createContext } from "react";

type Session = {
    isLogged: boolean,
    setIsLogged: any,
}

export const SessionContext = createContext<Session>({isLogged: false, setIsLogged: null});