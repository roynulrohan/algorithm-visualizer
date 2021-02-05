import React, { useState, useEffect } from 'react';
import { bubbleSort, quickSort } from './algorithms';

function App() {
    const [graphData, setGraphData] = useState([]);
    const [dataRange, setDataRange] = useState(120);
    const [isSorting, setIsSorting] = useState(false);
    const [currentMode, setCurrentMode] = useState('Bubble Sort');

    useEffect(() => {
        setGraphData(getRandomData(dataRange));
    }, [dataRange]);

    const getRandomData = (limit) => {
        let data = [];

        for (let i = 0; i < limit; i++) {
            data[i] = { value: Math.floor(Math.random() * 95) + 5 };
        }

        return data;
    };

    const sort = () => {
        if (!isSorting) {
            setIsSorting(true);

            switch (currentMode) {
                case 'Bubble Sort':
                    bubbleSort(graphData, setGraphData).then(() => {
                        setIsSorting(false);
                    });
                    break;
                case 'Quick Sort':
                    quickSort(graphData, setGraphData).then(() => {
                        setIsSorting(false);
                    });
                    break;
            }
        }
    };

    return (
        <div className='App'>
            <div className='App__Graph'>
                {graphData.map((element) => {
                    return (
                        <span
                            className={isSorting && element.className}
                            style={{ height: `${(element.value)}%` }}
                        ></span>
                    );
                })}
            </div>
            <div className='App__Menu'>
                <div className='menu-container'>
                    <div className='w-100 text-center'>
                        <label for='dataRangeSlider' class='form-label'>
                            {dataRange}
                        </label>
                        <input
                            type='range'
                            className='custom-range dataRangeSlider'
                            min='10'
                            max='200'
                            value={dataRange}
                            id='dataRangeSlider'
                            onChange={(ev) => {
                                setDataRange(ev.target.value);
                            }}
                            disabled={isSorting}
                        />
                    </div>
                </div>
                <div className='menu-container flex-column'>
                    <button
                        className={'btn rounded mx-5 w-50 h-50' + (isSorting ? ' btn-dark' : ' btn-primary')}
                        onClick={() => sort()}
                    >
                        {isSorting ? 'Sorting' : 'Sort'}
                    </button>
                    <button
                        className='btn btn-outline-secondary m-1 mx-5 w-50'
                        onClick={() => {
                            setGraphData(getRandomData(dataRange));
                        }}
                        disabled={isSorting}
                    >
                        Randomize
                    </button>
                </div>
                <div className='menu-container flex-column'>
                    <div class='selected-label input-group w-auto mb-3'>
                        <div class='input-group-prepend'>
                            <label className='input-group-text'>Selected</label>
                        </div>
                        <label className='form-control'>{currentMode}</label>
                    </div>
                    <div>
                        <button
                            className='btn btn-primary m-1'
                            onClick={() => {
                                setCurrentMode('Bubble Sort');
                            }}
                            disabled={isSorting}
                        >
                            Bubble Sort
                        </button>
                        <button
                            className='btn btn-primary m-1'
                            onClick={() => {
                                setCurrentMode('Quick Sort');
                            }}
                            disabled={isSorting}
                        >
                            Quick Sort
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
