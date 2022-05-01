import React from 'react';
import { useLocation } from "react-router-dom";
import logo from '../../../logo.svg';
import '../pwa.css'
import { WebSocketClientService } from '../tools/WSClientService';


export const HorizontalBar = ({ style, children }) => {

    return (<div id="statusBar" style={{ ...style }}>{children}</div>)
}

/**
 * Status bar with connection status and bg color change on status change
 * regular tick events to poll connection state 
 */
export const StatusBar = ({ children, refresh = false }) => {
    const bgColor = WebSocketClientService.isConnected ? "green" : "red";

    console.log("[UI - StatusBar] refresh")

    // make this component dynamically updated from outside
    // by subscribing to connection state change

    return (
        <HorizontalBar style={{ backgroundColor: bgColor }}>
            <NavigationPath />
            {children}
            <ConnectionState />
        </HorizontalBar>)
}

export const LoadingBar = () => {
    let location = useLocation();
    let hash = window.location.hash;
    return (<div id="navBar" className="top">{location.pathname}{hash}</div>)
}

// Bar elements

export const NavigationPath = () => {
    let location = useLocation();
    let hash = window.location.hash;
    return (
        <div>{location.pathname}{hash}</div>)
}

export const ConnectionState = () => {
    console.log("[UI - StatusBar - ConnectionState] refresh")

    const status = WebSocketClientService.isConnected ? "connected" : "disconnected"
    return (<div style={{ width: "100%", textAlign: "end", marginLeft: "5px", marginRight: "5px" }}> {status}</div>)
}

export const BuildNum = () => {
    return (<div className="bottom right">
        {/* <img src={logo} className="logo" alt="logo" /> */}
        <code style={{ fontSize: "small" }}>build#: {process.env.REACT_APP_BUILD_NUM}</code>
    </div>)
}

