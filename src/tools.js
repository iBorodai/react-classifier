"use strict";

import PropTypes from 'prop-types';
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import ClassifierConstructor from './containers/classifierContainer'
import { propTypesClassifier } from './types/propTypesClassifier';

class ToolsClass {

    constructor() {
        this.linker = {
            mappimg: {},
            dom: {},
            react: {},
            modal: false
        };

        // this.initClassifier = this.initClassifier.bind(this);
        // this._chipsClick = this._chipsClick.bind(this);
        // this.removeReactInput = this.removeReactInput.bind(this);
        // this.initReactModal = this.initReactModal.bind(this);
        // this.removeReactModal = this.removeReactModal.bind(this);
        // this.isInited = this.isInited.bind(this);
    }

    /**
     * init text field component
     * @param {propTypesClassifier} params 
     *  id
     *  classifierId
     *  
     */
    initClassifier(params) {

        const reactDomContainer = findDomElementBySome(params.reactContainerSelector);

        this.linker.dom[params.reactContainerSelector] = reactDomContainer;

        const ClassifierContainer = ClassifierConstructor({
            clientFunctions: {
                extractItems: params.extractItems,
                loadNamesByCodes: params.loadNamesByCodes,
                changeHandler: params.changeHandler,
                onInit: params.onInit
            }
        });

        render(
            <Provider store={store}>
                <ClassifierContainer
                    ref={(reactComponent) => {
                        // console.log(reactComponent);
                        this.linker.react[params.reactContainerSelector] = reactComponent
                        console.log(reactComponent.reloadItems);
                    }}
                    classifierId={params.classifierId}
                />
            </Provider>,
            reactDomContainer
        )

        return this.linker.react[params.reactContainerSelector];
    }

    isInited(selector) {
        return !!this.linker.react[selector];
    }

    removeReactInput(reactContainerSelector) {
        const domEl = this.linker.dom[reactContainerSelector];
        if (!domEl) return;

        ReactDOM.unmountComponentAtNode(domEl);
        delete this.linker.dom[reactContainerSelector];
        delete this.linker.react[reactContainerSelector];
    }

    /**
     * init text field component
     * @param {propTypesModal} params 
     */
    initReactModal(params) {
        if (!!this.linker.dom.modal) {
            this.removeReactModal();
        }

        PropTypes.checkPropTypes(propTypesModal, params);

        this.linker.dom.modal = params.reactContainerSelector;

        ReactDOM.render(
            <ClassModal
                id={params.classifierId}
                extractData={params.extractData}
                title={params.title}
                storeData={params.storeData}
                loadTreeLevel={params.loadTreeLevel}
                getSelectedPaths={params.getSelectedPaths}
                onStoreData={(classifierId) => { this.linker.react[classifierId].loadBaseData() }}
                // onComponentMount={params.onComponentMount}
                // onComponentUnmount={params.onComponentUnmount}
                onTriggerItemSelection={(pathStr, item) => {

                }}
                onSeach={(term) => {

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

}

export let tools = new ToolsClass();

// HELPER FUNCTIONS

function findDomElementBySome(containerSelectorOrId) {
    let reactDomContainer = (!!document.querySelector)
        ? document.querySelector(containerSelectorOrId)
        : document.getElementById(containerSelectorOrId);

    // Мх... может не querySelector просто ID передали?
    if (!reactDomContainer && !!document.querySelector)
        reactDomContainer = document.getElementById(containerSelectorOrId)

    if (!reactDomContainer)
        throw new Error('Container ' + containerSelectorOrId + ' not found');

    return reactDomContainer;
}