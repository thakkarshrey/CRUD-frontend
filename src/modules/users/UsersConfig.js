import { lazy } from "react" 
import AppRoutingConfig from "../../assets/config/AppRoutingConfig"
const UserList = lazy(()=>import('./UserList'));

const UsersConfig = {
    path:AppRoutingConfig.APP_USER_LIST_PATH_URL,
    component:UserList
}

export default UsersConfig