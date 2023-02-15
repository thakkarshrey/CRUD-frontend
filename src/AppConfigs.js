import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom';
import AppRoutingConfig from './assets/config/AppRoutingConfig'
import RegisterConfig from './auth/register/RegisterConfig';
import UsersConfig from './modules/users/UsersConfig';

const SignIn = lazy(()=>import ('./auth/signin/SignIn.js')); 


export const routes = [
    {
        path:AppRoutingConfig.APP_SIGN_IN_URL,
        component:SignIn
    },
    {
        path:AppRoutingConfig.APP_DEFAULT_PATH_URL,
        component:<Navigate to={AppRoutingConfig.APP_SIGN_IN_URL}/>
    },
    RegisterConfig,
    UsersConfig
]
