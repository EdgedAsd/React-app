import React from "react";

function Axis(props) {

    function drawPoints(keys, margin, startMargin) {
        const points = [];
        let currentMargin = startMargin;
        for (let key of keys) {
            const currentWidth = key.toString().length * symbolWidth;
            const currentX = currentMargin - currentWidth / 2;
            points.push(
                <g className="graph-chart-axis-value" key={key}>
                    <line stroke="#666" strokeWidth="2" x1={currentMargin} y1={finishY} x2={currentMargin} y2={finishY + pointHeight} />
                    <text x={currentX} y={finishY + valuesHeight}>{key}</text>
                </g>
            )
            currentMargin += margin;
        }

        return points;
    }

    const {keys, ySteps = 10, rect, xPadding, valuesHeight} = props;
    const {startX, finishX, finishY} = rect;

    // Выбираем модель поведения: строковый или числовой
    // Если строковый, то приводим все значения к строке (в массив могли попасть числа)
    let isString = false;
    let filteredKeys = JSON.parse(JSON.stringify(keys));
    if (keys.find(key => typeof(key) === 'string')) {
        filteredKeys = filteredKeys.map(key => String(key));
        isString = true;
    }

    let points;                 // Выводимый массив значений оси
    const symbolWidth = 10;     // Примерная ширина одного символа для расчета ширины текста
    const pointHeight = 10;     // высота одного деления на оси

    if (isString) {
        // Отступы между значениями (отступы после последнего значения и перед первым равны половине от обычного)
        const margin = (finishX - startX) / filteredKeys.length;
        points = drawPoints(filteredKeys, margin, margin / 2 + startX);
    }
    else {
        filteredKeys = filteredKeys.sort((a, b) => a - b);
        const lastValue = filteredKeys[filteredKeys.length - 1];
        const step = Math.round(lastValue / ySteps);

        // Выводимые значения
        const steps = Array.from({ length: ySteps }, (_, index) => (index + 1) * step);

        // Отступы между значениями (после последнего значения отступ равен половине от обычного)
        const margin = 2 * (finishX - startX) / (2 * ySteps + 1);
        points = drawPoints(steps, margin, margin + startX);
    }

    return (
        <g className="graph-chart-axis">
            <line stroke="#666" strokeWidth="2" x1={startX - xPadding} y1={finishY} x2={finishX} y2={finishY} />
            <g className="graph-chart-axis-values">{points}</g>
        </g>
    )
}

export default Axis;