import React from "react";
import {useSelector} from 'react-redux';
import {rectParams} from '../../slices/graphSlice';

function Axis(props) {
    const {keys, ySteps = 10} = props;
    let filteredKeys;

    // Если передан не массив, то работаем как с пустым, далее отрисуется только ось без значений
    if (!keys || !keys.map) {
        filteredKeys = [];
    }
    else {
        // Фильтруем полученные ключи - работаем только с числами и строками, логический тип приводим к строке
        filteredKeys = keys.filter(key => key !== undefined && typeof(key) !== 'object').map(key => {
            if (typeof(key) === 'boolean') {
                return String(key);
            }

            return key;
        })
    }

    // Выбираем модель поведения: строковый или числовой
    // Если строковый, то приводим все значения к строке (в массив могли попасть числа)
    let isString = false;
    if (filteredKeys.find(key => typeof(key) === 'string')) {
        filteredKeys = filteredKeys.map(key => String(key));
        isString = true;
    }

    const {
        width,      // Ширина графика
        height,     // Высота графика
        padding     // Отступы от графика (задаются как в css)
    } = useSelector(rectParams);

    let points = [];                                        // Выводимый массив значений оси
    const xPadding = 10;                                    // Отступ оси Ox слева от оси Oy
    const valuesHeight = 30;                                // Примерная высота текста
    const startX = padding[3] + xPadding;                   // Начальная точка графика по оси Ox относительно всего svg
    const finishX = width - padding[1];                     // Конечная точка графика по оси Ox относительно всего svg
    const finishY = height - padding[2] - valuesHeight;     // Конечная точка графика по оси Oy относительно всего svg
    const symbolWidth = 10;                                 // Примерная ширина одного символа для расчета ширины текста
    const keysLength = filteredKeys.length;                 // Длина массива значений
    if (keysLength) {
        if (isString) {
            // Считаем суммарную ширину, занимаемую текстом
            let commonLength = 0;
            for (let key of filteredKeys) {
                commonLength += symbolWidth * key.length;
            }

            // Отступы между значениями (отступы после последнего значения и перед первым равны половине от обычного)
            const margin = (finishX - startX - commonLength) / keysLength;
            let currentMargin = startX + margin / 2;
            for (let key of filteredKeys) {
                const currentWidth = symbolWidth * key.length;
                points.push(
                    <g className="graph-chart-axis-value" key={key}>
                        <text height={valuesHeight} width={currentWidth} x={currentMargin} y={finishY + valuesHeight}>{key}</text>
                    </g>
                )
                currentMargin += currentWidth + margin;
            }
        }
        else {
            filteredKeys = filteredKeys.sort((a, b) => a - b);
            const lastValue = filteredKeys[keysLength - 1];
            const step = Math.round(lastValue / ySteps);

            // Выводимые значения
            const steps = Array.from({ length: ySteps }, (_, index) => (index + 1) * step);

            // Считаем суммарную ширину, занимаемую текстом
            let commonLength = 0;
            for (let value of steps) {
                commonLength += symbolWidth * value.toString().length;
            }

            // Отступы между значениями (после последнего значения отступ равен половине от обычного)
            const margin = 2 * (finishX - startX - commonLength) / (2 * ySteps + 1);
            let currentStep = step;
            let currentMargin = margin + startX;

            for (let i = 0; i < ySteps; i++) {
                const currentWidth = currentStep.toString().length * symbolWidth;

                // Считаем координату x для каждого значения. Эта координата должна делить текст пополам
                const currentX = currentMargin + currentWidth / 2;
                currentMargin += currentWidth + margin;
                points.push(
                    <g className="graph-chart-axis-value" key={currentStep}>
                        <text height={valuesHeight} width={currentWidth} x={currentX} y={finishY + valuesHeight}>{currentStep}</text>
                    </g>
                )
                currentStep += step;
            }
        }
    }
    else {
        points = [];
    }

    return (
        <g className="graph-chart-axis">
            <line stroke="#666" strokeWidth="2" x1={startX - xPadding} y1={finishY} x2={finishX} y2={finishY} />
            <g className="graph-chart-axis-values">
                {points}
            </g>
        </g>
    )
}

export default Axis;