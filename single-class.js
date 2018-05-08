/***
 *  Клиентсткие функции 
 ****/

// Получить данные из инпута
function extractDataLocalSync(classifierId) {
    var el = document.getElementById(classifierId);
    return !el.value ? [] : el.value.split(",");
}

function storeDataLocalSync(classifierId, values) {
    var el = document.getElementById(classifierId);
    var joined = !values.length ? "" : values.map(i => { return (typeof i == 'object' ? i.id : i) }).join(",");
    el.value = joined;
}

function onChipsClickLocal(classifierId, chip) {
    console.log('Clicked Chip', classifierId, chip);
}

function getClassifierInfoByCodesLocal(classifierId, codesArray, callback) {
    //detect url by classifierId
    var urlCode = _getVarById(classifierId);

    var url = "http://127.0.0.1:10102/class/names?" + urlCode + "=" + codesArray.join(',');

    return makeGetRequest(url, function (err, resp) {

        if (!!err) return callback.call(this, err);

        try {
            var res = JSON.parse(resp);
            return callback.call(this, null, (!!res[classifierId] ? res[classifierId] : []));
        } catch (err) {
            return callback.call(this, err);
        }
    });
}

function onComponentMountLocal(classifierId, reactComponent) {
    var el = document.getElementById(classifierId);
    el.style.display = 'none';
}

function onComponentUnmountLocal(classifierId) {
    var el = document.getElementById(classifierId);
    el.style.display = '';
}

function makeGetRequest(url, handler) {
    // return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onload = function () {
            if (this.status != 200) {
                handler(new Error('Failed load data! response status: ' + xhr.status));
                // reject(new Error('Failed load data! response status: ' + xhr.status));
            } else {
                handler(null, this.responseText);
                // вывести результат
                // resolve(this.responseText);
            }
        }

        xhr.onerror = function (e) {
            handler(new Error('Load data error!'));
            // reject(new Error('Load data error! :'.e.message));
        }

        xhr.send();
    // });
}

function _getCodeById(classifierId) {

    switch (classifierId) {
        case 'cpv': return 'cpv'; break;
        case 'dkpp': return 'dkpp'; break;
        case 'urtzed': return 'uktzed'; break;
        case 'main': return 'main'; break;
        default: throw new Error('Unexpected Classifier id: "' + classifierId + '"');
    }
}

function _getVarById(classifierId){
    return _getCodeById(classifierId)+'_id';
}

classifierTool.initReactInput({
    classifierId: 'cpv',
    reactContainerSelector: '#cpv-react-control',
    extractData: extractDataLocalSync,
    storeData: storeDataLocalSync,
    onChipsClick: onChipsClickLocal,
    getClassifierInfoByCodes: getClassifierInfoByCodesLocal,
    onComponentMount: onComponentMountLocal,
    onComponentUnmount: onComponentUnmountLocal
});