import React from "react";

function Axis(props) {
    const {keys} = props;
    let filteredKeys;
    if (!keys || !keys.map) {
        filteredKeys = [];
    }
    else {
        filteredKeys = keys.filter(key => key !== undefined && typeof(key) !== 'object').map(key => {
            if (typeof(key) === 'boolean') {
                return String(key);
            }

            return key;
        })
    }

    let isString = false;
    if (filteredKeys.find(key => typeof(key) === 'string')) {
        filteredKeys = filteredKeys.map(key => String(key));
        isString = true;
    }

    let points;
    if (isString) {
        for (let key of filteredKeys) {

        }
    }

    return (
        <g className="graph-chart-axis">

        </g>
    )
}

export default Axis;