import React, { useEffect, useRef, useState } from 'react';
import { ThreeApp } from '../../three-core-modules/core/ThreeApp';
import { isMobile } from '../utils/misc';
// import { AdvancedThreeApp, ThreeApp, ThreeDemoApp } from '../three-core-modules/core/ThreeApp';
import { TouchControls } from './TouchControls';
import { LoadingScreen } from '../UI/elements';
import '../pwa.css';

// export let AppClass: any// a singleton class

/**
 * React wrapper for launching three applications
 * Bridge between PWA <-> THREE
 * @returns 
 */
export const ThreeReactWrapper = ({ appClass }) => {
  const ref: any = useRef();
  const [isReady, setIsReady] = useState(false);
  const [item, setItem] = useState(-1);
  const [mode, setMode] = useState(null);
  const touchRef = useRef()

  // AppClass = appClass
  useEffect(() => {
    const stateProps = { setItem, setMode };
    //(demo as any).initState(stateProps);
    const appInstance = ThreeApp.singleton(appClass, null, { ref })
    // appInstance.init();
    // ref.current.appendChild(appInstance.renderer.domElement)

    if (appInstance?.state) {
      appInstance.state.isMobile = isMobile()
      console.log("is mobile: " + appInstance.state.isMobile)
    }
    appInstance.onWindowResize();
    (appInstance as any).animate()
    touchRef.current = appInstance.controls
    // lock screen in landscapte mode
    window.screen.orientation.lock("landscape").then(val => console.log(val))
    setIsReady(true)
    // renderer.domElement = canvasRef.current;
    // appInstance.renderer.setAnimationLoop(demo.render)
  }, [])


  // sync react and three states
  useEffect(() => {
    ThreeApp.instance.state.item = item;
    ThreeApp.instance.state.mode = mode;
  }, [item, mode])

  return (
    <>
      <div ref={ref} className="ThreeApp" >
        {!isReady && <LoadingScreen />}

        {isReady && <>
          <TouchControls touchRef={touchRef} />
          <StatsWidget />
        </>}
        {/* {currentBottle && mode === CONTROL_MODES.SELECTED && <OverlayV bottleCfg={currentBottle.config} onClose={closeOverlay} />} */}
      </div>
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
    console.log("[StatsWidget] init")
    if (ThreeApp.instance) ref.current.appendChild(ThreeApp.instance.stats.dom);
  }, [])

  console.log("[StatsWidget] refresh")

  return (<div ref={ref} className="ThreeStats" />)
}

/**
 * On screen debug information
 */
const DebugInfos = () => {
  return (<></>)
}
