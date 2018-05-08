import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Classifier from './containers/classifier'

render(
    <Provider store={store}>
        <Classifier 
            classifierId="cpv" 
            id="123"
            extractItems={extractItems}
            changeHandler={changeHandler}
            loadnamesByCodes={false}
            items={[]}
        />
    </Provider>,
    document.querySelector('#app')
)

function changeHandler(data, prev){
    var res = [];
    for( var i=0; i<data.length; i++ ){
        res.push(data[i].id);
    }
    document.getElementById('cpv-input').value = res.join();
}

function extractItems(next){
    var v = document.getElementById('cpv-input').value.split(',');
    var res = [];
    for( var i=0; i<v.length; i++ ){
        res.push({id: v[i]});
    }
    next(null, res);
}