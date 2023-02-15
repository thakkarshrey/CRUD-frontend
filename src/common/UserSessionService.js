 class UserSessionService {
    async setUser(userName,userEmail,token){
        const userNameKey = 'usrName';
        const userEmailKey = 'usrEmail';
        const myObj = {[userNameKey]:userName,[userEmailKey]:userEmail}
        
        localStorage.setItem('loggedInUserStatus','1')
        localStorage.setItem('loggedInUserKey',token)
        localStorage.setItem('loggedInUserDetails',JSON.stringify(myObj))

        return;
    }

    getUserName(){
        var userName = "";
        let userObj = this.getUserObj();
        if(userObj){
            userName = userObj['usrName'];
        }
        return userName;
    }

    getUserEmail(){
        var userEmail = "";
        let userObj = this.getUserObj();
        if(userObj){
            userEmail = userObj['usrEmail'];
        }
        return userEmail;
    }

    getToken(){
        var sessionKey = "";
        let token = localStorage.getItem('loggedInUserKey')
        if(token && token !== ""){
            sessionKey = token
        }
        return sessionKey;
    }

    getUserObj(){
        var userInfoObj = null;
         let userObj = localStorage.getItem('loggedInUserDetails')
        if(userObj){
            userInfoObj = JSON.parse(userObj)
        }
        return userInfoObj
    }

    getUserLoggedInStatus(){
        var userLoggedInStatus = false;
        const loggedInStatus = localStorage.getItem('loggedInUserStatus')
        if(loggedInStatus!==null && loggedInStatus!==undefined && loggedInStatus!==""){
            if(loggedInStatus === "1"){
                userLoggedInStatus = true;
            }
        }
        return userLoggedInStatus
    }

    performUserLogOut() {
        this.removeUserSession();
        return;
    }

    removeUserSession() 
    {
        window.localStorage.removeItem( 'loggedInUserStatus' );
        window.localStorage.removeItem( 'loggedInUserKey' );
        window.localStorage.removeItem( 'loggedInUserDetails' )
        // Cookies.remove( AppConfig.SESSION_IS_USER_LOGGED_IN );
    }
}

export default new UserSessionService()