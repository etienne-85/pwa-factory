import { useState } from "react"

export const TouchControls = ({ touchRef }) => {
    const [touches, setTouches]: any = useState({})

    const halfWidth = window.innerWidth / 2
    const normDiff = (v) => {
        const dx = Math.round(v.x)
        const dy = Math.round(v.y)
        return ({
            x: Math.sign(dx) * Math.min(Math.abs(dx), 128),
            y: Math.sign(dy) * Math.min(Math.abs(dy), 128)
        })
    }

    Object.values(touches).forEach((touch: any) => {
        const touchVal = normDiff(touch.diff)
        if (touch.orig.x < halfWidth) {
            touchRef.current.joyLeft = touch.active ? touchVal : { x: 0, y: 0 }
        } else {
            touchRef.current.joyRight = touch.active ? touchVal : { x: 0, y: touchVal.y }
        }
    })

    const onTouchStart = (e: any) => {
        const touchesInit = {}
        Object.values(e.touches).forEach((touch: any) => {
            const touchId = touch.identifier
            const orig = { x: touch.pageX, y: touch.pageY }
            const diff = { x: 0, y: 0 }
            const current = touches[touchId]
            touchesInit[touchId] = current?.active ? current : { orig, diff, active: true }
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
        Object.keys(touches).forEach(touchId => e.touches[touchId] ? "" : touches[touchId].active = false)
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