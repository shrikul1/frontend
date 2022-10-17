import { useSelector } from "react-redux"


function LoginOnly({ element }) {
    const { login } = useSelector(state => state.users)
    // if (!login) {
    //     return "Unauthorized access"
    // }
    // return element
    // return !login ? "unuthorized access" : element
    return login ? element : <h1>unuthorized access</h1>

}

export default LoginOnly