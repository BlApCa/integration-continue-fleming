import React, { forwardRef } from "react";

export const MiniScreen = forwardRef((props, ref) => {
    return (
        <div id="MiniScreen" ref={ref}>
            <div className="ms-filter"></div>
            {/*<h1 id="ActualTime"></h1>*/}
            {/*<h3 id="ActualDate"></h3>*/}
        </div>
    );
});