"use strict";

import PropTypes from 'prop-types';
import React from "react";
import ReactDOM from "react-dom";
import { ClassControl } from './class-control';
import { ClassModal } from './class-modal';

class ComponentControllerClass {
    constructor() {
        this.linker = {
            dom: {},
            react: {}
        };

        this._chipsClick = this._chipsClick.bind(this);
        this.removeReactModal = this.removeReactModal.bind(this);
        
    }

    _chipsClick(classifierId, chip){
        
        if(!!this.linker.react.modal){
            this.removeReactModal( classifierId );
        }
    }

    /**
     * init text field component
     * @param {ReactInputParamTypes} params 
     */
    initReactInput(params) {
        PropTypes.checkPropTypes(ReactInputParamTypes, params);

        this.linker.dom[params.classifierId] = params.containerId;

        ReactDOM.render(
            <ClassControl
                id={params.classifierId}
                extractData={params.extractData}
                storeData={params.storeData}
                getClassifierInfoByCodes={params.getClassifierInfoByCodes}
                onChipsClick={(classifierId, chip)=>{
                    this._chipsClick(classifierId, chip); 
                    params.onChipsClick(classifierId, chip);
                    }}
                onComponentMount={params.onComponentMount}
                onComponentUnmount={params.onComponentUnmount}
                ref={(reactComponent) => { this.linker.react[params.classifierId] = reactComponent }}
            />,
            document.getElementById(params.containerId)
        );
    }

    removeReactInput(classifierId) {
        const domEl = document.getElementById(
            this.linker.dom[classifierId]
        );
        if (!domEl) return;

        ReactDOM.unmountComponentAtNode(domEl);
        delete this.linker.dom[classifierId];
        delete this.linker.react[classifierId];
    }

    /**
     * init text field component
     * @param {ReactModalParamTypes} params 
     */
    initReactModal(params) {
        if(!!this.linker.dom.modal){
            this.removeReactModal();
        }

        PropTypes.checkPropTypes(ReactModalParamTypes, params);

        this.linker.dom.modal = params.containerId;

        ReactDOM.render(
            <ClassModal
                id={params.classifierId}
                extractData={params.extractData}
                title={params.title}
                storeData={params.storeData}
                loadTreeLevel={params.loadTreeLevel}
                getSelectedPaths={params.getSelectedPaths}
                onStoreData={(classifierId)=>{this.linker.react[classifierId].loadBaseData()}}
                // onComponentMount={params.onComponentMount}
                // onComponentUnmount={params.onComponentUnmount}
                onTriggerItemSelection={(pathStr, item)=>{
                    
                }}
                onSeach = {(term)=>{

                }}
                close={this.removeReactModal}
                ref={(reactComponent) => { this.linker.react.modal = reactComponent }}
            />,
            document.getElementById(params.containerId)
        );
    }
    
    removeReactModal() {
        // ReactDOM.unmountComponentAtNode(document.getElementById(divId));
        const domEl = document.getElementById(
            this.linker.dom['modal']
        );
        if (!domEl) return;

        ReactDOM.unmountComponentAtNode(domEl);
        delete this.linker.dom['modal'];
        delete this.linker.react['modal'];
    }

    isInited(classifierId){
        return !!this.linker.react[classifierId];
    }

}

const ReactInputParamTypes = {
    classifierId: PropTypes.string.isRequired,
    containerId: PropTypes.string.isRequired,
    inputId: PropTypes.string.isRequired,
    containerId: PropTypes.string.isRequired,
}

const ReactModalParamTypes = {
    classifierId: PropTypes.string.isRequired,
    containerId: PropTypes.string.isRequired,
    // relatedComponentId: PropTypes.string.isRequired,
    storeData: PropTypes.func.isRequired,
    extractData: PropTypes.func,
    loadTreeLevel: PropTypes.func,
    getSelectedPaths: PropTypes.func,
    getSearchResult: PropTypes.func,
}

const single = new ComponentControllerClass;
module.exports = single;