// import _ from 'lodash'
import { errorActions, classifierActions } from '../actions/index';

const DEFAULT_STAGE = {
    // loading: false,
    // items: [], // item: {code, label}
}

export default (state = DEFAULT_STAGE, action) => {

    const { type, message } = action;

    switch (type) {
        case classifierActions.LOADING_START:
        case classifierActions.LOADING_NAMES_START:
        case classifierActions.REMOVE_ITEM_START:
        case classifierActions.ADD_ITEM_START:
            // return combine(state, classifierId, { loading: true });
            return {
                ...state,
                loading: true
            }

        case classifierActions.LOADING_FAIL:
        case classifierActions.LOADING_NAMES_FAIL:
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
        case classifierActions.LOADING_NAMES_SUCCESS:
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

let clientFunctions;
export const genActions = (passedClientFunctions) => {
    clientFunctions = passedClientFunctions;
    return {
        actSetItems,
        actExtractItems,
        actLoadNamesByCodes
    }
};

// just set items
export const actSetItems = (items, prevItems) => {
    
    return dispatch => {

        clientFunctions.changeHandler(items);

        dispatch({
            type: classifierActions.SET_ITEMS,
            message: { items }
        });

        // if( _.isEqual(items, prevItems) )
        //     actLoadNamesByCodes(items.map(i => i.id))(dispatch);
    }
}

// extract items codes and set them
export const actExtractItems = () => {
    return dispatch => {
        dispatch({
            type: classifierActions.LOADING_START
        })

        // const methodReturn = extractItemsFunc(clientCodeCallback);
        const methodReturn = clientFunctions.extractItems(clientCodeCallback);
        if (!!methodReturn && typeof methodReturn.then === 'function') {
            methodReturn
                .then(res => {
                    clientCodeCallback(null, res);
                })
                .catch(error => {
                    clientCodeCallback(error);
                })
        }

        function clientCodeCallback(err, items) {
            if (!!err) {
                dispatch({
                    type: classifierActions.LOADING_FAIL,
                    message: err.message
                })
                dispatch({
                    type: errorActions.SET_ERROR_MESSAGE,
                    message: err.message
                })
                return;
            }

            dispatch({
                type: classifierActions.LOADING_SUCCESS,
                message: { items }
            });

            actLoadNamesByCodes(items.map(i => i.id))(dispatch);
        }
    }
}

export const actLoadNamesByCodes = (codes) => {
    return dispatch => {
        dispatch({
            type: classifierActions.LOADING_NAMES_START
        })

        const resp = clientFunctions.loadNamesByCodes(codes, callback);

        if (!!resp && typeof resp.then === 'function')
            return resp
                .then(result => { callback(null, result) })
                .catch(err => { callback(err) });

        function callback(err, items) {
            dispatch({
                type: classifierActions.LOADING_NAMES_SUCCESS,
                message: { items }
            })
        }
    }
}

// export const actSetItems = (items) => {
//     return dispatch => {
//     }
// }