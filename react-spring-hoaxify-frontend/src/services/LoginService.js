import axios from 'axios';

const LOGIN_API_BASE_URL = "http://localhost:8080/api/v1.0"



class LoginService {

    postLogin = (user) => {
        return axios.post(LOGIN_API_BASE_URL + "/login", {}, { auth: user });
    }

    setAuthorizationHeader = ({ username , password, isLoggedIn }) => {
        if(isLoggedIn){
            axios.defaults.headers.common["Authorization"] = `Basic ${btoa(username + ":" + password)}`;
        }else {
            //Once logged out
            delete axios.defaults.headers.common["Authorization"];
        }
        
    }
}

export default new LoginService();