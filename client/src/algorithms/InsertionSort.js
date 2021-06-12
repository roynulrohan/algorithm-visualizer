import store from '../reduxStore';

let state;
store.subscribe(() => {
    state = store.getState();
});

export const insertionSort = async (inputArr, callback, timeInterval) => {
    let n = inputArr.length;

    for (let i = 1; i < n; i++) {
        // Choosing the first element in our unsorted subarray
        let current = inputArr[i].value;
        // The last element of our sorted subarray
        let j = i - 1;

        while (j > -1 && current < inputArr[j].value) {
            await new Promise((resolve) => setTimeout(resolve, timeInterval || 5));
            inputArr[i].className = 'bg-primary';
            inputArr[j + 1].className = 'bg-primary';

            inputArr[j + 1].value = inputArr[j].value;

            callback([...inputArr]);
            inputArr[j + 1].className = ' ';
            inputArr[i].className = ' ';

            j--;

            if (!state.sorting) {
                return;
            }
        }

        inputArr[j + 1].value = current;
    }
};
