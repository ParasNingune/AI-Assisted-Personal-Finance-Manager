import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export const useUserAuth = () => {
    const {user, updateUser, clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) return;

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get('/users/getUser');

                if (isMounted) {
                    updateUser(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch user info", error);
                if (isMounted) {
                    clearUser();
                    navigate('/login');
                }
            }
        };

        fetchUserInfo();
        return () => {
            isMounted = false;
        };
    }, [updateUser, clearUser, navigate]);
}