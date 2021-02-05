export const bubbleSort = async (inputArr, callback, timeInterval) => {
    let len = inputArr.length - 1;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (inputArr[j].value > inputArr[j + 1].value) {
                await new Promise((resolve) => setTimeout(resolve, timeInterval || 5));

                inputArr[j + 1].className = 'bg-primary';

                let tmp = inputArr[j].value;
                inputArr[j].value = inputArr[j + 1].value;
                inputArr[j + 1].value = tmp;

                callback([...inputArr]);
                inputArr[j + 1].className = '';
            }
        }
    }
};
