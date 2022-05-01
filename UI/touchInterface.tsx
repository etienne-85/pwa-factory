import React, { useCallback, useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompress, faEject, faExpand, faFire } from '@fortawesome/free-solid-svg-icons'
import { toggleFullScreen } from "../utils/misc"

// enum BTN_ACTIONS {
//     Jump,
//     Fire
// }

// export const TouchInterface = ({touchRef}) => {
//     const onButtonTouch = ((action, state) => {
//         switch (action) {
//             case BTN_ACTIONS.Jump:
//                 // if (state) console.log("jump")
//                 touchRef.current.jump = state
//                 break;
//             case BTN_ACTIONS.Fire:
//                 // if (state) console.log("fire")
//                 touchRef.current.fire = state
//                 break;
//         }
//     })

//     return (<>
//         <TouchButton icon={faEject} style={{ top: "40%", right: "10%" }} onTouch={(state) => onButtonTouch(BTN_ACTIONS.Jump, state)} />
//         <TouchButton icon={faFire} style={{ bottom: "13%", right: "8%" }} onTouch={(state) => onButtonTouch(BTN_ACTIONS.Fire, state)} />
//     </>)

// }

export const TouchButton = ({ icon, style, onTouch, ...props }) => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        onTouch(active)
    }, [active])

    return (
        <FontAwesomeIcon className="touchIcons" icon={icon} size={"2x"} style={{ ...style, ...{ opacity: active ? '1' : '0.4' } }}
            onTouchStart={() => setActive(true)} onTouchEnd={() => setActive(false)} />
    )

}

export const ToggleBtn = ({ icon, disableIcon, style, toggleBtnAction, ...props }) => {
    const [btnState, setBtnState] = useState(false)

    const toggle = useCallback(() => {
        const newState = !btnState;
        toggleBtnAction(newState);
        setBtnState(newState);
    }, [btnState])

    return (
        <FontAwesomeIcon className="touchIcons" icon={btnState ? icon : disableIcon} size={"1x"} style={{ ...style, ...{ opacity: btnState ? '1' : '0.4' } }}
            onTouchEnd={toggle} />
    )

}

export const FullscreenToggleBtn = () => {
    // const [fullScreenMode, setFullScreenMode] = useState(false);

    return (
        <ToggleBtn icon={faCompress} disableIcon={faExpand} style={{ bottom: "5%", right: "4%" }} toggleBtnAction={toggleFullScreen} />
    )
}