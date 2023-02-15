export default class AppApiConfig{
    static API_ENDPOINT = "http://192.168.0.107:5000/";
    static API_ADMIN_ENDPOINT = "api";

    static API_AUTH_URL = this.API_ENDPOINT + this.API_ADMIN_ENDPOINT + "/auth" 
    static API_SIGN_IN_URL = this.API_AUTH_URL + "/" 
    static API_REGISTER_URL = this.API_AUTH_URL + "/register" 
}