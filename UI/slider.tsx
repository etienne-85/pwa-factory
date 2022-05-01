import { useRef, useState } from "react";
import "./slider.css"

export const Slider = ({touchRef}) => {
    const [value, setValue] = useState(0)

    const handleSlider = (evt) => {
        const sliderValue = evt.target.value;
        touchRef.current.slider = sliderValue
        setValue(sliderValue)
    }

    return (
        <>
            {/* <div ref={sliderRef} className='slider2'>
                <div ref={thumbRef} onMouseDown={handleMouseDown} className='slider2Thumb'></div>
            </div> */}
            <div className="slidecontainer">
                <input onInput={handleSlider} type="range" min="-255" max="255" value={value} className="slider" id="myRange" />
            </div>
        </>
    );
};