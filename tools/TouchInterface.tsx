import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEject, faFire } from '@fortawesome/free-solid-svg-icons'

enum BTN_ACTIONS {
    Jump,
    Fire
}

export const TouchInterface = () => {
    const onButtonTouch = ((action, state) => {
        switch (action) {
            case BTN_ACTIONS.Jump:
                if (state) console.log("jump")
                break;
            case BTN_ACTIONS.Fire:
                if (state) console.log("fire")
                break;
        }
    })

    return (<>
        <TouchButton icon={faEject} style={{ bottom: "35%", right: "15%" }} onTouch={(state) => onButtonTouch(BTN_ACTIONS.Jump, state)} />
        <TouchButton icon={faFire} style={{ bottom: "15%", right: "15%" }} onTouch={(state) => onButtonTouch(BTN_ACTIONS.Fire, state)} />
    </>)

}

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