import React from "react";
import Graph from "./Graph";

/*
TODO:
    - Сделать резиновый контейнер с возможностью растягивания
    - Сделать передачу параметров для отображения с автоматическим подсчетом макс. значений осей
    - Разбить все на компоненты
    - Возможность цветовой кастомизации элементов графика
    - Возможность выбрать из нескольких типов графиков
 */

function App() {
    const data = [
        {company: 'Facebook', workers: 100, profit: 1500},
        {company: 'Amazon', workers: 200, profit: 900},
        {company: 'Google', workers: 400, profit: 3500},
    ];

    return (
        <main>
            <h1>Graph builder</h1>
            <Graph data={data}/>
        </main>
    );
}

export default App;
