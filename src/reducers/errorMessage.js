import {errorActions} from '../actions/index';

export default (state = null, action) => {
    const { type, error } = action
    
    switch( type ){
        case errorActions.RESET_ERROR_MESSAGE:   
        case errorActions.RESET_ERROR_MESSAGE:   
            return null;
        case errorActions.RESET_ERROR_MESSAGE:   
        default: 
            return state;
    }

    return state;
}