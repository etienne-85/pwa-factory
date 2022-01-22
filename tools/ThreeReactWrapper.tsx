import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from '../utils/misc';
// import { AdvancedThreeApp, ThreeApp, ThreeDemoApp } from '../three-core-modules/core/ThreeApp';
import './ThreeReactWrapper.css';
import { TouchControls } from './TouchControls';

export let AppClass: any// appInstance should inherit of ThreeApp, AdvancedThreeApp, or ThreeDemoApp types

/**
 * React wrapper for launching three applications
 * Bridge between PWA <-> THREE
 * @returns 
 */
export const ThreeAppWrapper = ({ appClass }) => {
  const ref: any = useRef();
  const [item, setItem] = useState(-1);
  const [mode, setMode] = useState(null);
  const touchRef = useRef()

  AppClass = appClass
  useEffect(() => {
    const stateProps = { setItem, setMode };
    //(demo as any).initState(stateProps);
    const appInstance = AppClass.instance()
    appInstance.init();
    ref.current.appendChild(appInstance.renderer.domElement)

    if (appInstance?.state) {
      appInstance.state.isMobile = isMobile()
      console.log("is mobile: " + appInstance.state.isMobile)
    }
    appInstance.onWindowResize();
    (appInstance as any).animate()
    touchRef.current = appInstance.controls
    // lock screen in landscapte mode
    window.screen.orientation.lock("landscape").then(val => console.log(val))

    // renderer.domElement = canvasRef.current;
    // appInstance.renderer.setAnimationLoop(demo.render)
  }, [])

  // update state for demo apps

  // if (appInstance?.state) {
  //   appInstance.state.item = item;
  //   appInstance.state.mode = mode;
  // }

  return (
    <>
      <div ref={ref} className="DemoApp" >
        <TouchControls touchRef={touchRef} />
        {/* {currentBottle && mode === CONTROL_MODES.SELECTED && <OverlayV bottleCfg={currentBottle.config} onClose={closeOverlay} />} */}
      </div>
      <StatsWidget />
      <DebugInfos />
    </>

  );
}

/**
 * FPS stats widget
 */
const StatsWidget = () => {
  const ref: any = useRef();

  useEffect(() => {
    ref.current.appendChild(AppClass.instance().stats.dom);
  }, [])

  return (<div ref={ref} className="ThreeStats" />)
}

/**
 * On screen debug information
 */
const DebugInfos = () => {
  return (<></>)
}
