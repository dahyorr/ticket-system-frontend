import { useContext } from "react";
import { Context as AuthContext} from "../context/AuthContext";

export const useAuth = () => useContext(AuthContext)