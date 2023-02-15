import { useAppContext } from "../../AppContext"
import { Main, NavbarContainer, UserDetails, User, Button } from "./Navbar.styled"
import UserSessionService from '../../common/UserSessionService'
import { useNavigate } from "react-router-dom";
import AppRoutingConfig from '../../assets/config/AppRoutingConfig'

function Navbar({children}){

    const { isAuthenticated, userAuthenticated } = useAppContext();
    const { userName, setUserName } = useAppContext();
    const { userEmail, setUserEmail } = useAppContext();
    const { authenticatedToken, setAuthenticatedToken } = useAppContext();

    const navigate = useNavigate()

    const handleLogout = () => {
        UserSessionService.performUserLogOut();
        userAuthenticated(false);
        setAuthenticatedToken('');
        setUserName('');
        setUserEmail('');
        navigate(AppRoutingConfig.APP_SIGN_IN_URL);
   }
    return(
        <>
        {
            isAuthenticated === true &&
            <NavbarContainer isAuthenticated={isAuthenticated}>
            <UserDetails>
                <User>{userName || "-"} | {userEmail || "-"}</User>
                <Button onClick={()=>handleLogout()}>Logout</Button>
            </UserDetails>   
            </NavbarContainer>
        }
        <Main isAuthenticated={isAuthenticated}>
            {children}
        </Main>
        </>
    )
}

export default Navbar