// @ts-nocheck
import { useEffect, useState } from "react";
import axiosApi from "../Axios/Axios";

const useValidateToken = () => {
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const controler = new AbortController();
        const validateToken = async () => {
            setIsLoading(true);
            try {
                const res = await axiosApi.get("/validateAccessToken",
                    { signal: controler.signal }
                );
                if (res.status === 200) {
                    const { isValidToken } = res.data;
                    setIsValid(isValidToken);
                } else {
                    setIsValid(false);
                }
            } catch (e) {
                console.log("Error validating token:", e);
                localStorage.removeItem("app_auth"); // REMOVE THE AUTH VALUES
                controler.abort()
                setIsValid(false);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        validateToken();

    }, []);

    return { isValid, isLoading }

}

export default useValidateToken