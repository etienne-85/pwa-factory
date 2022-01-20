import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from '../utils/misc';
// import { AdvancedThreeApp, ThreeApp, ThreeDemoApp } from '../three-core-modules/core/ThreeApp';
import './ThreeAppWrapper.css';
import { TouchControls } from './TouchControls';

export let demo: any// demo should inherit of ThreeApp, AdvancedThreeApp, or ThreeDemoApp types

/**
 * React wrapper for launching three applications
 * Bridge between PWA <-> THREE
 * @returns 
 */
export const ThreeAppWrapper = ({ appClass }) => {
  const ref: any = useRef();
  const ref2: any = useRef();
  const [item, setItem] = useState(-1);
  const [mode, setMode] = useState(null);
  const touchRef = useRef()

  useEffect(() => {
    const stateProps = { setItem, setMode };
    //(demo as any).initState(stateProps);
    demo = new appClass()
    demo.init();
    ref.current.appendChild(demo.renderer.domElement)
    if (demo.stats) {
      ref2.current.appendChild(demo.stats.dom);
    }
    if (demo?.state) {
      demo.state.isMobile = isMobile()
      console.log("is mobile: " + demo.state.isMobile)
    }
    demo.onWindowResize();
    (demo as any).animate()
    touchRef.current = demo.controls
    // lock screen in landscapte mode
    window.screen.orientation.lock("landscape").then(val => console.log(val))

    // renderer.domElement = canvasRef.current;
    // demo.renderer.setAnimationLoop(demo.render)
  }, [])

  // update state for demo apps

  if (demo?.state) {
    demo.state.item = item;
    demo.state.mode = mode;
  }

  console.log("[DemoAppComp] component update")

  return (
    <>
      <div ref={ref2} className="DemoStats" />

      <div ref={ref} className="DemoApp" >
        <TouchControls touchRef={touchRef} />
        {/* {currentBottle && mode === CONTROL_MODES.SELECTED && <OverlayV bottleCfg={currentBottle.config} onClose={closeOverlay} />} */}
      </div>
    </>

  );
}
