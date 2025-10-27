// @ts-nocheck
import Axios from "axios";
import { toast } from "react-toastify";
import { API_URL, RETURN_URL, ELLIDER_TMC_API_URL, ELLIDER_KMC_API_URL } from "../Constant/Static";

let userCredential = null;

const createAxiosInstance = (baseURL) => {
    const instance = Axios.create({
        baseURL,
        // withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": "en-GB,en",
        },
        timeout: 10000
    })
    const fetchEliderToken = async () => {
        try {
            const result = await axiosApi.get(`/user/get-elider-token`)
            const { success, data } = result.data
            if (success === 1 && data.length > 0) {
                const token = data?.[0]?.elider_token;

                return token
            } else {
                return null
            }
        } catch (err) {
            console.error("Failed to fetch elider token:", err);
            return null;
        }
    }
    // attaching token || Credentials to request interceptors
    instance.interceptors.request.use(
        async (config) => {
            // If no Credentials
            if (!userCredential) {
                const userinfo = sessionStorage.getItem('userDetl');
                try {
                    userCredential = userinfo ? JSON.parse(userinfo) : null;
                } catch (error) {
                    console.log('Failed to get the userDetails from Session Storage or Parsing Error ')
                    userCredential = null;
                }
            }
            // if user Credential

            const token = await fetchEliderToken()
            if (token) {

                config.headers.Authorization = `Token ${token}`;
            }
            return config;
        },
        (error) => {
            console.log('Request Interceptor Error ', error)
            return Promise.reject(error)
        }
    )
    return instance;
}

// Main Axios Api for Primary API Calls
const axiosApi = Axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "en-GB,en",
    },
    timeout: 10000
});



// Axios instancce for Ellider to KMC  and TMC
const axiosellider_tmc = createAxiosInstance(ELLIDER_TMC_API_URL)
const axiosellider_kmc = createAxiosInstance(ELLIDER_KMC_API_URL)

// axiosApi.interceptors.request.use(
//     (config) => {
//         return config;
//     },
//     (error) => Promise.reject(error)
// );
// // ellider api



// export const axiosellider_tmc = Axios.create({
//     baseURL: ELLIDER_TMC_API_URL,
//     headers: {
//         "Content-Type": 'application/json',
//         "Accept": 'application/json',
//         "Accept-Language": "en-GB,en"
//     }
// });

// export const axiosellider_kmc = Axios.create({
//     baseURL: ELLIDER_KMC_API_URL,
//     headers: {
//         "Content-Type": 'application/json',
//         "Accept": 'application/json',
//         "Accept-Language": "en-GB,en"
//     }
// });


// axiosellider_tmc.interceptors.request.use(function (config) {
//     const userinfo = sessionStorage.getItem('userDetl');
//     const accessToken = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).token : 0;
//     config.headers.Authorization = `Bearer ${accessToken}`;
//     return config;
// }, function (err) {
//     console.log(err);
// })

// axiosellider_kmc.interceptors.request.use(function (config) {
//     const userinfo = sessionStorage.getItem('userDetl');
//     const accessToken = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).token : 0;
//     config.headers.Authorization = `Bearer ${accessToken}`;
//     return config;
// }, function (err) {
//     console.log(err);
// })



// end

// Handling the refresh token initially for AxioApi later can add to ellider also
let refreshPromise = null;

const handleTokenRefresh = async (error, instance) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const localData = localStorage.getItem("app_auth");
            if (!localData) {
                throw new Error('No Auth Data found in the Localstorage')
            }

            let userSlno;
            try {
                userSlno = atob(JSON.parse(localData)?.authNo);
            } catch (err) {
                console.log('Failed to parse authNo from localstorage', err)
                throw new Error('Invalid Auth Data')
            }
            if (!refreshPromise) {
                refreshPromise = axiosApi.get(`/user/getRefershToken/${userSlno}`, { withCredentials: true });
            }

            await refreshPromise;
            refreshPromise = null;
            return instance(originalRequest)
        } catch (refreshError) {
            console.log("Failed to refresh token:", refreshError);
            localStorage.removeItem("app_auth");
            // Showing the Error modal and Timedout then Navigate to Base Page
            toast.error(
                <div className='flex h-20 flex-col' >Your Session has been Expired</div>, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            setTimeout(() => {
                window.location.href = "/";
            }, 3000);
            return Promise.reject(refreshError)
        }
    }
    // Handling 403 Error
    if (error.response?.status === 403) {
        console.log('Access Denied :', error.response)
        localStorage.removeItem("app_auth");
        // Showing the Error modal and Timedout then Navigate to Base Page
        toast.error(
            <div className='flex h-20 flex-col' >Your Session has been Expired</div>, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
        setTimeout(() => {
            window.location.href = "/";
        }, 3000);
        return Promise.reject(error)
    }

    console.log('Api Error', error.response?.status, error.message)
    return Promise.reject(error)
}

axiosApi.interceptors.response.use(
    (response) => response,
    (error) => handleTokenRefresh(error, axiosApi)
)



// axiosApi.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const localData = localStorage.getItem("app_auth");
//         const userSlno = atob(JSON.parse(localData)?.authNo);
//         const originalRequest = error.config;

// //1

//         // Check if the error is due to an expired token
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true; // Prevent infinite retries
//             try {
//                 await axiosApi.get(`/user/getRefershToken/${userSlno}`, { withCredentials: true });
//                 return axiosApi(originalRequest);
//             } catch (refreshError) {
//                 console.log("Failed to refresh token:", refreshError);
//                 localStorage.removeItem("app_auth");
//                 // Handle logout or redirection to login page
//                 toast.error(
//                     <div className='flex h-20 flex-col' >Your Session has been Expired</div>, {
//                     position: "top-center",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 });
//                 setTimeout(() => {
//                     window.location.href = "/";
//                 }, 3000); // Wait 3 seconds before redirecting
//             }
//         }

// //2
//         if (error.response?.status === 403) {
//             localStorage.removeItem("app_auth");
//             // Handle logout or redirection to login page
//             setTimeout(() => {
//                 window.location.href = "/";
//             }, 1000); // Wait 3 seconds before redirecting
//         }





//         return Promise.reject(error);
//     }
// );

export { axiosApi, axiosellider_kmc, axiosellider_tmc }
export default axiosApi;
