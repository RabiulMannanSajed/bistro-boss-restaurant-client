import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

// thsi is use for compect the code 
const useAuth = () => {
    const auth = useContext(AuthContext)
    return auth
};

export default useAuth;