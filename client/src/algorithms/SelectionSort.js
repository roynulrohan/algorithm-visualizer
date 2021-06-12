import store from '../reduxStore';

let state;
store.subscribe(() => {
    state = store.getState();
});

export const selectionSort = async (inputArr, callback, timeInterval) => {
    let n = inputArr.length;

    for (let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (inputArr[j].value < inputArr[min].value) {
                min = j;
            }
            
            if (!state.sorting) {
                return;
            }
        }
        if (min != i) {
            await new Promise((resolve) => setTimeout(resolve, timeInterval || 5));
            inputArr[i].className = 'bg-primary';
            inputArr[min].className = 'bg-primary';
            callback([...inputArr]);

            // Swapping the elements
            let tmp = inputArr[i].value;
            inputArr[i].value = inputArr[min].value;
            inputArr[min].value = tmp;

            inputArr[i].className = ' ';
            inputArr[min].className = ' ';

            if (!state.sorting) {
                return;
            }
        }
    }
};
