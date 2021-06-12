import React, { useState, useEffect } from 'react';
import { bubbleSort, quickSort, selectionSort, insertionSort } from './algorithms';
import { getFromStorage, setInStorage } from './utils/localStorage';
import { useDispatch } from 'react-redux';

function App() {
    const [graphData, setGraphData] = useState([]);
    const [dataRange, setDataRange] = useState(120);
    const [isSorting, setIsSorting] = useState(false);
    const [currentMode, setCurrentMode] = useState('Bubble Sort');
    const [timeInterval, setTimeInterval] = useState(10);
    const dispatch = useDispatch();

    useEffect(() => {
        const graphDataObj = getFromStorage('algorithm-visualizer-rr_GraphData');

        if (graphDataObj) {
            setGraphData(graphDataObj.graphData);
        } else {
            setGraphData(getRandomData(dataRange));
        }
        const dataRangeObj = getFromStorage('algorithm-visualizer-rr_DataRange');

        if (dataRangeObj) {
            setDataRange(dataRangeObj.dataRange);
        }
        const timeIntervalObj = getFromStorage('algorithm-visualizer-rr_TimeInterval');

        if (timeIntervalObj) {
            setTimeInterval(timeIntervalObj.timeInterval);
        }
        const currentModeObj = getFromStorage('algorithm-visualizer-rr_CurrentMode');

        if (currentModeObj) {
            setCurrentMode(currentModeObj.currentMode);
        }
    }, []);

    useEffect(() => {
        const data = getRandomData(dataRange);
        setGraphData(data);

        setInStorage('algorithm-visualizer-rr_GraphData', {
            graphData: data,
        });
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
            dispatch({ type: 'START' });
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
                case 'Insertion Sort':
                    insertionSort(graphData, setGraphData, timeInterval).then(() => {
                        setIsSorting(false);
                    });
                    break;
            }
        } else {
            dispatch({ type: 'STOP' });
        }
    };

    return (
        <div className='App'>
            <div className='App__Graph'>
                {graphData.map((element) => {
                    return (
                        <span className={element.className} style={{ height: `${element.value}%` }}>
                            {dataRange <= 60 && <p>{element.value}</p>}
                        </span>
                    );
                })}
            </div>
            <div className='App__Menu'>
                <div className='menu-container flex-column'>
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
                            min='2'
                            max='100'
                            value={timeInterval}
                            id='timeIntervalSlider'
                            onChange={(ev) => {
                                setTimeInterval(ev.target.value);

                                setInStorage('algorithm-visualizer-rr_TimeInterval', {
                                    timeInterval: ev.target.value,
                                });
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

                                setInStorage('algorithm-visualizer-rr_DataRange', {
                                    dataRange: ev.target.value,
                                });
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
                        {isSorting ? 'Stop' : 'Sort'}
                    </button>
                    <button
                        className='btn btn-secondary m-1 mx-5 w-50'
                        onClick={() => {
                            const data = getRandomData(dataRange);
                            setGraphData(data);

                            setInStorage('algorithm-visualizer-rr_GraphData', {
                                graphData: data,
                            });
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

                                setInStorage('algorithm-visualizer-rr_CurrentMode', {
                                    currentMode: 'Bubble Sort',
                                });
                            }}
                            disabled={isSorting}
                        >
                            Bubble Sort
                        </button>
                        <button
                            className='btn btn-primary m-1'
                            onClick={() => {
                                setCurrentMode('Quick Sort');

                                setInStorage('algorithm-visualizer-rr_CurrentMode', {
                                    currentMode: 'Quick Sort',
                                });
                            }}
                            disabled={isSorting}
                        >
                            Quick Sort
                        </button>
                        <button
                            className='btn btn-primary m-1'
                            onClick={() => {
                                setCurrentMode('Selection Sort');

                                setInStorage('algorithm-visualizer-rr_CurrentMode', {
                                    currentMode: 'Selection Sort',
                                });
                            }}
                            disabled={isSorting}
                        >
                            Selection Sort
                        </button>
                        <button
                            className='btn btn-primary m-1'
                            onClick={() => {
                                setCurrentMode('Insertion Sort');

                                setInStorage('algorithm-visualizer-rr_CurrentMode', {
                                    currentMode: 'Insertion Sort',
                                });
                            }}
                            disabled={isSorting}
                        >
                            Insertion Sort
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
