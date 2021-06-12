import { createStore } from 'redux';
import reducer from './reducers/sortingReducer';

const store = createStore(reducer);

export default store;