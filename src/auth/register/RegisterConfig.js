import { lazy } from "react" 
import AppRoutingConfig from "../../assets/config/AppRoutingConfig"
const Register = lazy(()=>import('./Register'));

const RegisterConfig = {
    path:AppRoutingConfig.APP_REGISTER_URL,
    component:Register
}

export default RegisterConfig