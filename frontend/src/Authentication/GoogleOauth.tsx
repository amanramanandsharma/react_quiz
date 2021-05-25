import React, { useState, useEffect } from 'react';
import './GoogleOauth.scss';

// Bootstap Imports
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";

//Icons Import
import { FaGoogle } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { authenticationService } from '../Authentication/Authentication.Service';

//Environment Variales
import { config } from '../environment';

function GoogleOauth() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        checkLoginStatus();
    }, [])

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
        if (response["error"] === undefined) {
            //If google gets a valid access code - then do backend authentication with laravel
            authenticationService
                .login(response.accessToken, "google")
                .then(function (user) {
                    window.location.reload();
                    checkLoginStatus();
                })
                .catch(function (error) {
                    //Send false to header.ts
                });
        }
    }

    const logout = () => {
        authenticationService.logout();
        checkLoginStatus();
        window.location.reload();
    };

    return (
        <div className='navbar-icons'>

            {
                !isLoggedIn && (
                    <GoogleLogin
                        clientId={config.clientId}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                        render={(renderProps) => (
                            <span><FaGoogle
                            onClick={renderProps.onClick} /> Login</span>

                        )}
                    />
                )
            }

            {
                isLoggedIn && (
                    <span>
                        <span className='mr-3'>
                        <Image
                            className="user-image pointer"
                            src={userData["image"]}
                            roundedCircle
                            />
                        </span>
                        
                        { userData['name']}
                        <span className='ml-3'>
                            <GoogleLogout
                                clientId={config.clientId}
                                buttonText="Login"
                                onLogoutSuccess={logout}
                                render={(renderProps) => (
                                    <FaSignOutAlt
                                        onClick={renderProps.onClick} />

                                )}
                            />
                        </span>
                    </span>
                )
            }
        </div>
    )
}

export default GoogleOauth
