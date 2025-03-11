// @ts-nocheck
import Axios from "axios";
import { API_URL, RETURN_URL } from "../Constant/Static";
import { toast } from "react-toastify";

const axiosApi = Axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "en-GB,en",
    },
});

axiosApi.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

axiosApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const localData = localStorage.getItem("app_auth");
        const userSlno = atob(JSON.parse(localData)?.authNo);
        const originalRequest = error.config;
        // Check if the error is due to an expired token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite retries
            try {
                await axiosApi.get(`/user/getRefershToken/${userSlno}`, { withCredentials: true });
                return axiosApi(originalRequest);
            } catch (refreshError) {
                console.log("Failed to refresh token:", refreshError);
                localStorage.removeItem("app_auth");
                // Handle logout or redirection to login page
                toast.error(
                    <div className='flex h-20 flex-col' >Your Session has been Expired</div>, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    window.location.href = "/";
                }, 3000); // Wait 3 seconds before redirecting
            }
        }

        if (error.response?.status === 403) {
            localStorage.removeItem("app_auth");
            // Handle logout or redirection to login page
            setTimeout(() => {
                window.location.href = "/";
            }, 3000); // Wait 3 seconds before redirecting
        }

        return Promise.reject(error);
    }
);

export default axiosApi;
