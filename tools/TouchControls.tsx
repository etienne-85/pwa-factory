import { useState } from "react"

const halfWidth = window.innerWidth / 2

const normDiff = (v) => {
    const dx = Math.round(v.x)
    const dy = Math.round(v.y)
    return ({
        x: Math.sign(dx) * Math.min(Math.abs(dx), 128),
        y: Math.sign(dy) * Math.min(Math.abs(dy), 128)
    })
}

/**
 * Objects:
 * 
 * touchEvent { // Native JS object
 *  identifier,
 *  pageX,
 *  pageY
 * }
 * 
 * touch {
 *  id:             // native identifer for touch event
 *  orig: {x,y}     // original value when touch was first pressed
 *  diff: {x, y}    // diff between current and original
 * }
 * 
 * joystick{
 *  x,          // current values
 *  y,
 *  needReset,  // inform joystick has been released and need reset
 *  autoRest    // automatically reset value to 0 on release
 * }
 *  
 */

export const TouchControls = ({ touchRef }) => {
    const [touches, setTouches]: any = useState({})

    const getJoystick = (touch) => (touch.orig.x < halfWidth ? touchRef.current.joyLeft : touchRef.current.joyRight)

    // Synch joysticks with touches
    Object.values(touches).forEach((touch: any) => {
        if (touch.active) {
            const touchVal = normDiff(touch.diff)
            let joystick = getJoystick(touch)
            joystick.x = touchVal.x//touch.active || !joystick.autoReset ? touchVal.x : 0
            joystick.y = touchVal.y //touch.active || !joystick.autoReset ? touchVal.y : 0
        }
    })

    const onTouchStart = (e: any) => {
        const touchesState = {}
        Object.values(e.touches).forEach((touchEvt: any) => {
            const touchId = touchEvt.identifier
            // find a previous touch
            let touch = touches[touchId]
            // if doesn't exist or is inactive
            if (!touch || !touch.active) {
                // create or reinit touch
                const orig = { x: touchEvt.pageX, y: touchEvt.pageY }
                const diff = { x: 0, y: 0 }
                touch = { orig, diff, active: true }
            }
            touchesState[touchId] = touch
        })
        setTouches(touchesState)
    }

    const onTouchMove = (e: any) => {
        // update touches instant values
        Object.values(e.touches).forEach((touchEvt: any) => {
            const touch = touches[touchEvt.identifier]
            touch.diff.x = touchEvt.pageX - touch.orig.x
            touch.diff.y = touchEvt.pageY - touch.orig.y
        })
        setTouches({ ...touches })
    }

    const onTouchEnd = (e: any) => {
        Object.keys(touches).forEach(touchId => {
            // find correponding touch event: not found => touch has been released
            const touchEvt = e.touches[touchId] // the corresponding touch event
            const touch = touches[touchId] // touch
            const joystick = getJoystick(touch) // the corresponding joystick

            if (!touchEvt) {
                // disable corresponding touch state
                touch.active = false
                // 
                if (joystick.autoReset) {
                    joystick.x = 0
                    joystick.y = 0
                } else joystick.needReset = true
            }
        })
        setTouches({ ...touches })
    }

    return (<>{/* {Object.values(touches).map((touch: any) => {
        const color = touch.orig.x < halfWidth ? "red" : "green"
        const side = touch.orig.x < halfWidth ? "LEFT" : "RIGHT"
        const { x, y } = touch.orig
        const { x: dx, y: dy } = normDiff(touch.diff)
        return (<div style={{ position: "fixed", top: `${y}px`, left: `${x}px`, color }}>{side} dx: {dx} dy: {dy}</div>)
      })} */}
        <div id={"touchControls"} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} />
    </>)
}