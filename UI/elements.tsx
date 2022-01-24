import React from 'react';
import { useLocation } from "react-router-dom";
import logo from '../../../logo.svg';
import '../pwa.css'

export const BuildNum = () => {
    return (<div className="bottom right">
        {/* <img src={logo} className="logo" alt="logo" /> */}
        <code style={{ fontSize: "small" }}>build: {process.env.REACT_APP_BUILD_NUM}</code>
    </div>)
}

export const NavBar = () => {
    let location = useLocation();
    let hash = window.location.hash;
    return (<div id="navBar">{location.pathname}{hash}</div>)
}

export const LoadingBar = () => {
    let location = useLocation();
    let hash = window.location.hash;
    return (<div id="navBar" className="top">{location.pathname}{hash}</div>)
}

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