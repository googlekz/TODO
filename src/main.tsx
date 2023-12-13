import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Auth from "./store/auth.js";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Authorization from "./components/authorization/authorization.tsx";
import Registration from "./components/registration/registration.tsx";

interface State {
    store: Auth,
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: '/authorization',
        element: <Authorization />
    },
    {
        path: '/registration',
        element: <Registration />
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = new Auth();

export const Context = createContext<State>({
    store,
})

root.render(
    <React.StrictMode>
        <Context.Provider value={{
            store
        }}>
            <div>
                <RouterProvider router={router} />
            </div>
        </Context.Provider>
    </React.StrictMode>
);
