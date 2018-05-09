import {tools} from './tools';

export function initClassifier( params ){
    return tools.initClassifier( params );
}

export function isInited( selector ){
    return tools.isInited( selector );
}

export function requestGet( url, handler ){
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onload = function () {
            if (this.status != 200) {
                if(!!handler) return handler(new Error('Failed load data! response status: ' + xhr.status));
                reject(new Error('Failed load data! response status: ' + xhr.status));
            } else {
                if(!!handler) return handler(null, this.responseText);
                resolve(this.responseText);
            }
        }

        xhr.onerror = function (e) {
            if(!!handler) return handler(new Error('Load data error!'));
            reject(new Error('Load data error! :'.e.message));
        }

        xhr.send();
    });
}
