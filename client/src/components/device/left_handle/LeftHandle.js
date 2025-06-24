import React from "react";

export const LeftHandle = ({onClick}) => {

    return (
        <div id="L-H" className="handle">
            <div className="l_filter filter"></div>
            <div id="L-C" className="circle">
                <div className="border"></div>
            </div>
            <div id="Clicker-Btn" onClick={onClick} className="mybutton"></div>
        </div>
    )
}