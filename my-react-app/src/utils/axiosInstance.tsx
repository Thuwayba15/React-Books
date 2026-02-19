import axios from "axios";

export const getAxiosInstance = () =>
    axios.create({
        baseURL: import.meta.env.VITE_OPEN_LIBRARY_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });