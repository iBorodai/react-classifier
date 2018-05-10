import { combineReducers } from 'redux';

// REDUCERS
import classifierReducer from './classifierReducer';
import errorMessage from './errorMessage';

const rootReducer = combineReducers(
    {
        classifierReducer,
        errorMessage
    }
);

export default rootReducer;