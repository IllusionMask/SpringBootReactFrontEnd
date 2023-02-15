import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/v1.0"

class UserService {

    signupNewUser = (user) => {
        return axios.post(USER_API_BASE_URL + "/users", user);
    }

    listUsers = (param = {page: 0, size: 3}) => {
        const path = `http://localhost:8080/api/v1.0/users?page=${param.page || 0}&size=${param.size || 3}`;
        return axios.get(path);
    }

    getUser = (username) => {
        return axios.get(USER_API_BASE_URL + `/users/${username}`);
    }

    updateUser = (userId, body) => {
        return axios.put(USER_API_BASE_URL + "/users/" + userId, body);
    }
}

export default new UserService();