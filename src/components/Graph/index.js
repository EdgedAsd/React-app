import React from "react";
import Axis from "./Axis";
import './graph.scss';

function Graph(props) {
    const {
        width = 1000,
        height = 600,
        padding = [50, 50, 50, 50],
        data
    } = props;

    if (!data || !data.map || !data.length) {
        return <h2>Error!</h2>
    }

    const valuesHeight = 30;                                // Примерная высота текста
    const xPadding = 10;                                    // Отступ оси Ox слева от оси Oy
    const startX = padding[3] + xPadding;                   // Начальная точка графика по оси Ox относительно всего svg
    const finishX = width - padding[1];                     // Конечная точка графика по оси Ox относительно всего svg
    const finishY = height - padding[2] - valuesHeight;     // Конечная точка графика по оси Oy относительно всего svg

    // Фильтруем полученные ключи - работаем только с числами и строками, логический тип приводим к строке
    const xKeys = data.filter(key => key !== null && typeof(key) === 'object')
        .map(key => key.workers === 0 ? 0 : key.workers || null)
        .filter(key => key !== null)
        .map(key => typeof(key) === 'boolean' ? String(key) : key);

    const keysLength = xKeys.length;

    if (!keysLength) {
        return <h2>Error!</h2>
    }

    const rect = {startX, finishX, startY: 0, finishY}

    return (
        <div className="graph">
            <svg className="graph-chart" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <Axis keys={xKeys} ySteps={15} rect={rect} xPadding={xPadding} valuesHeight={valuesHeight}/>
            </svg>
        </div>
    )
}

export default Graph;