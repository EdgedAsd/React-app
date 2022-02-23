import React from "react";

function Graph(props) {
    const {width = 1000, height = 800} = props;

    return (
        <div className="graph">
            <svg className="graph-chart" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <g className="graph-chart-grid">
                    <g className="graph-chart-horizontal">

                    </g>
                    <g className="graph-chart-vertical">

                    </g>
                </g>
            </svg>
        </div>
    )
}

export default Graph;