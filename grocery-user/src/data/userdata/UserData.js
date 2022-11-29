import React from 'react'
import axios from "axios";

const apiKey = process.env.REACT_APP_YK_API_KEY;
const serverURL = process.env.REACT_APP_SERVER_URL;

export const UserData = async (user_id, token) => {
    try {
        return await axios.get(`${serverURL}` + "users/" + `${user_id}`, {
            headers: {
                "yourkoseli-api-key": `${apiKey}`,
                "Authorization": `Bearer ${token}`
            },
        });
    } catch (error) {
        console.log(error);
    }
};
