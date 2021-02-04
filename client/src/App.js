import React, { useState, useEffect } from 'react';

function App() {
    const [graphData, setGraphData] = useState([]);
    const [dataRange, setDataRange] = useState(100);
    const [isSorting, setIsSorting] = useState(false);

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
            bubbleSort(graphData).then(() => {
                setIsSorting(false);
            });
        }
    };

    const bubbleSort = async (inputArr) => {
        let len = inputArr.length - 1;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (inputArr[j].value > inputArr[j + 1].value) {
                    await new Promise((resolve) => setTimeout(resolve, 5));

                    inputArr[j + 1].className = 'bg-primary';

                    let tmp = inputArr[j].value;
                    inputArr[j].value = inputArr[j + 1].value;
                    inputArr[j + 1].value = tmp;

                    setGraphData([...graphData]);
                    inputArr[j + 1].className = '';
                }
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
                <div className='menu-container'>
                    <div className='w-100 text-center'>
                        <label for='dataRangeSlider' class='form-label'>
                            {dataRange}
                        </label>
                        <input
                            type='range'
                            className='custom-range dataRangeSlider'
                            min='10'
                            max='100'
                            value={dataRange}
                            id='dataRangeSlider'
                            onChange={(ev) => {
                                setDataRange(ev.target.value);
                            }}
                            disabled={isSorting}
                        />
                    </div>
                </div>
                <div className='menu-container'>
                    <button
                        className={'btn rounded mx-5 w-50 h-50' + (isSorting ? ' btn-dark' : ' btn-primary')}
                        onClick={() => sort()}
                    >
                        {isSorting ? 'Sorting' : 'Sort'}
                    </button>
                </div>
                <div className='menu-container'></div>
            </div>
        </div>
    );
}

export default App;
