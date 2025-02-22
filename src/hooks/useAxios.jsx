import axios from "axios";



const baseUrl = axios.create({
    baseURL: "https://task-manager-backend-nu-navy.vercel.app"
})

const useAxios = () => {
    return baseUrl;
};

export default useAxios;