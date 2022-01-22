import {  useState } from "react"

const halfWidth = window.innerWidth / 2

const normDiff = (v) => {
    const dx = Math.round(v.x)
    const dy = Math.round(v.y)
    return ({
        x: Math.sign(dx) * Math.min(Math.abs(dx), 128),
        y: Math.sign(dy) * Math.min(Math.abs(dy), 128)
    })
}


export const TouchControls = ({ touchRef }) => {
    const [touches, setTouches]: any = useState({})

    const getJoystick = (touch) => (touch.orig.x < halfWidth ? touchRef.current.joyLeft : touchRef.current.joyRight)

    Object.values(touches).forEach((touch: any) => {
        const touchVal = normDiff(touch.diff)
        let joystick = getJoystick(touch)
        joystick.x = touch.active || !joystick.autoReset ? touchVal.x : 0
        joystick.y = touch.active || !joystick.autoReset ? touchVal.y : 0
    })

    const onTouchStart = (e: any) => {
        const touchesInit = {}
        Object.values(e.touches).forEach((touch: any) => {
            const touchId = touch.identifier
            const orig = { x: touch.pageX, y: touch.pageY }
            const diff = { x: 0, y: 0 }
            const touchInit = { orig, diff, active: true }
            const existing = touches[touchId]
            // const activeAndExisting = (existing && !existing.active) || !existing
            touchesInit[touchId] = existing?.active ? existing: touchInit
        })
        setTouches(touchesInit)
    }

    const onTouchMove = (e: any) => {
        // update touches state
        Object.values(e.touches).forEach((touch: any) => {
            const touchState = touches[touch.identifier]
            touchState.diff.x = touch.pageX - touchState.orig.x
            touchState.diff.y = touch.pageY - touchState.orig.y
        })
        setTouches({ ...touches })
    }

    const onTouchEnd = (e: any) => {
        Object.keys(touches).forEach(touchId => {
            // if touch press released
            const existingEvent = e.touches[touchId]
            if (!existingEvent) {
                // disable corresponding touch state
                const touch = touches[touchId]
                touch.active = false
                const joystick = getJoystick(touch)
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
        <div id={"TouchControls"} style={{ width: "100%", height: "100%", position: "absolute" }} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} />
    </>)
}