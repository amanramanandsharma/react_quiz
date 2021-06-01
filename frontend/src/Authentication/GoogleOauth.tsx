import React, { useState, useEffect } from 'react';
import './GoogleOauth.scss';

// Bootstap Imports
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";
import Spinner from 'react-bootstrap/Spinner'

//Icons Import
import { FaGoogle } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaHome } from 'react-icons/fa';

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { authenticationService } from '../Authentication/Authentication.Service';

// Router Imports
import { Link } from "react-router-dom";

//Environment Variales
import { config } from '../environment';

function GoogleOauth() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        checkLoginStatus();
    }, []);

    
    const checkLoginStatus = () => {
        if (authenticationService.isLoggedIn()) {
            setIsLoggedIn(true);
            setUserData(authenticationService.getUserData());
        } else {
            setIsLoggedIn(false);
            setUserData({});
        }
    }

    const responseGoogle = (response) => {
        setIsLoading(true);
        if (response["error"] === undefined) {
            //If google gets a valid access code - then do backend authentication with laravel
            authenticationService
                .login(response.accessToken, "google")
                .then(function (user) {
                    window.location.reload();
                    checkLoginStatus();
                    setIsLoading(false);
                })
                .catch(function (error) {
                    setIsLoading(false);
                    //Send false to header.ts
                });
        }
    }

    const logout = () => {
        setIsLoading(true);
        checkLoginStatus();
        authenticationService.logout();
        window.location.replace("/");
        setIsLoading(false);
    };

    return (
        <>
            {
                !isLoggedIn && !isLoading && (
                    <span className='ml-3 navbar-icons'>
                        <GoogleLogin
                            clientId={config.clientId}
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                            render={(renderProps) => (
                                <Button onClick={renderProps.onClick} variant="danger" block> <FaGoogle /> Login </Button>

                            )}
                        />
                    </span>

                )
            }

            {
                isLoading && (
                    <span className='ml-3 navbar-icons'>
                        <Button variant="danger" block disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        </Button>
                    </span>

                )
            }

            {
                isLoggedIn && (
                    <span className='ml-3 navbar-icons'>
                        <GoogleLogout
                            clientId={config.clientId}
                            buttonText="Login"
                            onLogoutSuccess={logout}
                            render={(renderProps) => (
                                <Button onClick={renderProps.onClick} variant="danger" block> <FaSignOutAlt /> Logout </Button>
                            )}
                        />
                    </span>
                )
            }
        </>
    )
}

export default GoogleOauth
