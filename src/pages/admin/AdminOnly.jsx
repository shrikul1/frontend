import { useSelector } from "react-redux"


function AdminOnly({ element }) {
    const { adLogin } = useSelector(state => state.auth)
    // if (!login) {
    //     return "Unauthorized access"
    // }
    // return element
    // return !login ? "unuthorized access" : element
    return adLogin ? element : <h1>unuthorized access</h1>

}

export default AdminOnly