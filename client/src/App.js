import React, { useState, useEffect } from 'react';
import { bubbleSort, quickSort, selectionSort } from './algorithms';

function App() {
    const [graphData, setGraphData] = useState([]);
    const [dataRange, setDataRange] = useState(120);
    const [isSorting, setIsSorting] = useState(false);
    const [currentMode, setCurrentMode] = useState('Bubble Sort');
    const [timeInterval, setTimeInterval] = useState(10);

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
                    bubbleSort(graphData, setGraphData, timeInterval).then(() => {
                        setIsSorting(false);
                    });
                    break;
                case 'Quick Sort':
                    quickSort(graphData, setGraphData, timeInterval).then(() => {
                        setIsSorting(false);
                    });
                    break;
                case 'Selection Sort':
                    selectionSort(graphData, setGraphData, timeInterval).then(() => {
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
                    return <span className={element.className} style={{ height: `${element.value}%` }}></span>;
                })}
            </div>
            <div className='App__Menu'>
                <div className='menu-container flex-column p-3'>
                    <div className='w-100'>
                        <div className='custom-label input-group mb-1'>
                            <div className='input-group-prepend'>
                                <label className='input-group-text'>Time Interval</label>
                            </div>
                            <label className='form-control'>{timeInterval} ms</label>
                        </div>
                        <input
                            type='range'
                            className='custom-range w-100'
                            min='0'
                            max='100'
                            value={timeInterval}
                            id='timeIntervalSlider'
                            onChange={(ev) => {
                                setTimeInterval(ev.target.value);
                            }}
                            disabled={isSorting}
                        />
                    </div>
                    <div className='w-100'>
                        <div className='custom-label input-group mb-1'>
                            <div className='input-group-prepend'>
                                <label className='input-group-text'>Number of bars</label>
                            </div>
                            <label className='form-control'>{dataRange}</label>
                        </div>
                        <input
                            type='range'
                            className='custom-range w-100'
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
                        className={'btn rounded mx-5 w-50 h-50' + (isSorting ? ' btn-danger' : ' btn-primary')}
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
                    <div className='custom-label input-group w-auto mb-3'>
                        <div className='input-group-prepend'>
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
                        <button
                            className='btn btn-primary m-1'
                            onClick={() => {
                                setCurrentMode('Selection Sort');
                            }}
                            disabled={isSorting}
                        >
                            Selection Sort
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
