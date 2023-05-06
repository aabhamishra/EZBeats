import { useContext } from "react";
import loginStateContext from "../../contexts/SamplerLoginStateContext";

export default function SamplerLogout() {
    const [loginState, setLoginState] = useContext(loginStateContext);

    setLoginState(0);
}