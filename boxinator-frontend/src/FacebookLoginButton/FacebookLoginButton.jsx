import React, { useEffect, useState } from 'react';

const FacebookLoginButton = () => {
    const [isFbSdkLoaded, setIsFbSdkLoaded] = useState(false);

    useEffect(() => {
        console.log('Initializing Facebook SDK...');

        window.fbAsyncInit = function() {
            console.log('FB SDK loaded, initializing...');
            window.FB.init({
                appId      : '424533970354119',
                cookie     : true,
                xfbml      : true,
                version    : 'v14.0' // Confirm this is the latest supported version
            });
            console.log('FB.init called with version: v14.0');
            setIsFbSdkLoaded(true);
        };

        // Load the SDK asynchronously
        const loadFbSdk = () => {
            const id = 'facebook-jssdk';
            if (document.getElementById(id)) {
                setIsFbSdkLoaded(true);
                return;
            }
            const js = document.createElement('script');
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk/debug.js";
            js.onload = () => {
                console.log('Facebook SDK script loaded.');
            };
            js.onerror = (error) => {
                console.error('Error loading Facebook SDK script:', error);
            };
            document.getElementsByTagName('head')[0].appendChild(js);
        };

        loadFbSdk();
    }, []);

    const handleFacebookLogin = () => {
        if (!isFbSdkLoaded) {
            console.error('Facebook SDK not initialized.');
            return;
        }

        window.FB.login((response) => {
            if (response.authResponse) {
                const { accessToken, userID } = response.authResponse;
                handleFacebookLoginResponse(accessToken, userID);
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email'});
    };

    const handleFacebookLoginResponse = async (accessToken, userID) => {
        try {
            const res = await fetch('https://localhost:7259/authentication/facebook-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accessToken, userID })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            // Handle response data (e.g., store the token, redirect)
            console.log(data);
        } catch (error) {
            console.error('Error during Facebook login:', error);
        }
    };

    return (
        <button onClick={handleFacebookLogin}>Login with Facebook</button>
    );
};

export default FacebookLoginButton;
