import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../App';
import { useNavigate } from 'react-router-dom';

const Auth = ({ children, redirect }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get(`${server}/me`, {
                    withCredentials: true,
                });
                setUser(data.user);
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                if (redirect)
                    return navigate(redirect)
            }
        };

        fetchUserData();

        return () => {
            setUser(null);
            setIsAuthenticated(false);
        };
    }, [navigate]);

    if (!isAuthenticated && redirect) {
        return <></>;
    }
    return <>{React.cloneElement(children, { user, isAuthenticated })}</>;
};

export default Auth;
