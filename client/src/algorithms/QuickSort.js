import store from '../reduxStore';

let state;
store.subscribe(() => {
    state = store.getState();
});

export const quickSort = async (inputArr, callback, timeInterval) => {
    const partition = async (items, left, right) => {
        let pivot = items[Math.floor((right + left) / 2)].value, //middle element
            i = left, //left pointer
            j = right; //right pointer

        while (i <= j) {
            if (!state.sorting) {
                return;
            }

            while (items[i].value < pivot) {
                i++;
            }
            while (items[j].value > pivot) {
                j--;
            }

            if (i <= j) {
                await new Promise((resolve) => setTimeout(resolve, timeInterval || 50));
                items[i].className = 'bg-primary';
                items[j].className = 'bg-primary';

                let temp = items[i].value;
                items[i].value = items[j].value;
                items[j].value = temp;

                callback([...inputArr]);

                items[i].className = '';
                items[j].className = '';

                i++;
                j--;
            }
        }
        return i;
    };

    const solve = async (items, left, right) => {
        let index;
        if (items.length > 1) {
            index = await partition(items, left, right); //index returned from partition
        }

        if (left < index - 1) {
            //more elements on the left side of the pivot
            await solve(items, left, index - 1);
        }
        if (index < right) {
            //more elements on the right side of the pivot
            await solve(items, index, right);
        }

        if (!state.sorting) {
            return;
        }
    };

    await solve(inputArr, 0, inputArr.length - 1);
};
