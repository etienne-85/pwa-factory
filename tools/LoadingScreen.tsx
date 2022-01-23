import React from 'react';
import logo from '../../../logo.svg';
import '../pwa.css'

export const LoadingScreen = () => {
    return (
        <div className="LoadingScreen ">
            <div className="center">
                <img src={logo} className="logo" alt="logo" />
                <h2>
                    LOADING
                </h2>
                <p>Please wait...</p>
            </div>

        </div>
    );
}