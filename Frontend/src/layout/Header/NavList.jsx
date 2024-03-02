import React, { useState, useEffect } from 'react';
import { Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../Auth';
import axios from 'axios';

const NavList = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const history = useNavigate();

    useEffect(() => {
        const storedToken = getAccessToken();
        console.log('Stored Token:', storedToken);

        if (storedToken) {
        setIsLoggedIn(true);

        axios.get('http://localhost:8000/users', {
            headers: {
            Authorization: `Bearer ${storedToken}`,
            },
        })
            .then(response => {
            setName(response.data.name);
            })
            .catch(error => {
            console.error('Error fetching user info:', error);
            });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');

        setIsLoggedIn(false);

        history('/login');
    };

    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        {isLoggedIn ? (
            <>
            <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
                Welcome {name}
            </Typography>
            <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
                <button onClick={handleLogout} className="flex items-center hover:text-gray-600 hover:underline transition-colors">
                Logout
                </button>
            </Typography>
            </>
        ) : (
            <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
            <Link to="/login" className="flex items-center hover:text-gray-600 hover:underline transition-colors">
                Login
            </Link>
            </Typography>
        )}
        </ul>
    );
};

export default NavList;