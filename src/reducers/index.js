import { combineReducers } from 'redux';

// REDUCERS
import classifier from './classifier';
import errorMessage from './errorMessage';

const rootReducer = combineReducers(
    {
        classifier,
        errorMessage
    }
);

export default rootReducer;