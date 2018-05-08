"use strict";

import PropTypes from 'prop-types';
import React from "react";
import ReactDOM from "react-dom";
import Classifier from './components/classifier';
// import { ClassModal } from './class-modal';

export let inst = new ComponentControllerClass;

// PARAMS DEFENITIONS

const ReactInputParamTypes = {
    classifierId: PropTypes.string.isRequired,
    reactContainerSelector: PropTypes.string.isRequired,
    inputId: PropTypes.string.isRequired,
    reactContainerSelector: PropTypes.string.isRequired,
}

const ReactModalParamTypes = {
    classifierId: PropTypes.string.isRequired,
    reactContainerSelector: PropTypes.string.isRequired,
    // relatedComponentId: PropTypes.string.isRequired,
    storeData: PropTypes.func.isRequired,
    extractData: PropTypes.func,
    loadTreeLevel: PropTypes.func,
    getSelectedPaths: PropTypes.func,
    getSearchResult: PropTypes.func,
}

class ComponentControllerClass {

    constructor() {
        this.linker = {
            mappimg: {},
            dom: {},
            react: {}
        };

        this._chipsClick = this._chipsClick.bind(this);
        this.initReactInput = this.initReactInput.bind(this);
        this.removeReactInput = this.removeReactInput.bind(this);
        this.initReactModal = this.initReactModal.bind(this);
        this.removeReactModal = this.removeReactModal.bind(this);
        this.isInited = this.isInited.bind(this);
    }

    /**
     * init text field component
     * @param {ReactInputParamTypes} params 
     */
    initReactInput(params) {
        
        PropTypes.checkPropTypes(ReactInputParamTypes, params);

        const innerId = params.reactContainerSelector;

        const reactDomContainer = findDomElementBySome( params.reactContainerSelector );

        this.linker.dom[ innerId ] = reactDomContainer;
        this.linker.mappimg[ innerId ] = params.reactContainerSelector;

        ReactDOM.render(
            <Classifier
                id={innerId}
                classifierId={params.classifierId}
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
            reactDomContainer
        );

        return innerId;
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

    _chipsClick(classifierId, chip){
        if(!!this.linker.react.modal){
            this.removeReactModal( classifierId );
        }
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

        this.linker.dom.modal = params.reactContainerSelector;

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
            document.getElementById(params.reactContainerSelector)
        );
    }
    
    removeReactModal() {
        // ReactDOM.unmountComponentAtNode(document.getElementById(divId));
        const domEl = document.getElementById(
            this.linker.dom.modal
        );
        if (!domEl) return;

        ReactDOM.unmountComponentAtNode(domEl);
        delete this.linker.dom.modal;
        delete this.linker.react.modal;
    }

    isInited(classifierId){
        return !!this.linker.react[classifierId];
    }

}

// HELPER FUNCTIONS

function findDomElementBySome(containerSelectorOrId){
    let reactDomContainer = (!!document.querySelector)
        ? document.querySelector(containerSelectorOrId)
        : document.getElementById(containerSelectorOrId);

    // Мх... может не querySelector просто ID передали?
    if(!reactDomContainer && !!document.querySelector)
        reactDomContainer = document.getElementById(containerSelectorOrId)

    if(!reactDomContainer)
        throw new Error('Container '+containerSelectorOrId+' not found');
    
    return reactDomContainer;
}