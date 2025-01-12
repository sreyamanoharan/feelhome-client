import axiosInstance from "./api/axios";

export const allChats = (userId) => {
    return axiosInstance.get(`/chat/userChat/${userId}`)
        .then(({ data }) => {
            console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",data);
            return data.fullchat;
        })
        .catch((err) => {
            throw err; // Re-throw the error to be caught by the calling code
        });
};