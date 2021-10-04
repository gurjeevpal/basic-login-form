import users from '../fake/users'
import { LOGIN, LOGGED_IN_USERNAME, ERROR } from "../constants";

const validateLogin = (form) => (dispatch) => {
    const { userName, password } = form;
    const user = users.find(user => user.username.includes(userName));
    const isAuth = user &&  user.password.toLowerCase() === password? true: false;
    console.log('isAuth', isAuth)
    dispatch({
        type: LOGIN,
        isAuth
    })

    if(isAuth) {
        dispatch({
            type: LOGGED_IN_USERNAME,
            user: userName
        })
    }
}

export default validateLogin;