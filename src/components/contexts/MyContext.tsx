import { createContext } from 'react';

type MyContextValue = string;

const MyContext = createContext<{}>('default value');

export default MyContext;