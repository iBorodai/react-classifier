"use strict";

import React from "react";
import PropTypes from 'prop-types';

/*****
 * Input chips components and functions
 ******/

class Chips extends React.Component {
    render() {
        const name = !!this.props.name ? (
            <span className="cct-chips-name">{this.props.name}</span>
        ) : (
                ""
            );

        return (
            <span onClick={e => this.props.clickHandler(this.props.code)} className="cct-chips-item">
                <span className="cct-chips-code">{this.props.code}</span>
                {name}
            </span>
        );
    }
}

class ClassControl extends React.Component {

    constructor(props) {
        super(props);

        this.removeChip = this.removeChip.bind(this);
        this.loadBaseData = this.loadBaseData.bind(this);

        // hide base input
        this.state = { values: [] };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.values != prevState.values) this.storeData();
    }

    componentWillUnmount(){
        if(!!this.props.onComponentUnmount) this.props.onComponentUnmount( this.props.id );
    }

    componentDidMount() {
        if(!!this.props.onComponentMount) this.props.onComponentMount( this.props.id, this );
        
        this.loadBaseData();
    }

    onSourceChange(){
        this.loadBaseData();
    }

    async loadBaseData() {
        const valueCodes = await this.props.extractData(this.props.id);

        if(!valueCodes.length) return;
        
        if(!this.props.getClassifierInfoByCodes){    
            const values = valueCodes.map(i=>{return {id:i}});
            return this.setState({ values });
        } 

        try{
            let values = await this.props.getClassifierInfoByCodes( this.props.id, valueCodes );
            // на случай если метод не дает ошибку, а возвращаем пустой массив
            if(!values.length && !!valueCodes.length) values = valueCodes.map(i=>{return {id:i}});
            this.setState({ values });
        } catch( e ){
            console.error(e);
            const values = valueCodes.map(i=>{return {id:i}});
            return this.setState({ values });
        }
        return;
    }

    storeData() {
        this.props.storeData(this.props.id, this.state.values);
    }

    removeChip(code) {
        const newValues = this.state.values.reduce((prev, i) => {
            if (i.id !== code) 
                prev.push(i);
            else {
                if(!!this.props.onChipsClick) 
                    this.props.onChipsClick(this.props.id, i);
            }
            return prev;
        }, []);
        this.setState({ values: newValues });
    }

    render() {
        let chips = this.state.values.map(i => {
            return <Chips code={i.id} name={(i.name||'')} clickHandler={this.removeChip} key={i.id} />;
        });

        const classNameComp = 'cct-component cct-classifier-'+this.props.id;

        return (
            <div className={classNameComp}>
                {/* <label>Control -- {this.state.values.length}</label> */}
                {chips}
            </div>
        );
    }
}

ClassControl.propTypes = {
    id: PropTypes.string.isRequired,
    extractData: PropTypes.func.isRequired,
    storeData: PropTypes.func.isRequired,
    getClassifierInfoByCodes: PropTypes.func,
    linker: PropTypes.func,
    onComponentMount: PropTypes.func,
    onComponentUnmount: PropTypes.func,
}

module.exports = {
    ClassControl,
    Chips  
};