import {errorActions, classifierActions} from '../actions/index';

const DEFAULT_STAGE = {
    // loading: false,
    // items: [], // item: {code, label}
}

export default (state = DEFAULT_STAGE, action) => {
    const { type, message } = action;

    switch (type) {
        case classifierActions.LOADING_START:
        case classifierActions.REMOVE_ITEM_START:
        case classifierActions.ADD_ITEM_START:
            // return combine(state, classifierId, { loading: true });
            return {
                ...state,
                loading: true
            }

        case classifierActions.LOADING_FAIL:
        case classifierActions.REMOVE_ITEM_FAIL:
        case classifierActions.ADD_ITEM_FAIL:
            // return combine(state, classifierId, { loading: false });
            return {
                ...state,
                loading: false
            }

        case classifierActions.REMOVE_ITEM_SUCCESS:
        case classifierActions.ADD_ITEM_SUCCESS:
        case classifierActions.LOADING_SUCCESS:
            // return combine(state, classifierId, { loading: false, items: message.items });
            return {
                ...state,
                loading: false, 
                items: message.items
            }

        case classifierActions.SET_ITEMS:
            // return combine(state, classifierId, { items: message.items });
            return {
                ...state,
                items: message.items
            }
    }

    return state;
}

// just set items
export const actSetItems = (items) => {
    return dispatch => {
        // dispatch({
        //     type: classifierActions.LOADING_START
        // })
        dispatch({
            type: classifierActions.SET_ITEMS,
            message: {items}
        })
        // dispatch({
        //     type: classifierActions.LOADING_SUCCESS,
        //     message: {items}
        // })
    }
}

// extract items codes and set them
export const actExtractItems = (extractItems) => {
    return dispatch => {
        dispatch({
            type: classifierActions.LOADING_START
        })

        const methodReturn = extractItems(clientCodeCallback);
        if (!!methodReturn && typeof methodReturn.then === 'function'){
            methodReturn
                .then(res => {
                    clientCodeCallback(null, res);
                })
                .catch(error => {
                    clientCodeCallback(error);
                })
        }

        function clientCodeCallback(err, result) {
            if(!!err){
                dispatch({
                    type: classifierActions.LOADING_FAIL,
                    message: err.message
                })
                dispatch({
                    type: errorActions.SET_ERROR_MESSAGE,
                    message: err.message
                })
                return ;
            }

            dispatch({
                type: classifierActions.LOADING_SUCCESS,
                message: {items: result}
            })
        }
    }
}

export const actLoadNames= (loadNamesFunc) => {
    return dispatch => {
        dispatch({
            type: classifierActions.LOADING_START
        })

        const methodReturn = extractItems(clientCodeCallback);
        if (!!methodReturn && typeof methodReturn.then === 'function'){
            methodReturn
                .then(res => {
                    clientCodeCallback(null, res);
                })
                .catch(error => {
                    clientCodeCallback(error);
                })
        }

        function clientCodeCallback(err, result) {
            if(!!err){
                dispatch({
                    type: classifierActions.LOADING_FAIL,
                    message: err.message
                })
                dispatch({
                    type: errorActions.SET_ERROR_MESSAGE,
                    message: err.message
                })
                return ;
            }

            dispatch({
                type: classifierActions.LOADING_SUCCESS,
                message: {items: result}
            })
        }
    }
}