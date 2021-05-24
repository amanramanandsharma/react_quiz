import axios from "axios";
import { authenticationService } from "../Authentication/Authentication.Service";

//Environment Variales
import { config } from '../environment';

const axiosInstance = () => {
    const defaultOptions = {
        baseURL: config.url,
        headers: {
            "Content-Type": "application/json",
        },
    };

    // Create instance
    let instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        const currentUser = authenticationService.getUserData();
        // console.log(currentUser);
        // const currentUser = useSelector((state) => state.userData);
        if (currentUser && currentUser.token) {
            config.headers.Authorization = `Bearer ${currentUser.token}`;
        }
        return config;
    });
    return instance;
};

export default axiosInstance();