import React from "react";
import {setWidth, setHeight} from "../../slices/graphSlice";
import {useDispatch} from 'react-redux';
import Axis from "./Axis";
import './graph.scss';

function Graph(props) {
    const {width = 1000, height = 600, data} = props;
    const dispatch = useDispatch();

    const xKeys = data.map(item => item.workers);

    // Установка значений в стор
    dispatch(setWidth(width));
    dispatch(setHeight(height));

    return (
        <div className="graph">
            <svg className="graph-chart" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <Axis keys={xKeys} ySteps={15}/>
            </svg>
        </div>
    )
}

export default Graph;