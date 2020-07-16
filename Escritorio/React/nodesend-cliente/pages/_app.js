import React from 'react';
import AuthState from '../context/autenticacion/authState';


const MyApp=({Component, pageProps})=>{
    return(
        <AuthState>
            <Component
            {...pageProps}
            />
        </AuthState>
    )
}

export default MyApp;