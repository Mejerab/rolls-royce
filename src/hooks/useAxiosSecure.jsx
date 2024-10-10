import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: 'https://rolls-royce-server.vercel.app',
    withCredentials: true
})
const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res
        }, error => {
            console.log('error in interceptor', error);
            if (error.response.status === 401 || error.response.status === 403) {
                logOut()
                    .then(() => navigate('/login'))
                    .catch(err => console.log(err))
            }
        })
    }, [logOut, navigate])
    return axiosSecure;
};

export default useAxiosSecure;