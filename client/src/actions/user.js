import axios from 'axios';
var jwtDecode = require('jwt-decode');

export const registerUser = (credentials) => {
    return new Promise((res, rej) => {
        axios.post("/api/user/", credentials)
            .then((re) => {
                let { token } = re.data;
                localStorage.setItem("jwtToken", token);
                let decoded = jwtDecode(token);
                res(decoded)
            }).catch((err) => {
                console.log(err);
                rej(err)
            })
    })
}

export const loginUser = credentials => {
    return new Promise((res, rej) => {
        axios
            .post("/api/user/login", credentials)
            .then((re) => {
                let { token } = re.data;
                localStorage.setItem("jwtToken", token);
                let decoded = jwtDecode(token);
                res(decoded)
            }).catch((err) => {
                rej(err)
            })
    })

};

export const logoutUser = () => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
};